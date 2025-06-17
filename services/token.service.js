import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRE,
  ACCESS_TOKEN_SERVICE,
  REFRESH_TOKEN_SERVICE_EXPIRES,
  REFRESH_TOKEN_SERVICE_SECRET,
} from "../common/constant/app.constant";

const tokenService = {
  createToken: (userId) => {
    const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SERVICE, {
      expiresIn: ACCESS_TOKEN_EXPIRE,
    });
    const refreshToken = jwt.sign(
      { userId: userId },
      REFRESH_TOKEN_SERVICE_SECRET,
      {
        expiresIn: REFRESH_TOKEN_SERVICE_EXPIRES,
      }
    );
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  },
  verifyAccessToken: (token, ignoreExpiration = false) => {
    return jwt.verify(token, ACCESS_TOKEN_SERVICE, {
      ignoreExpiration: ignoreExpiration,
    });
  },
  verifyRefreshToken: (token) => {
    return jwt.verify(token, REFRESH_TOKEN_SERVICE_SECRET);
  },
};

export default tokenService;
