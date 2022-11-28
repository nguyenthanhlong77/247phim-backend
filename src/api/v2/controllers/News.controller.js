const { News, User } = require("../models/index");

const insertNews = async (req, res) => {
  try {
    let news = new News(req.body);

    await news
      .save()
      .then((news) => {
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
  try {
    let id = req.params.id;
    let update = req.body;
    News.findByIdAndUpdate(id, update)
      .then((news) => {
        return res.status(200).json({
          success: true,
          message: "News update successfully",
          news,
        });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteNews = async (req, res) => {
  try {
    let id = req.params.id;

    await News.findByIdAndRemove(id)
      .then((result) => {
        return res.status(203).json({
          success: true,
          message: "News delete successfully !",
        });
      })
      .catch((error) => {
        res.status(400).json({
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

    res.json({ pageIndex, pageSize, totalPages, count, news });
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const getNewById = async (req, res) => {
  try {
    let id = req.params.id;
    let news = await News.findById(id);
    if (news) {
      news.count += 1;
      await news.save();
      res.status(201).json({ success: true, news });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "News doesn't exits" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};
const getNewBySlug = async (req, res) => {
  try {
    let slug = req.params.slug;
    let news = await News.findOne({ slug: slug });
    if (news) {
      news.count += 1;
      await news.save();
      res.status(201).json({ success: true, news });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "New doesn't exits" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};
const getNewsByCategory = async (req, res) => {
  let slug = req.params.slug;
  let pageSize = req.query.pageSize || 10;
  let pageIndex = req.query.pageIndex || 1;
  let searchObj = {};
  if (req.query.search) {
    searchObj = {
      title: { $regex: ".*" + req.query.search + ".*" },
      category: slug,
    };
  }
  try {
    let news = await News.find({ category: slug })
      .skip(pageSize * pageIndex - pageSize)
      .limit(parseInt(pageSize))
      .populate("user")
      .sort({
        createdAt: -1,
      });

    let count = await News.find({ category: slug }).countDocuments();
    let totalPages = Math.ceil(count / pageSize);

    res.json({ pageIndex, pageSize, totalPages, count, news });
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const getNewsByCount = async (req, res) => {
  let slug = req.params.slug;
  let pageSize = req.query.pageSize || 10;
  let pageIndex = req.query.pageIndex || 1;
  let searchObj = {};
  if (req.query.search) {
    searchObj = {
      title: { $regex: ".*" + req.query.search + ".*" },
    };
  }
  try {
    let news = await News.find({})
      .skip(pageSize * pageIndex - pageSize)
      .limit(parseInt(pageSize))
      .sort({
        count: -1,
        createdAt: -1,
      });
    let count = await News.find({}).countDocuments();
    let totalPages = Math.ceil(count / pageSize);

    res.json({ pageIndex, pageSize, totalPages, count, news });
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const getRelativeNews = async (req, res) => {
  let slug = req.params.slug;
  let cate = req.query.category;
  let pageSize = req.query.pageSize || 10;
  let pageIndex = req.query.pageIndex || 1;
  let searchObj = {};
  if (req.query.search) {
    searchObj = {
      title: { $regex: ".*" + req.query.search + ".*" },
    };
  }
  try {
    let news = await News.find({ category: cate, slug: { $ne: slug } })
      .skip(pageSize * pageIndex - pageSize)
      .limit(parseInt(pageSize))
      .sort({
        count: -1,
        createdAt: -1,
      });
    let count = await News.find({
      category: cate,
      slug: { $ne: slug },
    }).countDocuments();
    let totalPages = Math.ceil(count / pageSize);

    res.json({ pageIndex, pageSize, totalPages, count, news });
  } catch (error) {
    res.status(404).json(error.message);
  }
};
module.exports = {
  insertNews,
  updateNews,
  deleteNews,
  getPagingNews,
  getNewBySlug,
  getNewById,
  getNewsByCategory,
  getNewsByCount,
  getRelativeNews,
};
