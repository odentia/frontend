import { useState } from "react";
import { Avatar } from "../../features/avatar/ui";
import styles from "./profile.module.scss";
import { UpdateProfileFields } from "../../features/updateProfile/ui/Fields/updateProfile";
import { ChangePassword } from "../../features/changePassword/ui/changePassword";
import { DeleteButton } from "../../features/deleteAccount/ui/button";
import { SaveButton } from "../../features/updateProfile/ui/Button/button";
import { ProfileForm } from "../../features/updateProfile/ui/Fields/types";
import { useUser } from "../../entities/user/api";
import { Loading } from "@ui";

type ErrorKey = "username" | "email" | "description";

export const Profile = () => {
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    email: "",
    bio: "",
  });

  const [errors, setErrors] = useState<Record<ErrorKey, string>>({
    username: "",
    email: "",
    description: "",
  });

  const fieldToErrorKey: Record<keyof ProfileForm, ErrorKey> = {
    name: "username",
    email: "email",
    bio: "description",
  };

  const user = useUser();

  const handleFieldChange = (field: keyof ProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    const errorKey = fieldToErrorKey[field];
    setErrors((prev) => ({ ...prev, [errorKey]: "" }));
  };

  const handleSetError = (field: ErrorKey, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: value }));
  };

  if (!user.data)
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );

  if (user.data)
    return (
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <Avatar url={user.data.image_url} />
          <div className={styles.containerHeaderInfo}>
            <span className={styles.containerHeaderInfoTitle}>
              {user.data.username}
            </span>
            {user.data.description}
          </div>
        </div>

        <div className={styles.containerBody}>
          <UpdateProfileFields
            form={form}
            onChange={handleFieldChange}
            errors={{
              name: errors.username,
              email: errors.email,
              bio: errors.description,
            }}
          />
          <ChangePassword />

          <div className={styles.containerButtons}>
            <DeleteButton />
            <SaveButton
              username={form.name}
              email={form.email}
              description={form.bio}
              setErrors={handleSetError}
            />
          </div>
        </div>
      </div>
    );
};
