const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");
const { user } = new PrismaClient();


const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const exist = await user.findUnique({
      where: {
        id: Number(id)
      }
    });

    if(!exist) {
      return uproccessableEntity('Pengguna tidak ditemukan');
    }

    await user.delete({
      where: {
        id: Number(id)
      }
    });

    return success(res, null, 'Pengguna berhasil dihapus');

    
  } catch (error) {
    next(error);
  }
}

module.exports = destroy;