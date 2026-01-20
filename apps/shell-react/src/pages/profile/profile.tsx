import { Loading } from "@ui/dist";
import React, { Suspense } from "react";

const ProfileComponent = React.lazy(() => import("profile/App"));

export default function Profile() {
  return (
    <Suspense fallback={<div style={{width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}><Loading/></div>}>
      <ProfileComponent />
    </Suspense>
  );
}
