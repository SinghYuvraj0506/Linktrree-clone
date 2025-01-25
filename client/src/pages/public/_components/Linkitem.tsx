
import { Link } from "@/lib/types";
import React from "react";

type Props = {
  link: Link;
  handleLinkClick:(link:Link) => void
  style : React.CSSProperties
};

const LinkItem = ({ link , handleLinkClick, style }: Props) => {
  return (
    <div
      className="py-3 px-6 text-center cursor-pointer"
      onClick={()=>handleLinkClick(link)}
      style={style}
    >
      {link.title}
    </div>
  );
};

export default LinkItem;
