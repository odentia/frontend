interface InputProps {
  onValueChange: () => void;
}

export const Input = ({ onValueChange }: InputProps) => {
  onValueChange();
};
