export interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}
