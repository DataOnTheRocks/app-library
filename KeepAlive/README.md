# Qlik Sense Keep ALive generic extension

Qlik Sense extension to keep a Session active.

The default value to execute a web socket request to the engine is set at 25 minutes.
The minimum allowed value is 14 minutes, to minimize the server impact and assuming virtual proxy sessions would not timeout below 15 minutes.

Preview:
 ![screenshot](https://github.com/DataOnTheRocks/app-library/tree/master/KeepAlive/Screenshot.png "screenshot")

This basic and lightweight extension goes invisible as you exit the edit mode.

To install 
 * on Qlik Sense Enterprise (Server): download this repo as .Zip and upload in your QMC / Extensions
 * on Qlik Sense Desktop: download this repo as .zip and unzip into My Documents folder \Qlik\Sense\Extensions
 
How does it work?
The extension will query the list of variable: app.getList('VariableList');
You can easily change this for something else if this is not optimal for your apps.

