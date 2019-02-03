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
    generateKey: () => {
        return window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 2048, //can be 1024, 2048, or 4096
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                hash: { name: "SHA-256" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
            },
            true, //whether the key is extractable (i.e. can be used in exportKey)
            ["encrypt", "decrypt"] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
        );
    }
}

export default pathSecurity;