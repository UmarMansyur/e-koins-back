const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");
const { user } = new PrismaClient();

const show = async (req, res, next) => {
  try {
    const { id, role } = req.params;
    if(role === 'student') {
      const exist = await user.findUnique({
        where: {
          id
        },
        include: {
          StudentClass: true
        }
      });

      if(!exist) {
        return uproccessableEntity('Pengguna tidak ditemukan');
      }

      return success(res, exist, 'Pengguna berhasil ditampilkan');
    }

    const exist = await user.findUnique({
      where: {
        id
      }
    });

    if(!exist) {
      return uproccessableEntity('Pengguna tidak ditemukan');
    }

    return success(res, exist, 'Pengguna berhasil ditampilkan');
  } catch (error) {
    next(error);
  }
}

module.exports = show;