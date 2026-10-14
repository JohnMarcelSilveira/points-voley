import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  writeBatch,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { initialMatches, initialTeams } from "../data/seed";

export function useMatches(user) {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(Boolean(db));
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState("");
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    if (!db || !user) {
      setMatches([]);
      setTeams([]);
      setLoading(false);
      return undefined;
    }

    setLoading(true);

    const unsubscribeMatches = onSnapshot(
      collection(db, "matches"),
      (snapshot) => {
        const next = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setMatches(next);
      },
      (err) => {
        setError(err.message);
      },
    );

    const unsubscribeTeams = onSnapshot(
      collection(db, "teams"),
      (snapshot) => {
        const next = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setTeams(next);
        setLoading(false);
        setError("");
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );

    return () => {
      unsubscribeMatches();
      unsubscribeTeams();
    };
  }, [user]);

  async function seedMatches() {
    if (!db || !user) return;

    setSeeding(true);
    setError("");

    try {
      const existingMatchIds = new Set(matches.map((match) => match.id));
      const existingTeamIds = new Set(teams.map((team) => team.id));
      const toWriteTeams = initialTeams.filter((team) => !existingTeamIds.has(team.id));
      const toWriteMatches = initialMatches.filter((match) => !existingMatchIds.has(match.id));

      if (toWriteTeams.length === 0 && toWriteMatches.length === 0) {
        setError("Todos os times e jogos já estão no banco.");
        return;
      }

      const writeOperations = [
        ...toWriteTeams.map((team) =>
          setDoc(doc(db, "teams", team.id), {
            ...team,
            updatedAt: Date.now(),
          }),
        ),
        ...toWriteMatches.map((match) => {
          const { id, ...data } = match;
          return setDoc(doc(db, "matches", id), {
            ...data,
            updatedBy: "",
          });
        }),
      ];

      await Promise.all(writeOperations);
    } catch (err) {
      setError(err.message ?? "Não foi possível popular o banco.");
    } finally {
      setSeeding(false);
    }
  }

  async function saveTeams(nextTeams) {
    if (!db || !user) return;

    setError("");
    const batch = writeBatch(db);
    let writesCount = 0;

    nextTeams.forEach((team) => {
      const name = team.name?.trim();
      if (!team.id || !name) return;
      const { id, ...teamData } = team;
      writesCount += 1;
      batch.set(
        doc(db, "teams", id),
        {
          ...teamData,
          name,
          updatedAt: Date.now(),
        },
        { merge: true },
      );
    });

    if (writesCount === 0) {
      setError("Nenhum time válido para salvar.");
      return;
    }

    try {
      await batch.commit();
    } catch (err) {
      setError(err.message ?? "Não foi possível salvar os times.");
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
    teams,
    loading,
    error,
    savingId,
    seeding,
    seedMatches,
    saveTeams,
    saveScore,
  };
}
