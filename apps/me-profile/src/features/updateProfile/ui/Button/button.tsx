import { Button } from "@ui/dist";
import { SaveButtonProps } from "./types";
import { useUpdateUser } from "../../api";

export const SaveButton = ({
  username,
  email,
  description,
  setErrors,
}: SaveButtonProps) => {
  const updateUser = useUpdateUser();

  const validate = () => {
    if (!username || username.trim().length === 0) {
      setErrors("username", "имя не может быть пустым");
      return false;
    }

    if (username.trim().length < 4) {
      setErrors("username", "имя должно быть не короче 4 символов");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrors("email", "неверный формат email");
      return false;
    }

    if (description.length > 255) {
      setErrors("description", "описание не может быть длиннее 255 символов");
      return false;
    }

    setErrors("username", "");
    setErrors("email", "");
    setErrors("description", "");
    return true;
  };

  const handleClick = () => {
    if (!validate()) return;

    updateUser.mutate({
      username,
      email,
      description,
    });
  };

  return (
    <Button
      text="Сохранить"
      borderRadius="5px"
      color="var(--attention)"
      width="120px"
      height="100%"
      fontSize="14px"
      onClick={handleClick}
    />
  );
};
