const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");
const { user, studentClass } = new PrismaClient();

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exist = await user.findUnique({
      where: {
        id
      }
    });

    if (!exist) {
      return uproccessableEntity('Pengguna tidak ditemukan');
    }

    const data = {};

    const response = await user.update({
      data: req.body,
      where: {
        id
      }
    });

    data.user = response;

    if (req.body.role === 'Student') {
      const existStudent = await studentClass.findUnique({
        where: {
          studentId: response.id,
          academicYearId: req.body.academicYearId
        }
      });

      if (!existStudent) {
        return success(res, data, 'Pengguna berhasil dirubah');
      }

      const student = await studentClass.update({
        data: {
          studentId: response.id,
          classId: req.body.classId,
          academicYearId: req.body.academicYearId,
          qrCode: req.body.qrCode
        },
        where: {
          studentId: response.id,
          academicYearId: req.body.academicYearId
        }
      });

      data.student = student;
    }

    return success(res, data, 'Pengguna berhasil dirubah');
  } catch (error) {
    next(error);
  }
};

module.exports = update;