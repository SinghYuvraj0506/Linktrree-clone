
import { Link } from "@/lib/types";

type Props = {
  link: Link;
  handleLinkClick:(link:Link) => void
};

const LinkItem = ({ link , handleLinkClick }: Props) => {
  return (
    <div
      className="bg-blue-400 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-500 text-center"
      onClick={()=>handleLinkClick(link)}
    >
      {link.title}
    </div>
  );
};

export default LinkItem;
