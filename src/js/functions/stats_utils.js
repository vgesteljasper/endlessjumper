const filters = (data, startDate, endDate) => {

  // NONE
  if (data === undefined && startDate === undefined && endDate === undefined) {
    return [];
  }

  // DATA
  if (data !== undefined && startDate === undefined && endDate === undefined) {
    return data;
  }

  // DATA + STARTDATE
  if (data !== undefined && startDate !== undefined && endDate === undefined) {
    const returnData = [];
    const paramDate = parseInt(startDate.replace(/-|:|\s/g, ``));

    // DATE
    if (!isDateTime(startDate)) {
      filter()
    }
    // DATE TIME
    else {
      data.forEach(row => {
        const date = parseInt(row.created.replace(/-|:|\s/g, ``));
        if (date >= paramDate) {
          returnData.push(row);
        }
      });
    }

    return returnData;
  }

  // DATA + ENDDATE
  if (data !== undefined && startDate === false && endDate !== undefined) {
    const returnData = [];
    const paramDate = parseInt(endDate.replace(/-|:|\s/g, ``));

    // DATE
    if (!isDateTime(endDate)) {
      data.forEach(row => {
        let date = row.created;
        date = date.substring(0, date.indexOf(` `));
        date = parseInt(date.replace(/-/g, ``));
        if (date < paramDate) {
          returnData.push(row);
        }
      });
    }
    // DATE TIME
    else {
      data.forEach(row => {
        const date = parseInt(row.created.replace(/-|:|\s/g, ``));
        if (date < paramDate) {
          returnData.push(row);
        }
      });
    }

    return returnData;
  }

  // DATA + STARTTIME + ENDTIME
  else {
    const returnData = [];
    const startDateParam = parseInt(startDate.replace(/-|:|\s/g, ``));
    const endDateParam = parseInt(endDate.replace(/-|:|\s/g, ``));

    // DATE
    if (!isDateTime(startDate) && !isDateTime(endDate)) {
      data.forEach(row => {
        let date = row.created;
        date = date.substring(0, date.indexOf(` `));
        date = parseInt(date.replace(/-/g, ``));
        if (date >= startDateParam && date < endDateParam) {
          returnData.push(row);
        }
      });
    }
    // DATE TIME
    else {
      data.forEach(row => {
        const date = parseInt(row.created.replace(/-|:|\s/g, ``));
        if (date >= startDateParam && date < endDateParam) {
          returnData.push(row);
        }
      });
    }

    return returnData;
  }

};

const isDateTime = date => {
  if (date.indexOf(` `) === - 1) {
    return false;
  }
  return true;
};

const filter = (data, startParam, endParam, returnData) => {
  // FILTER BETWEEN DATES
  if (startParam !== false && endParam !== false) {

  }
  // FILTER AFTER DATE
  else if (startParam !== false) {
    data.forEach(row => {
      let date = row.created;
      date = date.substring(0, date.indexOf(` `));
      date = parseInt(date.replace(/-/g, ``));
      if (date >= startParam) {
        returnData.push(row);
      }
    });
  }
  // FILTER BEFORE DATE
  else {

  }
};

exports.getFilteredDataBetween = filters;
