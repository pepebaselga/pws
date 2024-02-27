const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('/Users/pepebaselga/dev-practice/1-node-farm/starter/modules/replaceTemplate.js');
const slugify = require('slugify');
//Blocking, Syncharnous way
// const { text } = require('stream/consumers');
// const textin = fs.readFileSync('starter/txt/input.txt', 'utf-8');
// console.log(textin);

// const textOut = `This is what we know about the avocado: ${textin}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('starter/txt/output.txt', textOut);

// console.log('File written!');

//Non-Blocking, Asynchronous way
// fs.readFile('starter/txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log("Error! 💥");
//   fs.readFile(`starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile(`starter/txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);
//       fs.writeFile('start/txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => { });
//       console.log('your file has been written')

//     });
//   });
// });
// console.log('will read file')

//////////////////////////////
// const replaceTemplate = (temp, prod) => {
//   let output = temp
//   output = output.replace(/{%PRODUCTNAME%}/g, prod.productName);
//   output = output.replace(/{%PRICE%}/g, prod.price);
//   output = output.replace(/{%IMAGE%}/g, prod.image);
//   output = output.replace('(%PRODUCTNAME%)', prod.productName);
//   output = output.replace('(%IMAGE%)', prod.image);
//   output = output.replace('(%PRICE%)', prod.price);
//   output = output.replace('(%ORIGIN%)', prod.from);
//   output = output.replace('(%DESCRIPTION%)', prod.description);
//   output = output.replace('(%QUANTITY%)', prod.quantity);
//   output = output.replace('(%ID%)', prod.id);
//   output = output.replace('(%NUTRIENTS%)', prod.nutrients)
//   if (!prod.organic) {
//     output = output.replace('(%NOT_ORGANIC%)', 'not-organic');
//   }
//   return output;
// };
const tempOverview = fs.readFileSync(`starter/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`starter/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`starter/templates/template-product.html`, 'utf-8');
//Can't use the sync method within the server as this would cause blocking

const data = fs.readFileSync(`starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
// console.log(slugify('Fresh Avocados', { lower: true }));//produces fresh-avocados
//SERVER:
const server = http.createServer((req, res) => {
  // PRACTICE
  // console.log(req.url);
  // console.log(url.parse(req.url, true));
  // Pracitce
  const { query, pathname } = url.parse(req.url, true);
  // const pathname = req.url;
  //Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    console.log(query);

    const cardsHTML = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('(%PRODUCT_CARDS%)', cardsHTML);
    res.end(output);
    //Product Page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const prod = dataObj[query.id];
    const output = replaceTemplate(tempProduct, prod);

    res.end(output);
    //API Page
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  }
  //NotFound
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>This page could not be found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server is listening to request on port: 8000');
});
