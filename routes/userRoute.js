import express from "express";
import { allUsers, anyUserProfile, deleteUser, loginUser, logout, myProfile, registerUser, updateProfile } from "../controllers/userController.js";
import { isAdmin, isAuth } from "../middelware/auth.js";

const router = express.Router();

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(logout)

router.route("/me").get(isAuth, myProfile)

router.route("/update").put(isAuth, updateProfile)



//Admin Routes
router.route("/admin/users").get(isAuth, isAdmin, allUsers)

router.route("/admin/user/:id").delete(isAuth, isAdmin, deleteUser).get(isAuth, isAdmin, anyUserProfile)




export default router