
var viz1, viz2, viz3, viz4;

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



    Promise.all([
        // d3.csv('Data-Sets/Dogs-Database.csv'),
        // d3.csv('Data-Sets/Flights-Database.csv'),

    ])
        .then(function (values) {

         });
});
