var express = require('express'),
    app = express(),
    port = 3000 || process.env.port,
    path = require('path');

// Serve static content from the public folder
app.use(express.static(path.join(__dirname, 'public')));


// Listen at port 3000
app.listen(port);
console.log('Listening on port', port);