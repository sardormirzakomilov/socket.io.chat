const chatform = document.querySelector("#chat-form");
const msginp = document.querySelector("#msg");
const chatmassage = document.querySelector(".chat-messages");
const usersH = document.querySelector("#users");
const roomName = document.querySelector("#room-name");

const socket = io();

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true  /* ? so'roq belgisini olib tashlash */
})

// Emit room
socket.emit('joinRoom', {
  username,
  room
})

socket.on('roomUsers' ,(users) => {
 outputRoomName(users[0].room) //qaysi honaqa ekanligini chiqaradigan funcksiya
 outputUser(users) //honadagi userlar ismi
})

socket.on("message", (messager) => {
  // console.log(messager);
  output(messager);
  chatmassage.scrollTop = chatmassage.scrollHeight;
});

chatform.addEventListener("submit", (e) => {
  e.preventDefault();
  // const msg = e.target.elements.msg.value/
  const msg = msginp.value;
  socket.emit("chat-message", msg); ///user valuesidagi habarni serverga jomnatiw
  msginp.value = "";
});

function output(msg) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
    <p class="meta">${msg.username}<span>${msg.time}</span></p>
    <p class="text">
    ${msg.msg}
    </p>
    `;
  chatmassage.appendChild(div);
}


function outputUser(users) {
  return usersH.innerHTML =`
  ${users.map(users =>`<li>${users.username}</li>`).join('')}
  `
}

function outputRoomName(room) {
 return roomName.innerText = `${room}`
}
