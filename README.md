# A simple SMS Bot using  SignalWire

This is a bot that you'll point the messaging hook in signalwire to and get a great smart bot with a single phone number endpoint.

## Requirements

- SignalWire.com account
- iexcloud.io account (for the stocks) 

## Installation

```
git clone https://github.com/cpetrosi/signalwire-ivr.git
cd signalwire-ivr
npm install
```
Now create a .env file with 

## Running and Development


Download `ngrok` from:

```
https://ngrok.com/download
```

In terminal, navigate to the directory where `ngrok` is installed and run:

```
./ngrok http 3000
```

In a new terminal window, run:

```
node index.js
```
