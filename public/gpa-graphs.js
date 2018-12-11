'use strict';
var realtime = 'on';
var r;

function initSparkline() {
  $('.sparkline').each(function() {
    var $this = $(this);
    $this.sparkline('html', $this.data());
  });
}

('use strict');
$(function() {
  $('#error-alert').hide();
  $('#btnGpaSat').on('click', function() {
    $('#error-alert').hide();
    let sat = $('#SAT').val();
    let gpa = $('#GPA').val();
    if (sat > 1600 || sat <= 0 || gpa > 4.0 || gpa <= 0) {
      $('#error-alert').show();
      $('#line_chart1').empty();
      $('#univ-tbody').empty();
    } else {
      getSATMidpointResults1();
    }
  });
});

///////////new change

function getSATMidpointResults1() {
  // get the rangeResults
  document.getElementById('graph').style.display = 'block';

  $.ajax({
    url: '/getUserScoreStats',
    dataType: 'json',

    success: function(results) {
      //$("#test").append(data);
      // d=JSON.stringify(data)
      r = results;
      console.log('in getSATMidpointResults', r);
      var sat1 = parseFloat(document.getElementById('SAT').value);
      var gpa1 = parseFloat(document.getElementById('GPA').value);
      console.log('sat', gpa);
      console.log('sat', typeof gpa);

      //console.log("data",results);
      var list = [];
      var label = [];
      var gpa = [];
      var sat = [];
      var temp = [];
      for (var i = 0; i < results.length; i++) {
        var dict = {};
        dict['University'] = results[i]['INSTNM'];
        label.push(results[i]['INSTNM']);
        var l = [];
        var d = {
          y: parseFloat(results[i]['SAT_AVG']),
          x: parseFloat(results[i]['GPA_Val'])
        };
        sat.push(parseFloat(results[i]['SAT_AVG']));
        gpa.push(parseFloat(results[i]['GPA_Val']));

        l.push(d);
        temp.push(d);
        dict['data'] = l;
        list.push(dict);
      }

      let univ = [];
      let coords = [];
      list.forEach(e => {
        univ.push(e['University']);
        coords.push(...e['data']);
      });

      console.log('univ list', JSON.stringify(univ));
      console.log('Coords', JSON.stringify(coords));
      let data = {
        datasets: [
          {
            label: univ[0],
            data: [
              {
                x: coords[0]['x'],
                y: coords[0]['y']
              }
            ],
            backgroundColor: 'rgba(243, 67, 54, 1.00)',
            pointBackgroundColor: 'rgba(243, 67, 54, 1.00)'
          },
          {
            label: univ[1],
            data: [
              {
                x: coords[1]['x'],
                y: coords[1]['y']
              }
            ],
            backgroundColor: 'rgba(243, 67, 54, 1.00)',
            pointBackgroundColor: 'rgba(243, 67, 54, 1.00)'
          },
          {
            label: univ[2],
            data: [
              {
                x: coords[2]['x'],
                y: coords[2]['y']
              }
            ],
            backgroundColor: 'rgba(243, 67, 54, 1.00)',
            pointBackgroundColor: 'rgba(243, 67, 54, 1.00)'
          },
          {
            label: univ[3],
            data: [
              {
                x: coords[3]['x'],
                y: coords[3]['y']
              }
            ],
            backgroundColor: 'rgba(243, 67, 54, 1.00)',
            pointBackgroundColor: 'rgba(243, 67, 54, 1.00)'
          },
          {
            label: univ[4],
            data: [
              {
                x: coords[4]['x'],
                y: coords[4]['y']
              }
            ],
            backgroundColor: 'rgba(243, 67, 54, 1.00)',
            pointBackgroundColor: 'rgba(243, 67, 54, 1.00)'
          },
          {
            label: univ[5],
            data: [
              {
                x: coords[5]['x'],
                y: coords[5]['y']
              }
            ],
            backgroundColor: 'rgba(243, 67, 54, 1.00)',
            pointBackgroundColor: 'rgba(243, 67, 54, 1.00)'
          },
          {
            label: univ[6],
            data: [
              {
                x: coords[6]['x'],
                y: coords[6]['y']
              }
            ],
            backgroundColor: 'rgba(243, 67, 54, 1.00)',
            pointBackgroundColor: 'rgba(243, 67, 54, 1.00)'
          },
          {
            label: univ[7],
            data: [
              {
                x: coords[7]['x'],
                y: coords[7]['y']
              }
            ],
            backgroundColor: 'rgba(243, 67, 54, 1.00)',
            pointBackgroundColor: 'rgba(243, 67, 54, 1.00)'
          },
          {
            label: univ[8],
            data: [
              {
                x: coords[8]['x'],
                y: coords[8]['y']
              }
            ],
            backgroundColor: 'rgba(243, 67, 54, 1.00)',
            pointBackgroundColor: 'rgba(243, 67, 54, 1.00)'
          },
          {
            label: 'Your Score',
            data: [
              {
                x: gpa1,
                y: sat1
              }
            ],
            backgroundColor: 'rgba(77, 175, 80, 1.00)',
            pointBackgroundColor: 'rgba(77, 175, 80, 1.00)'
          }
        ]
      };

      let config = {
        type: 'scatter',
        data: data,
        options: {
          responsive: true,
          title: { display: true },
          legend: { display: false },
          tooltips: {
            callbacks: {
              title: function(tooltipItems, data) {
                return data.datasets[tooltipItems[0].datasetIndex].label;
              },
              label: function(tooltipItem, data) {
                return (
                  'SAT: ' +
                  tooltipItem.yLabel
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '') +
                  ' ' +
                  'GPA: ' +
                  tooltipItem.xLabel
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '')
                );
              }
            }
          },
          scales: {
            yAxes: [
              {
                ticks: { beginAtZero: true },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'SAT (out of 1600)',
                  fontSize: 14
                }
              }
            ],
            xAxes: [
              {
                ticks: { beginAtZero: true },
                type: 'linear',
                position: 'bottom',
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'GPA (out of 4.0)',
                  fontSize: 14
                },
                gridLines: { display: true }
              }
            ]
          }
        }
      };
      new Chart(
        document.getElementById('line_chart1').getContext('2d'),
        config
      );
      console.log('r is', r);
      let universities = getGpaSatData();
      console.log(universities);
      $('#univ-tbody').empty();
      if (universities.length === 0) {
        $('#univ-tbody').append(
          '<tr style="text-align: center;"><td> Sorry we cannot recommend any universities for your score</td></tr>'
        );
      }
      universities.forEach(university => {
        $('#univ-tbody').append(
          '<tr style="text-align: center;"><td>' + university + '</td></tr>'
        );
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('error ' + textStatus + ' ' + errorThrown);
    }
  });
}

function getGpaSatData() {
  document.getElementById('graph').style.display = 'block';
  var sat = parseFloat(document.getElementById('SAT').value);
  var gpa = parseFloat(document.getElementById('GPA').value);
  var university = [];
  //console.log("in getGpaSatData()", r);

  //console.log("results in the getGpaSatData()", results);
  for (var i = 0; i < r.length; i++) {
    //console.log("univ",r[i]["INSTNM"],r[i]["GPA_Val"],r[i]["SAT_AVG"],gpa,sat);
    //console.log("check",r[i]["INSTNM"],typeof sat)
    if (
      parseFloat(r[i]['GPA_Val']) <= gpa &&
      parseFloat(r[i]['SAT_AVG']) <= sat
    ) {
      //console.log("univ",r[i]["INSTNM"]);
      university.push(r[i]['INSTNM']);
    }
  }
  return university;
}
