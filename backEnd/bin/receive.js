const http = require('http')

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/findInfo',
  method: 'GET'
}

var data = "";

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', receivedData => {
    data += receivedData;
    console.log(data);
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()

