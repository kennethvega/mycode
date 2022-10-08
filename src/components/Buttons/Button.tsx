import { ButtonProps } from "../../ts/interfaces/Buttons";

// custome button
const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button type="button" onClick={onClick} className="btn btn-main">
      {children}
    </button>
  );
};

export default Button;
