import { useAuth } from "@config-runtime/dist";
import { Loading } from "@ui";
import React, { Suspense } from "react";
import { useNavigate } from "react-router";

const SignIn = React.lazy(() => import("auth/App"));

export default function Auth() {

  const navigate = useNavigate();

  const me = useAuth().useSessionQuery();

  if (me.data) navigate("/")

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <Loading />
        </div>
      }
    >
      <SignIn />
    </Suspense>
  );
}
