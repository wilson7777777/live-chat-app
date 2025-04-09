// client/script.js (Previous Version)

const socket = io();
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const usernameInput = document.getElementById('username');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value && usernameInput.value) {
    socket.emit('chat message', {message: input.value, username: usernameInput.value});
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg.username + ": " + msg.message;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});