var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const { exec } = require('child_process');

  server = req.query.server;

  exec('bash exec_flexlm.sh 1 ' + server, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }

    var features = stdout.split("\n");

    var licenseList = [];

    for (i in features) {

      if (features[i].includes("Users of")) {
        elem = features[i].replace(":",";").split(";");

        elem[0] = elem[0].replace("Users of", "");

        elem[1] = elem[1].replace("(Total of ", "")
        elem[1] = elem[1].replace(" licenses issued", "")

        elem[2] = elem[2].replace("Total of ", "")
        elem[2] = elem[2].replace(" license in use)", "")
        elem[2] = elem[2].replace(" licenses in use)", "")

        var license = {
          'feature'   : elem[0],
          'total'     : elem[1],
          'available' : elem[1] - elem[2],
          'in_use'    : elem[2],
          'users'     : []
        }

        licenseList.push(license);
      } else if (features[i].includes(", start")) {
        elem = features[i].trim().split(" ");

        usage_time  = elem[elem.length - 3] + ' ';
        usage_time += elem[elem.length - 2] + ' ';
        usage_time += elem[elem.length - 1];

        var user = {
          'user'        : elem[0],
          'usage_time'  : usage_time,
          'ip_address'  : elem[1]
        }

        licenseList[licenseList.length - 1].users.push(user);
      }
    }

    res.render('usage', { title: 'FLEXlm.js', server: server, "licenseList": licenseList});
  });
});

module.exports = router;
