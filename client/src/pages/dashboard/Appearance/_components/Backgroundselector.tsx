import ColorPicker from "./ColorPicker";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { appearanceActions } from "@/lib/features/appearanceSlice";
import { BACKGROUNDOPTIONS } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const BackgroundSelector = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.appearance);
  const { updateBackground } = appearanceActions;

  const handleChange = ({
    bg,
    color,
    color2,
    image,
  }: {
    bg?: BACKGROUNDOPTIONS;
    color?: string;
    color2?: string;
    image?: string;
  }) => {
    let colors: any = color;

    if (data?.background === BACKGROUNDOPTIONS.GRADIENT) {
      colors = [
        color ?? (data.backgroundColor ? data.backgroundColor[0] : ""),
        color2 ?? (data.backgroundColor ? data.backgroundColor[1] : ""),
      ];
    }

    dispatch(
      updateBackground({
        background: bg ?? null,
        backgroundColor: colors,
        image: image ?? null,
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 bg-white shadow-lg p-4 rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Select Backgrounds</h3>
        <div className="grid grid-cols-4 gap-4">
          {Object.keys(BACKGROUNDOPTIONS)?.map((bg, index) => (
            <Card
              key={`BACKGROUNDOPTIONS${index}`}
              className={`p-4 border rounded-lg hover:border-purple-500 min-h-[30vh] cursor-pointer text-center flex items-center justify-center  ${
                data?.background === bg ? "border-purple-500" : "border-muted"
              }`}
              onClick={() => handleChange({ bg: bg as any })}
            >
              {bg}
            </Card>
          ))}
        </div>
      </div>

      {data?.background === BACKGROUNDOPTIONS.GRADIENT ? (
        <>
          <ColorPicker
            selected={data?.backgroundColor && data?.backgroundColor[0]}
            onChange={(value: string) => handleChange({ color: value })}
          />
          <ColorPicker
            selected={data?.backgroundColor && data?.backgroundColor[1]}
            onChange={(value: string) => handleChange({ color2: value })}
          />
        </>
      ) : data?.background === BACKGROUNDOPTIONS.IMAGE ? (
        <Input
          value={data.image}
          onChange={(e) => handleChange({ image: e.target.value })}
          className="w-full p-2 cursor-pointer"
        />
      ) : (
        <ColorPicker
          selected={data?.backgroundColor}
          onChange={(value: string) => handleChange({ color: value })}
        />
      )}
    </div>
  );
};

export default BackgroundSelector;
