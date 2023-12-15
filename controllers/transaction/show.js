const { PrismaClient } = require("@prisma/client");
const { notFound } = require('../../helpers/ApiError');
const { success } = require("../../helpers/HandleResponse");
const { transaction } = new PrismaClient();

const show = async(req, res, next) => {
  try {
    const { id } = req.params;
    const exist = await transaction.findUnique({
      where: {
        name: req.body.name
      }
    });

    if(!exist) {
      return notFound('Transaksi tidak ditemukan');
    }

    const response = await transaction.findUnique({
      id
    });
    
    return success(res, response, 'Transaksi berhasil dihapus');
  } catch (error) {
    next(error)
  }
}

module.exports = show