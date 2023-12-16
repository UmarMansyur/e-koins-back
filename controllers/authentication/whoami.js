const { PrismaClient } = require("@prisma/client");
const { success } = require("../../helpers/HandleResponse");
const { user } = new PrismaClient();

const saya = async (req, res, next) => {
  try {
    const payload = req.user;
    const exist = await user.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (!exist) {
      return unauthorized("Anda tidak terdaftar di dalam sistem!");
    }
    return success(res, exist, 'Berhasil mendapatkan data pengguna');
  } catch (error) {
    next(error);
  }
};

module.exports = saya;