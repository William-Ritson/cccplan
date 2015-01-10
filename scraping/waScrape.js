var http = require('http');


var queryString = function (query) {
    var res = '?',
        first = true;
    query.forEach(function (item) {
        if (!first) {
            first = false;
        } else {
            res += '&';
        }
        res += item[0] + '=' + item[1];
    });
    return res;
};

var options = {
    hostname: 'web1.assist.org',
    port: 80,
};

var runQuery = function (fromSchool, toSchool, major) {
    var query = [
        ['aay', '13-14'],
        ['dora', major],
        ['oia', toSchool],
        ['ay', '14-15'],
        ['event', 19],
        ['ria', toSchool],
        ['agreement', 'aa'],
        ['sia', fromSchool],
        ['ia', fromSchool],
        ['dir', '1&'],
        ['sidebar', false],
        ['rinst', 'left'],
        ['mver', 2],
        ['kind', 5],
        ['dt', 2]
    ];

    options.path = '/cgi-bin/REPORT_2/Rep2.pl' + queryString(query);

    http.get(options, function (res) {
        console.log('Queried from', fromSchool, 'to', toSchool, 'major', major, 'STATUS: ' + res.statusCode);
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
        });
    }).on('error', function (e) {
        console.log('problem with request: ', fromSchool, 'to', toSchool, 'major', major, 'error: ' + e.message);
    });
};


var fromSchools = [
        'ARC',
        'DAC', //De Anza
        'CABRILLO'
    ],
    majors = [
        'CMPSBS', // CS BS
        'BIOINFO', // Bioinformatics
        'MATH',
        'PHYS'
    ],
    toSchools = [
        'UCSC',
        'UCB',
        'UCD',
        'UCLA'
    ];

toSchools.forEach(function (toSchool) {
    majors.forEach(function (major) {
        fromSchools.forEach(function (fromSchool) {
            runQuery(fromSchool, toSchool, major);
        });
    });
});