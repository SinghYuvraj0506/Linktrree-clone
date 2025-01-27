import {
  Link,
  LINK_ANIMATION_TYPE,
  LINK_LOCK_TYPE,
  THUMBNAIlSLAYOUT,
} from "@/lib/types";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { publicActions } from "@/lib/features/publicSlice";
import { useAppDispatch } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

type Props = {
  link: Link;
  handleLinkClick: (link: Link) => void;
  style: React.CSSProperties;
};

const getAnimationClass = (animationType: LINK_ANIMATION_TYPE) => {
  switch (animationType) {
    case LINK_ANIMATION_TYPE.BUZZ:
      return "animate-buzz";
    case LINK_ANIMATION_TYPE.WOBBLE:
      return "animate-wobble";
    case LINK_ANIMATION_TYPE.POP:
      return "animate-pop";
    case LINK_ANIMATION_TYPE.SWIPE:
      return "animate-swipe";
    default:
      return "";
  }
};

const UnlockForm = ({
  linkId,
  lockType,
}: {
  linkId: string;
  lockType: LINK_LOCK_TYPE;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { checkUnlock } = publicActions;
  const {toast} = useToast()

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const data = await dispatch(
      checkUnlock({
        id: linkId,
        value: inputValue,
      })
    );
    if(!data.payload){
      toast({
        title:"Error",
        description:"Unlocking failed, Try Again!!!",
        variant: "destructive",
      })
    }
    setIsSubmitting(false);
  };

  const renderInputField = () => {
    switch (lockType) {
      case LINK_LOCK_TYPE.SUBSCRIBE:
        return (
          <div className="space-y-4">
            <p className="text-xs text-gray-600">
              Enter your details to be notified about new content on this
              Linktree.
            </p>
            <Input
              type="email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your subscription email"
            />
          </div>
        );
      case LINK_LOCK_TYPE.CODE:
        return (
          <div className="space-y-4">
            <p className="text-xs text-gray-600">
              Enter the unlock code provided to you to gain access to the
              content.
            </p>
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter the unlock code"
            />
          </div>
        );
      case LINK_LOCK_TYPE.DOB:
        return (
          <div className="space-y-4">
            <p className="text-xs text-gray-600">
              Please provide your date of birth to verify your age and unlock
              the link.
            </p>
            <Input
              type="date"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        );
      case LINK_LOCK_TYPE.SENSITIVE:
        return (
          <div className="space-y-4">
            <p className="text-xs text-gray-600">
              The link contains sensitive data, Are you sure you want to unlock?
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 shadow-sm p-4 box-border">
      {renderInputField()}
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="text-xs"
      >
        {isSubmitting ? "Checking..." : "Unlock"}
      </Button>
    </div>
  );
};

const CompactLink = ({ link, handleLinkClick, style }: Props) => {
  const [isUnlocking, setIsUnlocking] = useState<boolean>(false);

  const animationClass = link?.prioritize
    ? getAnimationClass(link?.animation_type)
    : "";

  const handleLockClick = () => {
    setIsUnlocking(true);
  };

  const handleClick = () => {
    if (link?.isLocked) {
      handleLockClick();
    } else {
      handleLinkClick(link);
    }
  };

  return (
    <>
      <div
        className={`py-3 px-6 text-center cursor-pointer relative text-sm ${animationClass}`}
        onClick={handleClick}
        style={style}
      >
        <div className="absolute left-2 top-[50%] translate-y-[-50%]">
          <Avatar className="cursor-pointer w-9 h-auto rounded-full object-cover">
            <AvatarImage src={link?.thumbnail} />
          </Avatar>
        </div>
        {link.title}

        {link?.isLocked && (
          <div
            className="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer"
            onClick={handleLockClick}
          >
            <Lock
              className="w-4 h-4"
              style={{ color: style?.color ?? "#fff" }}
            />
          </div>
        )}
      </div>

      {link?.isLocked && isUnlocking && (
        <UnlockForm linkId={link.id} lockType={link?.lock_type} />
      )}
    </>
  );
};

const LargeLink = ({ link, handleLinkClick, style }: Props) => {
  const [isUnlocking, setIsUnlocking] = useState<boolean>(false);

  const animationClass = link?.prioritize
    ? getAnimationClass(link?.animation_type)
    : "";

  const handleLockClick = () => {
    setIsUnlocking(true);
  };

  const handleClick = () => {
    if (link?.isLocked) {
      handleLockClick();
    } else {
      handleLinkClick(link);
    }
  };

  return (
    <>
      <div
        className={`cursor-pointer relative aspect-video overflow-hidden ${animationClass}`}
        onClick={handleClick}
        style={style}
      >
        <img
          src={link?.thumbnail}
          alt=""
          className="absolute w-full h-full object-cover"
        />

        <div className="flex items-center justify-between px-2 w-full absolute bottom-2 text-sm">
          <span>{link.title}</span>
          {link?.isLocked && (
            <div
              className="cursor-pointer"
              onClick={handleLockClick}
            >
              <Lock
                className="w-4 h-4"
                style={{ color: style?.color ?? "#fff" }}
              />
            </div>
          )}
        </div>
      </div>

      {link?.isLocked && isUnlocking && (
        <UnlockForm linkId={link.id} lockType={link?.lock_type} />
      )}
    </>
  );
};

const LinkItem = (props: Props) => {
  if (props?.link?.thumbnail_layout === THUMBNAIlSLAYOUT.LARGE) {
    return <LargeLink {...props} />;
  }

  return <CompactLink {...props} />;
};

export default LinkItem;
