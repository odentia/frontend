import { Input } from "@ui";
import { UpdateProfileFieldsProps } from "./types";
import { fields } from "./types";
import styles from "./updateProfile.module.scss";

export const UpdateProfileFields = ({
  form,
  onChange,
  errors,
}: UpdateProfileFieldsProps) => {
  return (
    <div className={styles.container}>
      {fields.map((field) => {
        const error = errors?.[field.name];
        const hasError = Boolean(error);

        return (
          <div key={field.name} className={styles.containerField}>
            <label className={styles.containerFieldLabel}>{field.label}</label>
            <Input
              value={form[field.name]}
              placeholder={field.placeholder}
              onValueChange={(e) => onChange(field.name, e)}
              borderRadius="10px"
              width="100%"
              color={hasError ? "var(--danger)" : "var(--border)"}
              height={30}
              shadowBlur={20}
              shadowSpread={0.5}
              shadowColor={hasError ? "var(--danger)" : "var(--box-shadow)"}
            />
            {hasError && <span className={styles.error}>{error}</span>}
          </div>
        );
      })}
    </div>
  );
};
