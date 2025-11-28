import { db } from '@/config/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

const COLLECTION = 'projects';

export const saveProject = async (userId, projectData, canvasJson) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION), {
      userId,
      title: projectData.title || 'Untitled Design',
      canvasData: JSON.stringify(canvasJson), // Store FabricJS object as string
      thumbnailUrl: projectData.thumbnailUrl || '', 
      createdAt: serverTimestamp(),
      type: 'wedding' // or birthday, etc.
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving project:", error);
    throw error;
  }
};

export const getUserProjects = async (userId) => {
  const q = query(collection(db, COLLECTION), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};