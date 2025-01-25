import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import prisma from "../config/db.config";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

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
          slug:true,
          templateData:true,
          links: {
            where:{
              active:true
            },
            select: {
              url: true,
              title: true,
              id: true,
              order: true,
              type: true,
            },
            orderBy: { order: "asc" },
          },
        },
      });

      if (!data) {
        throw new ApiError(400, "Page not found");
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
      const {link, id} = req.query;

      if(!link || !id || typeof(link) !== "string"){
        throw new ApiError(400, "Bad Request");
      }

      res
        .status(200)
        .redirect(link)
    } catch (error: any) {
      throw new ApiError(401, error?.message || "Error in redirection");
    }
  }
);




