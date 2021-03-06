
// Import needed modules
// const os = require('os')
const network = require('network');
const express = require('express');
const fs = require('fs');
const scanner = require('node-wifi-scanner');
var set_ip_address = require('set-ip-address')
const app = express();
const cmd = require('node-cmd');

// serve files from the public directory
app.use(express.static('public'));

// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Serves a list of available network interfaces
app.get('/interfaces', (req, res) => {
  network.get_interfaces_list(function(err, list) {
    if (err) {
        return res.send({err})
    }
    res.send(list)
  })
})

// Save avialable interfaces info to txt files
app.get('/intrfcsave', (req, res) => {
  if (!req.query.ip || ValidateIPaddress(req.query.ip) === false) {
    return res.send({
      error: 'Please enter valid IP address'
    })
  } else if(!req.query.netmask || ValidateIPaddress(req.query.netmask) === false) {
    return res.send({
      error: 'Please enter valid Netmask'
    })
  } else if(!req.query.gateway || ValidateIPaddress(req.query.gateway) === false) {
    return res.send({
      error: 'Please enter valid Gateway'
    })
  } else if(!req.query.dns || ValidateIPaddress(req.query.dns) === false) {
    return res.send({
      error: 'Please enter valid DNS IP'
    })
  }
  const intrfcObject = {
    name: req.query.name,
    ipaddress: req.query.ip,
    netmask: req.query.netmask,
    gateway: req.query.gateway,
    dns: req.query.dns,
  }
  var jsonContent = JSON.stringify(intrfcObject);
  fs.writeFile("interface_" + intrfcObject.name + ".json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
  })
  res.send({
    IP: req.query.ip
  })
})

// List available Wifi networks
app.get('/availwifis', (req, res) => {
  
  scanner.scan((err, networks) => {
    if (err) {
      console.error(err);
      return res.send(err)
    }
    res.send({
      availnetworks: networks,
      connectedwirelss: global.connectedWifi
    })
  });
  cmd.get(
    'iwgetid -r',
     function(err, data, stderr){
        global.connectedWifi = data
      }
  )
})

// Restart Network with given configuration
app.get('/restNet', (req, res) => {
  if (!req.query.ssid) {
    return res.send({
      error: 'You must choose a network!'
    })
  } else if(!req.query.pass) {
    return res.send({
      error: 'You must enter password!'
    })
  } else if(!req.query.filename){
    return res.send({
      error: 'Unable to find interface files!'
    })
  }
  var filenames = req.query.filename;
  var filenamesArr = filenames.split(',')
  filenamesArr.forEach(function(value) {
    var intrfcObjectraw = fs.readFileSync('interface_' + value + '.json')
    var intrfcObject = JSON.parse(intrfcObjectraw)
    var intrfc = {
      interface: intrfcObject.name,
      ip_address: intrfcObject.ipaddress,
      prefix: 24,
      gateway: intrfcObject.gateway,
      nameservers: [intrfcObject.dns]
    }
   // set_ip_address.configure([intrfc]).then(() => console.log('done writing config files'))
  })
  cmd.get(
                'ifconfig wlan0 down ',
                function(err, data, stderr){
                        console.log(data)
                }
        );
  cmd.get(
                'ifconfig wlan0 up',
                 function(err, data, stderr){
                        console.log(data)
                }
        );

  cmd.get(
    'nmcli -w 10 d wifi connect ' + req.query.ssid + ' password ' + req.query.pass,
    function(err, data, stderr){
      console.log(data)
      res.send({
        respond: data
      })
    }
  );
})

// Function to validate entered inputs of interfaces
function ValidateIPaddress(ipaddresss) 
{
 if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddresss))
  {
    return (true)
  }
return (false)
}