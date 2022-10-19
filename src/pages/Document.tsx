import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/utility/Container";
import { db } from "../lib/firebase";
import { postToJSON } from "../services/firebase";
import DOMPurify from "dompurify"

export const Document = () => {
  const [post, setPost] = useState<DocumentData>();

  const { id, slug } = useParams();
  // fetch postdetail
  useEffect(() => {
    const docRef = doc(db, "users", `${id}`, "posts", `${slug}`);
    onSnapshot(docRef, (snapshot) => {
      const data = postToJSON(snapshot);
      setPost(data);
    });
  }, []);

  return (
    <Container>
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post?.content) }}
      ></div>
    </Container>
  );
};
