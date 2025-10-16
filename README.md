# AVIS Connect?
It is not easy to connect to Bluetooth devices from a web-based application due to the lack of hardware instruction support. However, in most EMR systems, vital signs are read via Bluetooth devices. The absence of Bluetooth support may cause inconvenience and inefficiency, not to mention the risk of typing errors. AVIS Connect provides a solution for web-based EMR or nursing systems. It reads vital signs from various medical devices and converts them into simple APIs for developers to integrate.

## How to integrate AVIS Connect?
Integration is as easy as embedding the following JavaScript code into your system.
Please refer to AVISSample.html and AVISSample.js for complete examples.
```JavaScript
Receiver = class extends AVISReceiver {
    constructor() {
        super();
    }
    recv(vital) {
        for (var key in vital) {
            if (!vital.hasOwnProperty(key)) continue;

            switch(key) {
            case 'Version':
                console.log("Version: "+ vital[key])
                break;
            case 'Informations':
                for (var info of vital[key]) {
                    switch(info.type) {
                        case 'Temperature':
                            document.getElementById("temperature").value = info.body;
                            break;
                        case ... // Other type of vital-sign here..
                        default:
                    }
                }
            }
        }
    }
}

ReceiverInstance = new Receiver();
```
then start receving vital-sign data by:
```JavaScript
    ReceiverInstance.start()
```
and stop by
```JavaScript
    ReceiverInstance.stop()
```
**Vital-sign receving will be started if and only if valid license key has been added**
