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

var data = [],
  totalPoints = 110;
function getRandomData() {
  if (data.length > 0) data = data.slice(1);

  while (data.length < totalPoints) {
    var prev = data.length > 0 ? data[data.length - 1] : 50,
      y = prev + Math.random() * 10 - 5;
    if (y < 0) {
      y = 0;
    } else if (y > 100) {
      y = 100;
    }

    data.push(y);
  }

  var res = [];
  for (var i = 0; i < data.length; ++i) {
    res.push([i, data[i]]);
  }

  return res;
}

('use strict');
$(function() {
  //   new Chart(
  //     document.getElementById('line_chart').getContext('2d'),
  //     getChartJs('line')
  //   );
  //   new Chart(
  //     document.getElementById('bar_chart').getContext('2d'),
  //     getChartJs('bar')
  //   );
  //   new Chart(
  //     document.getElementById('line_chart1').getContext('2d'),
  //     getChartJs('line')
  //   );

  let filterCriteriaByUniv = $('#univOption option:selected').val();
  $('#univOption').change(function() {
    filterCriteriaByUniv = $('#univOption option:selected').val();
    console.log(filterCriteriaByUniv);
    //When drop down is changed, call the 4 methods again
    //$('#morris-area-chart').empty();
    $('#line_chart1').empty();
    $('#line_chart2').empty();
    $('#line_chart3').empty();
    $('#bar_chart1').empty();
    $('#bar_chart2').empty();

    getSATMidpointResults(filterCriteriaByUniv);
    getGradDebtProjection(filterCriteriaByUniv);
    getEarningResults(filterCriteriaByUniv);
    getDiversityResults(filterCriteriaByUniv);
    getRetention(filterCriteriaByUniv);

  });

  drawGraphForSATAVG();
  getSATMidpointResults(filterCriteriaByUniv);
  getGradDebtProjection(filterCriteriaByUniv);
  getEarningResults(filterCriteriaByUniv);
  getDiversityResults(filterCriteriaByUniv);
  getTuitionOutGraph(filterCriteriaByUniv);
  getRetention(filterCriteriaByUniv);


    /* new Chart(
      document.getElementById('bar_chart1').getContext('2d'),
      getChartJs('bar')
    ); */
});

function drawGraphForSATAVG() {
  $.ajax({
    url: 'index/sat',
    dataType: 'json',
    success: function(results) {
      //console.log('results:' + JSON.stringify(results));
      let datas = [];
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
      console.log('Processed data range lists:' + JSON.stringify(datas));
      // for chronological ordering
      datas.sort((a, b) =>
        a['year'] > b['year'] ? 1 : b['year'] > a['year'] ? -1 : 0
      );
      let labels = [];
      let ucbData = [];
      let ucdData = [];
      let uciData = [];
      let uclaData = [];
      let ucrData = [];
      let ucsdData = [];
      let ucsbData = [];
      let ucscData = [];
      let ucmData = [];

      datas.forEach(data => {
        labels.push(data['year']);
        ucbData.push(data['University of California-Berkeley']);
        ucdData.push(data['University of California-Davis']);
        uciData.push(data['University of California-Irvine']);
        uclaData.push(data['University of California-Los Angeles']);
        ucrData.push(data['University of California-Riverside']);
        ucsdData.push(data['University of California-San Diego']);
        ucsbData.push(data['University of California-Santa Barbara']);
        ucscData.push(data['University of California-Santa Cruz']);
        ucmData.push(data['University of California-Merced']);
      });

      let data = {
        labels: labels,
        datasets: [
          {
            label: 'UCB',
            data: ucbData,
            backgroundColor: '#dd5e89'
          },
          {
            label: 'UCD',
            data: ucdData,
            backgroundColor: '#f7bb97'
          },
          {
            label: 'UCI',
            data: uciData,
            backgroundColor: '#c6ca97'
          },
          {
            label: 'UCLA',
            data: uclaData,
            backgroundColor: '#d6ae57'
          },
          {
            label: 'UCR',
            data: ucrData,
            backgroundColor: '#a56b34'
          },
          {
            label: 'UCSD',
            data: ucsdData,
            backgroundColor: '#fb65a8'
          },
          {
            label: 'UCSC',
            data: ucscData,
            backgroundColor: '#a4b678'
          },
          {
            label: 'UCSB',
            data: ucsbData,
            backgroundColor: '#dd5e89'
          },
          {
            label: 'UCM',
            data: ucmData,
            backgroundColor: '#b5c567'
          }
        ],

      };

      let config = {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{

                    scaleLabel: {
                        display: true,
                        labelString: 'YEAR',
                        fontSize: 16
                    }
                }],
                yAxes: [{

                    scaleLabel: {
                        display: true,
                        labelString: 'AVG_SAT',
                        fontSize: 16
                    }
                }]
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
function getTuitionOutGraph(filterValue) {
  // get the earningsResults
  $.ajax({
    url: 'index/tuition-out',
    dataType: 'json',

    success: function(results) {
      //$("#test").append(data);
      // d=JSON.stringify(data)
      let datas = [];
      results
        .filter(
          result => result['INSTNM'].toLowerCase() === filterValue.toLowerCase()
        )
        .forEach(result => {
          let tempObj = {};
          tempObj['tuition'] = parseInt(result['TUITIONFEE_OUT']);
         // tempObj['year'] = result['YEAR'];
          datas.push(tempObj);
        });
      console.log('Processed earning results:', JSON.stringify(datas));


      let dataset = [];
      let labels = [];
      datas.forEach(data => {
        //labels.push(data['year']);
        dataset.push(data['tuition']);
      });

      let data = {
        labels: labels,
        datasets: [
          {
            label: 'Amount in USD',
            data: dataset,
            borderColor: 'rgba(0, 188, 212, 0.75)',
            backgroundColor: 'rgba(0, 188, 212, 0.3)',
            pointBorderColor: 'rgba(0, 188, 212, 0)',
            pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
            pointBorderWidth: 1
          }
        ]
      };

      let config = {
        type: 'horizontalBar',
        data: data,
        options: {
          responsive: true,
          legend: false,
            scales: {
              xAxes: [{
                gridLines: {
                  display: false, // hide x-axis line
                  drawBorder: true // hide zero grid line
                }, // setting x-axis grid
                ticks: {
                  display: true // hide x-axis value
                }
              }],
              yAxes: [{
                gridLines: {
                  display: true, // hide y-axis line
                  drawBorder: false // hide zero grid line
                },
                scaleLabel: {
                  display: true // show label name
                },
                ticks: {
                   display: true, // show y value text
                   mirror: true, // inside position (value name)
                   labelOffset: -15, // text positon distance
                   fontSize: 13,
                   padding: 0,
                   fontColor: "#222",
                   fontFamliy: "verdana"
                },
                barPercentage: 0.3 // bar thickness
               }]
            }
        }
      };

      $('#progress-bar1 .progress-bar').text(23 + '%');
      $('#progress-bar1 .progress-bar').css({'width':23+'%'});
      console.log(data);
      //element.barPercentage = data;
      // new Chart(
      //   document.getElementById('progress-bar1').getContext('2d'),
      //   config
      // );
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('error ' + textStatus + ' ' + errorThrown);
    }
  });
}

function getSATMidpointResults(filterValue) {
  // get the rangeResults
  $.ajax({
    url: 'index/range',
    dataType: 'json',

    success: function(results) {
      //$("#test").append(data);
      // d=JSON.stringify(data)
      let datas = [];
      results
        .filter(
          result => result['INSTNM'].toLowerCase() === filterValue.toLowerCase()
        )
        .forEach(result => {
          let tempObj = {};
          tempObj['year'] = result['YEAR'];
          tempObj['SATVRMID'] = parseInt(result['SATVRMID']);
          tempObj['SATMTMID'] = parseInt(result['SATMTMID']);
          tempObj['SATWRMID'] = parseInt(result['SATWRMID']);
          datas.push(tempObj);
        });
      console.log('Processsed data Range results', JSON.stringify(datas));

      // for chronological ordering
      datas.sort((a, b) =>
        a['year'] > b['year'] ? 1 : b['year'] > a['year'] ? -1 : 0
      );

      let labels = [];
      let satvrmid = [];
      let satmtmid = [];
      let satwrmid = [];
      datas.forEach(data => {
        labels.push(data['year']);
        satvrmid.push(data['SATVRMID']);
        satmtmid.push(data['SATMTMID']);
        satwrmid.push(data['SATWRMID']);
      });

      let data = {
        labels: labels,
        datasets: [
          {
            label: 'Critical Reading',
            fill: false,
            data: satvrmid,
            borderColor: 'rgba(0, 188, 212, 0.75)',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            pointBorderColor: 'rgba(0, 188, 212, 0)',
            pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
            pointBorderWidth: 1
          },
          {
            label: 'Math',
            fill: false,
            data: satmtmid,
            borderColor: 'rgba(233, 30, 99, 0.75)',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            pointBorderColor: 'rgba(233, 30, 99, 0)',
            pointBackgroundColor: 'rgba(233, 30, 99, 0.9)',
            pointBorderWidth: 1
          },
          {
            label: 'Writing',
            fill: false,
            data: satwrmid,
            borderColor: 'rgba(0, 5, 5, 0.75)',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            pointBorderColor: 'rgba(0, 5, 5, 0)',
            pointBackgroundColor: 'rgba(0, 5, 5, 0.9)',
            pointBorderWidth: 1
          }
        ]
      };

      let config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          legend: false,
            scales: {
                xAxes: [{

                    scaleLabel: {
                        display: true,
                        labelString: 'YEAR',
                        fontSize: 16
                    }
                }],
                yAxes: [{

                    scaleLabel: {
                        display: true,
                        labelString: 'SAT',
                        fontSize: 16
                    }
                }]
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

function getGradDebtProjection(filterValue) {
  $.ajax({
    url: 'index/grad',
    dataType: 'json',

    success: function(results) {
      //$("#test").append(data);
      // d=JSON.stringify(data)
      let datas = [];
      results
        .filter(
          result => result['INSTNM'].toLowerCase() === filterValue.toLowerCase()
        )
        .forEach(result => {
          let tempObj = {};
          tempObj['debt'] = parseInt(result['GRAD_DEBT_MDN_SUPP']);
          tempObj['year'] = result['YEAR'];
          datas.push(tempObj);
        });
      console.log('Processed received grad data', JSON.stringify(datas));
      let dataset = [];
      let labels = [];

      // for chronological ordering
      datas.sort((a, b) =>
        a['year'] > b['year'] ? 1 : b['year'] > a['year'] ? -1 : 0
      );

      console.log('sorted data+', datas);
      datas.forEach(data => {
        labels.push(data['year']);
        dataset.push(data['debt']);
      });

      let data = {
        labels: labels,
        datasets: [
          {
            label: 'debt in USD',
            data: dataset,
            borderColor: 'rgba(0, 188, 212, 0.75)',
            backgroundColor: 'rgba(0, 188, 212, 0.3)',
            pointBorderColor: 'rgba(0, 188, 212, 0)',
            pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
            pointBorderWidth: 1
          }
        ]
      };

      let config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          legend: false,
            scales: {
                xAxes: [{

                    scaleLabel: {
                        display: true,
                        labelString: 'YEAR',
                        fontSize: 16
                    }
                }],
                yAxes: [{

                    scaleLabel: {
                        display: true,
                        labelString: 'DEBT',
                        fontSize: 16
                    }
                }]
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

function getEarningResults(filterValue) {
  // get the earningsResults
  $.ajax({
    url: 'index/earnings',
    dataType: 'json',

    success: function(results) {
      //$("#test").append(data);
      // d=JSON.stringify(data)
      let datas = [];
      results
        .filter(
          result => result['INSTNM'].toLowerCase() === filterValue.toLowerCase()
        )
        .forEach(result => {
          let tempObj = {};
          tempObj['earn'] = parseInt(result['MN_EARN_WNE_P10']);
          tempObj['year'] = result['YEAR'];
          datas.push(tempObj);
        });
      console.log('Processed earning results:', JSON.stringify(datas));

      // for chronological ordering
      datas.sort((a, b) =>
        a['year'] > b['year'] ? 1 : b['year'] > a['year'] ? -1 : 0
      );

      let dataset = [];
      let labels = [];
      datas.forEach(data => {
        labels.push(data['year']);
        dataset.push(data['earn']);
      });

      let data = {
        labels: labels,
        datasets: [
          {
            label: 'Amount in USD',
            data: dataset,
            borderColor: 'rgba(0, 188, 212, 0.75)',
            backgroundColor: 'rgba(0, 188, 212, 0.3)',
            pointBorderColor: 'rgba(0, 188, 212, 0)',
            pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
            pointBorderWidth: 1
          }
        ]
      };

      let config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          legend: false,
            scales: {
                xAxes: [{

                    scaleLabel: {
                        display: true,
                        labelString: 'YEAR',
                        fontSize: 16
                    }
                }],
                yAxes: [{

                    scaleLabel: {
                        display: true,
                        labelString: 'Mean Earnings',
                        fontSize: 16
                    }
                }]
            }
        }
      };
      new Chart(
        document.getElementById('line_chart3').getContext('2d'),
        config
      );
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('error ' + textStatus + ' ' + errorThrown);
    }
  });
}

function getDiversityResults(filterValue) {
  // get the diversityResults
  $.ajax({
    url: 'index/diversity',
    dataType: 'json',

    success: function(results) {
      //$("#test").append(data);
      // d=JSON.stringify(data)

      console.log('received diversity data', results);
      let datas = [];
      results
        .filter(
          result => result['INSTNM'].toLowerCase() === filterValue.toLowerCase()
        )
        .forEach(result => {
          let tempObj = {};
          tempObj['2mor'] = parseFloat(result['UGDS_2MOR']);
          tempObj['aian'] = parseFloat(result['UGDS_AIAN']);
          tempObj['asian'] = parseFloat(result['UGDS_ASIAN']);
          tempObj['black'] = parseFloat(result['UGDS_BLACK']);
          tempObj['hisp'] = parseFloat(result['UGDS_HISP']);
          tempObj['nhpi'] = parseFloat(result['UGDS_NHPI']);
          tempObj['nra'] = parseFloat(result['UGDS_NRA']);
          tempObj['unkn'] = parseFloat(result['UGDS_UNKN']);
          tempObj['white'] = parseFloat(result['UGDS_WHITE']);
          tempObj['year'] = parseFloat(result['YEAR']);
          datas.push(tempObj);
        });

      console.log('Processed diversity results', JSON.stringify(datas));
      datas.sort((a, b) =>
        a['year'] > b['year'] ? 1 : b['year'] > a['year'] ? -1 : 0
      );

      let labels = [];
      let twoOrMore = [];
      let americanIndian = [];
      let asian = [];
      let black = [];
      let hisp = [];
      let nativeHawaiian = [];
      let nonResidentAlien = [];
      let unknown = [];
      let white = [];

      datas.forEach(data => {
        labels.push(data['year']);
        twoOrMore.push(data['2mor']);
        americanIndian.push(data['aian']);
        asian.push(data['asian']);
        black.push(data['black']);
        hisp.push(data['hisp']);
        nativeHawaiian.push(data['nhpi']);
        nonResidentAlien.push(data['nra']);
        unknown.push(data['unkn']);
        white.push(data['white']);
      });

      let data = {
        labels: labels,
        datasets: [
          {
            label: 'Two Or More',
            data: twoOrMore,
            backgroundColor: '#292B2C'
          },
          {
            label: 'American Indian',
            data: americanIndian,
            backgroundColor: '#5BC0DD'
          },
          {
            label: 'Asian',
            data: asian,
            backgroundColor: '#5CB85D'
          },
          {
            label: 'Black',
            data: black,
            backgroundColor: '#0076D8'
          },
          {
            label: 'Hispanic',
            data: hisp,
            backgroundColor: '#545B62'
          },
          {
            label: 'Native Hawaiian',
            data: nativeHawaiian,
            backgroundColor: '#D9534F'
          },
          {
            label: 'Non Resident Alien',
            data: nonResidentAlien,
            backgroundColor: '#EFAD4E'
          },
          {
            label: 'Unknown',
            data: unknown,
            backgroundColor: '#8C5EDD'
          },
          {
            label: 'white',
            data: white,
            backgroundColor: '#C87000'
          }
        ]
      };

      let config = {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          legend: false
        }
      };

      new Chart(document.getElementById('bar_chart2').getContext('2d'), config);
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


function getRetention(filterValue) {
    // get the rangeResults
    $.ajax({
        url: 'recentdash/retentionrate',
        dataType: 'json',

        success: function(results) {
            let retention = results
                .filter(
                    result => result['INSTNM'].toLowerCase() === filterValue.toLowerCase()
                );
            var ret_value = retention[0]['RET_FT4'] * 100 ;
            console.log("Ret value", ret_value);
            document.getElementById('ret').innerHTML = ret_value;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + ' ' + errorThrown);
        }
    });
}