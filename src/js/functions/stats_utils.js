import * as d3 from 'd3';

const timeParse = milliseconds => {
  let seconds = parseInt((milliseconds / 1000) % 60);
  let minutes = parseInt((milliseconds / 60000) % 60);
  minutes = checkLength(minutes);
  seconds = checkLength(seconds);
  return `${minutes}:${seconds}`;
};

const checkLength = value => value < 10 ? `0${value}` : value;

const createUsageChart = (data, parentSVG, title) => {

  let max = 0;
  let count = 0;
  let sum = 0;
  let scoreSum = 0;

  if (data.length !== 0) {
    data.forEach(data => {
      count ++;
      sum += data.duration;
      scoreSum += data.score;
      const duration = data.duration / 10000;
      if (max < duration) {
        max = duration;
      }
    });
  }

  const avg = sum / data.length;
  const scoreAvg = parseInt(scoreSum / data.length);

  const width = 800;
  const height = 300;
  const barWidth = 1;

  const x = d3.scaleLinear()
    .domain([0, max])
    .range([0, (height - (height / 20))]);

  const svg = d3.select(parentSVG)
    .attr(`width`, width + 140)
    .attr(`height`, height + 140);

  const grid = svg.append(`g`)
    .attr(`class`, `grid`)
    .attr(`style`, `font-size: 1.2rem`)
    .attr(`transform`, `translate(0, 50)`);

  const info = svg.append(`g`)
    .attr(`class`, `info`)
    .attr(`style`, `font-size: 1.4rem`)
    .attr(`transform`, `translate(0, 50)`);

  const bars = svg.append(`g`)
    .attr(`class`, `bars`)
    .attr(`transform`, `translate(0, 50)`);

  for (let i = 1;i < 20;i ++) {
    grid.append(`rect`)
      .attr(`transform`, () => {
        const yPos = height - ((height / 20) * i);
        return `translate(100, ${yPos})`;
      })
      .attr(`width`, width + 40)
      .attr(`height`, 1)
      .attr(`fill`, `#f2f2f2`);
    grid.append(`text`)
      .attr(`x`, 55)
      .attr(`y`, height - ((height / 20) * i) + 4)
      .text(() => {
        const milliseconds = Math.round(((max * 10000) / 19) * i);
        return timeParse(milliseconds);
      });
  }

  if (data.length !== 0) {

    bars.selectAll(`g`)
      .data(d3.values(data))
      .enter().append(`rect`)
      .attr(`height`, data => {
        let duration = data.duration / 10000;
        duration = x(duration);
        return duration;
      })
      .attr(`width`, () => {
        let bWidth = (width / count) - 2;
        if (bWidth > barWidth) {
          bWidth = barWidth;
        }
        if (bWidth < 1) {
          bWidth = 1;
        }
        return bWidth;
      })
      .attr(`transform`, (data, index) => {
        let duration = data.duration / 10000;
        duration = x(duration);
        let xOffset = width / count;
        if (xOffset > 20) {
          xOffset = 20;
        }
        return `translate(${(index * xOffset) + 140}, ${height - duration})`;
      })
      .attr(`fill`, `black`);

    info.append(`text`)
      .attr(`x`, `-200`)
      .attr(`y`, `15`)
      .attr(`style`, `transform: rotate(-90deg)`)
      .text(`GAME DURATION IN MINUTES`);

    info.append(`text`)
      .attr(`x`, `50%`)
      .attr(`y`, `0`)
      .attr(`style`, `font-size: 2rem; transform: translate(-50%, 0)`)
      .text(title);

    const infoLeft = info.append(`g`)
      .attr(`class`, `info_name`);

    const infoRight = info.append(`g`)
      .attr(`class`, `info_value`);

    infoLeft.append(`text`)
      .attr(`x`, width - 100)
      .attr(`y`, height + 40)
      .text(`TIMES PLAYED:`);

    infoRight.append(`text`)
      .attr(`x`, width + 80)
      .attr(`y`, height + 40)
      .text(count);

    infoLeft.append(`text`)
      .attr(`x`, width - 100)
      .attr(`y`, height + 60)
      .text(`AVERAGE DURATION:`);

    infoRight.append(`text`)
      .attr(`x`, width + 80)
      .attr(`y`, height + 60)
      .text(timeParse(avg));

    infoLeft.append(`text`)
      .attr(`x`, width - 100)
      .attr(`y`, height + 80)
      .text(`AVERAGE SCORE:`);

    infoRight.append(`text`)
      .attr(`x`, width + 80)
      .attr(`y`, height + 80)
      .text(scoreAvg);

  } else {

    info.append(`text`)
      .attr(`x`, 300)
      .attr(`y`, 158)
      .attr(`style`, `font-size: 1.8rem`)
      .text(`NO GAME DATA BETWEEN CHOSEN DATES`);

  }

};

const getFilteredDataBetween = (data, startDate, endDate) => {

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
        // Safari invalid date workaround (doesn't pass jest)
        // puts a `T` in between date and time to have a valid date
        // const date = new Date(row.created.replace(/\s/g, `T`));
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
    if (DateTime) date = parseInt(row.created.replace(/-|:|\s|[tT]/g, ``));
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

exports.getFilteredDataBetween = getFilteredDataBetween;
exports.createUsageChart = createUsageChart;
