import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  writeBatch,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { initialMatches } from "../data/seed";

export function useMatches(user) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(Boolean(db));
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState("");
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    if (!db || !user) {
      setMatches([]);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, "matches"),
      (snapshot) => {
        const next = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setMatches(next);
        setLoading(false);
        setError("");
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [user]);

  async function seedMatches() {
    if (!db || !user) return;

    const existing = new Set(matches.map((match) => match.id));
    const toWrite = initialMatches.filter((match) => !existing.has(match.id));

    if (toWrite.length === 0) {
      setError("Todos os jogos já estão no banco.");
      return;
    }

    setSeeding(true);
    setError("");
    try {
      const batch = writeBatch(db);
      toWrite.forEach((match) => {
        const { id, ...data } = match;
        batch.set(doc(db, "matches", id), {
          ...data,
          updatedBy: "",
        });
      });
      await batch.commit();
    } catch (err) {
      setError(err.message ?? "Não foi possível popular o banco.");
    } finally {
      setSeeding(false);
    }
  }

  async function saveScore(matchId, score1, score2) {
    if (!db || !user) return;
    setSavingId(matchId);
    setError("");
    try {
      await updateDoc(doc(db, "matches", matchId), {
        score1: Number(score1),
        score2: Number(score2),
        isFinished: true,
        updatedBy: user.email ?? "",
      });
    } catch (err) {
      setError(err.message ?? "Não foi possível salvar o placar.");
    } finally {
      setSavingId("");
    }
  }

  return {
    matches,
    loading,
    error,
    savingId,
    seeding,
    seedMatches,
    saveScore,
  };
}
