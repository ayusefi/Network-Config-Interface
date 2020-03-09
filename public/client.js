
// Variable for Interfaces checkbox
const interfacesChkbx = document.querySelector('#interfaces-checkbox')
const messageInterfaces = document.querySelector('#message-interfaces')

// Variables for eth0 interface
const eth0Form = document.querySelector('#eth0form');
const eth0IP = document.querySelector('#eth0-ip-address')
const eth0Netmask = document.querySelector('#eth0-net-mask')
const eth0Gateway = document.querySelector('#eth0-gate-way')
const eth0DNS = document.querySelector("#eth0-dns-server")
const messageEth0Save = document.querySelector('#message-eth0save')

// Variales for eth1 interface
const eth1Form = document.querySelector('#eth1form');
const eth1IP = document.querySelector('#eth1-ip-address')
const eth1Netmask = document.querySelector('#eth1-net-mask')
const eth1Gateway = document.querySelector('#eth1-gate-way')
const eth1DNS = document.querySelector("#eth1-dns-server")
const messageEth1Save = document.querySelector('#message-eth1save')

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
                    availInterfaces = Object.keys(data)
                    console.log(availInterfaces)
                    availInterfaces.forEach(function(value) {
                        var interfacehtml = createInterfaceForm(value)
                        messageInterfaces.appendChild(interfacehtml)
                    })
                }
            })
        })
    }
})

// Button event handler for saving eth0 interface into interface_eth0.txt file
eth0Form.addEventListener('click', function(e) {
    e.preventDefault()

    IP_Address = eth0IP.value
    Net_mask = eth0Netmask.value
    Gateway = eth0Gateway.value
    DNS = eth0DNS.value
    messageEth0Save.textContent = ''

    fetch('/eth0save?ip=' + IP_Address + '&netmask=' + Net_mask + '&gateway=' + Gateway + '&dns=' + DNS).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageEth0Save.textContent = data.error
            } else {
                messageEth0Save.textContent = 'Information saved to file!'
            }
        })
    })
})

// Button event handler for saving eth1 interface into interface_eth1.txt file
eth1Form.addEventListener('click', function(e) {
    e.preventDefault()

    IP_Address = eth1IP.value
    Net_mask = eth1Netmask.value
    Gateway = eth1Gateway.value
    DNS = eth1DNS.value
    messageEth1Save.textContent = ''

    fetch('/eth1save?ip=' + IP_Address + '&netmask=' + Net_mask + '&gateway=' + Gateway + '&dns=' + DNS).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageEth1Save.textContent = data.error
            } else {
                messageEth1Save.textContent = 'Information saved to file!'
            }
        })
    })
})

// Checkbox event handler for listing available wifi networks
availwifis.addEventListener('change', function(e) {
    e.preventDefault()

    messageAvailWifis.textContent = ''
    if (this.checked) {
        fetch('/availwifis').then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageAvailWifis.textContent = data.error
                } else {
                    data = removeDuplicates(data, 'ssid')
                    console.log(data)
                    data.forEach(function(value) {
                        var radiohtml = createRadioElement(value.ssid, false)
                        messageAvailWifis.appendChild(radiohtml)
                    })

                }
            })
        })
    }
})


restButton.addEventListener('click', function(e) {
    e.preventDefault()

    const wifiPasswordValue = wifiPassword.value
    messageRestNet.textContent = ''
    const checkedRadio = display()

    if (checkedRadio == null) {
        messageRestNet.textContent = 'You must choose a network!'
    }

    fetch('/restNet?ssid=' + checkedRadio.id + '&pass=' + wifiPasswordValue).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageRestNet.textContent = data.error
            } else {
                if (data.respond[0] !== '') {
                    messageRestNet.textContent = 'Unable to connnect to ' + checkedRadio.id
                } else {
                    messageRestNet.textContent = 'Successfully Connected to ' + checkedRadio.id
                }

            }
        })

    })
})

// Function to create a form for every interface that is found
function createInterfaceForm(name) {
    var interfaceHtml = '<th id="' + name + '" '

    interfaceHtml += '>' + name + '</th>'
    var interfaceFragment = document.createElement('th')
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