const router = require('./router.js');

// Problem: Create a site that generates Lorem Ipsum text
// Solution: Use Node.js to generate content and serve via HTTP

// Create a Web Server
const http = require('http');

const server = http.createServer( (request, response) => {

  // Log Request URL
  console.log('\n_______________________________________________');
	console.log(`\napp.js -> Request URL: ${request.url}`);
  console.log('_______________________________________________');
  
  // begin style route
  console.log('\nStarting style route');
  router.style(request, response);

  // begin generator route
  console.log('\nStarting generator route');
  router.generator(request, response);
});


const hostname = '127.0.0.1';
const port = process.env.PORT || '3000';

server.listen(port, () => {
	console.log("\n");
  console.log(`                  LOREM IPSUM GENERATOR` + "\n\n");
  console.log(`   ***   Server running at http://${hostname}:${port}/  ***`);
})