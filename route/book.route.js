import express from "express";
import { getBook, getAllBook } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);
router.get("/paidbooks", getAllBook);

export default router;