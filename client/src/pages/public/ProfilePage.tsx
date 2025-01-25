import Loader from "@/components/global/Loader";
import { publicActions } from "@/lib/features/publicSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { FacebookIcon, X, YoutubeIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "../NotFound";
import LinkItem from "./_components/Linkitem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@/lib/types";
import { backgroundStyleGenerator, buttonStyleGenerator } from "@/lib/utils";
import clsx from "clsx";

// const SocialLinks = ({ links }) => (
//   <div className="flex space-x-4 mt-2">
//     {links.map((link, index) => (
//       <a
//         key={index}
//         href={link.url}
//         className="text-blue-500 hover:text-blue-700"
//       >
//         {link.icon}
//       </a>
//     ))}
//   </div>
// );

const LinktreeProfile = () => {
  const { slug } = useParams();
  const { loading, error, data } = useAppSelector((state) => state.public);
  const { data: appearanceData } = useAppSelector((state) => state.appearance);
  const socialLinks = [
    { url: "https://facebook.com", icon: FacebookIcon },
    { url: "https://youtube.com", icon: YoutubeIcon },
    { url: "https://twitter.com", icon: X },
  ];

  const { getProfileData, redirectToURL } = publicActions;
  const dispatch = useAppDispatch();

  const handleLinkClick = (link: Link) => {
    dispatch(redirectToURL(link));
  };

  useEffect(() => {
    if (slug) {
      dispatch(getProfileData(slug));
    }
  }, [slug]);

  if (error) {
    return <NotFoundPage />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className={clsx("flex flex-col items-center min-h-screen p-4")}
      style={backgroundStyleGenerator({
        type: appearanceData?.background,
        color: appearanceData?.backgroundColor,
        image: appearanceData?.image,
      })}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <Avatar className="cursor-pointer w-24 h-24">
          <AvatarImage src={data?.image ?? "https://github.com/shadcn.png"} />
          <AvatarFallback>
            {data?.name.toUpperCase().slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-bold text-center">@{slug}</h1>
        <p className="text-gray-600 text-center mt-2">
          Welcome to my profile! Check out the links below to explore my
          content.
        </p>
        {/* <SocialLinks links={socialLinks} /> */}
      </div>

      {/* Links Section */}
      <div className="mt-6 w-full max-w-md h-[60vh] overflow-y-auto px-2">
        <div className="flex flex-col space-y-4">
          {data?.links?.map((link, index) => (
            <LinkItem
              key={index}
              link={link}
              handleLinkClick={handleLinkClick}
              style={buttonStyleGenerator({
                type: appearanceData?.buttonType,
                rounded_type: appearanceData?.buttonRoundedType,
                colorButton: appearanceData?.buttonColor,
                colorFont: appearanceData?.buttonfontColor,
              })}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-gray-500 text-sm text-center">
        Powered by{" "}
        <a href="https://linktr.ee" className="text-blue-500 hover:underline">
          Linktree
        </a>
      </footer>
    </div>
  );
};

export default LinktreeProfile;
