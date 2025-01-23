import MobilePreview from "@/components/global/MobilePreview";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/store";
import { Copy } from "lucide-react";
import { useEffect } from "react";
import LinksMain from "./_components/LinksMain";
import { linkActions } from "@/lib/features/linksSlice";

const Dashboard = () => {
  const copyToClipboard = async () => {
    const linktreeURL = "https://your-linktree.com/username";
    try {
      await navigator.clipboard.writeText(linktreeURL);
      alert("Profile link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy profile link:", err);
    }
  };
  const dispatch = useAppDispatch()
  const {getAllUserLinks} = linkActions

  useEffect(() => {
    dispatch(getAllUserLinks(null))
  }, [])


  return (
    <div className="flex items-start">
      {/* Left Section */}
      <div className="flex-1 flex flex-col gap-6 p-6">
        {/* Copy Linktree URL Section */}
        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-md">
          <p className="text-sm font-medium text-muted-foreground">
            Your Linktree is live:{" "}
            <a
              href="https://your-linktree.com/username"
              className="text-primary underline"
            >
              your-linktree.com/username
            </a>
          </p>
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            <Copy className="mr-2 h-4 w-4" />
            Copy your Linktree URL
          </Button>
        </div>

        <LinksMain />
      </div>

      <div className="w-1/3 p-10 box-border">
        <MobilePreview />
      </div>
    </div>
  );
};

export default Dashboard;
