const { PrismaClient, TransactionType } = require("@prisma/client");
const { notFound } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");

const prisma = new PrismaClient();

const show = async (req, res, next) => {
  try {
    const { studentId, classId, academicYearId } = req.body;
    
    const exist = await prisma.studentClass.findFirst({
      where: {
        studentId: Number(studentId),
        classId: Number(classId),
        academicYearId: Number(academicYearId)
      },
      orderBy: {
        id: 'desc'
      }
    });

    if(!exist) {
      return notFound('Data tidak ditemukan');
    }

    const existTransaction = await prisma.transaction.findFirst({
      where: {
        studentClassId: exist.id
      },
      include: {
        studentClass: {
          include: {
            student: true,
            class: true,
            academicYears: true
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    });

    if(!existTransaction) {
      const saldo = await prisma.transaction.findFirst({
        where: {
          studentClassId: exist.id,
          type: TransactionType.Payment
        },
        orderBy: {
          id: 'desc'
        }
      });
      const result = await prisma.transaction.create({
        data: {
          studentClassId: exist.id,
          amount: 0,
          type: TransactionType.Payment,
          saldo: 0,
        }
      });

      const loadTransaction = await prisma.transaction.findFirst({
        where: {
          studentClassId: exist.id
        },
        include: {
          studentClass: {
            include: {
              student: true,
              class: true,
              academicYears: true
            }
          }
        },
        orderBy: {
          id: 'desc'
        }
      });
      return success(res, loadTransaction, 'Data berhasil ditemukan');
    }
    return success(res, existTransaction, 'Data berhasil ditemukan');
  } catch (error) {
    next(error);
  }
}

module.exports = show; 