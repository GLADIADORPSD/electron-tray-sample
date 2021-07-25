const { resolve } = require('path')
const { app, BrowserWindow, Menu } = require('electron')

const isMac = process.platform === 'darwin'

var mainWindow = null
async function createWindow(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    await mainWindow.loadFile(resolve(__dirname, 'src/views/editor', 'index.html'))

    // mainWindow.webContents.openDevTools()

    createNewFile()
}

//File
var file = {}

//Create New File
function createNewFile(){
    file = {
        name: 'novo-arquivo.txt',
        context: '',
        saved: false,
        path: app.getPath('documents')+'/novo-arquivo.txt'
    }

    mainWindow.webContents.send('set-file', file)
}

//Template Menu
const templateMenu = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Novo',
                click(){
                    createNewFile()
                }
            },
            {
                label: 'Abrir'
            },
            {
                label: 'Salvar'
            },
            {
                label: 'Salvar como'
            },
            {
                label: 'Fechar',
                role: isMac ? 'close' : 'quit'
            }
        ]
    }
]

//Menu
const menu = Menu.buildFromTemplate(templateMenu)
Menu.setApplicationMenu(menu)

//On Ready
app.whenReady().then(createWindow)


//Activate for MAC
app.on('activate', () => {
    if(BrowserWindow.getAllWindows.length === 0){
        createWindow()
    }
})

