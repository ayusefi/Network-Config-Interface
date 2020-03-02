
const button = document.getElementById('myButton');
const buttonkayit = document.getElementById('kayit')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector("#message-2")
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSave = document.querySelector('#message-save')

button.addEventListener('click', function(e) {
    e.preventDefault()



    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''

    fetch('/interface?int=enp0s3').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data[0].name
                messageTwo.textContent = data[0].ip_address
                messageThree.textContent = data[0].mac_address
                messageFour.textContent = data[0].gateway_ip
                messageFive.textContent = data[0].type

            }
        })

    })

});

buttonkayit.addEventListener('click', function(e) {
    e.preventDefault()

    messageSave.textContent = 'Information Saved!'
    
    fetch('/save').then((response) => {
    })
})

