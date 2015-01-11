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
        if ($('#major').is(':empty')) {
            $('#major').prop('disabled', false);
            $.get('/majors', function (data) {
                data.majors.forEach(function (major) {
                    $('#major').append('<option value="' + major + '">' + major + '</option>');
                });
            });
        }
    } else {
        document.getElementById('major').innerHTML = "";
        $('#major').prop('disabled', true);
        $('#course-table tbody').empty();
    }
}

function displayTable() {

    if (getMajor() === "Select a major") {
        $('#course-table tbody').empty();
    } else {
        $.getJSON('/table', {
            from: getCollege(),
            to: getUniversity(),
            major: getMajor()
        }, function (data) {
            var content = $('#course-table tbody'),
                row;
            console.log(data);
            content.empty();
            
            data.forEach(function (rowData) {
                row = $('<tr>');
                row
                    .append('<td class="clickable">' + rowData[0] + '</td>')
                    .append('<td>' + rowData[1] + '</td>');
                content.append(row);
            });
        });
    }
}

$(document).ready(function () {
    fillColleges();
    fillUniversities();
});