var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const { exec } = require('child_process');

  server = req.query.server;

  exec('bash exec_flexlm.sh 2 ' + server, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }

    var licenseList = [];
    var features = stdout.split("\n");

    for (i in features) {
      elem = features[i].replace(/  +/g, " ").split(" ");

      var license = {
        'feature'      : elem[0],
        'version'      : elem[1],
        'num_licenses' : elem[2],
        'expires'      : elem[3],
        'vendor'       : elem[4]
      }

      if (elem[0]) {
        licenseList.push(license);
      }
    }

    res.render('list', { title: 'FLEXlm.js', server: server, "licenseList": licenseList});
  });
});

module.exports = router;
