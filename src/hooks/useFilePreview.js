import { useEffect, useState } from "react";
import { storageService } from "../api/appwrite";

// Shared by PostCard / PostForm / PostPage — all three previously duplicated
// this fetch-and-store-a-preview-URL logic.
export function useFilePreview(fileId) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(fileId ? "loading" : "empty");

  useEffect(() => {
    let active = true;
    if (!fileId) {
      setStatus("empty");
      return;
    }
    setStatus("loading");
    storageService
      .getFileView(fileId)
      .then((result) => {
        if (!active) return;
        if (result) {
          setUrl(result.href);
          setStatus("ready");
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => {
      active = false;
    };
  }, [fileId]);

  return { url, status };
}
