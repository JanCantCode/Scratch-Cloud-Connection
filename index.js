const un = require("./config.json").username
const pw = require("./config.json").password
const request = require("request")
const ws = require("ws")



async function login(username, password) { // logins into your account and fetches some stuff :D
    return new Promise(async (resolve, reject) => {
        request.post({
            url: "https://scratch.mit.edu/login/",
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': 'a',
                'Referer': 'https://scratch.mit.edu',
                'Cookie': 'scratchcsrftoken=a;',
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 OPR/86.0.4363.59"
            },
            body: JSON.stringify({"username": username, "password": password})
        }, (error, response, body) => {
            let cookieheader = response.caseless.dict["set-cookie"]
            let session = cookieheader[0].split(";").find(e=>e.startsWith("scratchsessionsid=")).split("=")[1]
            let csrf = cookieheader[1].split(";").find(e=>e.startsWith("scratchcsrftoken=")).split("=")[1]
            let token = JSON.parse(body)[0].token
            resolve ({
                "session": session,
                "csrf": csrf,
                "token": token
          })
        })
    })
}

async function sendHandshake(credentials, id) {
    return new Promise(async (resolve, reject) => {
           socket = new ws("wss://clouddata.scratch.mit.edu/", [], {
            headers: {
                "cookie": "scratchsessionsid="+credentials.session+";",
                "origin": "https://scratch.mit.edu"
            }
        })
        socket.addEventListener("open", async () => {
            await socket.send(`${JSON.stringify({method: "handshake", "user": un, "project_id": id})}\n`)
            resolve(id)
        })
    })
}

async function setVar(name, id, value) {
    await socket.send((`${JSON.stringify({"method": "set", "user": un, "project_id": id, "name": "☁ "+name, "value":String(value)})}\n`))
}
let pub_c = ""
async function main() {
    pub_c = await login(un, pw)
    let i = await sendHandshake(pub_c, "YOURPROJECTIDHERE")
    await setVar("VARIABLENAME", "PROJECTID", VALUE)
        
    
    
}
