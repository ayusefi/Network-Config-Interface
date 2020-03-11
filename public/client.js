
// Variable for Interfaces checkbox
const interfacesChkbx = document.querySelector('#interfaces-checkbox')
const messageInterfaces = document.querySelector('#message-interfaces')
const intrfcsButton = document.querySelector('#saveButton')
const messageIntrfcsSave = document.querySelector('#message-intrfcssave')


// // Variables for eth0 interface
// const eth0Form = document.querySelector('#eth0form');
// const eth0IP = document.querySelector('#eth0-ip-address')
// const eth0Netmask = document.querySelector('#eth0-net-mask')
// const eth0Gateway = document.querySelector('#eth0-gate-way')
// const eth0DNS = document.querySelector("#eth0-dns-server")
// const messageEth0Save = document.querySelector('#message-eth0save')

// // Variales for eth1 interface
// const eth1Form = document.querySelector('#eth1form');
// const eth1IP = document.querySelector('#eth1-ip-address')
// const eth1Netmask = document.querySelector('#eth1-net-mask')
// const eth1Gateway = document.querySelector('#eth1-gate-way')
// const eth1DNS = document.querySelector("#eth1-dns-server")
// const messageEth1Save = document.querySelector('#message-eth1save')

// Variables for listing avaialable wifi networks
const availwifis = document.querySelector('#wifis-checkbox')
var messageAvailWifis = document.querySelector('#wifi-div');

// Variables for Restaring Network
const restButton = document.querySelector("#ResetButton")
const messageRestNet = document.querySelector('#message-restNet')
const wifiPassword = document.querySelector("#wifipass")



// Checkbox event handler for listing available network interfaces
interfacesChkbx.addEventListener('change', function(e) {
    e.preventDefault()
    messageInterfaces.textContent = ''
    if (this.checked) {
        fetch('/interfaces').then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageInterfaces.textContent = data.error
                } else {
                    data.forEach(function(value) {

                        var interfacehtml = createInterfaceTable(value.name,value.ip_address, value.netmask, value.gateway_ip, value.mac_address)
                        messageInterfaces.appendChild(interfacehtml)
                        
                    })
                }
            })
        })
    }
})
// Button event handler for saving  interfaces information into files
intrfcsButton.addEventListener('click', function(e) {
    e.preventDefault()

    
    fetch('/interfaces').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageIntrfcsSave.textContent = data.error
            } else {
                            
                data.forEach(function(value) {

                    var messageIntrfcIP = document.querySelector('#' + value.name +'-intrfc-IP')
                    var messageIntrfcNetmask = document.querySelector('#' + value.name + '-intrfc-Netmask')
                    var messageGateway = document.querySelector('#' + value.name + '-intrfc-Gateway')
                    var messageDNS = document.querySelector('#' + value.name + '-intrfc-DNS')
                    var messageMAC = document.querySelector('#' + value.name + '-intrfc-MAC')

                    messageIntrfcsSave.textContent = ''

                    fetch('/intrfcsave?name=' + value.name + '&ip=' + messageIntrfcIP.value + '&netmask=' + messageIntrfcNetmask.value + '&gateway=' + messageGateway.value + '&dns=' + messageDNS.value).then((response) => {
                        response.json().then((data) => {
                            if (data.error) {
                                messageIntrfcsSave.textContent = data.error
                            } else {
                                messageIntrfcsSave.textContent = 'Information saved to file!'
                            }
                        })
                    })
                    
                })
            }
        })

    })

    // fetch('/interfaces').then((response) => {
    //     response.json().then((data) => {
    //         if (data.error) {
    //             console.log(data.error)
    //         } else {
    //             availInterfaces = Object.keys(data)
    //             test = Object.entries(data)
    //             test.forEach(function(value) {
    //                 name = value[0]
    //                 address = value[1][0].address
    //                 netmask = value[1][0].netmask
    //                 macaddress = value[1][0].mac

    //                 var messageIntrfcIP = document.querySelector('#' + name +'-intrfc-IP')
    //                 var messageIntrfcNetmask = document.querySelector('#' + name + '-intrfc-Netmask')


    //                 IP_Address = 'eth0IP.value'
    //                 Net_mask = 'eth0Netmask.value'
    //                 Gateway = 'eth0Gateway.value'
    //                 DNS = 'eth0DNS.value'
    //                 messageIntrfcsSave.textContent = ''

    //                 fetch('/intrfcsave?name=' + name + '&ip=' + messageIntrfcIP.value + '&netmask=' + messageIntrfcNetmask.value + '&gateway=' + Gateway + '&dns=' + DNS).then((response) => {
    //                     response.json().then((data) => {
    //                         if (data.error) {
    //                             messageIntrfcsSave.textContent = data.error
    //                         } else {
    //                             messageIntrfcsSave.textContent = 'Information saved to file!'
    //                         }
    //                     })
    //                 })
                    
    //             })
    //         }
    //     })
    // })
    


    


    
})

// // Button event handler for saving eth0 interface into interface_eth0.txt file
// eth0Form.addEventListener('click', function(e) {
//     e.preventDefault()

//     IP_Address = eth0IP.value
//     Net_mask = eth0Netmask.value
//     Gateway = eth0Gateway.value
//     DNS = eth0DNS.value
//     messageEth0Save.textContent = ''

//     fetch('/eth0save?ip=' + IP_Address + '&netmask=' + Net_mask + '&gateway=' + Gateway + '&dns=' + DNS).then((response) => {
//         response.json().then((data) => {
//             if (data.error) {
//                 messageEth0Save.textContent = data.error
//             } else {
//                 messageEth0Save.textContent = 'Information saved to file!'
//             }
//         })
//     })
// })

// // Button event handler for saving eth1 interface into interface_eth1.txt file
// eth1Form.addEventListener('click', function(e) {
//     e.preventDefault()

//     IP_Address = eth1IP.value
//     Net_mask = eth1Netmask.value
//     Gateway = eth1Gateway.value
//     DNS = eth1DNS.value
//     messageEth1Save.textContent = ''

//     fetch('/eth1save?ip=' + IP_Address + '&netmask=' + Net_mask + '&gateway=' + Gateway + '&dns=' + DNS).then((response) => {
//         response.json().then((data) => {
//             if (data.error) {
//                 messageEth1Save.textContent = data.error
//             } else {
//                 messageEth1Save.textContent = 'Information saved to file!'
//             }
//         })
//     })
// })

// Checkbox event handler for listing available wifi networks
availwifis.addEventListener('change', function(e) {
    e.preventDefault()

    if (this.checked) {
        messageAvailWifis.textContent = 'loading...'
        fetch('/availwifis').then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageAvailWifis.textContent = data.error
                } else {
                    messageAvailWifis.textContent = ''
                    data = removeDuplicates(data, 'ssid')
                    data.forEach(function(value) {
                        var radiohtml = createRadioElement(value.ssid, false)
                        messageAvailWifis.appendChild(radiohtml)
                    })

                }
            })
        })
    }
})

// Button event handler for restarting network by given config information
restButton.addEventListener('click', function(e) {
    e.preventDefault()

    const wifiPasswordValue = wifiPassword.value
    const availableInterfaces = window.test
    messageRestNet.textContent = ''
    const checkedRadio = display()


    if (checkedRadio == null) {
        messageRestNet.textContent = 'You must choose a network!'
    }
    fetch('/interfaces').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageIntrfcsSave.textContent = data.error
            } else {
                var filenames = []
                data.forEach(function(value) {
                    filenames = value.name
                })
                fetch('/restNet?ssid=' + checkedRadio.id + '&pass=' + wifiPasswordValue + '&numfiles=' + data.length + '&filename=' + filenames).then((response) => {
                    response.json().then((data) => {
                        if (data.error) {
                            messageRestNet.textContent = data.error
                        } else {
                            if (data.respond[0] !== '') {
                                messageRestNet.textContent = 'Unable to connnect to ' + checkedRadio.id
                            } else {
                                messageRestNet.textContent = 'Successfully Connected to ' + checkedRadio.id
                            }
                            respond = data.respond
            
                        }
                    })
            
                })
            }
        })

    })
    // fetch('/restNet?ssid=' + checkedRadio.id + '&pass=' + wifiPasswordValue).then((response) => {
    //     response.json().then((data) => {
    //         if (data.error) {
    //             messageRestNet.textContent = data.error
    //         } else {
    //             if (data.respond[0] !== '') {
    //                 messageRestNet.textContent = 'Unable to connnect to ' + checkedRadio.id
    //             } else {
    //                 messageRestNet.textContent = 'Successfully Connected to ' + checkedRadio.id
    //             }
    //             respond = data.respond

    //         }
    //     })

    // })
})

// Function to create a form for every interface that is found
function createInterfaceTable(name, IPAddress, netmask, gateway, macaddress) {
    var interfaceHtml = '<div  class="interfaces-class" id="' + name + '-intrfc-name" '

    interfaceHtml += '>' + name + '</div><br>'
    interfaceHtml += '<div><label>IP Address:</label><input type="text" id="' + name + '-intrfc-IP" value="' + IPAddress + '"></input></div><br>'
    interfaceHtml += '<div><label>Netmask:</label><input type="text" id="' + name + '-intrfc-Netmask" value="' + netmask + '"></input></div><br>'
    interfaceHtml += '<div><label>Gateway:</label><input type="text" id="' + name + '-intrfc-Gateway" value="' + gateway + '"></input></div><br>'
    interfaceHtml += '<div><label>DNS:</label><input type="text" id="' + name + '-intrfc-DNS"></input></div><br>'
    interfaceHtml += '<div><label>MAC Address:</label><input type="text" id="' + name + '-intrfc-MAC" value="' + macaddress + '"></input></div>'
    // interfaceHtml += '<div><button id="' + name + 'SaveButton">Save to file</button></div><br>'
    var interfaceFragment = document.createElement('td')
    interfaceFragment.innerHTML = interfaceHtml
    return interfaceFragment
}

// Function to create a radio button for every SSID that is found
function createRadioElement(name, checked) {
    var radioHtml = '<input type="radio" id="' + name + '" name="wifis"'
    if ( checked ) {
        radioHtml += ' checked="checked"'
    }
    radioHtml += '/><label for="' + name + '">' + name + '</label>'
    var radioFragment = document.createElement('span')
    radioFragment.innerHTML = radioHtml
    return radioFragment
}

// Removes duplicate and empty SSIDs from JSON object based on given key
function removeDuplicates(array, key) {
    return array.reduce((accumulator, element) => {
        if (!accumulator.find(el => el[key] === element[key]) && element[key] !== '') {
          accumulator.push(element);
        }
        return accumulator;
      }, []);
}

// Function to check which radio button is checked
function display() {  
    var checkRadio = document.querySelector( 
        'input[name="wifis"]:checked'); 
      
    if(checkRadio != null) { 
      return checkRadio
    } 
    return null
  } 