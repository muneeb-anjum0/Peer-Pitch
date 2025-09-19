import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/firebaseAdmin.js";
import type { AuthedRequest } from "../middleware/auth.js";
import { requireAuth } from "../middleware/auth.js";
import type { Pitch, Comment } from "../types.js";

const pitches = Router();

/** helpers */
const pitchRef = (id: string) => db.collection("pitches").doc(id);
const commentsCol = (pitchId: string) => pitchRef(pitchId).collection("comments");
const votesCol = (pitchId: string) => pitchRef(pitchId).collection("votes"); // docId = uid, {delta: 1 | -1}

/** GET /pitches/trending */
pitches.get("/trending", async (req, res) => {
  const { window } = req.query as { window?: "today" | "week" | "all" };
  let q = db.collection("pitches").orderBy("votes", "desc").limit(50);
  // Optional: filter by createdAt window — simple client hint; keep all for now
  const snap = await q.get();
  const data = snap.docs.map(d => ({ _id: d.id, ...d.data() })) as Pitch[];
  res.json(data);
});

/** GET /pitches/latest */
pitches.get("/latest", async (_req, res) => {
  const snap = await db.collection("pitches").orderBy("createdAt", "desc").limit(50).get();
  const data = snap.docs.map(d => ({ _id: d.id, ...d.data() })) as Pitch[];
  res.json(data);
});

/** GET /pitches/:id */
pitches.get("/:id", async (req, res) => {
  const doc = await pitchRef(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ error: "Not found" });
  res.json({ _id: doc.id, ...doc.data() });
});

/** GET /pitches/:id/comments */
pitches.get("/:id/comments", async (req, res) => {
  const snap = await commentsCol(req.params.id).orderBy("createdAt", "asc").get();
  const data = snap.docs.map(d => ({ _id: d.id, ...d.data() })) as Comment[];
  res.json(data);
});

/** POST /pitches  (auth) */
pitches.post("/", requireAuth, async (req: AuthedRequest, res) => {
  const schema = z.object({
    title: z.string().min(4).max(120),
    body: z.string().min(30).max(2000),
    tags: z.array(z.string()).max(5),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const now = new Date().toISOString();
  const doc = await db.collection("pitches").add({
    title: parsed.data.title,
    body: parsed.data.body,
    tags: parsed.data.tags,
    votes: 0,
    commentCount: 0,
    author: { uid: req.user!.uid, name: req.user!.name, photoURL: req.user!.photoURL },
    createdAt: now,
    updatedAt: now,
  });
  const snap = await doc.get();
  res.status(201).json({ _id: snap.id, ...snap.data() });
});

/** POST /pitches/:id/comments  (auth) */
pitches.post("/:id/comments", requireAuth, async (req: AuthedRequest, res) => {
  const schema = z.object({ body: z.string().min(2).max(1200) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const pid = req.params.id;
  const now = new Date().toISOString();

  const ref = commentsCol(pid).doc();
  await db.runTransaction(async (tx) => {
    const p = await tx.get(pitchRef(pid));
    if (!p.exists) throw new Error("Pitch not found");
    tx.set(ref, {
      pitchId: pid,
      body: parsed.data.body,
      author: { uid: req.user!.uid, name: req.user!.name, photoURL: req.user!.photoURL },
      createdAt: now,
    });
    tx.update(pitchRef(pid), {
      commentCount: (p.data()?.commentCount ?? 0) + 1,
      updatedAt: now,
    });
  });

  const snap = await ref.get();
  res.status(201).json({ _id: snap.id, ...snap.data() });
});

/** GET /pitches/:id/vote (auth) - returns current user's vote for the pitch */
pitches.get("/:id/vote", requireAuth, async (req: AuthedRequest, res) => {
  const pid = req.params.id;
  const uid = req.user!.uid;
  try {
    const voteDoc = await votesCol(pid).doc(uid).get();
    if (!voteDoc.exists) {
      return res.json({ vote: null });
    }
    return res.json({ vote: voteDoc.data()?.delta });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch vote', details: String(err) });
  }
});

/** POST /pitches/:id/vote {delta: 1 | -1} (auth) */
pitches.post("/:id/vote", requireAuth, async (req: AuthedRequest, res) => {
  const schema = z.object({ delta: z.enum(["1", "-1"]).or(z.number().int().refine(v => v === 1 || v === -1)) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const delta = typeof parsed.data.delta === "string" ? Number(parsed.data.delta) : parsed.data.delta;
  const pid = req.params.id;
  const uid = req.user!.uid;

  await db.runTransaction(async (tx) => {
    const pitchDoc = pitchRef(pid);
    const voteDoc = votesCol(pid).doc(uid);

    const [pSnap, vSnap] = await Promise.all([tx.get(pitchDoc), tx.get(voteDoc)]);
    if (!pSnap.exists) throw new Error("Pitch not found");

    const prev = (vSnap.exists ? vSnap.data()?.delta : 0) as number;
    let newVotes = (pSnap.data()?.votes ?? 0) - prev + delta; // remove previous, add new
    tx.set(voteDoc, { delta }, { merge: true });
    tx.update(pitchDoc, { votes: newVotes, updatedAt: new Date().toISOString() });
  });

  res.json({ ok: true });
});

export default pitches;
