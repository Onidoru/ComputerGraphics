var scale_X;
var scale_Y;
var t;
var x, y, k;
var inst = new functionPlot;

function draw() {

    // Hash contains info of a function to render
    var part = {};

    // Array of hashes
    var toDraw = [];

    // Number of functions in the ornament
    var n = parseInt(document.getElementById('range_orn').value);


    if ((typeof scale_X == 'undefined') || (typeof scale_Y == 'undefined')) {
        scale_X = 11.2 * 1.5;
        scale_Y = 7 * 1.5;
    }

    // Ornament cycle. Each time reassigns part hash and pushes it to the Array
    for (var i = 1; i <= n; i++) {
        part = {
            x: String(i) + '(' + document.getElementById('eq_x').value + ')',
            y: String(i) + '(' + document.getElementById('eq_y').value + ')',
            range: [-10 * Math.PI, 10 * Math.PI],
            fnType: 'parametric',
            graphType: 'polyline'
        }
        toDraw.push(part);
    }

    // Render the plot
    functionPlot({
        target: '#plot',
        width: screen.width * 0.42,
        height: screen.height * 0.49,
        grid: true,
        yAxis: {
            domain: [-scale_Y, scale_Y]
        },
        xAxis: {
            domain: [-scale_X, scale_X]
        },
        data: toDraw
    })


}

function updateOrnInput(event) {
    n = parseInt(document.getElementById('range_orn').value);
    onUpdate(event);
}

function onUpdate(event) {
    d3.selectAll("svg > *").remove();
    draw();
}

function getAxisValue(scale) {
    var svg = d3.select("svg");
    var scale = d3.scale.linear()
        .range([-scale, scale])
        .domain([-scale, scale])
    var axis = d3.svg.axis().scale(scale).orient("bottom").ticks(9);
    var axisArray = axis.scale().ticks(axis.ticks()[0])
    console.log("all the points", axisArray);
    return axisArray[axisArray.length - 1];
}

draw();
