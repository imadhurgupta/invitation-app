import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// 1. Trigger: Auto-create user profile in Firestore when they sign up
export const onNewUser = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    displayName: user.displayName,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    credits: 5 // Give 5 free AI generations
  });
});

// 2. API: AI Text Generator (Mocked logic for stability)
// In production, you would fetch OpenAI/Gemini API here
export const generateInviteText = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required');

  const { type, tone, name } = data; // e.g., type="Wedding", tone="Formal"
  
  // Logic to simulate AI response
  const suggestions = [
    `Together with their families, ${name} invite you to celebrate...`,
    `Join us for a ${tone} evening celebrating the union of ${name}...`
  ];

  return { suggestions };
});