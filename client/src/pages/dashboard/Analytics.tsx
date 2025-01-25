import { authActions } from "@/lib/features/authSlice";
import { useAppDispatch } from "@/lib/store";
import React, { useEffect } from "react";

const Analytics = () => {
  const dispatch = useAppDispatch();
  const { getAnalytics } = authActions;

  useEffect(() => {
    dispatch(getAnalytics());
  }, []);

  return <div>Analytics</div>;
};

export default Analytics;
