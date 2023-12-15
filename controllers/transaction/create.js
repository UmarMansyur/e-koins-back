const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");
const { transaction, studentClass } = new PrismaClient();

const create = async(req, res, next) => {
  try {
    const exist = await studentClass.findUnique({
      where: {
        id: req.body.studentClassId
      }
    });

    if(!exist) {
      return uproccessableEntity('Siswa tidak ditemukan');
    }

    const saldo = await transaction.findUnique({
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

    let nominalSaldo = req.body.saldo;

    if(req.body.type === 'Payment') {
      nominalSaldo = req.body.saldo + saldo.saldo;
    }

    if(req.body.type === 'Refund') {
      nominalSaldo = saldo.saldo - req.body.saldo;
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