var ctxB = document.getElementById('myBar');
var ctxL = document.getElementById('myLinear');
var ctxPie = document.getElementById('myPie');
var ctxPolar = document.getElementById('myPolar');

var size = 12;
var data = new Array(size);
var labels = new Array(size);
var r = size + 1;

var backgroundColor = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
];

var borderColor = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];

for (var i = 0; i < data.length; i++) {
  data[i] = Math.sqrt(r * r - i * i)
  labels[i] = i.toString();
}


var myLinear = new Chart(ctxL, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: "Interpolated Linear Chart",
      data: data,
      borderColor: window.chartColors.blue,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      fill: false,
    }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      },
      responsive: true

  }
});


myBar = new Chart(ctxB, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: "Bar Chart",
      data: data,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: 1.25
    }],
    options: {
      responsive: true
    }
  }
});

var dataP = {
  labels: labels,
  datasets: [
      {
          data: data,
          backgroundColor: borderColor
      }]
};

myPie = new Chart(ctxPie, {
  type: 'pie',
  data: dataP,
  label: "Pie Chart",
});

myPolar = new Chart(ctxPolar, {
  type: 'polarArea',
  data: dataP,
  label: "Polar Chart",
});
