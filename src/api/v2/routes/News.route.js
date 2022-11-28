require("dotenv").config();
const express = require("express");
const {
  getPagingNews,
  insertNews,
  updateNews,
  deleteNews,
  getNewById,
  getNewBySlug,
  getNewsByCategory,
  getNewsByCount,
  getRelativeNews,
} = require("../controllers/News.controller");
const { verifyAccessToken, authPage } = require("../middlewares/auth");

const router = express.Router();

router.get("/getPagingNews", getPagingNews);
router.post("/insert", verifyAccessToken, authPage(["admin"]), insertNews);
router.put("/update/:id", verifyAccessToken, authPage(["admin"]), updateNews);
router.delete(
  "/delete/:id",
  verifyAccessToken,
  authPage(["admin"]),
  deleteNews
);
router.get("/getNewById/:id", getNewById);
router.get("/getNewBySlug/:slug", getNewBySlug);
router.get("/getNewsByCategory/:slug", getNewsByCategory);
router.get("/getNewsByCount", getNewsByCount);
router.get("/getRelativeNews/:slug", getRelativeNews);

module.exports = router;
