var viz1, viz2, viz3, viz4, g1, dropDown;

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
        .attr("id", "g1")
        .attr('transform', `translate(${margin.left},${margin.top + 20})`);


    Promise.all([
        d3.csv('Data/nbagames.csv'),

    ])
        .then(function (values) {
            teamStats = values[0];

        });


});


function mousemove(axis) {


    var div = d3.select("body").append('div')
        .attr("class", "tool-tip")
        .style("opacity", 0);

    axis.selectAll("rect")
        .on("mousemove", function (d) {

            d3.select(this)
                .attr('opacity', ".5");

            div.transition()
                .duration(50)
                .style("opacity", 1);

            if (d3.select("#selectBox").property("value") === "field-goals") {

                let number = d["val"] * 100;
                let rounded = Math.round(number * 10) / 10;
                let fixed = rounded.toFixed(1);


                if (d["val"] < 0) {
                    let val = "Field Goal Percentage: " + fixed * -1 + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                } else {

                    let val = "Percentage Made: " + fixed + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                }

            } else if (d3.select("#selectBox").property("value") === "assists") {
                if (d["val"] < 0) {
                    let val = "Assists : " + d["val"] * -1 + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                } else {

                    let val = "Assists : " + d["val"] + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                }
            } else if (d3.select("#selectBox").property("value") === "blocks") {
                if (d["val"] < 0) {
                    let val = "Blocks : " + d["val"] * -1 + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                } else {

                    let val = "Blocks : " + d["val"] + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                }
            } else if (d3.select("#selectBox").property("value") === "steals") {
                if (d["val"] < 0) {
                    let val = "Steals : " + d["val"] * -1 + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                } else {

                    let val = "Steals : " + d["val"] + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                }
            } else if (d3.select("#selectBox").property("value") === "rebounds") {
                if (d["val"] < 0) {
                    let val = "Offensive Rebounds : " + d["val"] * -1 + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                } else {

                    let val = "Offensive Rebounds : " + d["val"] + "</br>" + "Game: " + d["game"];

                    div.html(val)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 15) + "px");
                }
            }


        })
        .on('mouseout', function (d, i) {
            d3.select(this)
                .attr('opacity', "1");

            div.transition()
                .duration(50)
                .style("opacity", 0);
        })

        .style("stroke", "black")
        .style("stroke-width", "1px");

}


function Statistic(attempted, game) {
    this.val = attempted;
    this.game = game;
}


function AxisLabels(axis) {

    let selection = d3.select("#selectBox").property("value");
    let labelX = "Game Played During The Season";
    let labelY;

    if (selection === "field-goals") {
        labelY = "Field Goal Percent"

    } else if (d3.select("#selectBox").property("value") === "assists") {
        labelY = "Assists Per Game"


    } else if (d3.select("#selectBox").property("value") === "blocks") {
        labelY = "Blocks Per Game"


    } else if (d3.select("#selectBox").property("value") === "steals") {
        labelY = "Steals Per Game"


    } else if (d3.select("#selectBox").property("value") === "rebounds") {
        labelY = "Offensive Rebounds Per Game"

    }


    axis.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('dy', "-40")
        .attr('dx', '-250')
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .text(labelY);


    axis.append('text')
        .attr('transform', `translate(${(innerWidth / 2) - 150},${innerHeight + 40})`)
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .text(labelX);

}

function drawViz1(choice1, choice2) {


    g1.select("#axis-g2").remove();
    g1.select("#axis-g").remove();


    let axis = g1.append("g").attr("id", "axis-g");
    let axis2 = g1.append("g").attr("id", "axis-g2");

    console.log(teamStats);

    //Used for Graphing
    let teamShotInfo1 = [];
    let teamShotInfo2 = [];


    //Used for range
    let Range1 = [];
    let Range2 = [];
    let i = 1;

    let selectVal = d3.select("#selectBox").property("value");
    if (selectVal === "field-goals") {
        teamStats.forEach((team) => {
                if (team["Team"] === choice1 && team["Opponent"] === choice2) {
                    teamShotInfo1.push(new Statistic(team["FieldGoals."], i));
                    teamShotInfo2.push(new Statistic((team["Opp.FieldGoals."] * -1), i));
                    Range1.push(+team["FieldGoals."]);
                    Range2.push(+team["Opp.FieldGoals."]);
                    i++;
                }
            }
        );
    } else if (selectVal === "assists") {
        teamStats.forEach((team) => {
                if (team["Team"] === choice1 && team["Opponent"] === choice2) {
                    teamShotInfo1.push(new Statistic(team["Assists"], i));
                    teamShotInfo2.push(new Statistic((team["Opp.Assists"] * -1), i));
                    Range1.push(+team["Assists"]);
                    Range2.push(+team["Opp.Assists"]);
                    i++;
                }
            }
        );
    } else if (selectVal === "blocks") {
        teamStats.forEach((team) => {
                if (team["Team"] === choice1 && team["Opponent"] === choice2) {
                    teamShotInfo1.push(new Statistic(team["Blocks"], i));
                    teamShotInfo2.push(new Statistic((team["Opp.Blocks"] * -1), i));
                    Range1.push(+team["Blocks"]);
                    Range2.push(+team["Opp.Blocks"]);
                    i++;
                }
            }
        );
    } else if (selectVal === "steals") {
        teamStats.forEach((team) => {
                if (team["Team"] === choice1 && team["Opponent"] === choice2) {
                    teamShotInfo1.push(new Statistic(team["Steals"], i));
                    teamShotInfo2.push(new Statistic((team["Opp.Steals"] * -1), i));
                    Range1.push(+team["Steals"]);
                    Range2.push(+team["Opp.Steals"]);
                    i++;
                }
            }
        );
    } else if (selectVal === "rebounds") {
        teamStats.forEach((team) => {
                if (team["Team"] === choice1 && team["Opponent"] === choice2) {
                    teamShotInfo1.push(new Statistic(team["OffRebounds"], i));
                    teamShotInfo2.push(new Statistic((team["Opp.OffRebounds"] * -1), i));
                    Range1.push(+team["OffRebounds"]);
                    Range2.push(+team["Opp.OffRebounds"]);
                    i++;
                }
            }
        );
    }


    let pos = innerWidth / Range1.length;


    let range;
    if (Math.max(...Range2) < Math.max(...Range1)) {
        range = Math.max(...Range1);
    } else {
        range = Math.max(...Range2);
    }
    var yScale = d3.scaleLinear()
        .domain([0, range])
        .range([0, 168]);


    //used for the positive and negative axis values
    var yAxisScale = d3.scaleLinear()
        .domain([-range, range])
        .range([innerHeight, 0]);

    var xScale = d3.scaleLinear()
        .range([0, innerWidth])
        .domain([0, teamShotInfo1.length]);


    axis
        .selectAll("rect")
        .data(teamShotInfo1)
        .enter()
        .append("rect")
        .attr("x", function (d, i) { // moves bars left and right
            return +(i * pos);
        })
        .attr("y", function (d, i) { // moves bars up or down
            return yScale(0);
        })
        .attr("height", function (d) {
            return yScale(0);
        })
        .attr("width", pos)
        .style("fill", function (d) {
            if (d.val < 0) {
                return "#2767cf";
            } else {
                return "#b0151f";
            }
        })
        .on('end', mousemove(axis));


    axis
        .selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function (d, i) { // moves bars up or down
            return 171 - Math.max(0, yScale(d.val));
        })
        .attr("height", function (d) {
            return Math.abs(yScale(d.val));
        })
        .delay(function (d, i) {
            return (i * 100)
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
            return yScale(0);
        })
        .attr("height", function (d) {
            return yScale(0);
        })
        .attr("width", pos)
        .style("fill", function (d) {
            if (d.val < 0) {
                return "#2767cf";
            } else {
                return "#b0151f";
            }
        })
        .on('end', mousemove(axis2))
        .style("stroke", "black")
        .style("stroke-width", "1px");


    axis2
        .selectAll("rect")
        .transition()
        .duration(800)
        // .attr("x", function (d, i) { // moves bars left and right
        //     return +(i * pos);
        // })
        .attr("y", function (d, i) { // moves bars up or down
            return 171 - Math.max(0, yScale(d.val));
        })
        .attr("height", function (d) {
            return Math.abs(yScale(d.val));
        })
        .delay(function (d, i) {
            return (i * 100)
        })


        .style("stroke", "black")
        .style("stroke-width", "1px");


    var yAxis = d3.axisLeft(yAxisScale);

    var formatter = d3.format("0");


    axis.append("g").call(yAxis
        .tickFormat(function (d) {
            if (d < 0) d = -d; // No nagative labels
            return formatter(d);
        }))
        .attr("transform", "translate(0," + 0 + ")");


    var xAxis = d3.axisBottom(xScale);/*.tickFormat("");remove tick label*/

    axis.append("g").call(xAxis)
        .attr("transform", "translate(0," + (innerHeight) + ")");


    AxisLabels(axis);


    //USE LATER
    axis.append("text")
        .attr("transform", `translate(${(innerWidth + 15)},${(innerHeight/2) - 65}) rotate(-90)`)
        .attr("opacity", 1)
        .attr("font-size", "12px")
        .text(choice1);

    axis.append("text")
        .attr("transform", `translate(${(innerWidth + 15)},${(innerHeight/2) + 65}) rotate(-90)`)
        .attr("opacity", 1)
        .attr("font-size", "12px")
        .text(choice2);


}

function drawViz2() {

}

function drawViz3() {

}

function drawViz4() {

}

