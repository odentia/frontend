import { useState } from "react";
import { Button, Input } from "@ui";
import styles from "./button.module.scss";
import { useDeleteUser } from "../api";

export const DeleteButton = () => {
  const deleteUser = useDeleteUser();

  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");

  const isPending = Boolean(
    (deleteUser as any).isPending ?? (deleteUser as any).isLoading,
  );
  const isError = Boolean((deleteUser as any).isError);
  const errorMsg =
    ((deleteUser as any).error?.message as string | undefined) ??
    "Неверный пароль или ошибка запроса";

  const canSubmit = password.trim().length > 0 && !isPending;

  const handleClose = () => {
    if (isPending) return;
    setOpen(false);
    setPassword("");
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    (deleteUser as any).mutate(
      { password: password.trim() },
      { onSuccess: handleClose },
    );
  };

  return (
    <div className={styles.container}>
      <Button
        text="Удалить уч.запись"
        width="150px"
        height="100%"
        borderRadius="5px"
        fontSize="14px"
        backgroundColor="var(--danger)"
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className={styles.containerPopup} onMouseDown={handleClose}>
          <div
            className={styles.containerPopupCard}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className={styles.containerPopupHeader}>
              <div className={styles.containerPopupHeaderTitle}>
                Подтвердите удаление
              </div>
              <div className={styles.containerPopupHeaderDesc}>
                Введите пароль, чтобы удалить аккаунт. Действие необратимо.
              </div>
            </div>

            <Input
              value={password}
              onValueChange={(v) => setPassword(v)}
              isPassword
              placeholder="Пароль"
              width="100%"
              height="38px"
              color="var(--attention)"
            />

            {isError && (
              <div className={styles.containerPopupError}>{errorMsg}</div>
            )}

            <div className={styles.containerPopupActions}>
              <Button
                text="Отмена"
                width="110px"
                height="34px"
                borderRadius="8px"
                backgroundColor="var(--attention)"
                onClick={handleClose}
              />
              <Button
                text="Удалить"
                width="110px"
                height="34px"
                borderRadius="8px"
                backgroundColor="var(--danger)"
                onClick={handleSubmit}
                loading={isPending}
                disabled={!canSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
