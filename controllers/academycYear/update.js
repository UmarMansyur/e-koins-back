const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require('../../helpers/ApiError');
const { success } = require("../../helpers/HandleResponse");
const { academicYear } = new PrismaClient();

const update = async(req, res, next) => {
  try {
    const { id } = req.params;
    const exist = await academicYear.findFirst({
      where: {
        name: req.body.name,
        semester: req.body.semester,
        id: {
          not: Number(id)
        }
      }
    });

    if(exist) {
      return uproccessableEntity('Tahun akademik berhasil dibuat');
    }

    if(req.body.status == true) {
      await academicYear.updateMany({
        data: {
          status: false
        },
        where: {
          id: {
            not: Number(id)
          }
        }
      });
    }
    const response = await academicYear.update({
      data: req.body,
      where: {
        id: Number(id)
      }
    });

    return success(res, response, 'Tahun akademik berhasil diubah');
  } catch (error) {
    next(error)
  }
}

module.exports = update