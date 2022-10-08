import { HiMoon } from "react-icons/hi";
import { BsFillSunFill } from "react-icons/bs";
import styles from "./Theme.module.scss";
import { useTheme } from "next-themes";


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
    <div onClick={handleTheme} className={styles.themeToggle}>
      {theme === "dark" ? (
        <HiMoon className={styles.icon} />
      ) : (
        <BsFillSunFill className={styles.icon} />
      )}
    </div>
  );
};

export default Theme;
