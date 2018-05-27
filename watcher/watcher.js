const events = require('events')
const util = require('util')

class Watcher extends events.EventEmitter {
    constructor (watchDir, processedDir) {
        super(watchDir, processedDir)
        this.watchDir = watchDir
        this.processedDir = processedDir
    }
}

module.exports = exports = Watcher