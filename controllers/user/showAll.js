const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");
const { user } = new PrismaClient();
const paginate = require("../../helpers/Paginate");

const showAll = async (req, res, next) => {
  try {
    const { role = 'administrator' } = req.params;

    if(rolw === 'student') {
      const data = await paginate(req, user, {
        where: {
          role
        },
        include: {
          StudentClass: true
        }
      });
      return success(res, data, 'Pengguna berhasil ditampilkan');
    }

    const data = await paginate(req, user);
    return success(res, data, 'Pengguna berhasil ditampilkan');
  } catch (error) {
    next(error);
  }
}

module.exports = showAll;