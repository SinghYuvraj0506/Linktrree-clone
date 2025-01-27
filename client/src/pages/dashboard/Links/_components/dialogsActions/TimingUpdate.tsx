import React, { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { linkActions } from "@/lib/features/linksSlice";
import { Link } from "@/lib/types";
import { LoadingButton } from "@/components/global/Button";

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  link: Link;
};

const TimingUpdate = ({ link }: Props) => {
  const [showTime, setShowTime] = useState<string | null>(link?.show_time?.split(":00.000")[0] ?? null);
  const [hideTime, setHideTime] = useState<string | null>(link?.hide_time?.split(":00.000")[0] ?? null);
  const [timezoneValue, setTimezoneValue] = useState<string>("UTC");
  const dispatch = useAppDispatch();
  const { updateLink } = linkActions;
  const { funcLoading } = useAppSelector((state) => state.links);

  const timezones = [
    "UTC",
    "America/New_York",
    "Europe/London",
    "Asia/Kolkata",
    "Australia/Sydney",
    "CST"
  ];

  const onSubmit = () => {
    try {
      // Convert times to UTC
      const showTimeUTC = dayjs.tz(showTime, timezoneValue).utc().format();
      const hideTimeUTC = dayjs.tz(hideTime, timezoneValue).utc().format();

      dispatch(
        updateLink({
          id: link.id,
          obj: {
            show_time: showTimeUTC,
            hide_time: hideTimeUTC,
          },
        })
      );
    } catch (error) {
      console.error("Error converting times:", error);
    }
  };

  const removeScheduling = () => {
    setShowTime(null);
    setHideTime(null);

    dispatch(
      updateLink({
        id: link.id,
        obj: {
          show_time: null,
          hide_time: null,
        },
      })
    );
  };


  return (
    <div className="space-y-6">
      {/* Show Time */}
      <div>
        <label className="block mb-2 text-sm font-medium">Show Time</label>
        <Input
          type="datetime-local"
          value={showTime ?? ""}
          onChange={(e) => setShowTime(e.target.value)}
          placeholder="Select show time"
        />
      </div>

      {/* Hide Time */}
      <div>
        <label className="block mb-2 text-sm font-medium">Hide Time</label>
        <Input
          type="datetime-local"
          value={hideTime ?? ""}
          onChange={(e) => setHideTime(e.target.value)}
          placeholder="Select hide time"
        />
      </div>

      {/* Timezone */}
      <div>
        <label className="block mb-2 text-sm font-medium">Timezone</label>
        <Select
          onValueChange={(value) => setTimezoneValue(value)}
          defaultValue={timezoneValue}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a timezone" />
          </SelectTrigger>
          <SelectContent>
            {timezones.map((tz) => (
              <SelectItem key={tz} value={tz}>
                {tz}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-2">
        <LoadingButton
          type="button"
          loading={funcLoading}
          onClick={removeScheduling}
          text="Remove Scheduling"
        />
        <LoadingButton
          type="button"
          loading={funcLoading}
          onClick={onSubmit}
          text="Save"
        />
      </div>
    </div>
  );
};

export default TimingUpdate;
