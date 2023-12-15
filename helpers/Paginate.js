const paginate = async (req, rep, model, params = null) => {
  try {
    const query = req.query;
    if(!query.limit) {
      query.limit = 10;
    }

    if(!query.page) {
      query.page = 1;
    }

    const offset = query.page > 1 ? (query.page - 1) * query.limit : 0;

    const paginate = {
      skip: offset,
      take: query.limit
    }

    const include = {
      ...params
    }

    const result = await model.findMany({
      ...paginate,
     include
    });
    

    if(result.length < 1) {
      return;
    }
    const totalRows = await model.count({
      ...paginate,
    });


    const totalPages = Math.ceil(totalRows/query.limit); 

    return {
      total_page: totalPages,
      total_data: totalRows,
      current_page: query.page || 1,
      data: result
    };

  } catch (err) {
    throw err;
  }
};

module.exports = paginate;