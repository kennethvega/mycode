import { ButtonProps } from "../../ts/interfaces/Buttons";

const OutlineBtn = ({ children, onClick }: ButtonProps) => {
  return (
    <button type="button" onClick={onClick} className="btn btn-outlined">
      {children}
    </button>
  );
};

export default OutlineBtn;
