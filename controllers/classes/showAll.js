const { PrismaClient } = require("@prisma/client");
const { success } = require("../../helpers/HandleResponse");
const paginate = require("../../helpers/Paginate");
const { notFound } = require("../../helpers/ApiError");
const { classes } = new PrismaClient();

const showAll = async(req, res, next) => {
  try {
    const response = await paginate(req, res, classes);
    if(!response) {
      return notFound('Kelas tidak ditemukan');
    }
    
    return success(res, response, 'Kelas berhasil dihapus');
  } catch (error) {
    next(error)
  }
}

module.exports = showAll