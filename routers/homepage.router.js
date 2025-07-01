import express from "express";
import homePageController from "../controllers/homepage.controller";

const homePageRouter = express.Router();

homePageRouter.get("/hello", homePageController.hello);
// Homepage
homePageRouter.get("/image-all", homePageController.imageAll);
homePageRouter.get(
  "/getImagesByTitle/:title",
  homePageController.getImagesByTitle
);

// Detail
homePageRouter.get("/imgUserId/:id", homePageController.imageUserId);
homePageRouter.get(
  "/getCommentsByImage/:imageId",
  homePageController.getCommentsByImageId
);
homePageRouter.get(
  "/checkIfImageSaved/:userId/:imageId",
  homePageController.checkIfImageSavedByUser
);
homePageRouter.get(
  "/getImageAndCreator/:imageId",
  homePageController.getImageAndCreatorById
);

// Comment
homePageRouter.get("/imgUserId/:id", homePageController.imageUserId);
homePageRouter.post("/comments", homePageController.comments);

// Quản lý ảnh
homePageRouter.get("/getUser/:userId", homePageController.getUserById);
homePageRouter.get(
  "/getSavedImages/:userId",
  homePageController.getSavedImagesByUserId
);
homePageRouter.get(
  "/getImagesByUser/:userId",
  homePageController.getImagesCreatedByUserId
);

homePageRouter.get("/imgUserId-list", homePageController.useridImageList);
homePageRouter.delete("/deleteImage/:id", homePageController.deleteImage);
export default homePageRouter;
