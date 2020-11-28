var viz1, viz2, viz3, viz4, g1;

var width;
var height;
var innerWidth;
var innerHeight;

const margin = {top: 40, right: 60, bottom: 120, left: 100};

var teamStats = [];

document.addEventListener('DOMContentLoaded', function () {


    viz1 = d3.select("#viz1");
    viz2 = d3.select("#viz2");
    viz3 = d3.select("#viz3");
    viz4 = d3.select("#viz4");


    width = +viz1.style('width').replace('px', '');
    height = +viz1.style('height').replace('px', '');
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;

    g1 = viz1
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top + 20})`);


    Promise.all([
        d3.csv('Data/nbagames.csv'),

    ])
        .then(function (values) {
            teamStats = values[0];

        });


});


function ShootingPercentage(attempted, percentage) {
    this.attempted = attempted;
    this.percentage = percentage;
}

function drawViz1(choice1, choice2) {



    g1.select("#axis-g").remove();
    g1.select("#axis-g2").remove();


    let axis = g1.append("g").attr("id", "axis-g");
    let axis2 = g1.append("g").attr("id", "axis-g2");

    console.log(teamStats);

    //Used for Graphing
    let teamShotInfo1 = [];
    let teamShotInfo2 = [];


    //Used for range
    let shotRange = [];

    teamStats.forEach((team) => {
            if (team["Team"] === choice1 && team["Opponent"] === choice2) {
                teamShotInfo1.push(new ShootingPercentage(team["FieldGoalsAttempted"], team["FieldGoals."]));
                teamShotInfo2.push(new ShootingPercentage(team["Opp.FieldGoalsAttempted"] * -1, team["Opp.FieldGoals."] * -1));
                shotRange.push(team["FieldGoals."])
            }
        }
    );

    console.log(teamShotInfo1);

    let pos = innerWidth / teamShotInfo1.length;

    var yScale = d3.scaleLinear()
        .domain([0, Math.abs(Math.max(...shotRange))])
        .range([0, 150]);


    //used for the positive and negative axis values
    var yAxisScale = d3.scaleLinear()
        .domain([-.55, Math.max(...shotRange)])
        .range([innerHeight, 0]);

    var xScale = d3.scaleLinear()
        .range([0, innerWidth])
        .domain([0, shotRange.length]);






    var div = d3.select(".grid-container").append('div')
        .attr("class", "tool-tip")
        .style("opacity", 0);



    axis
        .selectAll("rect")
        .data(teamShotInfo1)
        .enter()
        .append("rect")
        .attr("x", function (d, i) { // moves bars left and right
            return +(i * pos);
        })
        .attr("y", function (d, i) { // moves bars up or down
            return 173 - Math.max(0, yScale(d.percentage));
        })
        .attr("height", function (d) {
            return Math.abs(yScale(d.percentage));
        })
        .attr("width", pos)
        .on('mouseover', function (d, i) {
            d3.select(this)
                .transition()
                .duration('50')
                .attr('opacity', ".5");


            div.transition()
                .duration(50)
                .style("opacity", 1);



            let val = "Shots " + xScale(d.percentage);
            div.html(val)
                .style("left", (event.clientX + 20) + "px")
                .style("top", (event.clientY + 15) + "px");
        })
        .on('mousemove', function (d, i) {
            d3.select(this)
                .transition()
                .duration('50')
                .attr('opacity', ".5");


            div.transition()
                .duration(50)
                .style("opacity", 1);

            let val = "Shots " + xScale(d.percentage);
            div.html(val)
                .style("left", (event.clientX + 20) + "px")
                .style("top", (event.clientY + 15) + "px");

        })
        .on('mouseout', function (d, i) {
            d3.select(this)
                .transition()
                .duration('50')
                .attr('opacity', "1");


            div.transition()
                .duration(50)
                .style("opacity", 0);
        })

        .style("fill", function (d) {
            if (d.percentage < 0) {
                return "#2767cf";
            } else {
                return "#b0151f";
            }
        })
        .style("stroke", "black")
        .style("stroke-width", "1px");

    axis2
        .selectAll("rect")
        .data(teamShotInfo2)
        .enter()
        .append("rect")
        .attr("x", function (d, i) { // moves bars left and right
            return +(i * pos);
        })
        .attr("y", function (d, i) { // moves bars up or down
            return 173 - Math.max(0, yScale(d.percentage));
        })
        .attr("height", function (d) {
            return Math.abs(yScale(d.percentage));
        })
        .attr("width", pos)
        .style("fill", function (d) {
            if (d.percentage < 0) {
                return "#2767cf";
            } else {
                return "#b0151f";
            }
        })
        .on('mouseover', function (d, i) {
            d3.select(this)
                .transition()
                .duration('50')
                .attr('opacity', ".5");


            div.transition()
                .duration(50)
                .style("opacity", 1);


            // let val = "Shot " + d.attempted + " times" + "</br>" + "Made "+ d.percentage + "%";

            div.html("hi")
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px");

        })
        .on('mouseout', function (d, i) {
            d3.select(this)
                .transition()
                .duration('50')
                .attr('opacity', "1");


            div.transition()
                .duration(50)
                .style("opacity", 0);
        })

        .style("stroke", "black")
        .style("stroke-width", "1px");


    var yAxis = d3.axisLeft(yAxisScale);

    axis.append("g").call(yAxis)
        .attr("transform", "translate(0," + 0  + ")");


    var xAxis = d3.axisBottom(xScale);/*.tickFormat("");remove tick label*/

    axis.append("g").call(xAxis)
        .attr("transform", "translate(0," + (innerHeight) + ")");


    axis.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('dy', "-40")
        .attr('dx', '-250')
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .text("Shot Percentage Made");


    axis.append('text')
        .attr('transform', `translate(${(innerWidth / 2) - 150},${innerHeight + 40})`)
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .text("Game Played During Regular Season");

    //USE LATER
    // g1.append("text")
    //     .attr("x", innerWidth - 245)
    //     .attr("y", innerHeight - 10)
    //     .attr("opacity", .5)
    //     .attr("font-size", "50px")
    //     .text("1880-1950");


}

function drawViz2() {

}

function drawViz3() {

}

function drawViz4() {

}