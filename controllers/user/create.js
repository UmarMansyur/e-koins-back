const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");
const { user, studentClass } = new PrismaClient();

const create = async (req, res, next) => {
  try {
    const exist = await user.findUnique({
      where: {
        email: req.body.email
      }
    });

    if(exist) {
     return uproccessableEntity('Pengguna sudah ada');
    }

    const data = {};

    const response = await user.create({
      data: req.body
    });

    data.user = response;

    if(req.body.role === 'Student') {
      const student = await studentClass.create({
        data: {
          studentId: response.id,
          classId: req.body.classId,
          academicYearId: req.body.academicYearId,
          qrCode: req.body.qrCode
        }
      });
      data.student = student;
    }

    return success(res, data, 'Pengguna berhasil dibuat', 201);
  } catch (error) {
    next(error);
  }
}

module.exports = create;