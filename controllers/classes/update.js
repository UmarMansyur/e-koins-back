const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require('../../helpers/ApiError');
const { success } = require("../../helpers/HandleResponse");
const { classes } = new PrismaClient();

const update = async(req, res, next) => {
  try {
    const { id } = req.params;
    const exist = await classes.findFirst({
      where: {
        name: req.body.name,
        id: {
          not: Number(id)
        }
      }
    });

    if(exist) {
      return uproccessableEntity('Kelas berhasil dibuat');
    }

    const response = await classes.update({
      data: req.body,
      where: {
        id: Number(id)
      }
    });

    return success(res, response, 'Kelas berhasil diubah');
  } catch (error) {
    next(error)
  }
}

module.exports = update