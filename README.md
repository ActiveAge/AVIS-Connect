# AVIS Browser?
It is not easy to connent to bluetooth device from Web-based Application as lacking hardware instruction support.
But for most EMR systems, vital-sign will be read via bluetooth devices, lacking of bluetooth support might lead inconvience and ineffencience, not mention about risk of typing error.
AVIS Browser provides a solutuon to web-based EMR or nursing system. It reads vital-sign from varities of vital-sign equipments, then transfer them into simple APIs for developer to intergrate.

## How to integrate AVIS browser?
It will be as easy as embedding following javascript codes into your system.
Please refer to AVISSample.html, AVISSample.js for full sample.
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
**Vital-sign receving will be started if and only if valid license is set**
