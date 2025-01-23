import { Router } from "express";
import { ensureGuest, verifyJWT } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import { loginUserSchema, registerUserSchema, updateUserSchema } from "../schemas/auth.schema";
import {
  authGoogle,
  checkForSlug,
  getUserData,
  googleCallback,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateUserInfo,
} from "../controllers/auth.controller";

const authRouter = (router: Router) => {
  /**
   * @swagger
   * /auth/google:
   *   get:
   *     description:  Google Auth Redirect
   */
  router.get("/auth/google", ensureGuest, authGoogle);

  router.post("/auth/google/callback", ensureGuest, googleCallback);

  router.post(
    "/auth/register",
    ensureGuest,
    validate(registerUserSchema),
    registerUser
  );
  router.post("/auth/login", ensureGuest, validate(loginUserSchema), loginUser);

  router.put("/user", verifyJWT, validate(updateUserSchema), updateUserInfo);
  router.get("/user/checkslug/:slug", verifyJWT, checkForSlug);

  router.get("/auth/me", verifyJWT, getUserData);
  router.get("/auth/logout", verifyJWT, logoutUser);

  router.get("/auth/refresh", refreshAccessToken);
};

export default authRouter;
