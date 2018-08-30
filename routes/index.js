var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const { exec } = require('child_process');

  exec('cat app.js', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }

    var licenseList = [];

    var license = {
      'server'                   : '27645@licenses.lsc.ic.unicamp.br',
      'description'              : 'lsc server: quarturs + modelsim + xilinx',
      'status'                   : 'UP',
      'current_usage'            : 'link',
      'features_and_expiration'  : 'link'
    }
    licenseList.push(license);
    licenseList.push(license);

    res.render('index', { title: 'FLEXlm.js', "licenseList": licenseList});
  });

});

module.exports = router;
