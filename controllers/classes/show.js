const { PrismaClient } = require("@prisma/client");

const { success } = require("../../helpers/HandleResponse");
const { notFound } = require("../../helpers/ApiError");
const { classes } = new PrismaClient();

const show = async(req, res, next) => {
  try {
    const { id } = req.params;
    const exist = await classes.findFirst({
      where: {
        name: req.body.name
      }
    });

    if(!exist) {
      return notFound('Kelas tidak ditemukan');
    }

    const response = await classes.findFirst({
     where: {
      id: Number(id)
     }
    });
    
    return success(res, response, 'Kelas berhasil dihapus');
  } catch (error) {
    next(error)
  }
}

module.exports = show