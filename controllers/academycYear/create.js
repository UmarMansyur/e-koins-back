const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require('../../helpers/ApiError');
const { success } = require("../../helpers/HandleResponse");
const { academicYear } = new PrismaClient();

const create = async(req, res, next) => {
  try {
    const exist = await academicYear.findFirst({
      where: {
        name: req.body.name,
        semester: req.body.semester
      }
    });

    if(exist) {
      return uproccessableEntity('Tahun akademik sudah ada');
    }

    const response = await academicYear.create({
      data: req.body
    });

    return success(res, response, 'Tahun akademik berhasil dibuat', 201);
  } catch (error) {
    next(error)
  }
}

module.exports = create