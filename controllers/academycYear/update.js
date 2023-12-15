const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require('../../helpers/ApiError');
const { success } = require("../../helpers/HandleResponse");
const { academicYear } = new PrismaClient();

const update = async(req, res, next) => {
  try {
    const { id } = req.params;
    const exist = await academicYear.findUnique({
      where: {
        name: req.body.name,
        id: {
          not: id
        }
      }
    });

    if(exist) {
      return uproccessableEntity('Tahun akademik berhasil dibuat');
    }

    const response = await academicYear.update({
      data: req.body,
      where: {
        id
      }
    });

    return success(res, response, 'Tahun akademik berhasil diubah');
  } catch (error) {
    next(error)
  }
}

module.exports = update