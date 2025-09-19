import express from "express";
import { db } from "../lib/firebaseAdmin";
import { requireAuth, AuthedRequest } from "../middleware/auth";
import type { Response } from "express";

const router = express.Router();

// GET /me/pitches - returns pitches for the logged-in user, sorted by created or votes
router.get("/me/pitches", requireAuth, async (req: AuthedRequest, res: Response) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const sort = req.query.sort === "votes" ? "votes" : "createdAt";
  let pitchesSnap = await db.collection("pitches")
    .where("author.uid", "==", user.uid)
    .get();
  let pitches = pitchesSnap.docs.map(doc => doc.data());
  if (sort === "votes") {
    pitches = pitches.sort((a, b) => (b.votes || 0) - (a.votes || 0));
  } else {
    pitches = pitches.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  res.json(pitches);
});

// GET /me/analytics - returns analytics for the logged-in user
router.get("/me/analytics", requireAuth, async (req: AuthedRequest, res: Response) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  // Get pitches by this user
	const pitchesSnap = await db.collection("pitches").where("author.uid", "==", user.uid).get();
	const pitches = pitchesSnap.docs.map(doc => doc.data());

	// Calculate analytics
	const totalPitches = pitches.length;
	const totalVotes = pitches.reduce((sum, p) => sum + (p.votes || 0), 0);
	const totalComments = pitches.reduce((sum, p) => sum + (p.commentCount || 0), 0);
	const lastPosted = pitches.length > 0 ? pitches.reduce((latest, p) => {
		const created = new Date(p.createdAt);
		return created > new Date(latest) ? p.createdAt : latest;
	}, pitches[0].createdAt) : null;

	res.json({ totalPitches, totalVotes, totalComments, lastPosted });
});

// GET /me/pitches - returns pitches for the logged-in user, sorted by created or votes
router.get("/me/pitches", requireAuth, async (req: AuthedRequest, res: Response) => {
	const user = req.user;
	if (!user) return res.status(401).json({ error: "Unauthorized" });

	const sort = req.query.sort === "votes" ? "votes" : "createdAt";
	let pitchesSnap = await db.collection("pitches")
		.where("author.uid", "==", user.uid)
		.get();
	let pitches = pitchesSnap.docs.map(doc => doc.data());
	if (sort === "votes") {
		pitches = pitches.sort((a, b) => (b.votes || 0) - (a.votes || 0));
	} else {
		pitches = pitches.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	}
	res.json(pitches);
});

export default router;
