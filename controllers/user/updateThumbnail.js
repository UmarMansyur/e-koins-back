const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");
const { deleteFile, getFileId, validationFile } = require("../../helpers/imageKit");
const { user } = new PrismaClient();


const updateThumbnail = async (req, res, next) => {
  const { id } = req.params;
  const thumbnail = req.file;
  try {
    console.log(thumbnail);
    const exist = await user.findFirst({ where: { id: Number(id) } });
    if (!exist) return uproccessableEntity(res, "User not found");
    if (exist.thumbnail) {
      await deleteFile(exist.thumbnail);
    }
    const upload = await validationFile(thumbnail, "image", res);
    await user.update({
      where: { id: Number(id) },
      data: { thumbnail: upload },
    });

    return success(res, "Thumbnail updated successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = updateThumbnail;