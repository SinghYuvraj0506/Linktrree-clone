
import ColorPicker from "./ColorPicker";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { appearanceActions } from "@/lib/features/appearanceSlice";
import { BUTTONOPTIONS, BUTTONROUNDEDOPTIONS } from "@/lib/types";

const ButtonStyleSelector = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.appearance);
  const { updateButton } = appearanceActions;

  const handleChange = ({
    type,
    roundedType,
    colorButton,
    colorFont,
  }: {
    type?: BUTTONOPTIONS;
    roundedType?: BUTTONROUNDEDOPTIONS;
    colorButton?: string;
    colorFont?: string;
  }) => {
    dispatch(
      updateButton({
        buttonType: type ?? null,
        buttonRoundedType: roundedType ?? null,
        buttonColor: colorButton ?? null,
        buttonfontColor: colorFont ?? null,
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 bg-white shadow-lg p-4 rounded-lg">
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">Select Buttons</h3>

        <div className="flex flex-col gap-2">
          <span className="text-sm">Select Button Type</span>
          <div className="flex gap-4 text-sm">
            {Object.keys(BUTTONOPTIONS).map((type) => (
              <button
                key={type}
                className={`p-4 border rounded-lg hover:border-purple-500 ${
                  data?.buttonType === type ? "border-purple-500" : "border-muted"
                }`}
                onClick={() => handleChange({ type: type as any })}
              >
                {type[0] + type?.split("_")?.join(" ")?.toLowerCase().slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm">Select Border Radius</span>
          <div className="flex gap-4 text-sm">
            {Object.keys(BUTTONROUNDEDOPTIONS).map((type) => (
              <button
                key={type}
                className={`p-4 border rounded-lg hover:border-purple-500 ${
                  data?.buttonRoundedType === type ? "border-purple-500" : "border-muted"
                }`}
                onClick={() => handleChange({ roundedType: type as any })}
              >
                {type[0] + type?.split("_")?.join(" ")?.toLowerCase().slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ColorPicker
        selected={data?.buttonColor}
        onChange={(value:string) => handleChange({ colorButton: value })}
      />
      <ColorPicker
        selected={data?.buttonfontColor}
        onChange={(value:string) => handleChange({ colorFont: value })}
      />
    </div>
  );
};

export default ButtonStyleSelector;
