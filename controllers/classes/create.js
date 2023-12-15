const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require('../../helpers/ApiError');
const { success } = require("../../helpers/HandleResponse");
const { classes } = new PrismaClient();

const create = async(req, res, next) => {
  try {
    const exist = await classes.findUnique({
      where: {
        name: req.body.name
      }
    });

    if(exist) {
      return uproccessableEntity('Kelas sudah ada');
    }

    const response = await classes.create({
      data: req.body
    });

    return success(res, response, 'Kelas berhasil dibuat', 201);
  } catch (error) {
    next(error)
  }
}

module.exports = create