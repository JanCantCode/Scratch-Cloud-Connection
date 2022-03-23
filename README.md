# Scratch-Cloud-Connection
An small NodeJS script to connect to Scratch's cloud variable server and set values in it.


__Important__

- Use the code in here at your OWN RISK, if you are found using this one someone else's project (theres not really any way to proove it tho), theres a good chance of your account beeing blocked.

- The DELETE and CREATE functions, at least to my knowledge don't change the code in the project at all, im not sure if the DELETE method makes variables unusuable, but make sure to be carefull with that stuff.

- If you wan't to contact me or make me fix something, contact me via https://discord.com, my name is ```-Jan-#6059```



__Instructions on how to use__

- The first thing you should do is setting the parameters in the ```config.json``` file, else the code does not work, unless you change it.

- I do not use your password or username, they are only sent to https://scratch.mit.edu/login/ to fetch your sessionid, csrftoken, and usertoken, which are needed for setting cloud variables

- If you run the login() function in an fast repeating loop, every instance of you beeing logged in becomes invalid, so you should make sure that you run that function once, and somehow validate it so you regenerate it everytime it expires.

- now getting to example code:

```js
async function main() { 
  let credentials = await login()
  await setupCloud(credentials, 664614661)
  await setCloud(664614661, "testvariable", 10, "CREATE")
  await setCloud(664614661, "testvariable", 15, "SET")
  await setCloud(664614661, "testvariable", 0, "DELETE")
}
```

This will, in that order, firstly create and variable claled "testvariable", then set it to the value 15 and delete it after that.

- You also might note, that all the functions are async so if you want to ```await``` them, do that in async fcuntions only.
