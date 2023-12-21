const { PrismaClient } = require("@prisma/client");
const { success } = require("../../helpers/HandleResponse");
const paginate = require("../../helpers/Paginate");
const { notFound } = require("../../helpers/ApiError");
const { classes, studentClass } = new PrismaClient();

const showAll = async (req, res, next) => {
  try {
    const response = await paginate(req, res, classes);
    if (!response) {
      return notFound('Kelas tidak ditemukan');
    }
    await Promise.all(response.data.map(async (item, index) => {
     const result = await studentClass.count({
        where: {
          classId: item.id
        }
      });
      response.data[index].totalStudent = result;
    }));
    return success(res, response, 'Kelas berhasil ditampilkan');
  } catch (error) {
    next(error);
  }
};

module.exports = showAll;