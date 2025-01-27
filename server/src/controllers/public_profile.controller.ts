import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import prisma from "../config/db.config";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import moment from "moment";

// getProfileData ----------
export const getProfileData = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug;

      const data = await prisma.user.findFirst({
        where: { slug, status: 1 },
        select: {
          name: true,
          image: true,
          slug: true,
          templateData: true,
          redirect_link:true,
          links: {
            where: {
              active: true,
            },
            select: {
              url: true,
              title: true,
              id: true,
              order: true,
              type: true,
              active: true,
              thumbnail: true,
              thumbnail_layout: true,
              prioritize: true,
              animation_type: true,
              isLocked: true,
              lock_type: true,
            },
            orderBy: { order: "asc" },
          },
        },
      });

      if (!data) {
        throw new ApiError(400, "Page not found");
      }

      if(data.redirect_link){
        res
        .status(200)
        .json(new ApiResponse(200, {redirectTo:data?.redirect_link?.url}, "Fetched profile successfully"));
      }

      res
        .status(200)
        .json(new ApiResponse(200, data, "Fetched profile successfully"));
    } catch (error: any) {
      throw new ApiError(401, error?.message || "Error in fetching profile");
    }
  }
);

// redirect to url
export const redirectToLink = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { link, id } = req.query;

      if (!link || !id || typeof link !== "string") {
        throw new ApiError(400, "Bad Request");
      }

      res.status(200).redirect(link);
    } catch (error: any) {
      throw new ApiError(401, error?.message || "Error in redirection");
    }
  }
);

// check and unlock the link ---------
export const unlockLink = asyncHandler(async (req: Request, res: Response) => {
  try {
    const linkid = req.params.id;
    const value = req.query?.value;

    let link = await prisma.link.findUnique({
      where: { id: linkid },
    });

    if (!link?.lock_data || !link?.isLocked || !value) {
      throw new ApiError(400, "Invalid Request");
    }

    let success = false;

    switch (link?.lock_type) {
      case "CODE":
        if (Object.values(link.lock_data)[0] == parseInt(value as string)) {
          success = true;
        }
        break;

      case "SENSITIVE":
        success = true;
        break;

      case "SUBSCRIBE":
        success = true;
        break;

      case "DOB":
        if (
          moment().diff(moment(value as string), "days") >
          Object.values(link.lock_data)[0] * 365
        ) {
          success = true;
        }
        break;

      default:
        break;
    }

    res
      .status(200)
      .json(new ApiResponse(200, { success }, "Link Checked Successfully"));
  } catch (error: any) {
    throw new ApiError(401, error?.message || "Error in redirection");
  }
});
