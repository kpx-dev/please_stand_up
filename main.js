const electron = require('electron')
const path = require('path')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
const Menu = electron.Menu
const Tray = electron.Tray
let appIcon = null
let mainWindow = null

function framelessWindow () {
  const modalPath = path.join('file://', __dirname, '../../sections/windows/modal.html')
  mainWindow = new BrowserWindow({ frame: false })
  mainWindow.on('close', function () { win = null })
  mainWindow.loadURL(`file://${__dirname}/modal.html`)
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  show_tray()
}

app.on('ready', framelessWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
  if (appIcon) appIcon.destroy()
})

app.on('activate', function () {
  if (mainWindow === null) {
    framelessWindow()
  }
})

function show_tray() {
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname, iconName)
  appIcon = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([{
    label: 'Quit',
    click: function () {
      // event.sender.send('tray-removed')
      appIcon.destroy()
      app.quit()
    }
  }])
  appIcon.setToolTip('Please Stand Up!')
  appIcon.setContextMenu(contextMenu)
}

ipc.on('show-window', function () {
  mainWindow.show()
})

ipc.on('hide-window', function () {
  mainWindow.hide()
})
