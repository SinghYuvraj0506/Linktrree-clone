import { Progress } from "@/components/ui/progress";
import UpdateSlug from "@/pages/onboarding/UpdateSlug";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SelectTemplates from "@/pages/onboarding/SelectTemplates";
import UpdateProfile from "@/pages/onboarding/UpdateProfile";
import { useNavigate } from "react-router-dom";

const OnboardingLayout = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handleNext = () => {
    if (currentPage === totalPages-1) {
      navigate("/dashboard", {replace:true});
    }
    else{
        setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col gap-2 w-screen h-screen bg-gray-100 pt-10 box-border overflow-hidden">
      <div className="mx-auto px-4 py-4 flex items-center justify-center w-full">
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Back
        </Button>
        <div className="flex-1 flex justify-center">
          <Progress
            value={(currentPage * 100) / totalPages}
            className="w-[60%]"
          />
        </div>
        <Button variant="ghost" onClick={handleNext}>
          Skip
        </Button>
      </div>

      {currentPage === 1 ? (
        <UpdateSlug handleNext={handleNext} />
      ) : currentPage === 2 ? (
        <SelectTemplates handleNext={handleNext} />
      ) : currentPage === 3 ? (
        <UpdateProfile handleNext={handleNext} />
      ) : null}
    </div>
  );
};

export default OnboardingLayout;
