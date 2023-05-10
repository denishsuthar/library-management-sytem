import express from "express";
import { isAdmin, isAuth } from "../middelware/auth.js";
import { addBook, allBooks, deleteBook, requestBook, requestList, updateBook, updateStatus, userBooks } from "../controllers/bookController.js";

const router = express.Router();

router.route("/books").get(allBooks)

router.route("/addbook").post(isAuth, isAdmin, addBook)

router.route("/book/:id").delete(isAuth, isAdmin, deleteBook).put(isAuth, isAdmin, updateBook)

router.route("/mybooks").get(isAuth,userBooks)

router.route("/requestbook").post(isAuth, requestBook)

router.route("/allrequest").get(isAuth,isAdmin, requestList)

router.route("/request/:id").put(isAuth, isAdmin, updateStatus)

export default router