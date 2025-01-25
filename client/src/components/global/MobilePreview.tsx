import mobileScreen from "@/assets/images/screen.png";
import { useAppSelector } from "@/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LinkItem from "@/pages/public/_components/Linkitem";
import clsx from "clsx";
import { backgroundStyleGenerator, buttonStyleGenerator } from "@/lib/utils";

const MobileContent = () => {
  const { data } = useAppSelector((state) => state.appearance);
  const { links } = useAppSelector((state) => state.links);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div
      className={clsx("flex flex-col items-center min-h-screen p-4")}
      style={backgroundStyleGenerator({
        type: data?.background,
        color: data?.backgroundColor,
        image: data?.image
      })}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <Avatar className="cursor-pointer w-24 h-24">
          <AvatarImage src={user?.image ?? "https://github.com/shadcn.png"} />
          <AvatarFallback>
            {user?.name.toUpperCase().slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-bold text-center">@{user?.slug}</h1>
        <p className="text-gray-600 text-center mt-2">
          Welcome to my profile! Check out the links below to explore my
          content.
        </p>
      </div>

      {/* Links Section */}
      <div className="mt-6 w-full max-w-md h-[60vh] overflow-y-auto px-2">
        <div className="flex flex-col space-y-4">
          {links?.filter((e)=>e.active)?.map((link, index) => (
            <LinkItem key={index} link={link} handleLinkClick={() => {}} 
            style={
              buttonStyleGenerator({
                type: data?.buttonType,
                rounded_type: data?.buttonRoundedType,
                colorButton: data?.buttonColor,
                colorFont: data?.buttonfontColor
              })
            }/>
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

const MobilePreview = () => {
  return (
    <div className="flex items-center justify-center relative rounded-[55px] overflow-hidden">
      <img src={mobileScreen} alt="" className="w-full" />

      <div className="flex-1 w-full px-2 box-border h-[90%] absolute left-0 bottom-2 overflow-hidden">
        <div className="w-full h-full bg-white rounded-b-[55px] overflow-y-auto">
          <MobileContent />
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
