# ozelsohbetsocketio
Socket.io İle Özel Sohbet Oluşturmak
<a>Öncelikle Visual Studio Code ile klasörü resimdeki gibi terminal ile açıyoruz</a><br>
<img src="https://user-images.githubusercontent.com/62428397/208111951-8170fb3a-d9d3-400b-a77a-f56b3bba53a5.png"><br>

<a>Aşağıdaki kodu çalıştırıyoruz.</a>
```
npm init -y
```

<a>Aşağıdaki kod ile Express js ve Socket.io paketlerini yüklüyoruz</a><br>
<a>Paketi görebileceğiniz link: https://www.npmjs.com/package/socket.io</a><br>
<a>Paketi görebileceğiniz link: https://www.npmjs.com/package/express</a><br>

```
npm i express socket.io
```
<br>
<a>Klasörün içinde server.js dosyasını oluşturuyoruz.</a><br>
<a>Dosyanın içine aşağıdaki kodları yapıştıyoruz.</a><br>

```
const express = require('express')
const socket = require('socket.io');

const app = express()
const server = app.listen(3000)
app.use(express.static('.'))


const io = socket(server)

io.on('connection',(socket)=>{
    console.log(socket.id)

    socket.on('private message',data=>{
        socket.to(data.to).emit("private message", data)
    })


})
```

<br>
<a>index.html dosyasını oluşturuyoruz ve aşağıdaki kodları giriyoruz.</a><br>

````
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, inital-scale=1.0">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.1.0/socket.io.js" integrity="sha512-+l9L4lMTFNy3dEglQpprf7jQBhQsQ3/WvOnjaN/+/L4i0jOstgScV0q2TjfvRF4V+ZePMDuZYIQtg5T4MKr+MQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>

        <div id="chat-wrap">
            <h2>Chat Özel</h2>
            <h3 id="from"></h3>
            <div id="chat-window">
                <div id="output"></div>
                <div id="feedback"></div>
            </div>
            <input type="text" id="who" placeholder="kime">
            <input type="text" id="sender" placeholder="ad">
            <input type="text" id="message" placeholder="mesaj">
            <button id="submitBtn">Gönder</button>
        </div>
        

        <script src="chatozelmesaj.js" charset="utf-8"></script>
    </body>
</html>
````

<br>
<a>https://cdnjs.com/libraries/socket.io buradaki siteden socket.io js kod scripti alınmıştır.</a><br>
<a>style.css dosyasını açıyoruz ve kodları:</a><br>


````
*{margin:0; padding:0; box-sizing: border-box;}
input:focus,button:focus{outline: 0;}

body{
    font-size: 'Poppins';
}


h2{
    font-size: 23px;
    padding: 10px 20px;
    color: #fff;
    background-color: #0085ad;
}

#chat-wrap{
    max-width: 600px;
    margin: 30px auto;
    border: 1px solid #ccc;
    border-radius: 5px;
}

#chat-window{
    height: 400px;
    overflow-y: auto;
}

#output p{
    font-size: 15px;
    padding: 12px;
}

#output p:nth-child(even){
    background-color: #f2f2f2;
}


#feedback p{
    font-size: 13px;
    padding: 12px;
}

#output strong{
    color:#0085ad;
}

input{
    font-family: 'Poppins';
    padding: 10px 20px;
    border: 0;
    border-top: 1px solid #ccc;
    display: block;
    width: 100%;
    font-size: 15px;
}

button{
    font-family: 'Poppins';
    background-color: #0085ad;
    color: #fff;
    border: 0;
    border-radius: 0 0 5px 5px;
    width: 100%;
    padding: 12px;
}
````


<br>

<a>chatozelmesaj.js dosyasını açıyoruz ve kodları: </a><br>


````
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

    
})

socket.on('private message',data=>{
    output.innerText+=data.from
    output.innerHTML +='<br><p>'
    output.innerText += data.sender+" "+data.message
    output.innerHTML += '</p><br>'
    message.value=''
})
````


<br>
<a>Visual Studio codeda ilk başta resim ile gösterdiğim gibi integrated terminal ile klasörü açtıktan sonra node server.js ile serveri başlatıyoruz</a><br>
<a>Sonrasında aşağıdaki resimdeki gibi http://localhost:3000 girdiğimizde bize socket.id vermektedir. Açtığınız penceredeki id görmek veya yenilemek için pencereyi yenileyince tekrardan gelecektir. </a>
<img src="https://user-images.githubusercontent.com/62428397/208115642-69528d24-a372-480c-b8e7-c940a8774a01.png">
<br>
<a>Aldığınız socket.id ile mesaj gönderdiğinizde karşıdaki kişiye de kendisinin socket.id değeri sarı ile işaretlenen şekilde gelecektir. Böylelikle özel sohbeti yapmış bulunuyoruz.</a><br>
<img src="https://user-images.githubusercontent.com/62428397/208116289-195a915a-9df1-4737-8f55-8fc97dffbc64.png">

<br>

<img src="https://user-images.githubusercontent.com/62428397/208117209-2aa0e991-14f2-4ec2-a637-03d01f0e4990.png">




