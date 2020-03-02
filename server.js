
const network = require('network');
const express = require('express');
const fs = require('fs');
const app = express();

// serve files from the public directory
app.use(express.static('public'));

// start the express web server listening on 8080
app.listen(3000, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');

});


// app.get('/interface', (req, res) => {


//   network.get_interfaces_list(function(err, list) {

//       if (err) {
//           return res.send({err})
//       }

//       res.send(list)
  
//     })
    
// })

// app.get('/save', (req, res) => {

//   network.get_interfaces_list(function(err, list) {

//     if (err) {
//         return res.send({err})
//     }

//     fs.readFile('interfaces.txt', function (err, data) {
//       if (err) throw err;
//       if(data.includes(list[0].name)){
//        console.log('Alreadey exist')
//       } else{
//         fs.appendFileSync('interfaces.txt', list[0].name + ',' + list[0].ip_address + ',' + list[0].mac_address + ',' + list[0].gateway_ip + ',' + list[0].type + '\n')
//       }
//     });
//   })
// })

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

    fs.appendFileSync('interfaces.txt', 'Eth0' + ',' + req.query.ip + ',' + req.query.netmask + ',' + 'mac_address' + ',' + req.query.gateway + ',' + req.query.dns + ',' + 'Wired' + '\n')
  })
  res.send({
    IP: req.query.ip
  })
})