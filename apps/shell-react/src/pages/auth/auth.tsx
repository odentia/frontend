import { Loading } from "@ui";
import React, { Suspense } from "react";

const SignIn = React.lazy(() => import("auth/App"));

export default function Auth() {
  return (
    <Suspense fallback={<div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%"}}><Loading/></div>}>
      <SignIn />
    </Suspense>
  );
}
