import express from "express"
import authRouter from "./auth.router"
import homePageRouter from "./homepage.router";

const rootRouter = express.Router()

rootRouter.use("/auth", authRouter)
// Homepage
rootRouter.use("/homepage", homePageRouter);
// Detail
rootRouter.use("/homepage/detail", homePageRouter);
// Quản lý ảnh
rootRouter.use("/managerImg", homePageRouter);


export default rootRouter