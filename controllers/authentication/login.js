const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { unauthorized } = require("../../helpers/ApiError");
const { user } = new PrismaClient();

const login = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const exist = await user.findUnique({
      where: {
        name
      }
    });

    if (!exist) {
      return unauthorized("You're not authorized!");
    }

    const isPasswordMatch = await bcrypt.compare(password, exist.password);

    if (!isPasswordMatch) {
      return unauthorized("You're not authorized!");
    }

    const payload = {
      id: exist.id,
      name: exist.name,
      role: exist.role
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    return success(res, { token }, 'Login success');
  } catch (error) {
    next(error);
  }
};

module.exports = login;