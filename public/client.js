
const eth0Form = document.querySelector('#eth0form');
const eth0IP = document.querySelector('#eth0-ip-address')
const eth0Netmask = document.querySelector('#eth0-net-mask')
const eth0Gateway = document.querySelector('#eth0-gate-way')
const eth0DNS = document.querySelector("#eth0-dns-server")
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSave = document.querySelector('#message-save')
const messageEth0Save = document.querySelector('#message-eth0save')

// button.addEventListener('click', function(e) {
//     e.preventDefault()

//     messageOne.textContent = 'Loading...'
//     messageTwo.textContent = ''
//     messageThree.textContent = ''
//     messageFour.textContent = ''
//     messageFive.textContent = ''

//     fetch('/interface?int=wlo1').then((response) => {
//         response.json().then((data) => {
//             if (data.error) {
//                 messageOne.textContent = data.error
//             } else {
//                 messageOne.textContent = data[0].name
//                 messageTwo.textContent = data[0].ip_address
//                 messageThree.textContent = data[0].mac_address
//                 messageFour.textContent = data[0].gateway_ip
//                 messageFive.textContent = data[0].type

//             }
//         })

//     })

// });

// buttonkayit.addEventListener('click', function(e) {
//     e.preventDefault()

//     messageSave.textContent = 'Information Saved!'
    
//     fetch('/save').then((response) => {
//     })
// })

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
