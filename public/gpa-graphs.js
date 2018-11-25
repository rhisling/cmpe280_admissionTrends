'use strict';
var realtime = 'on';
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
                    legend: false
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