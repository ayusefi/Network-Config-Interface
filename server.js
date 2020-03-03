
// Import needed modules
const network = require('network');
const express = require('express');
const fs = require('fs');
const scanner = require('node-wifi-scanner');
const app = express();

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

// Save eth0 to interface_eth0.txt file
app.get('/eth0save', (req, res) => {
  if (!req.query.ip) {
    return res.send({
      error: 'You must provide IP address!'
    })
  } else if(!req.query.netmask) {
    return res.send({
      error: 'You must provide Netmask!'
    })
  } else if(!req.query.gateway) {
    return res.send({
      error: 'You must provide Gateway!'
    })
  } else if(!req.query.dns) {
    return res.send({
      error: 'You must provide DNS IP!'
    })
  }
  fs.readFile('interfaces.txt', function (err, data) {
    if (err) throw err;

    fs.appendFileSync('interface_eth0.txt', 'Eth0' + ',' + req.query.ip + ',' + req.query.netmask + ',' + 'mac_address' + ',' + req.query.gateway + ',' + req.query.dns + ',' + 'Wired' + '\n')
  })

  res.send({
    IP: req.query.ip
  })
})

// Save eth1 data into interface_eth1.txt file!
app.get('/eth1save', (req, res) => {
  if (!req.query.ip) {
    return res.send({
      error: 'You must provide IP address!'
    })
  } else if(!req.query.netmask) {
    return res.send({
      error: 'You must provide Netmask!'
    })
  } else if(!req.query.gateway) {
    return res.send({
      error: 'You must provide Gateway!'
    })
  } else if(!req.query.dns) {
    return res.send({
      error: 'You must provide DNS IP!'
    })
  }
  fs.readFile('interfaces.txt', function (err, data) {
    if (err) throw err;

    fs.appendFileSync('interface_eth1.txt', 'Eth1' + ',' + req.query.ip + ',' + req.query.netmask + ',' + 'mac_address' + ',' + req.query.gateway + ',' + req.query.dns + ',' + 'Wired' + '\n')
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
    res.send(networks)
  });
})