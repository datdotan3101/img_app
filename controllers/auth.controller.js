import { responseSuccess } from "../common/helpers/responses.helper";
import authService from "../services/auth.service";

const authController = {
  hello: async (req, res) => {
    const result = await authService.hello();
    const resData = responseSuccess(result);
    res.json(resData);
  },
  register: async (req, res) => {
    const result = await authService.register(req);
    const resData = responseSuccess(result);
    res.json(resData);
  },
  login: async (req, res) => {
    const result = await authService.login(req);
    const resData = responseSuccess(result);
    res.json(resData);
  },
  refreshToken: async (req, res) => {
    const result = await authService.refreshToken(req);
    const resData = responseSuccess(result);
    res.json(resData);
  },
};

export default authController;
