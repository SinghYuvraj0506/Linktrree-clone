import React, { ReactNode } from "react";

const AuthLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="w-screen h-screen grid grid-cols-2">
      {children}
      <div className="w-full h-full flex items-center justify-center">
        <img
          src="https://cloud.headwayapp.co/changelogs_images/images/big/000/077/348-1fdb3245f252290358d8f28be03c56f3c4b25e32.gif"
          alt=""
          className="flex-1 object-cover h-full"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
