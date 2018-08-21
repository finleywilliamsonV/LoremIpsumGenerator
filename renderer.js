let fs = require('fs');
let utf8 = {encoding: "utf8"};


// function that handles the reading of files and merging in values
function view(templateName, values, response) {
  // read from the template files
  let fileContents = fs.readFileSync('./views/' + templateName + '.html', utf8);

  // merge in values
  fileContents = mergeValues(values, fileContents);
  
  // write to the response
  response.write(fileContents);
}


// function that merges values with placeholders
function mergeValues(values, content) {
  for (let key in values) {
    // replace all {{key}} with the value from the values object
    content = content.replace("{{"+key+"}}", values[key]); 
  }
  return content;
}

// function that imports css
function css(templateName, response) {
  // read the template file
  let fileContents = fs.readFileSync('./styles/' + templateName + '.css', {encoding: 'utf8'});

  // write out to the response
  response.write(fileContents);
}


module.exports.view = view;
module.exports.css = css;