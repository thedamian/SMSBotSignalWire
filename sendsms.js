const projectId= process.env.SIGNALWIRE_PRODJECT_ID
const token= process.env.SIGNALWIRE_TOKEN
const SignalWireSpace = process.env.SIGNALWIRE_SPACE
//const { RestClient } = require('@signalwire/node')
const { RestClient } = require("@signalwire/compatibility-api");
const client = new RestClient(projectId, token, { signalwireSpaceUrl:  SignalWireSpace})

const phoneNum= process.env.SIGNALWIRE_OUT_PHONE


//   client.on('signalwire.ready', session => {
//     // Your client is now ready!

client.messages.create({
    body: 'Welcome to SignalWire!',
    to: '+19545881459', // Text this number
    from: phoneNum // From a valid SignalWire number
  }).then(message => {
    console.log('Message ID: ' + message.sid)
  }).catch(console.error)

//   })
  
//   client.connect()