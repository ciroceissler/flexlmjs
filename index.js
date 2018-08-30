var express = require('express');

// constants
var DEFAULT_PORT = 8080;
var PORT = process.env.PORT || DEFAULT_PORT;

// app
var app = express();
app.get('/', function (req, res) {

  const { exec } = require('child_process');

  exec('cat licenses.txt', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

    res.send(stdout);
  });
});

app.listen(PORT)
console.log('Running on http://localhost:' + PORT);
