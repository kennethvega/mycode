import { ButtonProps } from "../../ts/interfaces/Buttons";

// custome button
const Button = ({ children, onClick, disabled,type }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="btn btn-main"
    >
      {children}
    </button>
  );
};

export default Button;
