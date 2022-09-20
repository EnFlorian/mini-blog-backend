import { Router } from "express";
import authenticationMiddlerware from "../middlewares/authentication";
import { loginUser, registerUser, getCurrentUser } from "../controllers/users";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", authenticationMiddlerware, getCurrentUser);

export default router;
