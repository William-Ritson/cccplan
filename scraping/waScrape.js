var http = require('http'),
    request = require('request'),
    fs = require('fs'),
    dbin = require('../data/dbinput.js');

  


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

var respCount = 0;
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
    ],
        url = 'http://web1.assist.org/cgi-bin/REPORT_2/Rep2.pl' + queryString(query);


    request(url, function (error, response, body) {
        if (!error) {
            respCount++;
            var fn = 'scraped/' + fromSchool + 'to' + toSchool + 'in' + major + '.html';
            console.log('ok', fromSchool, 'to', toSchool, 'major', major, 'STATUS: ' + response.statusCode);
            console.log('saving to', '*' + fn + '*');

            fs.writeFileSync(fn, body);
            dbin.storeAgreement({
                from: fromSchool,
                to: toSchool,
                major: major,
                source: body,
                srcUrl: url,
                scrapedDate: new Date()
            });
            console.log(respCount, 'responces \n');

        } else {
            console.log('error', fromSchool, 'to', toSchool, 'major', major, 'STATUS: ' + error);
        }
    });
};


var fromSchools = [
        'ARC',
        'DAC', //De Anza
        'CABRILLO'
    ],
    majors = [
        'CMPSBS', // CS BS
        'EECS',
        'BIOINFO', // Bioinformatics
        'MATH',
        'PHYS'
    ],
    toSchools = [
        'UCSC',
        'UCB',
    ];

var reqCount = 0;
toSchools.forEach(function (toSchool) {
    majors.forEach(function (major) {
        fromSchools.forEach(function (fromSchool) {
            console.log('start query', fromSchool, 'to', toSchool, 'major', major);
            runQuery(fromSchool, toSchool, major);
            reqCount++;
        });
    });
});
console.log('sent', reqCount, 'requests');