const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");
const { user } = new PrismaClient();

const destroy = async (req, res, next) => {
  try {
    const { id } = req.body;

    const exist = await user.findUnique({
      where: {
        id
      }
    });

    if(!exist) {
      return uproccessableEntity('Pengguna tidak ditemukan');
    }

    await user.delete({
      where: {
        id
      }
    });

    return success(res, null, 'Pengguna berhasil dihapus');

    
  } catch (error) {
    next(error);
  }
}

module.exports = destroy;