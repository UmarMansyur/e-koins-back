const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");
const { user, studentClass } = new PrismaClient();
const prisma = new PrismaClient();
const create = async (req, res, next) => {
  try {
    const exist = await user.findFirst({
      where: {
        email: req.body.email
      }
    });

    if (exist) {
      return uproccessableEntity('Pengguna sudah ada');
    }

    const data = {};
    req.body.birthDate = new Date(req.body.birthDate);
    const classId = req.body.classId;
    const academicYearId = req.body.academicYearId;
    const userData = req.body;
    delete userData.classId;
    delete userData.academicYearId;

    const response = await prisma.$transaction(async (tx) => {
      const response = await user.create({
        data: userData
      });
      data.user = response;
      if (req.body.role === 'Student') {
        const exist = await tx.studentClass.findFirst({
          where: {
            studentId: response.id,
            classId: classId,
            academicYearId: academicYearId
          }
        });
        if (exist) {
          return uproccessableEntity('Pengguna sudah ada');
        }
        const student = await tx.studentClass.create({
          data: {
            studentId: response.id,
            classId: classId,
            academicYearId: academicYearId,
            qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + JSON.stringify({
              studentId: response.id,
              classId: classId,
              academicYearId: academicYearId
            })
          }
        });
        data.student = student;
      }
      return response;
    });

    return success(res, response, 'Pengguna berhasil dibuat', 201);
  } catch (error) {
    next(error);
  }
};

module.exports = create;