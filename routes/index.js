var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const { exec } = require('child_process');

  exec('bash exec_flexlm.sh 0', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }

    var servers = stdout.split("\n");

    var licenseList = [];

    for (i in servers) {
      features = servers[i].split(";");

      var license = {
        'server'      : features[0],
        'description' : features[1],
        'status'      : features[2]
      }

      if (features[0]) {
        licenseList.push(license);
      }
    }

    res.render('index', { title: 'FLEXlm.js', "licenseList": licenseList});
  });

});

module.exports = router;
