'use strict';
var realtime = 'on';


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

  //let filterCriteriaByUniv = $('#univOption option:selected').val();
  let filterCriteriaByUniv = 'University of California-Berkeley';
  console.log(filterCriteriaByUniv);
  $('#line_chart1').empty();
  $('#line_chart2').empty();
  
  drawGraphForSATAVG();
  drawGraphForTuitionFee();
/*  $('#univOption').change(function() {
    filterCriteriaByUniv = 'University of California-Berkeley';
    console.log(filterCriteriaByUniv);
    //When drop down is changed, call the 4 methods again
    //$('#morris-area-chart').empty();
    $('#line_chart1').empty();
/*    $('#line_chart2').empty();
    $('#line_chart3').empty();
    $('#bar_chart1').empty();
    $('#bar_chart2').empty();*/

    //getSATMidpointResults(filterCriteriaByUniv);
   // getGradDebtProjection(filterCriteriaByUniv);
    //getEarningResults(filterCriteriaByUniv);
   // getDiversityResults(filterCriteriaByUniv);
  });

  //drawGraphForSATAVG();
 // getSATMidpointResults(filterCriteriaByUniv);
 // getGradDebtProjection(filterCriteriaByUniv);
//  getEarningResults(filterCriteriaByUniv);
//  getDiversityResults(filterCriteriaByUniv);
  /* new Chart(
    document.getElementById('bar_chart1').getContext('2d'),
    getChartJs('bar')
  ); 
});*/

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
      let ucscData = [];
      let ucmData = [];

      datas.forEach(data => {
        labels.push(data['year']);
        ucbData.push(data['University of California-Berkeley']);
      });

      let data = {
        labels: labels,
        datasets: [
          {
            label: 'UCB',
            data: ucbData,
            backgroundColor: '#dd5e89'
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

      new Chart(document.getElementById('line_chart1').getContext('2d'), config);

      console.log('labels:', labels);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('error ' + textStatus + ' ' + errorThrown);
    }
  });
}

function drawGraphForTuitionFee() {
  $.ajax({
    url: 'index/tuition',
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
      console.log('Processed data range lists:' + JSON.stringify(datas));
      // for chronological ordering
      datas.sort((a, b) =>
        a['year'] > b['year'] ? 1 : b['year'] > a['year'] ? -1 : 0
      );
      let labels = [];
      let ucbData = [];

      datas.forEach(data => {
        labels.push(data['year']);
        ucbData.push(data['University of California-Berkeley']);
      });

      let data = {
        labels: labels,
        datasets: [
          {
            label: 'UCB',
            data: ucbData,
            backgroundColor: '#dd5e89'
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

      new Chart(document.getElementById('line_chart2').getContext('2d'), config);

      console.log('labels:', labels);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('error ' + textStatus + ' ' + errorThrown);
    }
  });
}


/*function getGradDebtProjection(filterValue) {
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
          legend: false
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
          legend: false
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
*/
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
