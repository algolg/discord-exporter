const fs = require('fs')
const axios = require('axios')
const config = require('./config.json')

const token = config.token
const server_or_dm = config.server_or_dm == "server" ? true : (config.server_or_dm == "dm" ? false : null)
const guild_id = config.root_id
const channel_id = config.channel_id == null ? "" : "channel_id="+config.channel_id+"&"
const reverse = true
const starting_message_num = config.starting_message_num
const num_of_messages = config.num_of_mesages
const output_file_name = config.output_file_name

var query = []
var min_id = 0
var rateLimitTotal = 0
var rateLimitCount = 0

async function sleep (seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds*1000))
}

// gets messages from Discord's API
async function request(offset) {
    res = await axios.get(`https://discord.com/api/v9/${server_or_dm ? "guilds" : "channels"}/${guild_id}/messages/search?${channel_id}min_id=${min_id}&include_nsfw=true${reverse ? "&sort_by=timestamp&sort_order=asc" : ""}&offset=${offset}`, {
        "headers": {
            "authorization": token,
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-debug-options": "bugReporterEnabled",
            "x-discord-locale": "en-US",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
        })
        .catch(async function (error) {
            // accounting for rate limiting
            if (await error.response.status === 429) {
                console.log(
                    "Rate limited for: " + error.response.data.retry_after + " sec" +
                    ", " + error.response.headers["x-ratelimit-scope"] + " scope"
                    )
                rateLimitCount++
                rateLimitTotal += error.response.data.retry_after
                await sleep(error.response.data.retry_after)
                return await request(offset)
            }
    })
    return await res
}

// sends batches of requests for messages
async function requestLoop(start, length) {
    // update min_id so it matches the last multiple of 5000 below start (Discord's search feature only allows offsets <=5000)
    if (start > 5000) {
        for (let i=0; i<start/5000; i++) {
            min_id = (await request(5000)).data.messages[24][0]["id"]
            console.log(i + "\t" + min_id)
        }
    }
    // send requests for messages (Discord's search feature sends messages in batches of 25)
    for (let i=start; i<start+length; i+=25) {
        console.log(i + " start")
        res = await request(i%5000)
        updateQuery(await res.data)
        // writes to the output file every 100 messages
        if (i%100 == 0) {
            await write()
        }
        // replace min_id every 5000 messages
        if (i%5000 == 0) {
            min_id = await res.data.messages[24][0]["id"]
        }
        // Discord allows 50 requests per second
        sleep(0.02)
    }
}

// updates the query variable with the new messages
async function updateQuery(json) {
    query = query.concat(json["messages"])
    console.log(json["messages"].length)
    console.log(query.length)
}

// writes query to the output file
async function write() {
    fs.writeFile(`./${output_file_name}`, JSON.stringify(query), error => {
        if (error)
            console.log(error)
    })
}

async function main() {
    if (server_or_dm == null) {
        console.log("Error: server_or_dm value must be either \"server\" or \"dm\"")
        process.exit()
    }
    const start = new Date()
    await requestLoop(starting_message_num, num_of_messages)
    await write()
    const timeTaken = ((new Date()) - start)/1000
    console.log("Time taken: " + timeTaken + " sec")
    console.log("Rate limited " + rateLimitCount + " times for a total of " + rateLimitTotal + " sec")
    console.log("Rate: " + Math.round(num_of_messages*100/timeTaken)/100 + " messages per sec")
}

main()
