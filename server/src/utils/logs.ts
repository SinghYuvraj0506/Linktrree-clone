import { LogsType } from "@prisma/client";
import prisma from "../config/db.config";

export const generateLogs = async (
  userId: string,
  desc: string,
  type: LogsType
) => {
  try {
    const log = await prisma.logs.create({
      data: {
        desc,
        type,
        userId,
      },
    });
    return log;
  } catch (error) {
    console.log("Error generating logs", error);
  }
};
