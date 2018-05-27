const fs = require('fs')
const Watcher = require('./watcher')
const watchDir = './watch'
const processedDir = './done'

Watcher.prototype.watch = function () {
    let watcher = this
    fs.readdir(this.watchDir, function (err, files) {
        if (err) throw err
        for (let index in files) {
            watcher.emit('process', files[index])
        }
    })
}

Watcher.prototype.start = function () {
    let watcher = this
    fs.watchFile(watchDir, function () {
        watcher.watch()
    })
}

const watcher = new Watcher(watchDir, processedDir)

watcher.on('process', function (file) {
    let watchFile = this.watchDir + '/' + file
    let processedFile = this.processedDir + '/' + file.toLowerCase()
    fs.rename(watchFile, processedFile, (err) => {
        if (err) throw err
    })
})

watcher.start()
