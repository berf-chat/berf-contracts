import { ethers } from "hardhat";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { solidity } from "ethereum-waffle";
import { Signer } from "ethers";
import { BerfChatStorage } from "../typechain/BerfChatStorage";
import EthCrypto from "eth-crypto";
import { rejects } from "assert";

// import { BigNumber } from "bignumber.js";

// import expectRevert from "@openzeppelin/test-helpers";

// import { toBuffer, unpadBuffer, privateToAddress, privateToPublic } from "ethereumjs-util";
// import getPublicKeyString from "ethereumjs-wallet";
// import Wallet from "ethereumjs-wallet";

// import privateKeyToPublicKey from "ethereum-private-key-to-public-key";

chai.use(solidity);
chai.use(chaiAsPromised);

// const { expect } = chai;
const expect = chai.expect;

describe("BerfChatStorage contract tests", async () => {
    
    // Get BerfChatStorage to deploy
    let berfChatStorage: BerfChatStorage;

    // Pull array of Signers and
    // assign to 'accounts'
    let accountOne: any;
    let accountTwo: any;
    let accountThree: any;
    let accountFour: any;

    const accountOnePrivKey: string = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const accountTwoPrivKey: string = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";

    // Generate public key from accountTwo private key
    const accountTwoPubKey: string = EthCrypto.publicKeyByPrivateKey(
        accountTwoPrivKey
    );

    let decryptedPayload: any;
    let payload: any;

    let secretResponse: string;
    let encryptedResponseString: any;

    before(async () => {
        // Get BerfChatStorage to deploy
        const berfChatStorageFactory = await ethers.getContractFactory("BerfChatStorage");

        // Pull array of Signers and
        // assign to 'accounts'
        [accountOne, accountTwo, accountThree, accountFour] = await ethers.getSigners();

        // Deploy berfChatStorage from first account
        berfChatStorage = (await berfChatStorageFactory.deploy()) as BerfChatStorage;
    });

    /*
    it("confirms accountOne deployed BerfChatStorage contract", async () => {
        // Confirm the address that deployed
        // BerfChatStorage contract is firstAccount
        expect(await berfChatStorage.deployTransaction.from).to.equal(accountOne.address);
    });
    
    it("confirms the order of the addresses hashed via hashAddresses() changes the output", async () => {
        // Hash addresses as two different
        // sequences of inputting as parameters
        const firstHash = await berfChatStorage.hashAddresses(accountOne.address, accountTwo.address);
        const secondHash = await berfChatStorage.hashAddresses(accountTwo.address, accountOne.address);

        // Compare the two different hashes
        // to confirm whether the order of
        // the parameters affects the end hash
        expect(firstHash).to.not.equal(secondHash);
    });

    it("compares the generated chatId from sendMessage() from different msg.senders", async () => {
        // Send two messages, one from accountOne
        // to accountTwo and then one from accountTwo
        // to accountOne and confirm the function
        // call generates the same chatId for both instances
        await berfChatStorage.sendMessage(accountTwo.address);
        const chatIdOneToTwo = await berfChatStorage.chatId();

        await berfChatStorage.connect(accountTwo).sendMessage(accountOne.address);
        const chatIdTwoToOne = await berfChatStorage.chatId();

        expect(chatIdOneToTwo).to.equal(chatIdTwoToOne);

        // Send a message from accountThree
        // to accountFour and compare to the
        // chat ids from accountOne to accountTwo
        // to verify they are different
        await berfChatStorage.connect(accountThree).sendMessage(accountFour.address);
        const chatIdThreeToFour = await berfChatStorage.chatId();

        expect(chatIdOneToTwo).to.not.equal(chatIdThreeToFour);
    })

    it("tests the functionality of sendMessage", async () => {
        // Confirm the sendMessage function emitted
        // the MessageSent event
        // Note: currently have to hardcode the Hardhat
        // Network block number (parameter number 4)
        await expect(berfChatStorage.sendMessage(accountTwo.address))
        .to.emit(berfChatStorage, 'MessageSent')
        .withArgs(
            accountOne.address,
            accountTwo.address,
            (await berfChatStorage.hashAddresses(accountOne.address, accountTwo.address)),
            2 //Currently hard coding the HRE block number
        );
    })
    

    it("tests sending message hashes using EthCrypto", async () => {
        // Create new accounts
        // (Used the EthCrypto library to create accounts
        // rather than using Hardhat because for testing
        // purposes, it is much easier to retrieve 
        // public keys with it.)
        const accountUno = EthCrypto.createIdentity();
        const accountDos = EthCrypto.createIdentity();

        // Declare and assign variable
        // with secret string.
        const secretMessage = "Hey, how are you?";

        // Sign the message with accountUno's
        // private key
        const signature = EthCrypto.sign(
            accountUno.privateKey,
            EthCrypto.hash.keccak256(secretMessage)
        );

        // Create object with message and signature
        const payload = {
            message: secretMessage,
            signature
        };

        // Encrypt the message and the signature with
        // accountDos' publicKey. (By encrypting it
        // with accountDos' public key, only accountDos
        // can decrypt `payload` with his private key.)
        const encrypted = await EthCrypto.encryptWithPublicKey(
            accountDos.publicKey,
            JSON.stringify(payload) // Stringify the payload to allow encryption
        );

        // Convert object into smaller string-representation
        const encryptedString = EthCrypto.cipher.stringify(encrypted);


        // ~~~~ SENDING MESSAGE FROM accountUno TO accountDos ~~~ //


        // Parse the string back to an object
        const encryptedObject = EthCrypto.cipher.parse(encryptedString);

        const decrypted = await EthCrypto.decryptWithPrivateKey(
            accountDos.privateKey,
            encryptedObject
        );

        const decryptedPayload = JSON.parse(decrypted);

        // Check signature
        const senderAddress = EthCrypto.recover(
            decryptedPayload.signature,
            EthCrypto.hash.keccak256(decryptedPayload.message)
        );

        expect(senderAddress).to.equal(accountUno.address);

        expect(decryptedPayload.message).to.equal(secretMessage);
    })

    it("confirms that only the public key's private key can decrypt the message", async () => {
        // Create new accounts
        // (Used the EthCrypto library to create accounts
        // rather than using Hardhat because for testing
        // purposes, it is much easier to retrieve 
        // public keys with it.)
        const accountUno = EthCrypto.createIdentity();
        const accountDos = EthCrypto.createIdentity();
        const accountTres = EthCrypto.createIdentity();

        // Declare and assign variable
        // with secret string.
        const secretMessage = "I know who Satoshi is.";

        // Sign the message with accountUno's
        // private key
        const signature = EthCrypto.sign(
            accountUno.privateKey,
            EthCrypto.hash.keccak256(secretMessage)
        );

        // Create object with message and signature
        const payload = {
            message: secretMessage,
            signature
        };

        // Encrypt the message and the signature with
        // accountDos' publicKey. (By encrypting it
        // with accountDos' public key, only accountDos
        // can decrypt `payload` with its private key.)
        const encrypted = await EthCrypto.encryptWithPublicKey(
            accountDos.publicKey,
            JSON.stringify(payload) // Stringify the payload to allow encryption
        );

        // Convert object into smaller string-representation
        const encryptedString = EthCrypto.cipher.stringify(encrypted);


        // ~~~~ SENDING MESSAGE FROM accountOne TO accountTwo ~~~ //


        // Parse the string back to an object
        const encryptedObject = EthCrypto.cipher.parse(encryptedString);

        // Confirm that acountTres CANNOT decrypt message
        await rejects(EthCrypto.decryptWithPrivateKey(accountTres.privateKey, encryptedObject));
    });

    it("tests sending a message via the contract", async () => {
        // Declare and assign variable
        // with secret string.
        const secretMessage: string = "Satoshi is not Vitalik.";

        const signature: string = EthCrypto.sign(
            accountOnePrivKey,
            EthCrypto.hash.keccak256(secretMessage)
        );

        
        // Create object with message and signature
        payload = {
            message: secretMessage,
            signature
        };
        
        // NOT SURE WHICH TYPE TO MAKE THIS
        const encrypted: any = await EthCrypto.encryptWithPublicKey(
            accountTwoPubKey,
            JSON.stringify(payload)
        );

        // Convert object into smaller string-representation
        // (This variable of type string)
        const encryptedString: string = EthCrypto.cipher.stringify(encrypted);

        // Confirm the sendMessage function emitted
        // the MessageSent event
        // Note: currently have to hardcode the Hardhat
        // Network block number (parameter number 4)
        await expect(berfChatStorage.sendMessage(accountTwo.address, encryptedString))
        .to.emit(berfChatStorage, 'MessageSent')
        .withArgs(
            accountOne.address,
            accountTwo.address,
            (await berfChatStorage.hashAddresses(accountOne.address, accountTwo.address)),
            encryptedString,
            2 //Currently hard coding the HRE block number
        );

        // Parse the string back to an object
        const encryptedObject: any = EthCrypto.cipher.parse(encryptedString);
        
        // Decrypt the received message with the
        // private key of the recipient, accountTwo
        const decrypted: string = await EthCrypto.decryptWithPrivateKey(
            accountTwoPrivKey,
            encryptedObject
        );
        
        decryptedPayload = JSON.parse(decrypted);
        
        // Check signature
        const senderAddress: string = EthCrypto.recover(
            decryptedPayload.signature,
            EthCrypto.hash.keccak256(decryptedPayload.message)
        );

        // Confirm the address that sent it is accountOne
        expect(senderAddress).to.equal(accountOne.address);

        // Confirm the decrypted message is
        // what was declared earlier
        expect(decryptedPayload.message).to.equal(secretMessage);
    })

    it("tests responding to a message via the contract", async () => {
        // Declare and assign variable
        // with secret string.
        secretResponse = "Now I know Vitalik is not Satoshi.";

        const responseSignature: string = EthCrypto.sign(
            accountTwoPrivKey,
            EthCrypto.hash.keccak256(secretResponse)
        );

        // Create object with message and signature
        const responsePayload: any = {
            message: secretResponse,
            signature: responseSignature
        };

        // Recover accountOnePubKey from
        // previously sent message
        const accountOnePubKey: string = EthCrypto.recoverPublicKey(
            decryptedPayload.signature,
            EthCrypto.hash.keccak256(payload.message)
        );

        const encryptedResponse: any = await EthCrypto.encryptWithPublicKey(
            accountOnePubKey,
            JSON.stringify(responsePayload)
        );

        // Convert object into smaller string-representation
        // (This variable of type string)
        encryptedResponseString = EthCrypto.cipher.stringify(encryptedResponse);

        // Confirm the sendMessage function emitted
        // the MessageSent event
        // Note: currently have to hardcode the Hardhat
        // Network block number (parameter number 4)
        await expect(berfChatStorage.connect(accountTwo).sendMessage(accountOne.address, encryptedResponseString))
        .to.emit(berfChatStorage, 'MessageSent')
        .withArgs(
            accountTwo.address,
            accountOne.address,
            (await berfChatStorage.hashAddresses(accountOne.address, accountTwo.address)),
            encryptedResponseString,
            3 //Currently hard coding the HRE block number
        );
    })

    it("decrypts the response message", async () => {
        // Parse the string back to an object
        const encryptedResponseObject: any = EthCrypto.cipher.parse(encryptedResponseString);
        
        // Decrypt the received message with the
        // private key of the recipient, accountOne
        const decryptedResponse: string = await EthCrypto.decryptWithPrivateKey(
            accountOnePrivKey,
            encryptedResponseObject
        );

        const decryptedResponsePayload: any = JSON.parse(decryptedResponse);

        // Check signature
        const responseSenderAddress: string = EthCrypto.recover(
            decryptedResponsePayload.signature,
            EthCrypto.hash.keccak256(decryptedResponsePayload.message)
        );

        // Confirm the address that sent it is accountOne
        expect(responseSenderAddress).to.equal(accountTwo.address);

        // Confirm the decrypted message is
        // what was declared earlier
        expect(decryptedResponsePayload.message).to.equal(secretResponse);
    })
    */

    it("throws an exception upon receiving ETH", async () => {
        // Solidity documentation states that without
        // neither a fallback() or receive(), sending
        // any ETH will throw an exception
        // (Contract can still receive ETH from a
        // coinbase transaction or as a receipt
        // of a `selfdestruct` destionation address
        // however.)
        await rejects(accountOne.sendTransaction({
            to: berfChatStorage.address,
            value: 100000
        }));
    });
});