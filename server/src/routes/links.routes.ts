import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import { createLinkSchema, updateLinkSchema } from "../schemas/link.schema";
import { createLinks, deleteLink, getUserLinks, updateLink } from "../controllers/links.controller";

const linksRouter = (router:Router) => {
    router.get('/links/user',verifyJWT, getUserLinks);
    router.post('/links',verifyJWT,validate(createLinkSchema), createLinks);
    router.put('/links/:id',verifyJWT,validate(updateLinkSchema), updateLink);
    router.delete('/links/:id',verifyJWT, deleteLink);
}

export default linksRouter;