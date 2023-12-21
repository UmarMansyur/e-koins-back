const { PrismaClient } = require("@prisma/client");
const { notFound } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");
const prisma = new PrismaClient();
const { studentClass, classes, academicYear } = new PrismaClient();
const nextGrade = async (req, res, next) => {
  try {
    const { data } = req.body;
    const existClass = await classes.findUnique({
      where: {
        id: Number(data[0].classId)
      }
    });

    if (!existClass) {
      return notFound('Kelas tidak ditemukan');
    }

    const existAcademicYear = await academicYear.findUnique({
      where: {
        id: Number(data[0].academicYearId)
      }
    });

    if (!existAcademicYear) {
      return notFound('Tahun ajaran tidak ditemukan');
    }

    const response = await prisma.$transaction(async (tx) => {
      const response = await tx.studentClass.createMany({
        data: data
      });
      return response;
    });

    return success(res, response, 'Kelas berhasil ditambahkan');
  } catch (error) {
    next(error);
  }
};

module.exports = nextGrade;