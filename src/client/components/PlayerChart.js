
import React from 'react';
import * as d3 from 'd3';

const leastSquares = (xSeries, ySeries) => {
  const reduceSumFunc = (prev, cur) => { return prev + cur; };

  var xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
  var yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;

  var ssXX = xSeries.map((d) => { return Math.pow(d - xBar, 2); })
    .reduce(reduceSumFunc);

  var ssYY = ySeries.map((d) => { return Math.pow(d - yBar, 2); })
    .reduce(reduceSumFunc);

  var ssXY = xSeries.map((d, i) => { return (d - xBar) * (ySeries[i] - yBar); })
    .reduce(reduceSumFunc);

  var slope = ssXY / ssXX;
  var intercept = yBar - (xBar * slope);
  var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);

  return [slope, intercept, rSquare];
};


const decimalFormat = d3.format("0.2f");


class PlayerChart extends React.Component {

  drawChart(data) {
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const xValue = (d) => (d.draftPick);
    const xScale = d3.scale.linear().range([0, width]);
    const xMap = (d) => (xScale(xValue(d)));
    const xAxis = d3.svg.axis().scale(xScale).orient('bottom');

    const yValue = (d) => (d.arrestCount);
    const yScale = d3.scale.linear().range([height, 0]);
    const yMap = (d) => (yScale(yValue(d)));
    const yAxis = d3.svg.axis().scale(yScale).orient('left');

    const div = this.refs.playerChart;
    const svg = d3.select(div).append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const tooltip = d3.select(div).append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("top", 0)
      .style("left", 0);

    data.map((d) => {
      d.draftPick = +d.draftPick;
      d.numArrests = +d.arrestCount;
    });

    xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue) + 1]);
    yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue) + 1]);

    // x-axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", (width + (margin.left + margin.right) )/ 2)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .text("Overall Draft Pick");

    // y-axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Arrests");

    // draw dots
    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .on("mouseover", function(d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(d["name"] + "<br/> (" + xValue(d)
          + ", " + yValue(d) + ")")
      })
      .on("mouseout", function(d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

  }

  render() {
    const players = this.props.players || {};
    const rows = players.data || [];
    if(rows.length){
      this.drawChart(rows);
    }
    return (
      <div ref="playerChart" className="flex four grow">
      </div>

    );
  }
}

export default PlayerChart;
