// <---------------------Helper functions-------------------->

import {
  collection,
  DocumentSnapshot,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";

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
    createdAt: data?.createdAt.toMillis(),
    updatedAt: data?.updatedAt.toMillis(),
  };
}
