import { BadrequestException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";
import tokenService from "./token.service";

const authService = {
  hello: () => {
    return `hello authenticz`;
  },
  register: async (req) => {
    const { fullName, email, password } = req.body;

    const userExist = await prisma.user.findUnique({ where: { email: email } });

    if (userExist) {
      throw new BadrequestException("Email is exist, please use other email");
    }

    const passworHash = bcrypt.hashSync(password, 10);

    const userNew = await prisma.user.create({
      data: { email: email, fullName: fullName, password: passworHash },
    });

    delete userNew.password;

    return userNew;
  },
  login: async (req) => {
    const { email, password } = req.body;

    const userExist = await prisma.user.findUnique({ where: { email: email } });
    if (!userExist) throw new BadrequestException("Email is avaible");

    const isPassword = bcrypt.compareSync(password, userExist.password);
    if (!isPassword) throw new BadrequestException("Password is not correct");

    const tokens = tokenService.createToken(userExist.id);

    return tokens;
  },
  refreshToken: (req) => {
    const { accessToken, refreshToken } = req.body;
    const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken);
    const decodeAccessToken = tokenService.verifyAccessToken(accessToken, true);

    if (decodeRefreshToken !== decodeAccessToken)
      throw new BadrequestException("Refresh token not success");

    const tokens = tokenService.createToken(decodeRefreshToken.userId);
    return tokens;
  },
};

export default authService;
