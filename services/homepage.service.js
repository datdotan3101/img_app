import prisma from "../common/prisma/init.prisma";

const homepageService = {
  hello: () => {
    return `hello image`;
  },
  imageAll: async (req) => {
    let { imageUrl } = req.query;
    const image = await prisma.image.findMany({ where: { imageUrl } });
    return image;
  },
  getImagesByTitle: async (title) => {
    const lowerCaseTitle = title.toLowerCase();

    const images = await prisma.image.findMany({
      where: {
        title: {
          contains: lowerCaseTitle, 
        },
      },
    });

    if (!images || images.length === 0) {
      throw new Error("No images found with this title");
    }

    return images; // Trả về danh sách ảnh
  },
  imageUserId: async (req) => {
    const { id } = req.params;

    const image = await prisma.image.findUnique({
      where: { id: parseInt(id) },
      include: {
        User: true,
      },
    });

    if (!image) {
      return { error: "Image not found" };
    }

    return {
      image: image,
      user: image.userId, 
    };
  },
  imageComments: async (req) => {
    const { id } = req.params;
    const comment = await prisma.image.findMany({
      where: { id: parseInt(id) },
      include: {
        Comments: true,
      },
    });
    return comment;
  },
  comments: async (req) => {
    let { userId, imageId, content } = req.body;
    const comment = await prisma.comments.create({
      data: { userId: userId, imageId: imageId, content: content },
    });
    return comment;
  },
  getUserById: async (userId) => {
    const user = await prisma.user.findUnique({
      where: { id: userId }, 
      select: {
        id: true,
        fullName: true,
        email: true,
        createAt: true,
        updateAt: true,
        imageUrl: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user; // Trả về thông tin người dùng
  },
  getSavedImagesByUserId: async (userId) => {
    const savedImages = await prisma.userImage.findMany({
      where: {
        userId: userId, 
      },
      include: {
        Image: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
            description: true,
            createdAt: true,
          },
        },
      },
    });

    if (!savedImages || savedImages.length === 0) {
      throw new Error("No saved images found for this user");
    }

    return savedImages; // Trả về danh sách các ảnh đã lưu
  },
  useridImageList: async (req) => {},
  getImagesCreatedByUserId: async (userId) => {
    const images = await prisma.image.findMany({
      where: {
        userId: userId, 
      },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!images || images.length === 0) {
      throw new Error("No images found for this user");
    }

    return images; // Trả về danh sách các ảnh đã tạo
  },
  checkIfImageSavedByUser: async (userId, imageId) => {
    const savedImage = await prisma.userImage.findFirst({
      where: {
        AND: [
          { userId: userId },
          { imageId: imageId }, 
        ],
      },
    });

    // Nếu có bản ghi, người dùng đã lưu hình ảnh này
    if (savedImage) {
      return true; // Đã lưu
    }

    return false; // Chưa lưu
  },
  deleteImage: async (req) => {
    const imageId = parseInt(req.params.id);
    if (isNaN(imageId)) throw new Error("Invalid ID");

    const imageRecord = await prisma.userImage.findUnique({
      where: { id: imageId }, 
    });

    if (!imageRecord) {
      throw new Error("Image not found"); 
    }
    await prisma.userImage.delete({
      where: { id: imageId }, 
    });

    return "ok delete"; 
  },
  getCommentsByImageId: async (imageId) => {
    const comments = await prisma.comments.findMany({
      where: { imageId }, // Lọc theo imageId
      include: {
        User: {
          select: {
            id: true,
            fullName: true,
            email: true,
            createAt: true,
            updateAt: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!comments || comments.length === 0) {
      throw new Error("No comments found for this image");
    }

    return comments; 
  },
};

export default homepageService;
