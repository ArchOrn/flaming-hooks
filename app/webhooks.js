// Load modules
var shell = require('shelljs');

// Load configs
var config = require(__base + 'app/config');

// Webhooks endpoints
exports.github = function (req, res) {
  var head = req.body.head_commit.id;
  var message = req.body.head_commit.message;
  var repository = req.body.repository;

  console.log('================================================================================');
  console.log('Last commit: ' + head + ' has been pushed.');
  console.log('Message: ' + message);
  console.log('Pulling the latest commit...');
  // Test git existence
  if (!shell.which('git')) {
    console.log('Error: git is missing!');
  } else {
    var result = {
      result: 'OK',
      message: repository.full_name + ' is valid, done pulling.'
    };
    if (repository.full_name == 'ArchOrn/flaming-hooks') {
      // Go to repository
      shell.cd(config.github.webhooks.repo);
      // Pull changes
      shell.exec('git pull origin master');
      console.log('Done.');
    } else if (repository.full_name == 'Jeekyx/angulurf') {
      // Go to repository
      shell.cd(config.github.urfmadness.repo);
      // Pull changes
      shell.exec('git pull origin master');
      console.log('Done.');
    } else {
      console.log('Error: repository not recognized!');
      result = {
        result: 'ERROR',
        message: 'Error: repository not recognized!'
      };
    }
    res.json(result);
  }
};
