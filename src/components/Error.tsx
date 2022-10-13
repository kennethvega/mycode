import styles from "./Error.module.scss";

type ErrorProps = {
  error: string;
};
const Error = ({ error }: ErrorProps) => {
  return <p className={styles.error}>{error}</p>;
};

export default Error;
