import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider, isFirebaseConfigured } from "../lib/firebase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setLoading(false);

      if (!nextUser || !db) return;

      await setDoc(
        doc(db, "users", nextUser.uid),
        {
          uid: nextUser.uid,
          email: nextUser.email ?? "",
          displayName: nextUser.displayName ?? "",
        },
        { merge: true },
      );
    });

    return unsubscribe;
  }, []);

  async function login() {
    if (!auth) {
      setError("Configure as variáveis VITE_FIREBASE_* no arquivo .env.");
      return;
    }

    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message ?? "Falha ao entrar com o Google.");
    }
  }

  async function logout() {
    if (!auth) return;
    await signOut(auth);
  }

  return { user, loading, error, login, logout, configured: isFirebaseConfigured };
}
