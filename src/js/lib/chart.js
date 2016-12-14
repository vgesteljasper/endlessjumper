import * as d3 from 'd3';

const timeParse = milliseconds => {
  let seconds = parseInt((milliseconds / 1000) % 60);
  let minutes = parseInt((milliseconds / 60000) % 60);
  minutes = checkLength(minutes);
  seconds = checkLength(seconds);
  return `${minutes}:${seconds}`;
};

const checkLength = value => value < 10 ? `0${value}` : value;

export default (data, parentSVG, title) => {

  let max = 0;
  let count = 0;
  data.forEach(data => {
    count ++;
    const duration = data.duration / 10000;
    if (max < duration) {
      max = duration;
    }
  });

  const width = 800;
  const height = 300;
  const barWidth = 2;

  const x = d3.scaleLinear()
    .domain([0, max])
    .range([0, (height - (height / 20))]);

  const svg = d3.select(parentSVG)
    .attr(`width`, `${width + 100}px`)
    .attr(`height`, `${height + 50}px`);

  for (let i = 1;i < 20;i ++) {
    svg.append(`rect`)
      .attr(`transform`, () => {
        const yPos = height - ((height / 20) * i);
        return `translate(60, ${yPos})`;
      })
      .attr(`width`, `${width + 40}`)
      .attr(`height`, `1`)
      .attr(`fill`, `#f2f2f2`);
    svg.append(`text`)
      .attr(`x`, `15`)
      .attr(`y`, height - ((height / 20) * i) + 4)
      .text(() => {
        const milliseconds = Math.round(((max * 10000) / 19) * i);
        return `${timeParse(milliseconds)}`;
      });
  }

  svg.selectAll(`g`)
    .data(d3.values(data))
    .enter().append(`rect`)
    .attr(`height`, data => {
      let duration = data.duration / 10000;
      duration = x(duration);
      return `${duration}px`;
    })
    .attr(`width`, () => {
      let bWidth = (width / count) - 2;
      if (bWidth > barWidth) {
        bWidth = barWidth;
      }
      if (bWidth < 1) {
        bWidth = 1;
      }
      return `${bWidth}px`;
    })
    .attr(`transform`, (data, index) => {
      let duration = data.duration / 10000;
      duration = x(duration);
      let xOffset = width / count;
      if (xOffset > 20) {
        xOffset = 20;
      }
      return `translate(${(index * xOffset) + 100}, ${height - duration})`;
    })
    .attr(`fill`, `black`);

  svg.append(`text`)
    .attr(`x`, `100`)
    .attr(`y`, `${height + 40}`)
    .attr(`style`, `font-size: 2rem`)
    .text(`${title}`);

};
