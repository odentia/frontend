import { useMemo, useState } from "react";
import { Button } from "@ui/dist";
import { useUpdateUser } from "../../api";
import styles from "./button.module.scss";

type FieldErrorKey = "name" | "email" | "bio";

export type SaveButtonProps = {
  name: string;
  email: string;
  bio: string;
  avatar_file: File | null;
  initial: {
    name: string;
    email: string;
    bio: string;
    avatar_url?: string;
  };
  setErrors: (field: FieldErrorKey, message: string) => void;
  clearErrors?: () => void;
};

export const SaveButton = ({
  name,
  email,
  bio,
  avatar_file,
  initial,
  setErrors,
  clearErrors,
}: SaveButtonProps) => {
  const updateUser = useUpdateUser();
  const [topError, setTopError] = useState("");

  const trimmed = useMemo(
    () => ({
      name: name.trim(),
      email: email.trim(),
      bio: bio ?? "",
    }),
    [name, email, bio],
  );

  const isDirty = useMemo(() => {
    if (avatar_file) return true;

    return (
      trimmed.name !== initial.name.trim() ||
      trimmed.email !== initial.email.trim() ||
      trimmed.bio !== (initial.bio ?? "")
    );
  }, [trimmed, initial, avatar_file]);

  const validate = () => {
    setTopError("");
    clearErrors?.();

    if (!trimmed.name) {
      setErrors("name", "Имя не может быть пустым");
      setTopError("Имя не может быть пустым");
      return false;
    }

    if (trimmed.name.length < 4) {
      setErrors("name", "Имя должно быть не короче 4 символов");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed.email)) {
      setErrors("email", "Неверный формат email");
      return false;
    }

    if (trimmed.bio.length > 255) {
      setErrors("bio", "Описание не может быть длиннее 255 символов");
      return false;
    }

    return true;
  };

  const isPending = Boolean(
    updateUser.isPending ?? (updateUser as any).isLoading,
  );
  const canSubmit = isDirty && !isPending;

  const handleClick = () => {
    if (!isDirty) {
      setTopError("Изменений нет — сохранять нечего");
      return;
    }

    if (!validate()) return;

    const fd = new FormData();
    fd.append("name", trimmed.name);
    fd.append("email", trimmed.email);
    fd.append("description", trimmed.bio);

    if (avatar_file) {
      fd.append("avatar", avatar_file);
    }

    updateUser.mutate(fd as any, {
      onSuccess: () => {
        setTopError("");
        clearErrors?.();
      },
      onError: (err: any) => {
        const data = err?.response?.data;

        const msg =
          err?.message ||
          data?.detail ||
          data?.message ||
          "Непредвиденная ошибка";

        setTopError(String(msg));

        if (data?.name) setErrors("name", String(data.name));
        if (data?.username) setErrors("name", String(data.username));

        if (data?.email) setErrors("email", String(data.email));

        if (data?.bio) setErrors("bio", String(data.bio));
        if (data?.description) setErrors("bio", String(data.description));

        if (data?.avatar) setTopError(String(data.avatar));
        if (data?.file) setTopError(String(data.file));
        if (data?.image) setTopError(String(data.image));
      },
    });
  };

  return (
    <div className={styles.container}>
      {topError && <div className={styles.containerError}>{topError}</div>}
      <Button
        text={"Сохранить"}
        borderRadius="5px"
        color="var(--attention)"
        width="120px"
        loading={isPending}
        height="30px"
        fontSize="14px"
        disabled={!canSubmit}
        onClick={handleClick}
      />
    </div>
  );
};
