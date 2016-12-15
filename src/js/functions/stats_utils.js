const filters = (data, startDate, endDate) => {

  if (data === undefined && startDate === undefined && endDate === undefined) return [];
  if (data !== undefined && startDate === undefined && endDate === undefined) return data;
  const returnData = [];

  // DATA + START
  if (data !== undefined && startDate !== undefined && endDate === undefined) {
    const startParam = stringDateToInt(startDate);
    if (!isDateTime(startDate)) filter(data, startParam, false, returnData, false);
    else filter(data, startParam, false, returnData, true);
    return returnData;
  }

  // DATA + END
  if (data !== undefined && startDate === false && endDate !== undefined) {
    const endParam = stringDateToInt(endDate);
    if (!isDateTime(endDate)) filter(data, false, endParam, returnData, false);
    else filter(data, false, endParam, returnData, true);
    return returnData;
  }

  // DATA + START + END
  else {
    if (typeof startDate.getMonth === `function` && typeof endDate.getMonth === `function`) {
      data.forEach(row => {
        const date = new Date(row.created);
        if (date >= startDate && date < endDate) returnData.push(row);
      });
    } else {
      const startParam = stringDateToInt(startDate);
      const endParam = stringDateToInt(endDate);
      if (!isDateTime(startDate) && !isDateTime(endDate)) filter(data, startParam, endParam, returnData, false);
      else filter(data, startParam, endParam, returnData, true);
    }
    return returnData;
  }

};

const isDateTime = date => {
  if (date.indexOf(` `) === - 1) return false;
  return true;
};

const stringDateToInt = date => {
  return parseInt(date.replace(/-|:|\s/g, ``));
};

const filter = (data, startParam, endParam, returnData, DateTime) => {
  data.forEach(row => {
    let date;
    if (DateTime) date = parseInt(row.created.replace(/-|:|\s/g, ``));
    else date = parseInt(row.created.substring(0, row.created.indexOf(` `)).replace(/-/g, ``));
    if (startParam !== false && endParam !== false) {
      if (date >= startParam && date < endParam) returnData.push(row);
    } else {
      if (startParam !== false) {
        if (date >= startParam) returnData.push(row);
      } else {
        if (date < endParam) returnData.push(row);
      }
    }
  });
};

exports.getFilteredDataBetween = filters;
