export interface SaveButtonProps {
  email: string;
  description: string;
  username: string;
  avatar_url: string;
  initial: {
    email: string,
    username: string,
    description: string,
    avatar_url: string
  }
  setErrors: (
    error: "email" | "description" | "username",
    value: string,
  ) => void;
}
