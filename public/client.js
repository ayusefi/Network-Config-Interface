
const eth0Form = document.querySelector('#eth0form');
const eth0IP = document.querySelector('#eth0-ip-address')
const eth0Netmask = document.querySelector('#eth0-net-mask')
const eth0Gateway = document.querySelector('#eth0-gate-way')
const eth0DNS = document.querySelector("#eth0-dns-server")
const messageEth0Save = document.querySelector('#message-eth0save')

const eth1Form = document.querySelector('#eth1form');
const eth1IP = document.querySelector('#eth1-ip-address')
const eth1Netmask = document.querySelector('#eth1-net-mask')
const eth1Gateway = document.querySelector('#eth1-gate-way')
const eth1DNS = document.querySelector("#eth1-dns-server")
const messageEth1Save = document.querySelector('#message-eth1save')

const availwifis = document.querySelector('#wifis-checkbox')
var messageAvailWifis = document.querySelector('#wifi-div');


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

availwifis.addEventListener('change', function() {
    messageAvailWifis.textContent = ''
    if (this.checked) {
        fetch('/availwifis').then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageAvailWifis.textContent = data.error
                } else {
                    data.forEach(function(value) {
                        var node = document.createElement("LI");
                        var nodetext = document.createTextNode(value.ssid)
                        node.appendChild(nodetext)
                        messageAvailWifis.appendChild(document.getElementById("wifi-div").appendChild(node))
                    })

                }
            })
        })
    }

})