// returns the value of the college of the user's choice
function getCollege() {
    return $('#college option:selected').val();
}

// returns the value of the university of the user's choice
function getUniversity() {
    return $('#university option:selected').val();
}

// returns the value of the major of the user's choice
function getMajor() {
    return $('#major option:selected').val();
}

function checkValidCollege() {
    //getCollege();
    return $('#college option:selected').index() > 0;
}

function checkValidUniversity() {
    return $('#university option:selected').index() > 0;
}

function fillColleges() {
    $.get('/from', function (data) {
        console.log(data);
        data.from.forEach(function (college) {
            $('#college').append('<option value="' + college + '">' + college + '</option>');
        });
    });
}

function fillUniversities() {
    $.get('/to', function (data) {
        data.to.forEach(function (university) {
            $('#university').append('<option value="' + university + '">' + university + '</option>');
        });
    });
}

function fillDegrees() {
    if (getCollege() !== "Select a community college" &&
        getUniversity() !== "Select a 4-year university") {

        //     if ($('#major').is(':empty')) {
        document.getElementById('major').innerHTML = "";
        $('#course-table tbody').empty();
        $('#major').prop('disabled', false);
        $.get('/majors', function (data) {
            data.majors.forEach(function (major) {
                $('#major').append('<option value="' + major + '">' + major + '</option>');
            });
        });
        //   }
    } else {
        document.getElementById('major').innerHTML = "";
        $('#major').prop('disabled', true);
        $('#course-table tbody').empty();
    }
}

var getIds = function () {
    var ret;
    $.ajax({
        url: '/ids',
        async: false,
        success: function (data) {
            //alert(data);    
            ret = data;
        }
    });
    return ret;
};

var addLinks = function (text) {
    var temp = getIds();
    //alert("temp "+temp);
    var a;
    for (var id in temp) {
        //alert("id " + id)
        if (text === temp[id]) {
            a = text.replace(temp[id], '<a href="#' + getCollege() + '/' + temp[id] + '">' + temp[id] + '</a>');
            //alert("a " + a);
            return a;
        }
    }
    return text;
};

var populateSections = function (college, course) {
    // get sections form the db and do stuff with them    
    $.getJSON('/course', {
    }, function (data) {
        var title = $('#course-heading').empty();
        title.text(data.name + ' (' + data.id + ') at ' + data.college);
        data.sessions.forEach(function (rowData) {
            var row = $('<tr>');
            row
                .append('<td>' + rowData.sesssionNumber + '</td>' +
                    '<td>' + rowData.meetings + '</td>' +
                    '<td>' + rowData.capacity + '</td>' +
                    '<td>' + rowData.teacher + '</td>');
            $('#section-table tbody').append(row);
        });
    });
    
};
    /*
    $.getJSON('/ids', {
        college: college,
        course: course
    }, function (data) {
        var row = $('#section-table').empty();
        var content = $('#section-table tbody').empty();
        row.append('<th>Colleges</th> <th>Available Sections</th>');
        data.forEach(function (rowData) {
            row = $('#section-table');
            row
                .append('<tr><td>' + rowData[0] + '</td>' +
                    '<td>' + rowData[1] + '</td></tr>');
        });
    });
*/


window.onhashchange = function (event) {
    var newHash = location.hash,
        college = newHash.split('/')[0],
        course = newHash.split('/')[1];

    if (college && course) {
        $('#course-table').prop('hidden', true);
        $('#session-mode').prop('hidden', false);
        populateSections(college, course);
    } else {
        $('#course-table').prop('hidden', false);
        $('#session-mode').prop('hidden', true);
    }
};

function displayTable() {

    if (getMajor() === "Select a major") {
        $('#course-table tbody').empty();
    } else {
        $.getJSON('/table', {
            //from: getCollege(),
            //to: getUniversity(),
            //major: getMajor()
        }, function (data) {

            var content = $('#course-table tbody'),
                row;
            content.empty();
            data.forEach(function (rowData) {
                row = $('#course-table');
                row
                // ADD LINKS BELOW
                .append('<tr><td>' + addLinks(rowData[0]) + '</td>' +
                    '<td>' + rowData[1] + '</td></tr>');

            });
        });
    }
}

$(document).ready(function () {
    fillColleges();
    fillUniversities();
});