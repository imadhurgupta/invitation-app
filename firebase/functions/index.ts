import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

/**
 * TRIGGER: onNewUser
 * Runs automatically when a user creates an account (via Email or Google).
 * It creates a User Profile in Firestore.
 */
export const onNewUser = functions.auth.user().onCreate((user) => {
  const db = admin.firestore();
  
  return db.collection("users").doc(user.uid).set({
    email: user.email,
    displayName: user.displayName || "New User",
    photoURL: user.photoURL || null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    plan: "free",         // Default plan
    aiCredits: 5,         // Uniqueness: Give 5 free AI generations
    projectsCount: 0
  });
});