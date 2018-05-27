var http = require('http')
var parse = require('url').parse
var join = require('path').join
var fs = require('fs')

var root = require('./config').root || __dirname

var server = http.createServer(function (req, res) {
    var url = parse(req.url)
    var path = join(root, url.pathname)
    fs.stat(path, function (err, stat) {
        if (err) {
            if ('ENOENT' === err.code) {
                res.statusCode = 404
                res.end('Not Found')
            } else {
                res.statusCode = 500
                res.end('Interval Server Error')
            }
        } else {
            res.setHeader('Content-length', stat.size)
            var stream = fs.createReadStream(path)
            req.pipe(fs.createWriteStream('./req-body.txt'))
            stream.pipe(res)
            stream.on('error', function (err) {
                res.statusCode = 500
                res.end('Internal Server Error')
            })
        }
    })
})

server.listen(8080)