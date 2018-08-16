const router = require('./router.js');

// Problem: Create a site that generates Lorem Ipsum text
// Solution: Use Node.js to generate content and serve via HTTP

// Create a Web Server
const http = require('http');

const hostname = '127.0.0.1';
const port = '3000'

const server = http.createServer( (request, response) => {

  // Log Request URL
  console.log('\n_______________________________________________');
	console.log(`\napp.js -> Request URL: ${request.url}`);
  console.log('_______________________________________________');
  
  // begin generator route
  console.log('\nStarting generator route');
  router.generator(request, response);
});

server.listen(port, hostname, () => {
	console.log("\n");
  console.log(`                  LOREM IPSUM GENERATOR` + "\n\n");
  console.log(`   ***   Server running at http://${hostname}:${port}/  ***`);
})