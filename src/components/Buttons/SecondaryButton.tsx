import { ButtonProps } from "../../ts/interfaces/Buttons";

const SecondaryButton = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="btn btn-outlined"
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
