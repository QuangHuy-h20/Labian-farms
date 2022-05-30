import FarmerLayout from "@components/layouts/farmer";
import ProfileForm from "@components/profile/profile-form";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="flex w-full justify-center">
      <ProfileForm />
    </div>
  );
};

ProfilePage.Layout = FarmerLayout;
export default ProfilePage;
