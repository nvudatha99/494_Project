
var viz1, viz2, viz3, viz4, g;

var width;
var height;
var innerWidth;
var innerHeight;

const margin = {top: 40, right: 60, bottom: 150, left: 130};

document.addEventListener('DOMContentLoaded', function () {


    viz1 = d3.select("#viz1");
    viz2 = d3.select("#viz2");
    viz3 = d3.select("#viz3");
    viz4 = d3.select("#viz4");



    width = +viz1.style('width').replace('px', '');
    height = +viz1.style('height').replace('px', '');
    innerWidth = width - margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;

    g = graphSvg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top + 20})`);

    //
    // Promise.all([
    //     // d3.csv('Data-Sets/Dogs-Database.csv'),
    //     // d3.csv('Data-Sets/Flights-Database.csv'),
    //
    // ])
    //     .then(function (values) {
    //
    //      });

    drawViz1();
    drawViz2();
    drawViz3();
    drawViz4()
});

function drawViz1() {

    g.select("#axis-g").remove();


    let axis = g.append("g").attr("id", "axis-g");

}

function drawViz2() {

}

function drawViz3() {

}

function drawViz4() {

}