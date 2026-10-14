import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider, isFirebaseConfigured } from "../lib/firebase";

const DEFAULT_ADMIN_EMAILS = ["johnmarcelsilveira@gmail.com"];

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const AUTHORIZED_ADMIN_EMAILS = ADMIN_EMAILS.length > 0 ? ADMIN_EMAILS : DEFAULT_ADMIN_EMAILS;

export function getUserRole(email) {
  const normalizedEmail = (email ?? "").trim().toLowerCase();
  return AUTHORIZED_ADMIN_EMAILS.includes(normalizedEmail) ? "admin" : "reader";
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("reader");
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      const nextRole = getUserRole(nextUser?.email ?? "");
      setUser(nextUser);
      setRole(nextRole);

      if (!nextUser || !db) {
        setLoading(false);
        return;
      }

      try {
        await setDoc(
          doc(db, "users", nextUser.uid),
          {
            uid: nextUser.uid,
            email: nextUser.email ?? "",
            displayName: nextUser.displayName ?? "",
            role: nextRole,
          },
          { merge: true },
        );
      } catch (err) {
        setError(err.message ?? "Não foi possível sincronizar o usuário.");
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  async function login() {
    if (!auth) {
      setError("Firebase não está configurado neste ambiente. Verifique as variáveis VITE_FIREBASE_*.");
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

  return {
    user,
    role,
    loading,
    error,
    login,
    logout,
    configured: isFirebaseConfigured,
  };
}
