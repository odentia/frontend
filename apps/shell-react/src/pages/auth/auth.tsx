import React, { Suspense } from "react";

const SignIn = React.lazy(() => import("auth/App"));

export default function Auth() {
  return (
    <Suspense fallback={<div>Loading auth…</div>}>
      <SignIn />
    </Suspense>
  );
}
