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
    $.get('/colleges', function (data) {
        console.log(data);
        data.colleges.forEach(function (college) {
            $('#college').append('<option value="' + college + '">' + college + '</option>');
        });
    });
}

function fillUniversities() {
    $.get('/universities', function (data) {
        data.universities.forEach(function (university) {
            $('#university').append('<option value="' + university + '">' + university + '</option>');
        });
    });
}

function fillDegrees() {
    if ($('#major').is(':empty')) {
        if (getCollege() !== "Select a community college" &&
            getUniversity() !== "Select a 4-year university") {
            $('#major').prop('disabled', false);
            $.get('/degrees', function (data) {
                data.degrees.forEach(function (major) {
                    $('#major').append('<option value="' + major + '">' + major + '</option>');
                });
            });
        }
    } else {
        document.getElementById('major').innerHTML = "";
        $('#major').prop('disabled', true);

    }
}


$(document).ready(function () {
    fillColleges();
    fillUniversities();
});