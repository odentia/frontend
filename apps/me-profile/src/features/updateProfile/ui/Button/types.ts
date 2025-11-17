export interface SaveButtonProps {
  email: string;
  description: string;
  username: string;
  setErrors: (
    error: "email" | "description" | "username",
    value: string,
  ) => void;
}
