const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");
const { user, studentClass} = new PrismaClient();

const show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role = 'administrator' } = req.query;
    if(role === 'student') {
      const exist = await studentClass.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          student: true,
          class: true,
          academicYears: true
        }
      });

      if(!exist) {
        return uproccessableEntity('Pengguna tidak ditemukan');
      }

      return success(res, exist, 'Pengguna berhasil ditampilkan');
    }

    const exist = await user.findUnique({
      where: {
        id: Number(id),
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