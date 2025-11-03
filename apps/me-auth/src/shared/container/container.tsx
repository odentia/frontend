import React from "react";
import styles from "./container.module.scss";
import { Button, Input } from "@ui/dist";

interface InputProps {
  value: string;
  error: string | undefined;
  placeholder: string;
  setValue: (str: string) => void;
  isPassword?: boolean;
}

interface containerProps {
  title: string;
  subtitle: string;
  inputs: InputProps[];
  buttonText: string;
  buttonClick: () => void;
  footerText: string;
  footerLink: string;
  loading: boolean;
  linkClick: () => void;
}

const ContainerComponent = ({
  title,
  subtitle,
  inputs,
  buttonText,
  buttonClick,
  footerText,
  footerLink,
  loading,
  linkClick,
}: containerProps) => (
  <div className={styles.container}>
    <div className={styles.containerTitles}>
      {title}
      <span className={styles.containerTitlesSub}>{subtitle}</span>
    </div>
    <div className={styles.containerInputs}>
      {inputs.map((el, key) => (
        <Input
          key={key}
          value={el.value}
          onValueChange={el.setValue}
          hasError={el.error}
          fontSize="18px"
          borderRadius="5px"
          color={el.error ? "red" : "#6C63FF"}
          width="320px"
          height="50px"
          isPassword={el.isPassword}
          placeholder={el.placeholder}
        />
      ))}
    </div>
    <div className={styles.containerFooter}>
      <Button
        onClick={buttonClick}
        disabled={false}
        gradient="linear-gradient(90deg, #6C63FF 0%, #4F4ABF 100%)"
        text={buttonText}
        borderRadius="10px"
        fontWeight="600"
        fontSize="20px"
        height="50px"
        width="320px"
        loading={loading}
      />
      <span className={styles.containerFooterText}>
        {footerText}
        <span
          className={styles.containerFooterTextLink}
          onClick={() => linkClick()}
        >
          {footerLink}
        </span>
      </span>
    </div>
  </div>
);

export const Container = React.memo(ContainerComponent);
