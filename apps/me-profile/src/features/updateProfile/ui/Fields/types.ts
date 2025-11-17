export type ProfileForm = {
  name: string;
  email: string;
  bio: string;
};

type FieldKey = keyof ProfileForm;

type FieldConfig = {
  name: FieldKey;
  label: string;
  type?: string;
  placeholder?: string;
};

export const fields: FieldConfig[] = [
  {
    name: "name",
    label: "Имя",
    placeholder: "введите имя",
  },
  {
    name: "email",
    label: "Почта",
    type: "email",
    placeholder: "example@mail.com",
  },
  {
    name: "bio",
    label: "Описание",
    placeholder: "расскажите о себе",
  },
];

export type UpdateProfileFieldsProps = {
  form: ProfileForm;
  onChange: (field: FieldKey, value: string) => void;
  errors: Partial<Record<FieldKey, string>>;
};
