import { SignUp as SignUpWidget } from "../../widgets/signup";

export const SignUp = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}
    >
      <SignUpWidget />
    </div>
  );
};
