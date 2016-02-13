var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('input/subject.txt');

var fs = require('fs');

var the_line = '';

// http://stackoverflow.com/questions/19084570/how-to-add-items-to-array-in-nodejs
var buffer = [];

lr.on('error', function (err) {
  // 'err' contains error object
});

lr.on('line', function (line) {
  // 'line' contains the current line without the trailing newline character.
  the_line = '"' + line + '"';
  buffer.push(the_line);
});

lr.on('end', function () {
  // All lines are read, file is closed now.
  var file = fs.createWriteStream('output/subject.out.txt');
  file.on('error', function(err) { 
    /* error handling */
    console.log('-error-');
    console.log(err);
  });

  // http://stackoverflow.com/questions/17614123/node-js-how-to-write-an-array-to-file
  buffer.forEach(function(v) {
    var text = v + "\n"; 
    file.write(text); 
  });
  file.end();

});
