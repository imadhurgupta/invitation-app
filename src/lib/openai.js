import { functions } from '@/config/firebase';
import { httpsCallable } from 'firebase/functions';

export const generateAIContent = async (promptData) => {
  try {
    const generateText = httpsCallable(functions, 'generateInviteText');
    const result = await generateText(promptData);
    return result.data.suggestions;
  } catch (error) {
    console.error("AI Generation Error:", error);
    // Fallback for demo if backend isn't ready
    return [
      "Request the honor of your presence...",
      "Join us for a celebration of love...",
      "Save the date for our special day!"
    ];
  }
};