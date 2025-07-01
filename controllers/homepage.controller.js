import { responseSuccess } from "../common/helpers/responses.helper";
import homepageService from "../services/homepage.service";

const homePageController = {
  hello: (req, res) => {
    const result = homepageService.hello();
    const resData = responseSuccess(result);
    res.json(resData);
  },
  // Get toàn bộ ảnh
  imageAll: async (req, res) => {
    const result = await homepageService.imageAll(req);
    const resData = responseSuccess(result);
    res.json(resData);
  },
  // thông tin ảnh theo tên
  getImagesByTitle: async (req, res) => {
    try {
      const title = req.params.title; // Lấy title từ URL params
      const images = await homepageService.getImagesByTitle(title); // Gọi service để lấy danh sách ảnh
      res.json({
        status: "success",
        data: images,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
      res
        .status(500)
        .json({
          success: false,
          message: error.message || "Internal server error",
        });
    }
  },
  // Get thông tin ảnh và người tạo ảnh bằng id ảnh
  imageUserId: async (req, res) => {
    const result = await homepageService.imageUserId(req);
    const resData = responseSuccess(result);
    res.json(resData);
  },
  // Get bình luận theo id ảnh
  imageComments: async (req, res) => {
    const result = await homepageService.imageComments(req);
    const resData = responseSuccess(result);
    res.json(resData);
  },
  comments: async (req, res) => {
    const result = await homepageService.comments(req);
    const resData = responseSuccess(result);
    res.json(resData);
  },
  // Quản lý ảnh
  // Get danh sách ảnh theo user id
  getUserById: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId); // Lấy userId từ URL params
      if (isNaN(userId)) throw new Error("Invalid user ID");

      const user = await homepageService.getUserById(userId); // Gọi service để lấy thông tin người dùng

      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res
        .status(500)
        .json({
          success: false,
          message: error.message || "Internal server error",
        });
    }
  },
  getSavedImagesByUserId: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId); // Lấy userId từ URL params
      if (isNaN(userId)) throw new Error("Invalid user ID");

      const savedImages = await homepageService.getSavedImagesByUserId(userId); // Gọi service để lấy ảnh đã lưu

      res.json({
        status: "success",
        data: savedImages,
      });
    } catch (error) {
      console.error("Error fetching saved images:", error);
      res
        .status(500)
        .json({
          success: false,
          message: error.message || "Internal server error",
        });
    }
  },
  checkIfImageSavedByUser: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId); // Lấy userId từ URL params
      const imageId = parseInt(req.params.imageId); // Lấy imageId từ URL params

      if (isNaN(userId) || isNaN(imageId)) {
        throw new Error("Invalid userId or imageId");
      }

      const isSaved = await homepageService.checkIfImageSavedByUser(
        userId,
        imageId
      ); 

      res.json({
        status: "success",
        data: { isSaved }, 
      });
    } catch (error) {
      console.error("Error checking if image is saved:", error);
      res
        .status(500)
        .json({
          success: false,
          message: error.message || "Internal server error",
        });
    }
  },
  getImagesCreatedByUserId: async (req, res) => {
    try {
      const userId = parseInt(req.params.userId); // Lấy userId từ URL params
      if (isNaN(userId)) throw new Error("Invalid user ID");

      const images = await homepageService.getImagesCreatedByUserId(userId); // Gọi service để lấy ảnh đã tạo

      res.json({
        status: "success",
        data: images,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
      res
        .status(500)
        .json({
          success: false,
          message: error.message || "Internal server error",
        });
    }
  },
  useridImageList: async (req, res) => {
    const result = await homepageService.useridImageList(req);
    const resData = responseSuccess(result);
    res.json(resData);
  },
  deleteImage: async (req, res) => {
    try {
      const imageId = parseInt(req.params.id); 
      if (isNaN(imageId)) throw new Error("Invalid image ID");

      
      const result = await homepageService.deleteImage(req); 

      res.json({
        status: "success",
        message: result, 
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      res
        .status(500)
        .json({
          success: false,
          message: error.message || "Internal server error",
        });
    }
  },
  getCommentsByImageId: async (req, res) => {
    try {
      const imageId = parseInt(req.params.imageId); 
      if (isNaN(imageId)) throw new Error("Invalid image ID");

      const comments = await homepageService.getCommentsByImageId(imageId); 
      res.json({
        status: "success",
        data: comments,
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },
  getImageAndCreatorById: async (req, res) => {
    try {
      const imageId = parseInt(req.params.imageId);
      if (isNaN(imageId)) throw new Error("Invalid image ID");

      const imageWithCreator = await homepageService.getImageAndCreatorById(
        imageId
      ); 

      res.json({
        status: "success",
        data: imageWithCreator,
      });
    } catch (error) {
      console.error("Error fetching image and creator:", error);
      res
        .status(500)
        .json({
          success: false,
          message: error.message || "Internal server error",
        });
    }
  },
};

export default homePageController;
