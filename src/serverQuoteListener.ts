import * as http from "http"
import { createQuote } from "./quoteListener"
import { readFileSync } from "fs"
import * as Discord from "discord.js"
import { removeQuote } from './commands/remove'
import { editQuote } from "./commands/edit"

export function listenServer(client: Discord.Client) {

    const server = http.createServer(function (request, response) {

        var settings = JSON.parse(readFileSync("./src/settings.json").toString())

        switch (request.url) {
            case '/server-list': {
                response.setHeader('Content-Type', 'text/plain')
                response.setHeader("Access-Control-Allow-Origin", "*");
                //response.statusCode = 200
                response.end(JSON.stringify({ servers: Object.keys(settings) }))
                break;
            }
            case '/': {
                
                
                
                var body = ''
                request.on('data', function (data) {
                    body += data
                })
                request.on('end', function () {
                    if("POST" == method) {
                    body = decodeURIComponent(body)
                    body = body.split("%20").join(" ")
                    console.log('Body: ' + body)
                    var bodyJSON = getBodyJSON(body)
                    console.log(`content: ${bodyJSON["quote"].toString()}`)
                    console.log(`server: ${bodyJSON["server"]}`)
                    console.log(`user: ${bodyJSON["user"]}`)
                    response.writeHead(200, { 'Content-Type': 'text/plain' })
                    

                    client.channels.fetch(settings[bodyJSON["server"]]["QUOTE_CHANNEL_ID"] as string).then(quoteChannel => {
                        createQuote(quoteChannel as Discord.TextChannel, bodyJSON["quote"].toString(), bodyJSON["user"], bodyJSON["server"])
                    })
                    } else if ("GET" == method) {
                    response.writeHead(200, { 'Content-Type': 'text/plain' })
                    } else {
                    response.writeHead(400, { 'Content-Type': 'text/plain' })
                    }
                    
                    response.end('post received')

                })
                
            }
            case '/delete': {
                console.log("delete")

                var body = ''
                request.on('data', function (data) {
                    body += data
                })
                request.on('end', function () {
                    body = decodeURIComponent(body)
                    body = body.split("%20").join(" ")
                    var bodyJSON = getBodyJSON(body)
                    response.writeHead(200, { 'Content-Type': 'text/plain' })
                    response.end('post received')

                    console.log(bodyJSON)

                    var member = client.guilds.cache.get(bodyJSON['server'])?.members.cache.get(bodyJSON['user'])
                    console.log(member)

                    removeQuote(bodyJSON['number'], bodyJSON['server'], client, member as Discord.GuildMember)
                })
                return
            }
            case '/edit': {
                console.log("edit")

                var body = ''
                request.on('data', function (data) {
                    body += data
                })
                request.on('end', function () {
                    body = decodeURIComponent(body)
                    body = body.split("%20").join(" ")
                    var bodyJSON = getBodyJSON(body)
                    response.writeHead(200, { 'Content-Type': 'text/plain' })
                    response.end('post received')

                    
                    var member = client.guilds.cache.get(bodyJSON['server'])?.members.cache.get(bodyJSON['user'])

                    editQuote(bodyJSON["number"], bodyJSON["quote"].toString(), bodyJSON["server"], client, member as Discord.GuildMember)


                })

                response.end("received")
                return
            }
        }

    })

    const port = 3000
    const host = 'localhost'//'192.168.178.52'
    server.listen(port, host)
    console.log(`Listening at http://${host}:${port}`)


}

function getBodyJSON(body: string) {
    var bodyObject: any = {}
    var pairs = body.split("&")
    pairs.forEach(pair => {
        var keyVal = pair.split("=")
        bodyObject[keyVal[0]] = keyVal[1]
    })

    return bodyObject
}
