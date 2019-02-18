var pathSecurity = {
    encrypt: (publicKey, valueToEncrypt) => {
        let encoded = getMessageEncoding(valueToEncrypt);
        return window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP"
            },
            publicKey,
            encoded
        );
    },
    decript: (privateKey, data) => {
        return window.crypto.subtle.decrypt(
            {
                name: "RSA-OAEP",
                //label: Uint8Array([...]) //optional
            },
            privateKey, //from generateKey or importKey above
            data //ArrayBuffer of the data
        );
    },
    generateKey: (userName, passWord) => {
        var arrayBufferToHexString = (arrayBuffer) => {
            var byteArray = new Uint8Array(arrayBuffer);
            var hexString = "";
            var nextHexByte;

            for (var i = 0; i < byteArray.byteLength; i++) {
                nextHexByte = byteArray[i].toString(16);
                if (nextHexByte.length < 2) {
                    nextHexByte = "0" + nextHexByte;
                }
                hexString += nextHexByte;
            }
            return hexString;
        }
        var stringToArrayBuffer = (string) => {
            var encoder = new TextEncoder("utf-8");
            return encoder.encode(string);
        }

        // First, create a PBKDF2 "key" containing the password
        return window.crypto.subtle.importKey("raw", stringToArrayBuffer(passWord), {
            "name": "PBKDF2"
        }, false, ["deriveKey"]).// Derive a key from the password
            then(function (baseKey) {
                return window.crypto.subtle.deriveKey({
                    "name": "PBKDF2",
                    "salt": stringToArrayBuffer(userName),
                    "iterations": 100,
                    "hash": 'SHA-256'
                }, baseKey, {
                        "name": "AES-CBC",
                        "length": 128
                    }, // Key we want
                    true, // Extrable
                    ["encrypt", "decrypt"]// For new key
                );
            }).// Export it so we can display it
            then(function (aesKey) {
                return window.crypto.subtle.exportKey("raw", aesKey);
            }).// Display it in hex format
            then(function (keyBytes) {
                return arrayBufferToHexString(keyBytes);
            });
    }
}

export default pathSecurity;