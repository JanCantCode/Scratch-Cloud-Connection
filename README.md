# Scratch-Cloud-Connection
An small NodeJS script to connect to Scratch's cloud variable server and set values in it.


__Important__

- Use the code in here at your OWN RISK, if you are found using this one someone else's project (theres not really any way to proove it tho), theres a good chance of your account beeing blocked.


- If you wan't to contact me or make me fix something, contact me via https://discord.com, my name is ```-Jan-#6059```



__Instructions on how to use__

- The first thing you should do is setting the parameters in the ```config.json``` file, else the code does not work, unless you change it.

- I do not use your password or username, they are only sent to https://scratch.mit.edu/login/ to fetch your sessionid, csrftoken, and usertoken, which are needed for setting cloud variables

- If you run the login() function in an fast repeating loop, every instance of you beeing logged in becomes invalid, so you should make sure that you run that function once, and somehow validate it so you regenerate it everytime it expires. 

- explanation for all the functions

 ``
login(username, password)``

This will return your sessionid, csrftoken and x-token (this is unused) in a JSON object.
You can access it by response.<either sessionid or csrftoken or token>
_you should use login in an async function and await it._
 
´´´sendHandshake(credentials, id)```
this will send an handshake to an project with the project id given in the id parameter.
Make sure to send the credentials argument (fetch it using the login(username, password)) function

 
´´´setVar(name, id, value)```

This will set a variable with the name of the name argument, on the project given with the project id argument and to the value from the value argument.
REMEMBER
this only works if you have used the sendHandshakre() function previously!

Example code how to use this:

´´´js
async function main() { // its async because we want to use "await"
   let credentials = await login("username", "password") //replace username and password with your username and your password
   await sendHandshake(credentials, "664614661") //replace the numbers with your project id
   await setVar("testvariable", "664614661", 100) //replace testvariable with a variable name of your desire, the numbers with a project id and the 100 with any NUMERIC value.
   ```


This will, in that order, firstly create and variable claled "testvariable", then set it to the value 15 and delete it after that.

- You also might note, that all the functions are async so if you want to ```await``` them, do that in async fcuntions only.
