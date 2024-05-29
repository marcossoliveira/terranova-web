/*import {
  collection,
  query,
  getDocs,
  getDoc,
  doc,
  QueryConstraint,
} from '@firebase/firestore';*/
import { db } from '../config/firebase/firestore/firestore-config.ts';

export const getData = async (collectionPath: string) => {
  const queryResult = await db.collection(collectionPath).get();
  return queryResult.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getDataById = async (collectionPath: string, id: string) => {
  const result = await db.collection(collectionPath).doc(id).get();
  return { ...result.data(), id: id };
};
