import { useQueryParams } from "../../../shared/lib/searchParams";
import styles from "./checkbox.module.scss";
// @ts-expect-error: image to comp convert
import Plus from "../../../shared/assets/plus.svg?react";
// @ts-expect-error: image to comp convert
import Minus from "../../../shared/assets/minus.svg?react";

interface FilterCheckboxProps {
  label: string;
  param: string;
  value: string;
}

export const FilterCheckbox = ({
  label,
  param,
  value,
}: FilterCheckboxProps) => {
  const { getAll, toggleParamValue } = useQueryParams();

  const selectedValues = getAll(param);
  const isChecked = selectedValues.includes(value);

  const handleClick = () => {
    toggleParamValue(param, value);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div
        className={`${styles.containerCheckbox} ${isChecked ? styles.active : ""}`}
      >
        {isChecked && <Plus className={styles.containerCheckboxIcon} />}
      </div>
      <span className={styles.containerLabel}>{label}</span>
    </div>
  );
};
