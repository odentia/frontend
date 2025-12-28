import { Button, Input } from "@ui";
import styles from "./changePassword.module.scss";
import { useState } from "react";
import { Errors } from "../models";
import { useEffect } from "react";
import { useChangePassword } from "../api";

export const ChangePassword = () => {

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <span className={styles.containerTitle}>Пароль</span>
      <span className={styles.containerChange} onClick={() => setVisible(true)}>Изменить</span>
      {visible && <Popup setVisible={() => setVisible(false)}/>}
    </div>
  );
};


const Popup = ({setVisible}: {setVisible: () => void}) => {

  const [first, setFirst] = useState<string>("");
  const [second, setSecond] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");

  const [errors, setErrors] = useState<Errors>({
    first: undefined,
    second: undefined,
    new: undefined,
  })

  const validate = (pass1: string, pass2: string, newPass: string) => {
    if (pass1 !== pass2) {
      setErrors((prev) => ({...prev, first: "Пароли должны совпадать", second: "Пароли должны совпадать"}))
      return false
    }
    if (newPass.length < 6) {
      setErrors((prev) => ({...prev, new: "Пароль должен быть не меньше 6 символов"}))
      return false
    }
    return true
  }

  const changePassword = useChangePassword({onError: (error) => setErrors({first: error, second: undefined, new: error}), onSuccess: setVisible});

  const handleClick = (password: string, second: string, newPass: string) => {
    if (!validate(password, second, newPass)) return
    changePassword.mutate({current_password: password, new_password: newPass})
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVisible();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setVisible]);

  return (
    <div className={styles.popup} onClick={setVisible}>
      <div
        className={styles.popupBody}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={styles.popupBodyTitle}>Изменение пароля</span>
        <Input onValueChange={setFirst} height={40} color="var(--border)" shadowColor="var(--attention)" shadowBlur={5} shadowSpread={1} isPassword placeholder="Введите пароль" hasError={errors.first}/>
        <Input onValueChange={setSecond} height={40} color="var(--border)" shadowColor="var(--attention)" shadowBlur={5} shadowSpread={1} isPassword placeholder="Повторите пароль" hasError={errors.second}/>
        <Input onValueChange={setNewPass} height={40} color="var(--border)" shadowColor="var(--attention)" shadowBlur={5} shadowSpread={1} isPassword placeholder="Введите новый пароль" hasError={errors.new}/>
        <Button width="60%" height="4s0px" text="Изменить" onClick={() => handleClick(first, second, newPass)} />
      </div>
    </div>
  );
}