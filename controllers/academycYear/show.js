const { PrismaClient } = require("@prisma/client");
const { notFound } = require('../../helpers/ApiError');
const { success } = require("../../helpers/HandleResponse");
const { academicYear } = new PrismaClient();

const show = async(req, res, next) => {
  try {
    const { id } = req.params;
    const exist = await academicYear.findFirst({
      where: {
        id: Number(id)
      }
    });

    if(!exist) {
      return notFound('Tahun akademik tidak ditemukan');
    }
    
    return success(res, exist, 'Tahun akademik berhasil dihapus');
  } catch (error) {
    next(error)
  }
}

module.exports = show