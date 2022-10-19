// Receiver should inherit AViSReceiver for leverage its funcions.
class Receiver {
    constructor() {
    }
    isLoaded() {
        return false;
    }
    // dummy getRequestLicense
    async getRequestLicense() {
        return await new Promise((resolve, reject) => {
            resolve("Not support.");
        });
    }
    // dummy getLicenseList
    async getLicenseList() {
        return await new Promise((resolve, reject) => {
            resolve([]);
        });
    }
    // dummy addLicense
    async addLicense(license) {
        return await new Promise((resolve, reject) => {
            resolve(false);
        });
    }
}

if (typeof AVISReceiver === 'function') {
    Receiver = class extends AVISReceiver {
        constructor() {
            super();
        }
        isLoaded() {
            return true;
        }
        // recv(vital) is derived from AVISReceiver.
        // Vital Sign Data will be sent as parameters.
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
                            case 'BloodPressure':
                                document.getElementById("bloodpressure").value = info.systole.toString() + "/" + info.diastole.toString();
                                break;
                            case 'OxygenSaturation':
                                document.getElementById("spo2").value = info.saturation;
                                break;
                            case 'Pulse':
                                document.getElementById("pulse").value = info.pulse;
                                break;
                            case 'Glucose':
                                document.getElementById("glucose").value = info.glucose;
                                break;
                            case 'Weight':
                                document.getElementById("weight").value = info.weight;
                                break;
                            default:
                        }
                    }
                }
            }
        }
    };
}

ReceiverInstance = new Receiver();
