import { useEffect, useState } from "react";

export const capitalizeUsername = (username: string) => {
  const [name, setName] = useState("");
  useEffect(() => {
    const name = username.split(" ");
    const displayName = name
      .map((dn: string) => {
        return dn[0].toUpperCase() + dn.substring(1);
      })
      .join(" ");
    setName(displayName);
  }, [username]);
  return name;
};
