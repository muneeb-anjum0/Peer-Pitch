import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// Example: Aggregate total votes for all pitches
export const aggregateTotalVotes = functions.https.onRequest(async (req, res) => {
  try {
    const snap = await db.collection("pitches").get();
    let totalVotes = 0;
    snap.forEach(doc => {
      const data = doc.data();
      totalVotes += data.votes || 0;
    });
    res.json({ totalVotes });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// Example: Get top 5 most commented pitches
export const topCommentedPitches = functions.https.onRequest(async (req, res) => {
  try {
    const snap = await db.collection("pitches").orderBy("commentCount", "desc").limit(5).get();
    const pitches = snap.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
    res.json({ pitches });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});
