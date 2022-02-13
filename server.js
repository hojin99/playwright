const chromium = require('playwright').chromium;
const fs = require('fs');
const node_static = require('node-static');
const http = require('http');
const path = require('path');

console.log('start');

var file = new node_static.Server(path.resolve(__dirname, "resources"));

http
  .createServer(function (req, res) {
    file.serve(req, res);
  })
  .listen(9999);

