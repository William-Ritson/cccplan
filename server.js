var express = require('express'),
    app = express(),
    port = 3000 || process.env.port,
    path = require('path');
    compression = require('compression');
    bodyParser = require('body-parser');

app.user(compression({
    threshold: 512;
}

// Serve static content from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming json requests
app.use(bodyParser.json());

app.getColleges('/JSON', function(req, res){
    res.send({
        colleges: ['UCB','UCD', 'UCI', 'UCSB', 'UCSC', 'UCLA','UCM','UCSD','UCR'];
    });
});

app.getDegrees('/JSON', function(req, res){
    // query: The 1 university user wants to transfer to
    var query = req.query;
    var college = query.college;
    // TODO: pass in the name of the university to William for filtering
    // return all the available degrees at that particular university
    // to client
    res.send({
        degrees: ['Computer Science', 'Computer Engineering', 'Electrical Engineering','Mechanical Engineering','Physics', 'Sociology'];
    });
});

app.getRequirements('/JSON', function(req, res){
    var query = req.query;
    var college = query.college;
    var degreee = query.degree;
    // pass in college and degree to William
    res.send({
        // if CompSci at UCSC
        requirements: ['CS 20J', 'CS12J', 'CS 21', 'CS 23', 'MATH 5A', 'MATH 5B', 'CS 24', 'MATH 5C', 'MATH 6', 'PHYS 4A', 'PHYS 4B', 'PHYS 4C', 'CHEM 1A', 'CHEM 1B'];
    });
});

app.getCourses('/JSON', function(req, res){
    var query = req.query;
    var college = query.college;
    var degree = query.degree;
    var requirement = query.requirement;
    // pass in college,degree and requirement to William
    res.send({
        // all equivalent courses at other community colleges
        courses: [
            {"college: De Anza",
             "system: quarter",
             "course: Math 1A",
             "section: 87808", 
             "days: MW", 
             "times: 8.00AM-9.20AM", 
             "units: 5", 
             "instructor: Malokas", 
             "room 806", 
             "prerequisite: Math 4(Precalculus)" },
            {"college: Cabrillo College",
             "system: semester",
             "course: Math 5A",
             "section: 12345",
             "days: TTH", 
             "times: 8.00AM-9.20AM", 
             "units: 5", 
             "instructor: D.Reynolds", 
             "room 605", 
             "prerequisite: Math 4(Precalculus)" },
            {"college: De Anza",
             "system: quarter",
             "course: Math 1A",
             "section: 87808", 
             "days: MW", 
             "times: 8.00AM-9.20AM",
             "units: 5", 
             "instructor: Bean", 
             "room 990", 
             "prerequisite: Math 4(Precalculus)"}
        ];
    });
});

// Listen at port 3000
app.listen(port);
console.log('Listening on port', port);