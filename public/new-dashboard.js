'use strict';
var realtime = 'on';

function initSparkline() {
  $('.sparkline').each(function() {
    var $this = $(this);
    $this.sparkline('html', $this.data());
  });
}

function initDonutChart() {
  'use strict';
  Morris.Donut({
    element: 'donut_chart',
    data: [
      {
        label: 'Chrome',
        value: 37
      },
      {
        label: 'Firefox',
        value: 30
      },
      {
        label: 'Safari',
        value: 18
      },
      {
        label: 'Opera',
        value: 12
      },
      {
        label: 'Other',
        value: 3
      }
    ],
    colors: [
      'rgb(233, 30, 99)',
      'rgb(0, 188, 212)',
      'rgb(255, 152, 0)',
      'rgb(0, 150, 136)',
      'rgb(96, 125, 139)'
    ],
    formatter: function(y) {
      return y + '%';
    }
  });
}

('use strict');
$(function() {
  drawGraphForSATAVG();
  getAdmitRate();
  getRetentionRate();
  getGPAScore();
});

function drawGraphForSATAVG() {
  $.ajax({
    url: 'index/sat',
    dataType: 'json',
    success: function(results) {
      //console.log('Before sorting sat results:' + JSON.stringify(results));
      results = results
        .filter(result => result['YEAR'] === '2017')
        .sort((a, b) => {
          if (parseInt(a['SAT_AVG']) > parseInt(b['SAT_AVG'])) return -1;
          else if (parseInt(b['SAT_AVG']) > parseInt(a['SAT_AVG'])) return 1;
          else return 0;
        });

      //console.log('After sorting sat results:' + JSON.stringify(results));

      let datas = [];
      let labels = [];
      results.forEach(result => {
        labels.push(getShortName(result['INSTNM']));
        datas.push(result['SAT_AVG']);
      });
      //console.log('Processed data range lists:' + JSON.stringify(datas));
      let data = {
        labels: labels,
        datasets: [
          {
            label: '2017',
            data: datas,
            borderWidth: 3,
            backgroundColor: [
              '#6a5acd',
              '#7c6bd3',
              '#8d7cd9',
              '#9c8cdf',
              '#ab9de4',
              '#bbafea',
              '#c9c2ef',
              '#d8d4f5',
              '#e6e6fa'
            ],
            borderColor: [
              '#00008B',
              '#00008B',
              '#8d7cd9',
              '#9c8cdf',
              '#ab9de4',
              '#bbafea',
              '#c9c2ef',
              '#d8d4f5',
              '#e6e6fa'
            ]
          }
        ]
      };

      let config = {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          legend: {
            display: false,
            position: 'bottom',
            labels: {
              fontColor: '#000000'
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                barPercentage: 0.6,
                scaleLabel: {
                  display: true,
                  labelString: 'Universities',
                  fontSize: 12
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Avg SAT (out of 1600)',
                  fontSize: 10
                }
              }
            ]
          }
        }
      };

      new Chart(document.getElementById('bar_chart1').getContext('2d'), config);

      //console.log('labels:', labels);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('error ' + textStatus + ' ' + errorThrown);
    }
  });
}

function getAdmitRate() {
  // get the rangeResults
  $.ajax({
    url: '/recentdash/admitrate',
    dataType: 'json',

    success: function(results) {
      //console.log(JSON.stringify(results));
      let labels = [];
      let admitRates = [];

      // for chronological ordering
      results.sort((a, b) =>
        a['ADM_RATE'] > b['ADM_RATE']
          ? -1
          : b['ADM_RATE'] > a['ADM_RATE']
          ? 1
          : 0
      );

      //console.log('Results after sorting:' + JSON.stringify(results));
      results.forEach(result => {
        labels.push(getShortName(result['INSTNM']));
        admitRates.push((parseFloat(result['ADM_RATE']) * 100).toFixed(2));
      });

      //console.log('lablesss:', labels);
      //console.log('Datass:', admitRates);
      let data = {
        labels: labels,
        datasets: [
          {
            label: '2017',
            data: admitRates,
            backgroundColor: [
              '#6b8e23',
              '#7b9931',
              '#8ca43e',
              '#9cae4b',
              '#adba58',
              '#bdc565',
              '#ced072',
              '#dfdb7f',
              '#f0e68c'
            ],
            borderColor: [
              '#006400',
              '#006400',
              '#8ca43e',
              '#9cae4b',
              '#adba58',
              '#bdc565',
              '#ced072',
              '#dfdb7f',
              '#f0e68c'
            ],
            borderWidth: 3
          }
        ]
      };

      let config = {
        type: 'bar',
        data: data,
        options: {
          title: {
            display: true
            //text: 'Admit Rate for 2017'
          },
          responsive: true,
          legend: {
            display: false,
            position: 'bottom',
            labels: { fontColor: '#000000' }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                barPercentage: 0.6,
                ticks: { beginAtZero: true },
                scaleLabel: {
                  display: true,
                  labelString: 'Universities',
                  fontSize: 12
                }
              }
            ],
            yAxes: [
              {
                ticks: { beginAtZero: true },
                barPercentage: 0.9,
                maxBarThickness: 150,
                scaleLabel: {
                  display: true,
                  labelString: 'Admit rate (%)',
                  fontSize: 12
                }
              }
            ]
          }
        }
      };
      new Chart(
        document.getElementById('line_chart1').getContext('2d'),
        config
      );
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('error ' + textStatus + ' ' + errorThrown);
    }
  });
}

function getChartJs(type) {
  let config = null;

  if (type === 'line') {
    config = {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: 'My First dataset',
            data: [66, 59, 80, 72, 56, 55, 54],
            borderColor: 'rgba(0, 188, 212, 0.75)',
            backgroundColor: 'rgba(0, 188, 212, 0.3)',
            pointBorderColor: 'rgba(0, 188, 212, 0)',
            pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
            pointBorderWidth: 1
          },
          {
            label: 'My Second dataset',
            data: [28, 48, 40, 32, 80, 50, 89],
            borderColor: 'rgba(233, 30, 99, 0.75)',
            backgroundColor: 'rgba(233, 30, 99, 0.3)',
            pointBorderColor: 'rgba(233, 30, 99, 0)',
            pointBackgroundColor: 'rgba(233, 30, 99, 0.9)',
            pointBorderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        legend: false
      }
    };
  } else if (type === 'bar') {
    config = {
      type: 'bar',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: 'My First dataset',
            data: [55, 69, 70, 81, 56, 55, 82],
            backgroundColor: '#dd5e89'
          },
          {
            label: 'My Second dataset',
            data: [28, 48, 51, 19, 86, 32, 81],
            backgroundColor: '#f7bb97'
          },
          {
            label: 'My Third dataset',
            data: [32, 54, 62, 78, 47, 43, 75],
            backgroundColor: '#c6ca97'
          }
        ]
      },
      options: {
        responsive: true,
        legend: false
      }
    };
  }

  return config;
}

function getShortName(uName) {
  switch (uName) {
    case 'University of California-Berkeley':
      return 'UCB';
    case 'University of California-Davis':
      return 'UCD';
    case 'University of California-Irvine':
      return 'UCI';
    case 'University of California-Los Angeles':
      return 'UCLA';
    case 'University of California-Riverside':
      return 'UCR';
    case 'University of California-San Diego':
      return 'UCSD';
    case 'University of California-Santa Barbara':
      return 'UCSB';
    case 'University of California-Santa Cruz':
      return 'UCSC';
    case 'University of California-Merced':
      return 'UCM';
  }
}

function getGPAScore() {
  // get the earningsResults
  $.ajax({
    url: '/recentdash/gpa',
    dataType: 'json',

    success: function(results) {
      console.log('In GPA Score:', JSON.stringify(results));

      results.sort((a, b) =>
        a['GPA_Val'] > b['GPA_Val'] ? -1 : b['GPA_Val'] > a['GPA_Val'] ? 1 : 0
      );
      let gpaScores = [];
      let labels = [];
      let gpaDiff = [];
      results.forEach(result => {
        labels.push(getShortName(result['INSTNM']));
        gpaScores.push(result['GPA_Val']);
      });
      // console.log('Gpa scores sorted ', gpaScores);
      let lowMiddle = Math.floor((gpaScores.length - 1) / 2);
      let highMiddle = Math.ceil((gpaScores.length - 1) / 2);
      let median =
        (parseFloat(gpaScores[lowMiddle]) + parseFloat(gpaScores[highMiddle])) /
        2;
      // console.log(median);
      gpaScores.forEach(result => {
        gpaDiff.push((parseFloat(result) - median).toFixed(2));
      });
      // console.log('gpa diff ', gpaDiff);

      var canvas = document.getElementById('myGpaChart');
      var data = {
        labels: labels,
        datasets: [
          {
            label: 'Relative University GPA',
            backgroundColor: [
              '#E78AB5',
              '#E78AB5',
              '#E78AB5',
              '#E78AB5',
              '#E78AB5',
              'rgba(255,99,132,0.2)',
              'rgba(255,99,132,0.2)',
              'rgba(255,99,132,0.2)',
              'rgba(255,99,132,0.2)'
            ],
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 2,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: gpaDiff,
            gpaScores: gpaScores
          }
        ]
      };
      var option = {
        scales: {
          yAxes: [
            {
              stacked: true,
              gridLines: {
                display: true,
                color: 'rgba(255,99,132,0.2)'
              },
              scaleLabel: {
                display: true,
                labelString: 'Relative GPA (%)',
                fontSize: 14
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: 'Universities',
                fontSize: 14
              }
            }
          ]
        },
        animation: {
          duration: 1,
          onComplete: function() {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function(dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function(bar, index) {
                var data = dataset.data[index];
                // ctx.fillText(("Actual GPA:" + parseFloat(data)+ median), bar._model.x, bar._model.y - 5);
                //ctx.fillText(parseFloat(data), bar._model.x, bar._model.y - 5);
              });
            });
          }
        }
      };

      var myGpaChart = Chart.Bar(canvas, {
        data: data,
        options: option
      });
    }
  });
}

function getRetentionRate() {
  // get the earningsResults
  $.ajax({
    url: '/recentdash/retentionrate',
    dataType: 'json',

    success: function(results) {
      // console.log('In RetentionRate:', JSON.stringify(results));

      results.sort((a, b) =>
        a['RET_FT4'] > b['RET_FT4'] ? -1 : b['RET_FT4'] > a['RET_FT4'] ? 1 : 0
      );
      let retentionScores = [];
      let labels = [];
      let retDiff = [];
      results.forEach(result => {
        labels.push(getShortName(result['INSTNM']));
        retentionScores.push(result['RET_FT4']);
      });
      // console.log('Retention scores sorted ', retentionScores);
      let lowMiddle = Math.floor((retentionScores.length - 1) / 2);
      let highMiddle = Math.ceil((retentionScores.length - 1) / 2);
      let median =
        (parseFloat(retentionScores[lowMiddle]) +
          parseFloat(retentionScores[highMiddle])) /
        2;
      // console.log(median);
      retentionScores.forEach(result => {
        retDiff.push(((parseFloat(result) - median) * 100).toFixed(2));
      });
      // console.log('retention diff ', retDiff);

      var canvas = document.getElementById('myRetentionChart');
      var data = {
        labels: labels,
        datasets: [
          {
            label: 'Relative University Retention',
            backgroundColor: [
              '#f2a571',
              '#f2a571',
              '#f2a571',
              '#f2a571',
              '#f2a571',
              '#FED59A',
              '#FED59A',
              '#FED59A',
              '#FED59A'
            ],
            borderColor: '#f2721b',
            borderWidth: 2,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: retDiff,
            retScores: retentionScores
          }
        ]
      };
      var option = {
        scales: {
          yAxes: [
            {
              stacked: true,
              gridLines: {
                display: true,
                color: 'rgba(255,99,132,0.2)'
              },
              scaleLabel: {
                display: true,
                labelString: 'Relative Retention Rate (%)',
                fontSize: 14
              }
            }
          ],
          xAxes: [
            {
              gridLines: { display: false },
              scaleLabel: {
                display: true,
                labelString: 'Universities',
                fontSize: 14
              }
            }
          ]
        }
      };

      var myRetentionChart = Chart.Bar(canvas, {
        data: data,
        options: option
      });
    }
  });
}
