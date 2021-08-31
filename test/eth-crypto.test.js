const { expect } = require("chai");
const EthCrypto = require('eth-crypto');
const { intToBuffer } = require('ethjs-util');

describe("eth-crypto DeChat app functionality", function() {
    it("should verify the deployer address of the contract", async function() {

        // Create two identities from eth-crypto
        const alice = EthCrypto.createIdentity();
        const bob = EthCrypto.createIdentity();

        // Create message that will be sent
        const secretMessage = "My name is Satoshi Buterin";

        const signature = EthCrypto.sign(
            alice.privateKey,
            EthCrypto.hash.keccak256(secretMessage)
        );

        const payload = {
            message: secretMessage,
            signature
        };

        const encrypted = await EthCrypto.encryptWithPublicKey(
            bob.publicKey, // by encryping with bobs publicKey, only bob can decrypt the payload with his privateKey
            JSON.stringify(payload) // we have to stringify the payload before we can encrypt it
        );
        
        // we convert the object into a smaller string-representation
        const encryptedString = EthCrypto.cipher.stringify(encrypted);

        // we parse the string into the object again
        const encryptedObject = EthCrypto.cipher.parse(encryptedString);

        const decrypted = await EthCrypto.decryptWithPrivateKey(
            bob.privateKey,
            encryptedObject
        );
        
        const decryptedPayload = JSON.parse(decrypted);

        // check signature
        const senderAddress = EthCrypto.recover(
            decryptedPayload.signature,
            EthCrypto.hash.keccak256(decryptedPayload.message)
        );

        expect(senderAddress).to.equal(alice.address);
        expect(decryptedPayload.message).to.equal(secretMessage);
    })
})