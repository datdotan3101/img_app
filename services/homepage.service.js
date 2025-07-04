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

    return user; 
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

    return savedImages; 
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

    return images; 
  },
  checkIfImageSavedByUser: async (userId, imageId) => {
    const savedImage = await prisma.userImage.findFirst({
      where: {
        AND: [{ userId: userId }, { imageId: imageId }],
      },
    });

    if (savedImage) {
      return true;
    }

    return false;
  },
  deleteImage: async (req) => {
    const imageId = parseInt(req.params.id); 
    if (isNaN(imageId)) throw new Error("Invalid image ID");

    const image = await prisma.image.findUnique({
      where: { id: imageId }, 
    });

    if (!image) {
      throw new Error("Image not found");
    }

    await prisma.comments.deleteMany({
      where: { imageId: imageId }, 
    });

    await prisma.userImage.deleteMany({
      where: { imageId: imageId }, 
    });

    await prisma.image.delete({
      where: { id: imageId }, 
    });

    return "Image and related records deleted successfully"; 
  },
  getCommentsByImageId: async (imageId) => {
    const comments = await prisma.comments.findMany({
      where: { imageId },
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
        Image: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!comments || comments.length === 0) {
      throw new Error("No comments found for this image");
    }

    return comments;
  },
  getImageAndCreatorById: async (imageId) => {
    const image = await prisma.image.findUnique({
      where: { id: imageId }, 
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

    if (!image) {
      throw new Error("Image not found");
    }

    return image; 
  },
};

export default homepageService;
