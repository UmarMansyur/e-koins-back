const { PrismaClient, TransactionType } = require("@prisma/client");
const { success } = require('../../helpers/HandleResponse');
const { notFound } = require("../../helpers/ApiError");
const { academicYear, studentClass, transaction } = new PrismaClient();

module.exports = {
  dashboard: async (req, res, next) => {
    try {

      const { academyc_year_id } = req.query;

      if(!academyc_year_id) {
        const exist = await academicYear.findFirst({
          where: {
            status: true
          }
        });
        if(!exist) return notFound('Tahun Akademik tidak ada yang aktif');
        req.query.academyc_year_id = exist.id;
      }

      const exist = await academicYear.findFirst({
        where: {
          id: req.query.academyc_year_id
        }
      });

      if(!exist) {
        return notFound('Academic year not found');
      }

      const result = await studentClass.count({
        where: {
          academicYearId: academyc_year_id
        }
      });

      const totalIncome = await transaction.aggregate({
        _sum: {
          amount: true
        },
        where: {
          academicYearId: academyc_year_id,
          type: TransactionType.Payment,
        }
      });

      const income = await transaction.aggregate({
        _sum: {
          amount: true
        },
        where: {
          academicYearId: academyc_year_id,
          type: TransactionType.Payment,
          createdAt: {
            gte: new Date(new Date().getFullYear(), 0, 1),
            lt: new Date(new Date().getFullYear(), 11, 31)
          }
        }
      });

      return success(res, {
        total_class: result,
        total_income: totalIncome._sum.amount == null ? 0 : totalIncome._sum.amount,
        income: income._sum.amount == null ? 0 : income._sum.amount
      }, 'Dashboard data retrieved successfully');

    } catch (error) {
      next(error);
    }
  }
}