'use strict';
var realtime = 'on';

('use strict');
$(function() {
  let filterCriteriaByUniv = document.getElementById('univOption').innerHTML; //$('#univOption').val();
  // console.log(filterCriteriaByUniv);

  $('#line_chart1').empty();
  $('#line_chart2').empty();

  drawGraphForSATAVG(filterCriteriaByUniv);
  drawGraphForTuitionFee(filterCriteriaByUniv);
});

function drawGraphForSATAVG(filterValue) {
  $.ajax({
    url: 'index/sat',
    dataType: 'json',
    success: function(results) {
      //console.log('results:' + JSON.stringify(results));
      let datas = [];

      let sum = 0;
      let mean_value=0;
      results.forEach(result => {
        if (
          datas.length > 0 &&
          datas.filter(data => data.year === result['YEAR']).length > 0
        ) {
          name = result['INSTNM'];

          datas.forEach((data, index) => {
            if (data.year === result['YEAR']) {
              data[name] = parseInt(result['SAT_AVG']);
            }
          });
        } else {
          name = result['INSTNM'];
          let tempObj = {};
          tempObj['year'] = result['YEAR'];
          tempObj[name] = parseInt(result['SAT_AVG']);
          datas.push(tempObj);
        }
      });
      datas = datas.filter(data => data.year);
      // for chronological ordering
      datas.sort((a, b) =>
        a['year'] > b['year'] ? 1 : b['year'] > a['year'] ? -1 : 0
      );
      let labels = [];
      let ucData = [];
      let satDiff = [];

      datas.forEach(data => {
        labels.push(data['year']);
        sum = sum + parseInt(data[String(filterValue)]);
        ucData.push(data[String(filterValue)]);
      });
      mean_value= parseFloat(sum/ucData.length);

      ucData.forEach(result => {
          satDiff.push((parseFloat(result) - mean_value).toFixed(2));
      });
        var canvas = document.getElementById('mySatChart');

        let data = {
        labels: labels,
        datasets: [
          {
            label: String(filterValue),
            backgroundColor: [
                '#d4d4d4',
                '#d4d4d4',
                '#d4d4d4',
                '#d4d4d4',
                '#d4d4d4'
                ],
              borderColor: '#0b3e6f',//'#798388',
              borderWidth: 2,
              hoverBackgroundColor: '#0b3e6f',//'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',

              data: satDiff
            //backgroundColor: '#dd5e89'
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
                            labelString: 'Relative SAT Score Midpoint (points)',
                            fontSize: 12
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
                            labelString: 'Year',
                            fontSize: 14
                        }
                    }
                ]
            }
        };

        var mySatChart = Chart.Bar(canvas, {
            data: data,
            options: option
        });
    }
  });
}


function drawGraphForTuitionFee(filterValue) {
    $.ajax({
        url: 'index/tuition',
        dataType: 'json',
        success: function(results) {
            //console.log('results:' + JSON.stringify(results));
            let datas = [];
            let sum = 0;
            let mean_value=0;

            results.forEach(result => {
                if (
                    datas.length > 0 &&
                    datas.filter(data => data.year === result['YEAR']).length > 0
                ) {
                    name = result['INSTNM'];
                    datas.forEach((data, index) => {
                        if (data.year === result['YEAR']) {
                            data[name] = parseInt(result['TUITIONFEE_IN']);
                        }
                    });
                } else {
                    name = result['INSTNM'];
                    let tempObj = {};
                    tempObj['year'] = result['YEAR'];
                    tempObj[name] = parseInt(result['TUITIONFEE_IN']);
                    datas.push(tempObj);
                }
            });
            datas = datas.filter(data => data.year);
            // console.log('Processed data range lists:' + JSON.stringify(datas));
            // for chronological ordering
            datas.sort((a, b) =>
                a['year'] > b['year'] ? 1 : b['year'] > a['year'] ? -1 : 0
            );
            let labels = [];
            let ucbData = [];
            let tuitionDiff = [];

            datas.forEach(data => {
                labels.push(data['year']);
                sum = sum + parseInt(data[String(filterValue)]);
                ucbData.push(data[String(filterValue)]);
            });
            mean_value= parseFloat(sum/ucbData.length);
            // console.log("mean ",mean_value);

            ucbData.forEach(result => {
                tuitionDiff.push((parseFloat(result) - mean_value).toFixed(2));
            });
            // console.log('sat diff ', tuitionDiff);
            var canvas = document.getElementById('myTuitionChart');

            let data = {
                labels: labels,
                datasets: [
                    {
                        label: String(filterValue),
                        backgroundColor: [
                            '#d4d4d4',
                            '#d4d4d4',
                            '#d4d4d4',
                            '#d4d4d4',
                            '#d4d4d4'
                        ],
                        borderColor: '#0b3e6f',//'#798388',
                        borderWidth: 2,
                        hoverBackgroundColor: '#0b3e6f',//'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',

                        data: tuitionDiff
                        //backgroundColor: '#dd5e89'
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
                                labelString: 'Relative Tuition Fees ($USD)',
                                fontSize: 12
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
                                labelString: 'Year',
                                fontSize: 14
                            }
                        }
                    ]
                }
            };

            var myTuitionChart = Chart.Bar(canvas, {
                data: data,
                options: option
            });
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
