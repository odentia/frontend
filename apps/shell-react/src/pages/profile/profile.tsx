import React, { Suspense } from "react";

const ProfileComponent = React.lazy(() => import("profile/App"));

export default function Profile() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <ProfileComponent />
    </Suspense>
  );
}
