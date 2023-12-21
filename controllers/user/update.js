const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");
const { user, studentClass } = new PrismaClient();
const bcrypt = require('bcrypt');

const update = async (req, res, next) => {
  try {
    const { id } = req.params;  
    const exist = await user.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!exist) {
      return uproccessableEntity('Pengguna tidak ditemukan');
    }

    const data = {};
    if(req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    if(req.body.birthDate) {
      req.body.birthDate = new Date(req.body.birthDate);
    }

    if(req.body.password == '') {
      delete req.body.password;
    }
  
    const classId = req.body.classId;
    const academicYearId = req.body.academicYearId;

    delete req.body.classId;
    delete req.body.academicYearId;
    
    const response = await user.update({
      data: req.body,
      where: {
        id: Number(id)
      }
    });

    data.user = response;

    if (req.body.role === 'Student') {
      const existStudent = await studentClass.findFirst({
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
          classId: classId,
          academicYearId: academicYearId,
        },
        where: {
          id: existStudent.id
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