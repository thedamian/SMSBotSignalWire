# A simple SMS Bot using  SignalWire

This is a bot that you'll point the messaging hook in signalwire to and get a great smart bot with a single phone number endpoint.

## Requirements

Accounts in: 
- SignalWire.com account - free incoming SMS and $0.002 outgoing (1/5th the price of twillio)
- iexcloud.io account - for stocks
- openweathermap.org - for weather

Note no account required for coinbase (where we pull our crpyto prices) because the api key yis not required for prices.

Now create a .env file with the following fiels<BR>
WEATHERAPI=XXXXX <- openweathermap api<BR>
IEXAPIS=XXXXX <- iexcloud.io api<BR>
SIGNALWIRE_PRODJECT_ID= project id from signalwire.com <BR>
SIGNALWIRE_TOKEN= token from the signalwire.com  <BR>
SIGNALWIRE_SPACE= space (it's usually something.signalwire.com)  <BR>
SIGNALWIRE_OUT_PHONE= phone number including + sign in front  <BR>

TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are needed if you want to intergrated twillio (you know...for whatsapp...if you want)

## Installing and Testing
This project has to be published and accessible to the world. Even to test it. 
the reason is that you'll be pointing the /message and /wamessage endpoint to be hit by signalwire and twilio 
Because of this you can start using services like https://localtunnel.me which will let your local development box be accessible to the outside world.
