const { PrismaClient } = require("@prisma/client");
const { uproccessableEntity } = require("../../helpers/ApiError");
const { success } = require("../../helpers/HandleResponse");
const { user } = new PrismaClient();

const register = async (req, res, next) => {
  try {
    const exist = await user.findUnique({
      where: {
        email: req.body.email
      }
    });

    if(exist) {
     return uproccessableEntity('Pengguna sudah ada');
    }
    
    const response = await user.create({
      data: req.body
    });

    return success(res, response, 'Pengguna berhasil dibuat', 201);
  } catch (error) {
    next(error);
  }
}

module.exports = register;