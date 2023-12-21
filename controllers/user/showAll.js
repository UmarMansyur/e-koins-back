const { PrismaClient, Role } = require("@prisma/client");
const { uproccessableEntity } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");
const { user, studentClass } = new PrismaClient();
const paginate = require("../../helpers/Paginate");

const showAll = async (req, res, next) => {
  try {
    const { role = 'administrator' } = req.query;

    if(role === 'student') {
      const data = await paginate(req, res, studentClass, {
        include: {
          student: true,
          class: true,
          academicYears: true
        }
      });
      if(!data) return uproccessableEntity('Pengguna tidak ditemukan');
      return success(res, data, 'Pengguna berhasil ditampilkan');
    }

    const data = await paginate(req, res, user);
    return success(res, data, 'Pengguna berhasil ditampilkan');
  } catch (error) {
    next(error);
  }
}

module.exports = showAll;