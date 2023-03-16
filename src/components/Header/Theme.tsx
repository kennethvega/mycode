import { HiMoon } from "react-icons/hi";
import { BsFillSunFill } from "react-icons/bs";
import styles from "./Theme.module.scss";
import { useTheme } from "next-themes";
import Tippy from "@tippyjs/react";

const Theme = () => {
  const { theme, setTheme } = useTheme();
  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <Tippy
      content={theme === "dark" ? "Toggle light theme" : "Toggle dark theme"}
    >
      <div onClick={handleTheme} className={styles.themeToggle}>
        {theme === "dark" ? (
          <BsFillSunFill className={styles.icon} />
        ) : (
          <HiMoon className={styles.icon} />
        )}
      </div>
    </Tippy>
  );
};

export default Theme;
