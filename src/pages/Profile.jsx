//  all the component used in this page, will be created in component/profile directory

import React from "react";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      Profile
      <div>email: {user?.email}</div>
    </div>
  );
};
