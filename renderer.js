const ipc = require('electron').ipcRenderer
const trayBtn = document.getElementById('put-in-tray')
let minute = 29;
let second = 59;

trayBtn.addEventListener('click', function (event) {
  reset_timer()
  counter()
  ipc.send('hide-window')
})

function reset_timer() {
  minute = 29
  second = 59
}

function counter() {
  // console.log('calling counter...')
  second--
  if (second == 0) {
    second = 59
    minute--
  }

  if (minute < 0 || (minute == 0 && second == 0)) {
    ipc.send('show-window')
    reset_timer()
  } else {
    setTimeout(counter, 1000)
  }

  var time_counter = minute + ":" + second
  document.getElementById('timer').innerHTML=time_counter
}

counter()
