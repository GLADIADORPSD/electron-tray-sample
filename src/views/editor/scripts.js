const { ipcRenderer } = require('electron')

const textArea = document.getElementById('text')
const title  = document.getElementById('title')

ipcRenderer.on('set-file', function(event, data){
    textArea.value = data.context
    title.innerHTML = data.name+' | Electron App'
})