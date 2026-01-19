import { useEffect, useRef, useState } from "react";
import { Avatar } from "../../features/avatar/ui";
import styles from "./profile.module.scss";
import { UpdateProfileFields } from "../../features/updateProfile/ui/Fields/updateProfile";
import { ChangePassword } from "../../features/changePassword/ui/changePassword";
import { DeleteButton } from "../../features/deleteAccount/ui/button";
import { SaveButton } from "../../features/updateProfile/ui/Button/button";
import type { ProfileForm } from "../../features/updateProfile/ui/Fields/types";
import { useUser } from "../../entities/user/api";
import { Loading } from "@ui/dist";

type FieldErrorKey = "name" | "email" | "bio";
type FieldErrors = Record<FieldErrorKey, string>;

export const Profile = () => {
  const user = useUser();

  const [form, setForm] = useState<ProfileForm>({
    name: "",
    email: "",
    bio: "",
    avatar_preview: undefined,
    avatar_file: null,
  });

  const [errors, setErrors] = useState<FieldErrors>({
    name: "",
    email: "",
    bio: "",
  });

  const setFieldError = (field: FieldErrorKey, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearErrors = () => setErrors({ name: "", email: "", bio: "" });

  const lastObjectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (lastObjectUrlRef.current)
        URL.revokeObjectURL(lastObjectUrlRef.current);
    };
  }, []);

  const initializedRef = useRef(false);
  useEffect(() => {
    if (!user.data) return;

    if (!initializedRef.current) {
      initializedRef.current = true;
      setForm({
        name: user.data.name,
        email: user.data.email,
        bio: user.data.description ?? "",
        avatar_preview: user.data.avatar_url,
        avatar_file: null,
      });
    }
  }, [user.data]);

  const handleAvatarFile = (file: File) => {
    if (lastObjectUrlRef.current) URL.revokeObjectURL(lastObjectUrlRef.current);

    const previewUrl = URL.createObjectURL(file);
    lastObjectUrlRef.current = previewUrl;

    setForm((p) => ({
      ...p,
      avatar_preview: previewUrl,
      avatar_file: file,
    }));
  };

  if (user.isPending) {
    return (
      <div className={styles.wrapper}>
        <Loading />
      </div>
    );
  }

  if (user.error || !user.data) {
    return (
      <div className={styles.wrapper}>
        {user.error?.message ?? "No user data"}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <Avatar url={form.avatar_preview || ""} onPickFile={handleAvatarFile} />
        <div className={styles.containerHeaderInfo}>
          <span className={styles.containerHeaderInfoTitle}>
            {user.data.name}
          </span>
          {user.data.description}
        </div>
      </div>

      <div className={styles.containerBody}>
        <UpdateProfileFields
          form={{
            name: form.name,
            email: form.email,
            bio: form.bio,
          }}
          onChange={(field, value) => {
            setForm((p) => ({ ...p, [field]: value }));

            if (field === "name" || field === "email" || field === "bio") {
              setFieldError(field, "");
            }
          }}
          errors={errors}
        />

        <ChangePassword />

        <div className={styles.containerButtons}>
          <DeleteButton />

          <SaveButton
            name={form.name}
            email={form.email}
            bio={form.bio}
            avatar_file={form.avatar_file}
            initial={{
              name: user.data.name,
              email: user.data.email,
              bio: user.data.description ?? "",
              avatar_url: user.data.avatar_url,
            }}
            setErrors={setFieldError}
            clearErrors={clearErrors}
          />
        </div>
      </div>
    </div>
  );
};
