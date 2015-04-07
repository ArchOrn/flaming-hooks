// Load modules
var shell = require('shelljs');

// Load configs
var config = require(__base + 'app/config');

// Webhooks endpoints
exports.github = function (req, res) {
  var head = req.body.head;

  console.log(req.body);
  console.log('Last commit: ' + head + ' has been pushed.');
  console.log('Pulling the latest commit...');
  // Test git existence
  if (!which('git')) {
    console.log('Error: git is missing!');
  } else {
    // Go to repository
    shell.cd(config.repo);
    // Pull changes
    shell.exec('git pull');
    // Go back to previous folder
    shell.cd('-');
    console.log('Done.');
  }
};
