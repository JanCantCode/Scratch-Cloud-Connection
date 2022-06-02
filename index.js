const username = require("./config.json").username // takes username and password from config.json and safes it in the username and password variables
const password = require("./config.json").password
const request = require("request")
const ws = require("ws")

async function setupCloud(credentials, project) { // Sends an handshake to the Cloud variable websocket to initialise the connection.
    return new Promise((resolve, reject) => {
        const socket = new ws("wss://clouddata.scratch.mit.edu/", [], {
            headers: {
                "cookie": "scratchsessionsid="+credentials.session+";",
                "origin": "https://scratch.mit.edu"
            }
        })
        socket.addEventListener("open", () => {
            socket.send(`${JSON.stringify({method: "handshake", "user": username, "project_id": project})}\n`)
        })
    })
}

async function setCloud(project, variable, value, method) { // sets variable of a project. IMPORTANT: firstly use the setupCloud() function on THAT specific project, else you CAN'T set variables.
    socket.send((`${JSON.stringify({"method": method, "user": username, "project_id": project, "name": "☁ "+variable, "value":String(value)})}\n`))
}


async function login() { // logs into your scratch account with the given login information from the config.json file.
  return new Promise((resolve, reject) => {
    request.post({
      url: "https://scratch.mit.edu/login/",
      headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': 'a',
          'Referer': 'https://scratch.mit.edu',
          'Cookie': 'scratchcsrftoken=a;',
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 OPR/86.0.4363.59"
            },
      body: JSON.stringify({username, password})
    }, (error, response, body) => {
      let cookieheader = response.caseless.dict["set-cookie"] // if you're wondering what all this wanky code does, it extracts the sessiontoken, csrftoken and usertoken (lastly is not needed lol) from the login response headers.
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


async function main() { // this is just used as an example main function, with some code. note that all function in here are ASYNC, so if you await them, you need to do that in an seperate async function.
  let credentials = await login()
  await setupCloud(credentials, 664614661)
  await setCloud(664614661, "testvariable", 10, "CREATE") // this creates the cloud variable "testvariable" with the value 10 on the project (if you want to, create and / or delete as many variables as you want to on this project.)
  await setCloud(664614661, "testvariable", 15, "SET") // this sets the value of "testvariable" to 15
  await setCloud(664614661, "testvariable", 0, "DELETE") // Delets the testvariable, keep in mind this does not remind it from the coding menu thing.
  // I DO NOT RECOMMEND USING THIS ON OTHER PEOPLE'S PROJECTS BECAUSE YOU'RE ACCOUNT MAY GET BANNED IF THEY REPORT YOU (low chance of this happening tho)
  
}
