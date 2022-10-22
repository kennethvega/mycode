// <---------------------Helper functions-------------------->

import {
  collection,
  DocumentSnapshot,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, storage } from "../lib/firebase";
import { ref, uploadBytes } from "firebase/storage";
// check if username already exist
export async function checkUserWithUsername(username: string | undefined) {
  const q = query(
    collection(db, "users"),
    where("username", "==", username?.toLowerCase())
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0;
}

// convert post to json
export function postToJSON(doc: DocumentSnapshot) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt?.toMillis(),
  };
}

storage;
export async function upload(file: any, userDetail: any) {
  const fileRef = ref(storage, userDetail.userId);
  const snapshot = await uploadBytes(fileRef, file);
}
