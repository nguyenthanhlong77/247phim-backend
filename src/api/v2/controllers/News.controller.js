const { News, User } = require("../models/index");

const insertNews = async (req, res) => {
  try {
    let news = new News(req.body);
    await news
      .save()
      .then((res) => {
        return res.status(200).json({
          success: true,
          message: "News created successfully",
          news,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const updateNews = async (req, res) => {
  let id = req.query.id;
  try {
    let news = await News.findById(id);
    if (!news) {
      return res.status(304).json({
        success: false,
        message: "Can not find news !",
      });
    }
    await News.findByIdAndUpdate(id, req.body).then((res) => {
      return res
        .status(200)
        .json({
          success: true,
          message: "News update successfully",
          news,
        })
        .catch((error) => {
          return res.status(400).json({
            success: false,
            message: error.message,
          });
        });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteNews = async (req, res) => {
  let id = req.query.id;
  try {
    await News.findByIdAndRemove(id).then((res) => {
      return res.status(203).json({
        success: true,
        message: "News delete successfully !",
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getPagingNews = async (req, res) => {
  let pageSize = req.query.pageSize || 10;
  let pageIndex = req.query.pageIndex || 1;
  let searchObj = {};
  if (req.query.search) {
    searchObj = { title: { $regex: ".*" + req.query.search + ".*" } };
  }
  try {
    let news = await News.find(searchObj)
      .skip(pageSize * pageIndex - pageSize)
      .limit(parseInt(pageSize))
      .populate("user")
      .sort({
        createdAt: -1,
      });

    let count = await News.find(searchObj).countDocuments();
    let totalPages = Math.ceil(count / pageSize);

    res.json({ pageIndex, pageSize, totalPages, news });
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const getNewById = async (req, res) => {
  try {
    let id = req.query.id;
    let news = await News.findById(id);
    if (news) {
      res.status(201).json({ success: true, news });
    } else {
      return res.status(401).json({ success: false, message: error.message });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};
const getNewBySlug = async (req, res) => {
  try {
    let slug = req.query.slug;
    let news = await News.find({ slug: slug });
    if (news) {
      res.status(201).json({ success: true, news });
    } else {
      return res.status(401).json({ success: false, message: error.message });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};
module.exports = {
  insertNews,
  updateNews,
  deleteNews,
  getPagingNews,
  getNewBySlug,
  getNewById,
};
