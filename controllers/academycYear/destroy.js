const { PrismaClient } = require("@prisma/client");
const { notFound } = require('../../helpers/ApiError');
const { success } = require("../../helpers/HandleResponse");
const { academicYear } = new PrismaClient();

const destroy = async(req, res, next) => {
  try {
    const { id } = req.params;
    const exist = await academicYear.findUnique({
      where: {
        name: req.body.name
      }
    });

    if(!exist) {
      return notFound('Tahun akademik tidak ditemukan');
    }

    const response = await academicYear.delete({
      where: {
        id
      }
    });
    return success(res, response, 'Tahun akademik berhasil dihapus');
  } catch (error) {
    next(error)
  }
}

module.exports = destroy