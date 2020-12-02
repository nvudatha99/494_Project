var viz1, viz2, viz3, viz4, g1, g2, g3, dropDown;

var width;
var height;
var innerWidth;
var innerHeight;

var attTrack = ["TeamPoints", "Steals", "Blocks", "FreeThrows", "FieldGoals", "TurnOvers", "TotalRebounds", "FreeThrowsAttempted", "FieldGoalsAttempted", "TotalFouls", "TotalRebounds", "Turnovers"]; //For Swarm Graph

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
    g2 = viz2
        .append('g')
        .attr("id", "g1")
        .attr('transform', `translate(${margin.left},${margin.top + 20})`);
    g3 = viz3
        .append('g')
        .attr("id", "g1")
        .attr('transform', `translate(${margin.left},${margin.top + 20})`);


    Promise.all([
        d3.csv('Data/nbagames.csv'),

    ])
        .then(function (values) {
            teamStats = values[0];


            drawPie("#ATLviz");
            drawPie("#BOSviz");
            drawPie("#BRKviz");
            drawPie("#CHOviz");
            drawPie("#CHIviz");
            drawPie("#DALviz");
            drawPie("#DENviz");
            drawPie("#DETviz");
            drawPie("#GSWviz");
            drawPie("#HOUviz");
            drawPie("#INDviz");
            drawPie("#LACviz");
            drawPie("#LALviz");
            drawPie("#MEMviz");
            drawPie("#MIAviz");

            drawPie("#MILviz");
            drawPie("#MINviz");
            drawPie("#NOPviz");
            drawPie("#NYKviz");
            drawPie("#OKCviz");
            drawPie("#ORLviz");
            drawPie("#PHIviz");
            drawPie("#PHOviz");
            drawPie("#PORviz");
            drawPie("#SACviz");
            drawPie("#SASviz");
            drawPie("#TORviz");
            drawPie("#UTAviz");
            drawPie("#WASviz");
            drawPie("#CLEviz");

            info();

        });


});

function colorScale(bool) {

    if (d3.select("#selectBox").property("value") === "field-goals") {
        if (Boolean(bool)) {
            return "#eb4034";
        } else {
            return "#114591";
        }

    } else if (d3.select("#selectBox").property("value") === "assists") {
        if (Boolean(bool)) {
            return "#bf13b4"

        } else {
            return "#bf4913"
        }

    } else if (d3.select("#selectBox").property("value") === "blocks") {
        if (Boolean(bool)) {
            return "#22961a"
        } else {
            return "#c1ed24"
        }
    } else if (d3.select("#selectBox").property("value") === "steals") {
        if (Boolean(bool)) {
            return "#a724ed"
        }
        else{
            return "#24e3ed"
        }

    } else if (d3.select("#selectBox").property("value") === "rebounds") {
        if (Boolean(bool)) {
            return "#edad24"
        }
        else{
            return "#6eeb96"
        }

    }


}


function mousemove(axis, choice1, choice2) {


    var div = d3.select("body").append('div')
        .attr("class", "tool-tip")
        .style("opacity", 0);

    axis.selectAll("rect")
        .on("click", function (d) {
            drawViz4(choice1, choice2, d["game"])
        })
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


    console.log(choice1);
    console.log(choice2);


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
        .style("fill", colorScale(0))
        .on('end', mousemove(axis, choice1, choice2));


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
        .style("fill", colorScale(1))
        .on('end', mousemove(axis2, choice1, choice2))
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
        .attr("transform", `translate(${(innerWidth + 15)},${(innerHeight / 2) - 65}) rotate(-90)`)
        .attr("opacity", 1)
        .attr("font-size", "12px")
        .text(choice1);

    axis.append("text")
        .attr("transform", `translate(${(innerWidth + 15)},${(innerHeight / 2) + 65}) rotate(-90)`)
        .attr("opacity", 1)
        .attr("font-size", "12px")
        .text(choice2);


}

function info() {

    let text = "";
    g2.append("text")
        .attr("transform", `translate(${0},${(innerHeight / 2) + 65})`)
        .attr("opacity", 1)
        .attr("font-size", "100px")
        .text(text);
}
function drawPie(vizType){

    var threepointer = 0;
    var fieldgoal = 0;
    var freethrow = 0;
    var teamName = vizType.substring(1,4);


    teamStats.forEach((team) => {
        if(teamName === team["Team"]){
            freethrow += parseInt(team["FreeThrows"]);
            fieldgoal += (parseInt(team["FieldGoals"]) - parseInt(team["X3PointShots"])) * 2;
            threepointer += parseInt(team["X3PointShots"]) * 3;
        }
    });

    var width1 = 150
    height1 = 150
    margin1 = 5

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width1, height1) / 2 - margin1

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select(vizType)
        .append("svg")
        .attr("width", width1)
        .attr("height", height1)
        .append("g")
        .attr("transform", "translate(" + width1/2 + "," + height1/2 + ")");

    // Create dummy data
    var data = {a: threepointer, b: fieldgoal, c: freethrow}

    var totalPoints = threepointer + fieldgoal + freethrow;
    var threePercent = Math.round((threepointer/totalPoints) * 100);
    var fgPercent = Math.round((fieldgoal/totalPoints) * 100);
    var ftPercent = Math.round((freethrow/totalPoints) * 100);

    // set the color scale
    var color = d3.scaleOrdinal()
        .domain(data)
        .range(["#000000", "#ff0000", "#1500ff"])

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))

    var div = d3.select("body").append("div").attr("class", "tool-tip").attr("id", teamName);
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(60)         // This is the size of the donut hole
            .outerRadius(radius)
        )
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mousemove", function (d, i) {

            if(d.data.key === "a"){
                var tooltip = "Team: " + teamName + "<br> Shots that are thee pointers: " + threePercent + "% ";
            }
            else if(d.data.key === "b"){
                var tooltip = "Team: " + teamName + "<br> Shots that are field goals: " + fgPercent + "% ";
            }
            else{
                var tooltip = "Team: " + teamName + "<br> Shots that are free throws: " + ftPercent + "% ";
            }
            //console.log(tooltip);
            div
                .html(tooltip)
                .style("left", d3.event.pageX + 15 + "px")
                .style("top", d3.event.pageY - 10 + "px")
                .style("opacity", 1);
        })
        .on("mouseout", function (d, i) {
            div.style("opacity", 0);
        });
}

function drawViz3(choice1, choice2) {

    console.log(choice1);
    console.log(choice2);

    g3.select("#axis-g").remove();

    let axis = g3.append("g").attr("id", "axis-g");


    // console.log(teamStats);

    let teamShotInfoOne = [];
    let teamShotInfoTwo = [];

    //Used for range
    let Range1 = [];
    let Range2 = [];
    let i = 1;

    let selectVal = d3.select("#selectBox").property("value");
    if (selectVal === "field-goals") {
        teamStats.forEach((team) => {
                if (team["Team"] === choice1 && team["Opponent"] === choice2) {
                    teamShotInfoOne.push(new Statistic(team["FieldGoals."], i));
                    teamShotInfoTwo.push(new Statistic((team["Opp.FieldGoals."] * -1), i));
                    Range1.push(+team["FieldGoals."]);
                    Range2.push(+team["Opp.FieldGoals."]);
                    i++;
                }
            }
        );
    } else if (selectVal === "assists") {
        teamStats.forEach((team) => {
                if (team["Team"] === choice1 && team["Opponent"] === choice2) {
                    teamShotInfoOne.push(new Statistic(team["Assists"], i));
                    teamShotInfoTwo.push(new Statistic((team["Opp.Assists"] * -1), i));
                    Range1.push(+team["Assists"]);
                    Range2.push(+team["Opp.Assists"]);
                    i++;
                }
            }
        );
    } else if (selectVal === "blocks") {
        teamStats.forEach((team) => {
                if (team["Team"] === choice1 && team["Opponent"] === choice2) {
                    teamShotInfoOne.push(new Statistic(team["Blocks"], i));
                    teamShotInfoTwo.push(new Statistic((team["Opp.Blocks"] * -1), i));
                    Range1.push(+team["Blocks"]);
                    Range2.push(+team["Opp.Blocks"]);
                    i++;
                }
            }
        );
    } else if (selectVal === "steals") {
        teamStats.forEach((team) => {
                if (team["Team"] === choice1 && team["Opponent"] === choice2) {
                    teamShotInfoOne.push(new Statistic(team["Steals"], i));
                    teamShotInfoTwo.push(new Statistic((team["Opp.Steals"] * -1), i));
                    Range1.push(+team["Steals"]);
                    Range2.push(+team["Opp.Steals"]);
                    i++;
                }
            }
        );
    } else if (selectVal === "rebounds") {
        teamStats.forEach((team) => {
                if (team["Team"] === choice1 && team["Opponent"] === choice2) {
                    teamShotInfoOne.push(new Statistic(team["OffRebounds"], i));
                    teamShotInfoTwo.push(new Statistic((team["Opp.OffRebounds"] * -1), i));
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
        .domain([0, range])
        .range([innerHeight, 0]);

    var xScale = d3.scaleLinear()
        .range([0, innerWidth])
        .domain([0, teamShotInfoOne.length]);

    console.log("Teaminfo1:", teamShotInfoOne);
    console.log("Teaminfo2:", teamShotInfoTwo);

    const singleLine = d3.line().curve(d3.curveNatural)
        .x(d => xScale(d.game))
        .y(d => yAxisScale(d.val))

    const singleLine2 = d3.line().curve(d3.curveNatural)
        .x(d => xScale(d.game))
        .y(d => yAxisScale(d.val))

    axis.append('path')
        .datum(teamShotInfoOne)
        // .attr('class', 'singleLine')
        .style('fill', 'none')
        .style('stroke', 'red')
        .style('stroke-width', '2')
        .attr('d', singleLine);

    axis.selectAll("dot")
        .data(teamShotInfoOne)
        .enter().append("circle")
        .style("fill", "red")
        .attr("r", 4)
        .attr("cx", function (d) {
            console.log(d.game)
            return xScale(d.game);
        })
        .attr("cy", function (d) {
            console.log(d.val)
            return yAxisScale(Math.abs(d.val));
        })


    axis.append('path')
        .datum(teamShotInfoTwo)
        // .attr('class', 'singleLine')
        .style('fill', 'none')
        .style('stroke', 'red')
        .style('stroke-width', '2')
        .attr('d', singleLine2);

    axis.selectAll("dot")
        .data(teamShotInfoTwo)
        .enter().append("circle")
        .attr("r", 4)
        .style("fill", "blue")
        .attr("cx", function (d) {
            console.log(d.game)
            return xScale(d.game);
        })
        .attr("cy", function (d) {
            console.log(d.val)
            return yAxisScale(Math.abs(d.val));
        })


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
        // .attr("transform", `translate(${(innerWidth + 15)},${(innerHeight / 2) - 65})`)
        .attr("x", margin.bottom)
        .attr("y", margin.bottom + 290)
        .attr("opacity", 1)
        .attr("font-size", "12px")
        .text(choice1);

    axis.append("text")
        .attr("x", margin.bottom + 370)
        .attr("y", margin.bottom + 290)
        .attr("opacity", 1)
        .attr("font-size", "12px")
        .text(choice2);

}

function drawViz4(choice1, choice2, selectedGame) {
    drawSwarm(choice1, choice2, selectedGame);
}

function drawSwarm(choice1, choice2, selectedGame) {
    viz4.selectAll("*").remove();
    var div = d3.select("body").append('div')
        .attr("class", "tool-tip")
        .style("opacity", 0);

    console.log("Drawing Swarm:");
    console.log(teamStats);

    //Used for Graphing
    let teamShotInfo = [];
    var IndexID = 1;

    teamStats.forEach((team) => {
            if (team["Team"] === choice1 && team["Opponent"] === choice2) {
                var teamShotInfoEntry1 = {
                    GameIndex: IndexID,
                    TeamName: team["Team"],
                    Opp: "No",
                    TeamPoints: team["TeamPoints"],
                    Steals: team["Steals"],
                    GameID: team["Game"],
                    Blocks: team["Blocks"],
                    FreeThrows: team["FreeThrows"],
                    FieldGoals: team["FieldGoals"],
                    TurnOvers: team["Turnovers"],
                    TotalRebounds: team["TotalRebounds"],
                    FreeThrowsAttempted: team["FreeThrowsAttempted"],
                    FieldGoalsAttempted: team["FieldGoalsAttempted:"],
                    TotalFouls: team["TotalFouls"],
                    TotalRebounds: team["TotalRebounds"],
                    Turnovers: team["Turnovers"]
                };
                var teamShotInfoEntry2 = {
                    GameIndex: IndexID,
                    TeamName: team["Opponent"],
                    Opp: "Yes",
                    TeamPoints: team["OpponentPoints"],
                    Steals: team["Opp.Steals"],
                    GameID: team["Game"],
                    Blocks: team["Opp.Blocks"],
                    FreeThrows: team["Opp.FreeThrows"],
                    FieldGoals: team["Opp.FieldGoals"],
                    TurnOvers: team["Opp.Turnovers"],
                    TotalRebounds: team["Opp.TotalRebounds"],
                    FreeThrowsAttempted: team["Opp.FreeThrowsAttempted"],
                    FieldGoalsAttempted: team["Opp.FieldGoalsAttempted"],
                    TotalFouls: team["Opp.TotalFouls"],
                    TotalRebounds: team["Opp.TotalRebounds"],
                    Turnovers: team["Opp.Turnovers"]
                };
                teamShotInfo.push(teamShotInfoEntry1);
                teamShotInfo.push(teamShotInfoEntry2);
                IndexID++;
            }
        }
    );

    console.log(teamShotInfo);
    let sectors = Array.from(new Set(teamShotInfo.map((d) => d.Opp)));
    let xCoords = sectors.map((d, i) => (innerWidth / 2) - 50 + i * 200);
    let xScale = d3.scaleOrdinal().domain(sectors).range(xCoords);

    let yScale = d3
        .scaleLinear()
        .domain([0, 125])
        .range([height - 50, 50]); // using 25 just to provide some margin at the top and bottom

    let size = d3.scaleLinear().domain([0, 150]).range([15, 40]);

    var selectedData = teamShotInfo.filter(d => d.GameIndex == selectedGame);
    // console.log(selectedData);
    var data = splitTeamData(selectedData);

    //Draw Axis
    var yAxis = d3.axisLeft(yScale)
        .tickSize(width - 100);

    viz4.append("g").call(yAxis)
        .attr("transform", `translate(${innerWidth + 90}, 10)`);

    console.log(innerWidth);
    viz4.append('text')
        .attr('transform', 'rotate(90)')
        .attr('dy', -innerWidth - 100)
        .attr('dx', '180px')
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .style("font-size", "larger")
        .style("font-weight", " 500")
        .text("Game Attribute Values");

    viz4.select(".domain").remove();
    viz4.selectAll(".tick line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");


    viz4.append('text')
        .attr('transform', `translate(${(innerWidth / 2) - 75},${innerHeight + 150})`)
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .text("Team 1");

    viz4.append('text')
        .attr('transform', `translate(${(innerWidth / 2) + 125},${innerHeight + 150})`)
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .text("Team 2");


    function check() {
        if (selectedGame == null) {
            return "0";
        } else {
            return selectedGame.toString();
        }
    }

    viz4.append('text')
        .attr('transform', `translate(${(innerWidth / 2) - 25},${innerHeight - 320})`)
        .style("fill", "gray")
        .style('text-anchor', 'center')
        .style("font-size", "larger")
        .style("font-weight", " 500")
        .text("Statistics for Game:\t" + check());

    //Draw Dots
    viz4.selectAll(".circ")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "circ")
        .attr("stroke", "black")
        .attr("fill", function (d) {
            console.log(d);
            if (d.Opp == 'No') {
                return colorScale(0);
            } else {
                return colorScale(1)
            }
        })
        .attr("r", function (d) {
            return size(d.att_val);
        })
        .attr("cx", (d) => xScale(d.Opp))
        .attr("cy", (d) => yScale(d.att_val))
        .on('mouseover', function (d, i) {
            console.log(i.att + " -> " + i.att_val);
            d3.select(this)
                .transition()
                .duration('50')
                .attr('opacity', ".5");


            div.transition()
                .duration(50)
                .style("opacity", 1);

            let val = d.att + " = " + d.att_val;

            div.html(val)
                .style("left", (event.pageX + 35) + "px")
                .style("top", (event.pageY - 10) + "px");
        })
        .on('mousemove', function (d, i) {
            let val = d.att + " = " + d.att_val;
            div.html(val)
                .style("left", (event.pageX + 35) + "px")
                .style("top", (event.pageY - 10) + "px");
        })
        .on('mouseout', function (d, i) {
            d3.select(this)
                .transition()
                .duration('50')
                .attr('opacity', "1");


            div.transition()
                .duration(50)
                .style("opacity", 0);
        });

    let simulation = d3.forceSimulation(data)
        .force("x", d3.forceX((d) => {
            return xScale(d.Opp);
        }).strength(.7))
        .force("y", d3.forceY((d) => {
            return yScale(d.att_val);
        }).strength(1))
        .force("collide", d3.forceCollide((d) => {
            return size(d.att_val);
        }))
        .alphaDecay(.5)
        .alpha(.3)
        .on("tick", tick);

    function tick() {
        viz4.selectAll(".circ")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y);
    }

    simulation.alphaDecay(0.1);

}

function moveDots(teamShotInfo, xScale, yScale, size, selectedGame) {
    var selectedData = teamShotInfo.filter(d => d.GameIndex == selectedGame);
    var data = splitTeamData(selectedData);
    viz4.selectAll("circle")
        .data(data)
        .transition()
        .duration(220)
        .attr("r", function (d) {
            return size(d.att_val);
        })
        .attr("cx", (d) => xScale(d.Opp))
        .attr("cy", (d) => yScale(d.att_val));

    let simulation = d3.forceSimulation(data)
        .force("x", d3.forceX((d) => {
            return xScale(d.Opp);
        }).strength(0.7))
        .force("y", d3.forceY((d) => {
            return yScale(d.att_val);
        }).strength(1))
        .force("collide", d3.forceCollide((d) => {
            return size(d.att_val);
        }))
        .alphaDecay(1)
        .alpha(0.3)
        .on("tick", tick);

    function tick() {
        viz4.selectAll(".circ")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y);
    }

    simulation.alphaDecay(0.1);
}

function splitTeamData(sData) {
    var res = [];
    sData.forEach(function (d) {
        Object.keys(d).forEach(function (k) {
            // console.log(k + ' - ' + d[k]);
            if (attTrack.includes(k)) {
                var circ = {att: k, Opp: d.Opp, att_val: d[k]};
                res.push(circ);
            }
        });
    });
    // console.log(res);
    return res;
}
