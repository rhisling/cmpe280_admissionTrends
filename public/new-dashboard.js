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
      console.log('Before sorting sat results:' + JSON.stringify(results));
      results = results
        .filter(result => result['YEAR'] === '2017')
        .sort((a, b) => {
          if (parseInt(a['SAT_AVG']) > parseInt(b['SAT_AVG'])) return -1;
          else if (parseInt(b['SAT_AVG']) > parseInt(a['SAT_AVG'])) return 1;
          else return 0;
        });

      console.log('After sorting sat results:' + JSON.stringify(results));

      let datas = [];
      let labels = [];
      results.forEach(result => {
        labels.push(getShortName(result['INSTNM']));
        datas.push(result['SAT_AVG']);
      });
      console.log('Processed data range lists:' + JSON.stringify(datas));
      // for chronological ordering

      /*   let data = {
        labels: ['2017'],
        datasets: [
          {
            label: getShortName(labels[0]),
            data: [datas[0]],
            backgroundColor: ['#e16d8c']
          },
          {
            label: getShortName(labels[1]),
            data: [datas[1]],
            backgroundColor: ['#e4778d']
          },
          {
            label: getShortName(labels[2]),
            data: [datas[2]],
            backgroundColor: ['#e7808f']
          },
          {
            label: getShortName(labels[3]),
            data: [datas[3]],
            backgroundColor: ['#e98a90']
          },
          {
            label: getShortName(labels[4]),
            data: [datas[4]],
            backgroundColor: ['#ec9291']
          },
          {
            label: getShortName(labels[5]),
            data: [datas[5]],
            backgroundColor: ['#ee9d93']
          },
          {
            label: getShortName(labels[6]),
            data: [datas[6]],
            backgroundColor: ['#f1a594']
          },
          {
            label: getShortName(labels[7]),
            data: [datas[7]],
            backgroundColor: ['#f3ae95']
          },
          {
            label: getShortName(labels[8]),
            data: [datas[8]],
            backgroundColor: ['#f5b796']
          }
        ]
      };
 */

      let data = {
        labels: labels,
        datasets: [
          {

            label: '2017',
            data: datas,
              borderWidth: 4,
              backgroundColor: [
                '#0000b2',
                '#3232ff',
                '#4c4cff',
                '#6666ff',
                '#7f7fff',
                '#9999ff',
                '#b2b2ff',
                '#ccccff',
                '#e5e5ff'
            ],
              borderColor: [
                  '#48D1CC',//'#000000',//'#0000b2',
                  '#48D1CC',//'#3232ff',
                  '#4c4cff',
                  '#6666ff',
                  '#7f7fff',
                  '#9999ff',
                  '#b2b2ff',
                  '#ccccff',
                  '#e5e5ff'
              ],
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
                gridLines : {
                  display : false
                },
                barPercentage: 0.6,
                scaleLabel: {
                  display: true,
                  labelString: 'YEAR',
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

      console.log('labels:', labels);
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
      console.log(JSON.stringify(results));
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

      console.log('Results after sorting:' + JSON.stringify(results));
      results.forEach(result => {
        labels.push(getShortName(result['INSTNM']));
        admitRates.push((parseFloat(result['ADM_RATE'])*100).toFixed(2));
      });

      console.log('lablesss:', labels);
      console.log('Datass:', admitRates);
      let data = {
        labels: labels,
        datasets: [
          {
            label: '2017',
            data: admitRates,
            backgroundColor: [
              '#e16d8c',
              '#e4778d',
              '#e7808f',
              '#e98a90',
              '#ec9291',
              '#ee9d93',
              '#f1a594',
              '#f3ae95',
              '#f5b796'
            ]
          }
        ]
      };

      let config = {
        type: 'bar',
        data: data,
        options: {
          title: {
            display: true,
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
                gridLines : {
                  display : false
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

function getRetentionRate() {
  $.ajax({
    url: '/recentdash/retentionrate',
    dataType: 'json',

    success: function(results) {
      console.log('In RetentionRate:', JSON.stringify(results));

      results.sort((a, b) =>
        a['RET_FT4'] > b['RET_FT4'] ? -1 : b['RET_FT4'] > a['RET_FT4'] ? 1 : 0
      );

      let retentionRates = [];
      let labels = [];
      results.forEach(result => {
        retentionRates.push(result['RET_FT4']);
        labels.push(getShortName(result['INSTNM']));
      });

      // let data = {
      //   labels: ['2017'],
      //   datasets: [
      //     {
      //       label: getShortName(labels[0]),
      //       data: [retentionRates[0]],
      //       backgroundColor: ['#e16d8c']
      //     },
      //     {
      //       label: getShortName(labels[1]),
      //       data: [retentionRates[1]],
      //       backgroundColor: ['#e4778d']
      //     },
      //     {
      //       label: getShortName(labels[2]),
      //       data: [retentionRates[2]],
      //       backgroundColor: ['#e7808f']
      //     },
      //     {
      //       label: getShortName(labels[3]),
      //       data: [retentionRates[3]],
      //       backgroundColor: ['#e98a90']
      //     },
      //     {
      //       label: getShortName(labels[4]),
      //       data: [retentionRates[4]],
      //       backgroundColor: ['#ec9291']
      //     },
      //     {
      //       label: getShortName(labels[5]),
      //       data: [retentionRates[5]],
      //       backgroundColor: ['#ee9d93']
      //     },
      //     {
      //       label: getShortName(labels[6]),
      //       data: [retentionRates[6]],
      //       backgroundColor: ['#f1a594']
      //     },
      //     {
      //       label: getShortName(labels[7]),
      //       data: [retentionRates[7]],
      //       backgroundColor: ['#f3ae95']
      //     },
      //     {
      //       label: getShortName(labels[8]),
      //       data: [retentionRates[8]],
      //       backgroundColor: ['#f5b796']
      //     }
      //   ]
      // };

      let data = {
        labels: labels,
        datasets: [
          {
            label: '2017',
            data: retentionRates,
            backgroundColor: [
              '#e16d8c',
              '#e4778d',
              '#e7808f',
              '#e98a90',
              '#ec9291',
              '#ee9d93',
              '#f1a594',
              '#f3ae95',
              '#f5b796'
            ]
          }
        ]
      };

      let config = {
        type: 'bar',
        data: data,
        options: {
          title: { display: false, text: 'Retention Rate' },
          responsive: true,
          legend: {
            display: false,
            position: 'bottom',
            labels: { fontColor: '#000000' }
          },
          scales: {
            xAxes: [
              {
                gridLines : {
                  display : false
                },
                barPercentage: 0.6,
                scaleLabel: {
                  display: true,
                  labelString: 'Universities',
                  fontSize: 14
                }
              }
            ],
            yAxes: [
              {
                ticks: { beginAtZero: true },
                scaleLabel: {
                  display: true,
                  labelString: 'Retention Rate (%)',
                  fontSize: 12
                }
              }
            ]
          }
        }
      };
      new Chart(
        document.getElementById('line_chart2').getContext('2d'),
        config
      );
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('error ' + textStatus + ' ' + errorThrown);
    }
  });
}

// function getGPAScore() {
//   // get the earningsResults
//   $.ajax({
//     url: '/recentdash/gpa',
//     dataType: 'json',
//
//     success: function(results) {
//       console.log('In GPA Score:', JSON.stringify(results));
//
//       results.sort((a, b) =>
//         a['GPA_Val'] > b['GPA_Val'] ? -1 : b['GPA_Val'] > a['GPA_Val'] ? 1 : 0
//       );
//       let gpaScores = [];
//       let labels = [];
//       results.forEach(result => {
//         labels.push(getShortName(result['INSTNM']));
//         gpaScores.push(result['GPA_Val']);
//       });
//
//       // let data = {
//       //   labels: ['2017'],
//       //   datasets: [
//       //     {
//       //       label: getShortName(labels[0]),
//       //       data: [gpaScores[0]],
//       //       backgroundColor: ['#e16d8c']
//       //     },
//       //     {
//       //       label: getShortName(labels[1]),
//       //       data: [gpaScores[1]],
//       //       backgroundColor: ['#e4778d']
//       //     },
//       //     {
//       //       label: getShortName(labels[2]),
//       //       data: [gpaScores[2]],
//       //       backgroundColor: ['#e7808f']
//       //     },
//       //     {
//       //       label: getShortName(labels[3]),
//       //       data: [gpaScores[3]],
//       //       backgroundColor: ['#e98a90']
//       //     },
//       //     {
//       //       label: getShortName(labels[4]),
//       //       data: [gpaScores[4]],
//       //       backgroundColor: ['#ec9291']
//       //     },
//       //     {
//       //       label: getShortName(labels[5]),
//       //       data: [gpaScores[5]],
//       //       backgroundColor: ['#ee9d93']
//       //     },
//       //     {
//       //       label: getShortName(labels[6]),
//       //       data: [gpaScores[6]],
//       //       backgroundColor: ['#f1a594']
//       //     },
//       //     {
//       //       label: getShortName(labels[7]),
//       //       data: [gpaScores[7]],
//       //       backgroundColor: ['#f3ae95']
//       //     },
//       //     {
//       //       label: getShortName(labels[8]),
//       //       data: [gpaScores[8]],
//       //       backgroundColor: ['#f5b796']
//       //     }
//       //   ]
//       // };
//
//       let data = {
//         labels: labels,
//         datasets: [
//           {
//             label: '2017',
//             data: gpaScores,
//             backgroundColor: [
//               '#e16d8c',
//               '#e4778d',
//               '#e7808f',
//               '#e98a90',
//               '#ec9291',
//               '#ee9d93',
//               '#f1a594',
//               '#f3ae95',
//               '#f5b796'
//             ]
//           }
//         ]
//       };
//
//       let config = {
//         type: 'bar',
//         data: data,
//         options: {
//           responsive: true,
//           legend: {
//             display: false,
//             position: 'bottom',
//             labels: { fontColor: '#000000' }
//           },
//           scales: {
//             xAxes: [
//               {
//                 gridLines : {
//                   display : false
//                 },
//                 barPercentage: 0.6,
//                 ticks: { beginAtZero: true },
//                 scaleLabel: {
//                   display: true,
//                   labelString: 'Universities ',
//                   fontSize: 14
//                 }
//               }
//             ],
//             yAxes: [
//               {
//                 ticks: { beginAtZero: true },
//                 scaleLabel: {
//                   display: true,
//                   labelString: 'GPA Score (Out of 4)',
//                   fontSize: 10
//                 }
//               }
//             ]
//           }
//         }
//       };
//       new Chart(
//         document.getElementById('line_chart3').getContext('2d'),
//         config
//       );
//     },
//     error: function(jqXHR, textStatus, errorThrown) {
//       alert('error ' + textStatus + ' ' + errorThrown);
//     }
//   });
//}

// function getDiversityResults(filterValue) {
//   // get the diversityResults
//   $.ajax({
//     url: 'index/diversity',
//     dataType: 'json',

//     success: function(results) {
//       //$("#test").append(data);
//       // d=JSON.stringify(data)

//       console.log('received diversity data', results);
//       let datas = [];
//       results
//         .filter(
//           result => result['INSTNM'].toLowerCase() === filterValue.toLowerCase()
//         )
//         .forEach(result => {
//           let tempObj = {};
//           tempObj['2mor'] = parseFloat(result['UGDS_2MOR']);
//           tempObj['aian'] = parseFloat(result['UGDS_AIAN']);
//           tempObj['asian'] = parseFloat(result['UGDS_ASIAN']);
//           tempObj['black'] = parseFloat(result['UGDS_BLACK']);
//           tempObj['hisp'] = parseFloat(result['UGDS_HISP']);
//           tempObj['nhpi'] = parseFloat(result['UGDS_NHPI']);
//           tempObj['nra'] = parseFloat(result['UGDS_NRA']);
//           tempObj['unkn'] = parseFloat(result['UGDS_UNKN']);
//           tempObj['white'] = parseFloat(result['UGDS_WHITE']);
//           tempObj['year'] = parseFloat(result['YEAR']);
//           datas.push(tempObj);
//         });

//       console.log('Processed diversity results', JSON.stringify(datas));
//       datas.sort((a, b) =>
//         a['year'] > b['year'] ? 1 : b['year'] > a['year'] ? -1 : 0
//       );

//       let labels = [];
//       let twoOrMore = [];
//       let americanIndian = [];
//       let asian = [];
//       let black = [];
//       let hisp = [];
//       let nativeHawaiian = [];
//       let nonResidentAlien = [];
//       let unknown = [];
//       let white = [];

//       datas.forEach(data => {
//         labels.push(data['year']);
//         twoOrMore.push(data['2mor']);
//         americanIndian.push(data['aian']);
//         asian.push(data['asian']);
//         black.push(data['black']);
//         hisp.push(data['hisp']);
//         nativeHawaiian.push(data['nhpi']);
//         nonResidentAlien.push(data['nra']);
//         unknown.push(data['unkn']);
//         white.push(data['white']);
//       });

//       let data = {
//         labels: labels,
//         datasets: [
//           {
//             label: 'Two Or More',
//             data: twoOrMore,
//             backgroundColor: '#292B2C'
//           },
//           {
//             label: 'American Indian',
//             data: americanIndian,
//             backgroundColor: '#5BC0DD'
//           },
//           {
//             label: 'Asian',
//             data: asian,
//             backgroundColor: '#5CB85D'
//           },
//           {
//             label: 'Black',
//             data: black,
//             backgroundColor: '#0076D8'
//           },
//           {
//             label: 'Hispanic',
//             data: hisp,
//             backgroundColor: '#545B62'
//           },
//           {
//             label: 'Native Hawaiian',
//             data: nativeHawaiian,
//             backgroundColor: '#D9534F'
//           },
//           {
//             label: 'Non Resident Alien',
//             data: nonResidentAlien,
//             backgroundColor: '#EFAD4E'
//           },
//           {
//             label: 'Unknown',
//             data: unknown,
//             backgroundColor: '#8C5EDD'
//           },
//           {
//             label: 'white',
//             data: white,
//             backgroundColor: '#C87000'
//           }
//         ]
//       };

//       let config = {
//         type: 'bar',
//         data: data,
//         options: {
//           responsive: true,
//           legend: false
//         }
//       };

//       new Chart(document.getElementById('bar_chart2').getContext('2d'), config);
//     },
//     error: function(jqXHR, textStatus, errorThrown) {
//       alert('error ' + textStatus + ' ' + errorThrown);
//     }
//   });
// }

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
      console.log('Gpa scores sorted ', gpaScores);
      let lowMiddle = Math.floor((gpaScores.length - 1) / 2);
      let highMiddle = Math.ceil((gpaScores.length - 1) / 2);
      let median =
        (parseFloat(gpaScores[lowMiddle]) + parseFloat(gpaScores[highMiddle])) /
        2;
      console.log(median);
      gpaScores.forEach(result => {
        gpaDiff.push((parseFloat(result) - median).toFixed(2));
      });
      console.log('gpa diff ', gpaDiff);

      var canvas = document.getElementById('myGpaChart');
      var data = {
        labels: labels,
        datasets: [
          {
            label: 'Relative University GPA',
            backgroundColor: 'rgba(255,99,132,0.2)',
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
                labelString: 'Relative GPA',
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

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                // ctx.fillText(("Actual GPA:" + parseFloat(data)+ median), bar._model.x, bar._model.y - 5);
                                //ctx.fillText(parseFloat(data), bar._model.x, bar._model.y - 5);

                            });
                        });
                    }
                }
            };

            var myGpaChart = Chart.Bar(canvas,{
                data:data,
                options:option
            });


        }

    })
}
