const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");
const { transaction, studentClass } = new PrismaClient();

const create = async(req, res, next) => {
  try {
    const exist = await studentClass.findFirst({
      where: {
        id: req.body.studentClassId
      }
    });

    if(!exist) {
      return uproccessableEntity('Siswa tidak ditemukan');
    }

    const saldo = await transaction.findFirst({
      where: {
        studentClassId: req.body.studentClassId
      }
    });

    if(!saldo) {
      await transaction.create({
        data: {
          studentClassId: req.body.studentClassId,
          saldo: 0
        }
      });
    }

    let nominalSaldo = req.body.amount;

    if(req.body.type === 'Payment') {
      nominalSaldo = req.body.amount + saldo.saldo;
    }

    if(req.body.type === 'Refund') {
      nominalSaldo = saldo.saldo - req.body.amount;
      if(nominalSaldo < 0) {
        return uproccessableEntity('Saldo tidak mencukupi');
      }
    }

    const response = await transaction.create({
      data: {
        ...req.body,
        saldo: nominalSaldo
      }
    });

    return success(res, response, 'Kelas berhasil dibuat', 201);
  } catch (error) {
    next(error)
  }
}

module.exports = create