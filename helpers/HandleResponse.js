class HandleResponse {
  static success(res, data, message, code = 200) {
    return res.status(code).json({
      "jsonApi": {
        "version": "1.0"
      },
      "meta": {
        "authors": "Khana Zulfana Imam",
        "copyright": "RPL ~ Universitas Madura"
      },
      "message": message || 'Success',
      "data": data,
    });
  }

  static error(res, error) {
    return res.status(error.code || 500).json({
      "jsonApi": {
        "version": "1.0"
      },
      "meta": {
        "authors": "Khana Zulfana Imam",
        "copyright": "RPL ~ Universitas Madura"
      },
      "message": error.message || 'Internal Server Error',
      "errors": error.errors || [],
    });
  }
}

module.exports = HandleResponse;