import { ButtonProps } from "../../ts/interfaces/Buttons";

// custome button
const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="btn btn-main"
    >
      {children}
    </button>
  );
};

export default Button;
