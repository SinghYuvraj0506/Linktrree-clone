import MobilePreview from "@/components/global/MobilePreview";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { Copy } from "lucide-react";
import { useEffect } from "react";
import LinksMain from "./_components/LinksMain";
import { linkActions } from "@/lib/features/linksSlice";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const {user} = useAppSelector(state=>state.auth)
  const {toast} = useToast()

  const copyToClipboard = async () => {
    try {
      const profileLink = `https://${window.location.hostname}/${user?.slug}`;
      await navigator.clipboard.writeText(profileLink);
      toast({
        title: "Info",
        description: "Link Copied Successfully",
        variant: "default",
      });
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
              href={`https://${window.location.hostname}/${user?.slug}`}
              className="text-primary underline"
            >
              {`${window.location.hostname}/${user?.slug}`}
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
