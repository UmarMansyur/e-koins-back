const { PrismaClient } = require("@prisma/client");
const { notFound } = require('../../helpers/ApiError');
const { success } = require("../../helpers/HandleResponse");
const paginate = require("../../helpers/Paginate");
const { academicYear } = new PrismaClient();

const showAll = async(req, res, next) => {
  try {
    const response = await paginate(req, res, academicYear);
    if(!response) {
      return notFound('Tahun akademik tidak ditemukan');
    }
    return success(res, response, 'Tahun akademik berhasil dihapus');
  } catch (error) {
    next(error)
  }
}

module.exports = showAll