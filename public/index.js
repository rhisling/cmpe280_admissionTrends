﻿'use strict';
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
    $('#line_chart4').empty();
    $('#bar_chart1').empty();
    $('#bar_chart2').empty();
    $('#donut_chart').empty();

    getTuitionOutGraph(filterCriteriaByUniv);
    getTuitionInGraph(filterCriteriaByUniv);

    getSATMidpointResults(filterCriteriaByUniv);
    getGradDebtProjection(filterCriteriaByUniv);
    getEarningResults(filterCriteriaByUniv);
    getDiversityResults(filterCriteriaByUniv);
    getRetentionGraph(filterCriteriaByUniv);
    getLoanGraph(filterCriteriaByUniv);
    getGender(filterCriteriaByUniv);
    getExpenditure(filterCriteriaByUniv);
  });

  drawGraphForSATAVG();
  getSATMidpointResults(filterCriteriaByUniv);
  getGradDebtProjection(filterCriteriaByUniv);
  getEarningResults(filterCriteriaByUniv);
  getDiversityResults(filterCriteriaByUniv);
  getTuitionOutGraph(filterCriteriaByUniv);
  getTuitionInGraph(filterCriteriaByUniv);
  getRetentionGraph(filterCriteriaByUniv);
  getLoanGraph(filterCriteriaByUniv);
  getGender(filterCriteriaByUniv);
  getExpenditure(filterCriteriaByUniv);

  /* new Chart(

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
        ]
      };

      let config = {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'YEAR',
                  fontSize: 16
                }
              }
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'AVG_SAT',
                  fontSize: 16
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

function getTuitionOutGraph(filterValue) {
  // get the earningsResults
  $.ajax({
    url: 'index/tuition-out',
    dataType: 'json',

    success: function(results) {
      console.log('Tuition Out Graph', JSON.stringify(results));
      let tuitionFeeOut;
      results
        .filter(
          result => result['INSTNM'].toLowerCase() === filterValue.toLowerCase()
        )
        .filter(result => result['YEAR'] === '2017')
        .forEach(result => {
          tuitionFeeOut = result['TUITIONFEE_OUT'];
        });
      console.log('Processed earning results:', JSON.stringify(tuitionFeeOut));
      let finalVal = (parseFloat(tuitionFeeOut) / 100000) * 100;

      console.log('Finalval', finalVal);
      console.log('Final Type', typeof finalVal);
      //$('#progress-bar1').prop('aria-valuenow', 40);
      $('#outState').text('$' + tuitionFeeOut);
      $('#progressbar1')
        .attr('aria-valuenow', finalVal)
        .css('width', finalVal + '%')
        .text(Math.round(finalVal * 100) / 100 + 'k'); //%
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('error ' + textStatus + ' ' + errorThrown);
    }
  });
}
function getTuitionInGraph(filterValue) {
  // get the earningsResults
  $.ajax({
    url: 'index/tuition-in',
    dataType: 'json',

    success: function(results) {
      console.log('In State Tuition Graph', JSON.stringify(results));
      let tuitionFeeIn;
      results
        .filter(
          result => result['INSTNM'].toLowerCase() === filterValue.toLowerCase()
        )
        .filter(result => result['YEAR'] === '2017')
        .forEach(result => {
          tuitionFeeIn = result['TUITIONFEE_IN'];
        });
      console.log('Processed earning results:', JSON.stringify(tuitionFeeIn));
      let finalVal = (parseFloat(tuitionFeeIn) / 100000) * 100;

      console.log('Finalval', finalVal);
      console.log('Final Type', typeof finalVal);
      //$('#progress-bar1').prop('aria-valuenow', 40);
      $('#inState').text('$' + tuitionFeeIn);
      $('#progressbar2')
        .attr('aria-valuenow', finalVal)
        .css('width', finalVal + '%')
        .text(Math.round(finalVal * 100) / 100 + 'k'); //%
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
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'YEAR',
                  fontSize: 16
                }
              }
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'SAT',
                  fontSize: 16
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
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'YEAR',
                  fontSize: 16
                }
              }
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'DEBT',
                  fontSize: 16
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
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'YEAR',
                  fontSize: 16
                }
              }
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Mean Earnings',
                  fontSize: 16
                }
              }
            ]
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
            backgroundColor: 'rgba(92, 184, 93, 0.70)'
          },
          {
            label: 'American Indian',
            data: americanIndian,
            backgroundColor: 'rgba(217, 150, 148, 1.00)'
          },
          {
            label: 'Asian',
            data: asian,
            backgroundColor: 'rgba(142, 159, 195, 1.00)'
          },
          {
            label: 'Black',
            data: black,
            backgroundColor: 'rgba(141, 211, 199, 0.70)'
          },
          {
            label: 'Hispanic',
            data: hisp,
            backgroundColor: 'rgba(190, 185, 218, 0.70)'
          },
          {
            label: 'Native Hawaiian',
            data: nativeHawaiian,
            backgroundColor: 'rgba(251, 128, 114, 0.70)'
          },
          {
            label: 'Non Resident Alien',
            data: nonResidentAlien,
            backgroundColor: 'rgba(129, 177, 211, 0.70)'
          },
          {
            label: 'Unknown',
            data: unknown,
            backgroundColor: 'rgba(253, 180, 98, 0.70)'
          },
          {
            label: 'white',
            data: white,
            backgroundColor: 'rgba(166, 164, 163, 1.00)'
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

function getRetentionGraph(filterValue) {
  // get the rangeResults
  $.ajax({
    url: 'index/retentionrate',
    dataType: 'json',

    success: function(results) {
      let retention = results.filter(
        result => result['INSTNM'].toLowerCase() === filterValue.toLowerCase()
      );
      var ret_value = retention[0]['RET_FT4'] * 100;
      console.log('Retention rate value', ret_value);
      //document.getElementById('ret').innerHTML = ret_value;

      $('#ret').text(Math.round(ret_value * 100) / 100 + '%');
      $('#progressbar3')
        .attr('aria-valuenow', ret_value)
        .css('width', ret_value + '%')
        .text(Math.round(ret_value * 100) / 100 + '%'); //%
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('error ' + textStatus + ' ' + errorThrown);
    }
  });
}

function getLoanGraph(filterValue) {
  // get the rangeResults
  $.ajax({
    url: 'index/loan',
    dataType: 'json',

    success: function(results) {
      let loan = results.filter(
        result => result['INSTNM'].toLowerCase() === filterValue.toLowerCase()
      );
      var loan_value = loan[0]['PCTFLOAN'] * 100;
      console.log('Loan value', loan_value);
      //document.getElementById('ret').innerHTML = ret_value;

      $('#loan').text(Math.round(loan_value * 100) / 100 + '%');
      $('#progressbar4')
        .attr('aria-valuenow', loan_value)
        .css('width', loan_value + '%')
        .text(Math.round(loan_value * 100) / 100 + '%'); //%
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('error ' + textStatus + ' ' + errorThrown);
    }
  });
}
function getGender(filterValue) {
  // get the rangeResults
  $.ajax({
    url: 'index/gender',
    dataType: 'json',

    success: function(results) {
      let datas = [];
      results
        .filter(
          result => result['INSTNM'].toLowerCase() === filterValue.toLowerCase()
        )
        .forEach(result => {
          let tempObj = {};
          tempObj['men'] = (parseFloat(result['UGDS_MEN']) * 100).toFixed(1);
          tempObj['women'] = (parseFloat(result['UGDS_WOMEN']) * 100).toFixed(
            1
          );
          datas.push(tempObj);
        });
      var json_datas = JSON.stringify(datas);
      //console.log('Processed received Gender data', json_datas);
      new Chart(document.getElementById('donut_chart'), {
        type: 'doughnut',
        data: {
          labels: ['Men', 'Women'],
          datasets: [
            {
              label: 'Gender Distribution',
              backgroundColor: ['#3e95cd', '#8e5ea2'],
              data: [datas[0]['men'], datas[0]['women']]
            }
          ]
        }
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('error ' + textStatus + ' ' + errorThrown);
    }
  });
}

function getExpenditure(filterValue) {
  $.ajax({
    url: 'index/expenditure',
    dataType: 'json',

    success: function(results) {
      let datas = [];
      let labels = [];
      let in_exp = [];
      //
      results
        .filter(
          result => result['INSTNM'].toLowerCase() === filterValue.toLowerCase()
        )
        .forEach(result => {
          labels.push(parseFloat(result['YEAR']));
          in_exp.push(parseFloat(result['IN_EXPENDITURE']));
        });

      let data = {
        labels: ['2017', '2016', '2015', '2014', '2013'],
        datasets: [
          {
            label: 'Expenditure',
            data: in_exp,
            backgroundColor: '#8de7a1'
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
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'EXPENDITURE ($US)',
                  fontSize: 14
                }
              }
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'YEAR',
                  fontSize: 14
                }
              }
            ]
          }
        }
      };
      new Chart(
        document.getElementById('line_chart4').getContext('2d'),
        config
      );
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('error ' + textStatus + ' ' + errorThrown);
    }
  });
}
