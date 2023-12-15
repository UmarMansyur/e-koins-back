const { success } = require("../../helpers/HandleResponse");

const saya = async (req, res, next) => {
  try {
    const payload = req.user;
    return success(res, payload, 'Berhasil mendapatkan data pengguna');
  } catch (error) {
    next(error);
  }
};

module.exports = saya;