var connect = require('connect')
var api = connect()
var server = connect()
api.use(users).use(pets).use(errorHandler)

server.use(hello).use('/api', api).use(errorPage).listen(3000)

var db = {
    users: [
        { name: 'Stark' },
        { name: 'Thor' },
        { name: 'Loki' }
    ]
}

function findUser (list, user) {
    let filteredList = list.filter(function (item, index) {
        return item.name.toLowerCase() === user
    })
    return filteredList[0]
}

function users (req, res, next) {
    var match = req.url.match(/^\/user\/(.+)/)
    if (match) {
        var user = findUser(db.users, match[1])
        if (user) {
            res.setHeader('Content-type', 'application/json')
            res.end(JSON.stringify(user))
        } else {
            var err = new Error('User not found')
            err.notFound = true
            next(err)
        }
    } else {
        next()
    }
}

function pets (req, res, next) {
    if (req.url.match(/^\/pet\/(.+)/)) {    
        foo()
    } else {
        next()
    }
}

function errorHandler (err, req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    if (err.notFound) {
        res.statusCode = 404
        res.end(JSON.stringify({ error: err.message }))
    } else {
        res.statusCode = 500
        res.end(JSON.stringify({ error: 'Internal Server Error' }))
    }
}

function errorPage (err, req, res, next) {
    if (!req.url.match(/^\/hello/)) {
        res.statusCode = 404
        res.end(JSON.stringify({ error: '404 not found' }))
    }
}

function hello (req, res, next) {
    if (req.url.match(/^\/hello/)) {
        res.end('Hello World\n')
    } else {
        next()
    }
}