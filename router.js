let renderer = require('./renderer.js');
let loremIpsumGenerator = require('./loremIpsumGenerator.js');
let queryString = require('querystring');

// Handle HTTP route GET for generator
function generator(request, response) {

  // log request info
	console.log(`// beginning router.generator(request, response)`);
	console.log("router.generator() -> Request URL: " + request.url)
  console.log("router.generator() -> Request Method: " + request.method)
  
  if (request.url === '/') {
    
    if (request.method.toUpperCase() === "GET") {

      console.log(" - - inside generator route: GET");
      
      // set header info
      response.statusCode = 200;
      response.setHeader('Content-type', 'text/html');
      renderer.view("header", {}, response);
      renderer.view("generator", {}, response);
      renderer.view("footer", {}, response);
      response.end();
   
    } else {  // request method is POST

      console.log(" - - inside generator route: POST");

      // on data returned by form
      request.on('data', postBody => {
        var query = queryString.parse(postBody.toString());
        console.log('\nPOST query: ', query);

        // use default values if none specified
        if (!query.quantity || query.quantity >= 0) {
          if (query.selected === "Paragraphs") {
            query.quantity = 3;
          } else if (query.selected === "Words") {
            query.quantity = 100;
          } else {
            query.quantity = 10;
          }
        }

        let tempText = loremIpsumGenerator.generateText(query.quantity, query.selected);
        let values = {
          quantity_selected: query.quantity,
          type_selected: query.selected,
          generatedText: tempText
        };

        // set header info
        response.statusCode = 200;
        response.setHeader('Content-type', 'text/html');
        renderer.view("header", {}, response);
        renderer.view("generator", {}, response);
        renderer.view("generatedText", values, response);
        renderer.view("footer", {}, response);
        response.end();
      });
    }


  } else {
    console.log(' - - ending response')
    response.end();
  }
}

// create a function to serve the CSS file
function style(req, res) {
	console.log("router.style() -> CSS Request URL: " + req.url)
	console.log("router.style() -> CSS Request Method: " + req.method)

	if (req.url.indexOf(".css") !== -1) {
		console.log(" - inside style route");

    renderer.css("main", res);
    res.end();
  }
}

module.exports.generator = generator;
module.exports.style = style;