import { useEffect, useState } from "react";

export const useNameFormat = (username: string | undefined) => {
  const [name, setName] = useState("");
  useEffect(() => {
    const name = username?.split(" ");
    if (name) {
      const displayName = name
        .map((dn: string) => {
          return dn[0]?.toUpperCase() + dn.substring(1);
        })
        .join(" ");
      setName(displayName);
    }
  }, [username]);
  return name.trim();
};
