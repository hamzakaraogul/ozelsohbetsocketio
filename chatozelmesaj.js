

const socket =io.connect('http://localhost:3000')

const sender = document.getElementById('sender')
const message = document.getElementById('message')
const submitBtn = document.getElementById('submitBtn')
const feedback = document.getElementById('feedback')
const output = document.getElementById('output')
const who = document.getElementById('who')

submitBtn.addEventListener('click',()=>{
    socket.emit('private message',{
        message: message.value,
        sender: sender.value,
        to:who.value,
        from:socket.id
    })
    message.value=''
    
})

socket.on('private message',data=>{
    output.innerText+=data.from
    output.innerHTML +='<br><p>'
    output.innerText += data.sender+" "+data.message
    output.innerHTML += '</p><br>'
})




