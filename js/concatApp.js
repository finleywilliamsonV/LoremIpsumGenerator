const router = require('../router.js');

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
let renderer = require('../renderer.js');
let loremIpsumGenerator = require('../loremIpsumGenerator.js');
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

module.exports.generator = generator;
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


module.exports.view = view;

// generate lorem ipsum text
function generateText(quantity, selected) {
  
  // empty content var to receive html
  let content = '';

  // PARAGRAPHS
  if (selected === 'Paragraphs') {

    for (let i = 0; i < quantity; i++) {
      content += '\n  <p>';
      content += paragraphs[i%5];
      content += '\n  </p>\n';
    }

  // WORDS
  } else if (selected === 'Words') {

    content += `  <p>${words(quantity)}</p>`;

  // LISTS
  } else {  // selected === 'lists'

    content += '<ul>';
    content += lists(quantity);
    content += '\n</ul>';
    
  }

  return content;
}



const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis blandit quam, sed dignissim enim. Proin mollis, ex vel faucibus congue, tellus quam tempor enim, in congue ex erat vitae nulla. Fusce metus eros, vehicula ut rhoncus vestibulum, lobortis id nulla. Aliquam pellentesque erat tellus, sit amet consectetur ligula convallis in. Integer quam orci, tempor nec nunc et, euismod varius lacus. In vitae maximus ante, eu venenatis eros. Curabitur ut risus ac odio interdum sollicitudin. Aliquam luctus nisl elit, eu consequat augue volutpat nec. Mauris porttitor posuere fermentum. Phasellus ultrices mauris vitae ex aliquet, non ornare massa ultrices. In vitae tortor luctus, aliquet orci et, pulvinar dui. Curabitur egestas, diam nec feugiat lacinia, orci risus laoreet orci, vel euismod metus lectus eget justo. Aliquam neque eros, venenatis ut eleifend vitae, pellentesque varius justo. Proin tempor ornare nisi, non mattis tellus consequat nec. Sed pellentesque accumsan libero, ut lobortis erat varius non. Donec luctus volutpat lacus in dignissim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut elementum sollicitudin felis sed facilisis. Aenean gravida feugiat sem eu sollicitudin. Maecenas lacus arcu, hendrerit vel mi vel, ullamcorper volutpat est. Donec tempus bibendum nulla in congue. Etiam vitae enim hendrerit, malesuada sapien sed, elementum orci. Suspendisse et nisl vel tortor tincidunt semper in quis nulla. Nam tristique, magna in tincidunt interdum, augue lectus commodo eros, nec vulputate ex erat sed odio. Sed placerat mi eget lacus mollis, non placerat nunc aliquam. Praesent porttitor massa erat, sed commodo nulla pellentesque volutpat. Duis in ante commodo nulla sollicitudin vulputate nec eu lectus. Nam in diam ac nunc suscipit volutpat a auctor magna. Praesent ut dui placerat mauris pretium facilisis. Donec lobortis ipsum non tincidunt pulvinar. Pellentesque fermentum nunc vel pharetra interdum. Aliquam placerat fermentum mauris. Vestibulum accumsan ante non odio finibus porta in et lorem. Pellentesque ante arcu, consectetur in pulvinar sed, congue vel lorem. Suspendisse imperdiet sit amet est sit amet ultricies. Curabitur nec metus vitae ante accumsan lacinia. Phasellus pulvinar eget purus in efficitur. Nulla accumsan lorem eu quam rutrum convallis ut non risus. Nullam quis ultrices dui, vitae auctor nibh. Praesent vel rhoncus felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas gravida justo ipsum, vel ullamcorper ligula cursus vitae. Aliquam vehicula iaculis est ac molestie. Curabitur sit amet augue erat. Cras rhoncus neque quis aliquet maximus. Suspendisse potenti. Sed congue, lacus eget tristique dictum, sapien leo pellentesque metus, et scelerisque erat dolor vitae tellus. Vestibulum iaculis placerat consequat. Pellentesque molestie quam in rhoncus pretium. Ut in urna gravida, dictum ipsum ut, aliquam sem. Mauris tempus odio eros, ac facilisis massa ultricies a. Sed tempor sed nibh sit amet pretium. Aliquam felis eros, elementum et ultricies eget, ornare at tellus. Aenean interdum sed lorem eget porta. Curabitur congue, nisl at egestas fermentum, tortor leo hendrerit quam, eget lacinia quam mi ac purus. Praesent tristique felis nisl, a dictum dui dictum a. Quisque volutpat convallis lectus, et convallis mauris."

const paragraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ligula orci, dictum vitae mattis id, placerat sed diam. Sed in suscipit enim. Curabitur id lorem et tortor pretium commodo. Vivamus pharetra tellus sit amet orci semper dignissim. Suspendisse eleifend venenatis nibh, quis imperdiet nisi posuere pulvinar. Suspendisse potenti. Pellentesque bibendum efficitur vehicula. Vestibulum id ante ut elit gravida suscipit tincidunt non nisl.",
  "Fusce sit amet gravida eros. Duis rutrum nunc ut sem facilisis, in viverra tellus posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut elementum quam ac condimentum gravida. Fusce placerat varius purus nec imperdiet. Sed justo lacus, tristique ut malesuada eu, tristique venenatis orci. Mauris purus neque, pellentesque non est sit amet, volutpat semper mauris.",
  "In ac pharetra leo. Sed in magna malesuada, volutpat odio convallis, condimentum sapien. Ut pulvinar leo tincidunt lacus ultricies luctus. Pellentesque at mi sed nisl semper imperdiet. Pellentesque fermentum odio turpis, non rutrum ante posuere eget. Vestibulum dictum lorem eget lorem interdum, vel consequat massa maximus. Nam sodales at orci quis faucibus. Etiam sed libero bibendum, tempus risus eu, ultricies ante. Maecenas non turpis laoreet, volutpat odio eget, convallis metus. Donec maximus est ligula, in dapibus lectus posuere ac. Curabitur accumsan, dui id finibus mattis, nisl tortor vestibulum turpis, quis placerat nisl diam nec nisl. Phasellus nisl ante, auctor non dignissim a, pellentesque vel arcu. In lorem justo, dictum non gravida nec, scelerisque et lorem. Sed tincidunt lacinia semper. Nullam porttitor, turpis id hendrerit rhoncus, ex nisl tincidunt justo, id ultrices nibh sapien ut velit. Nam a ipsum sit amet augue porta vestibulum.",
  "Proin bibendum tortor dolor, vitae ultrices justo tempus non. Sed eleifend augue nulla, vel cursus lacus mattis in. Nulla blandit sit amet nisl id tempor. Fusce luctus, ligula id tempus blandit, tortor sem imperdiet quam, a vulputate nunc justo in purus. Nullam vel odio leo. Suspendisse est odio, fermentum sed porta et, congue at arcu. Aliquam in nisi mattis, feugiat elit sed, interdum arcu. Curabitur a rutrum erat, a scelerisque massa. Curabitur sodales libero quis nunc accumsan feugiat.",
  "Proin tincidunt tempus nisl, sed tincidunt velit iaculis quis. Sed tincidunt sodales fringilla. Duis molestie ex at enim porttitor porta. Nunc tempor neque risus, quis elementum tortor tincidunt a. Pellentesque lobortis nulla vitae augue laoreet, nec iaculis dui imperdiet. Donec molestie ex neque. Sed at lacinia massa, sit amet finibus augue. Nam at quam tincidunt tortor congue posuere. Vivamus ut pretium nunc. In eu ligula at nibh tincidunt pretium in faucibus nisi."
];

const words = count => {
  //console.log('\nStarting get words(count)');
  let generatedWords = '';
  let startIndex = 0;
  let endIndex = 0;
  let nextWord;

  //console.log('\nStarting for-loop');
  for (let i = 0; i < count; i++) {

    // var for resetting @ reach end of text
    let reset = false;

    // log start and end index
    //console.log(`startIndex: ${startIndex}`);
    //console.log(`endIndex: ${endIndex}`);
    
    // find index of first space (' ')
    endIndex = loremIpsum.indexOf(' ', startIndex + 1);
    //console.log(`End index changed to ${endIndex}`);

    // handle if reached end of lorem ipsum -> set end index as last character in lorem ipsum string
    if (endIndex === -1) {
      endIndex = loremIpsum.length - 1;
      reset = true;
    }

    // retrieve word
    nextWord = loremIpsum.substring(startIndex, endIndex);
    //console.log(`Word retrieved: ${nextWord}`);

    // add to generated words string
    generatedWords += nextWord;
    //console.log(`generatedWords: ${generatedWords}`);

    // handle reset
    if (!reset) {
      // update start index
      startIndex = endIndex;
      //console.log(`Start index changed to ${startIndex}`);
    } else {
      // reset indexes
      startIndex = 0;
      endIndex = 0;
      reset = false;
    }
  }

  console.log(` + + Ending generate words, count: ${count}+ +`);
  //console.log(generatedWords);
  return(generatedWords);
}

const lists = count => {
  // console.log('\nStarting get lists(count)');
  let generatedLists = '';
  let startIndex = 0;
  let endIndex = 0;
  let nextListItem;

  // console.log('\nStarting for-loop');
  for (let i = 0; i < count; i++) {

    // log start and end index
    // console.log(`\nstartIndex: ${startIndex}`);
    // console.log(`endIndex: ${endIndex}`);
    
    // handle if reached end of lorem ipsum -> reset
    if (startIndex === loremIpsum.length) { // start index includes (+1) from below
      startIndex = 0;
    }

    // find index of first period ('.')
    endIndex = loremIpsum.indexOf('.', startIndex);
    // console.log(`End index changed to ${endIndex}`);

    // retrieve sentence and add to new list item
    nextListItem = `\n    <li>${loremIpsum.substring(startIndex, endIndex + 1)}</li>`;  // (+1) includes '.'
    // console.log(`List item created: ${nextListItem}`);

    // add to generated lists string
    generatedLists += nextListItem;
    //console.log(`generatedLists: ${generatedLists}`);
   
    // update start index
    startIndex = endIndex + 1; // (+1) includes '.'
    // console.log(`Start index changed to ${startIndex}`);
  }

  //console.log(` + + Ending generate lists, count: ${count}+ +`);
  //console.log(generatedLists);
  return(generatedLists);
}

module.exports.generateText = generateText;
//# sourceMappingURL=concatApp.js.map
