// Load modules
var shell = require('shelljs');

// Load configs
var config = require(__base + 'app/config');

// Webhooks endpoints
exports.github = function (req, res) {
  var head = req.body.head_commit.id;
  var message = req.body.head_commit.message;

  console.log(req.body);
  console.log('Last commit: ' + head + ' has been pushed.');
  console.log('Message: ' + message);
  console.log('Pulling the latest commit...');
  // Test git existence
  if (!shell.which('git')) {
    console.log('Error: git is missing!');
  } else {
    var options = {};
    // Go to repository
    shell.cd(options, config.github.urfmadness.repo);
    // Pull changes
    shell.exec('git pull');
    // Go back to previous folder
    shell.cd(options, '-');
    console.log('Done.');
  }
};
