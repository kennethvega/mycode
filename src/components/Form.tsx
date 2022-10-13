import styles from "./Form.module.scss";

const Form = ({ children }: FormProps) => {
  return <form className={styles.form}>{children}</form>;
};

interface FormProps {
  children: React.ReactNode;
  // onClick?: () => void;
  // onSubmit?: () => void;
}

export default Form;
