import styles from "./Form.module.scss";

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {children}
    </form>
  );
};

interface FormProps {
  children: React.ReactNode;
  // onClick?: () => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default Form;
