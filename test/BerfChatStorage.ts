import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Signer } from "ethers";
import { BerfChatStorage } from "../typechain/BerfChatStorage";
import EthCrypto from 'eth-crypto';

import { toBuffer, unpadBuffer, privateToAddress, privateToPublic } from "ethereumjs-util";
import getPublicKeyString from "ethereumjs-wallet";
import Wallet from "ethereumjs-wallet";

// import privateKeyToPublicKey from "ethereum-private-key-to-public-key";

chai.use(solidity);

const { expect } = chai;

describe("BerfChatStorage contract tests", async () => {
    
    // Get BerfChatStorage to deploy
    let berfChatStorage: BerfChatStorage;

    // Pull array of Signers and
    // assign to 'accounts'
    let accountOne : any;
    let accountTwo : any;
    let accountThree : any;
    let accountFour : any;

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
    */

    it("tests sending message hashes using EthCrypto", async () => {

        // Used the EthCrypto library to create accounts
        // rather than using Hardhat because for testing
        // purposes, it is much easier to retrieve 
        // public keys with it.
        const accountOne = EthCrypto.createIdentity();
        const accountTwo = EthCrypto.createIdentity();

        // Declare and assign variable
        // with secret string, then hash the string.
        const secretMessage = "Hey, how are you?";

        // Used ethers signMessage() instead of EthCrypto.sign()
        // const signature = await accountOne.signMessage(messageHash);

        // Sign the message with accountOne's
        // private key
        const signature = EthCrypto.sign(
            accountOne.privateKey,
            EthCrypto.hash.keccak256(secretMessage)
        );

        // Create object with message and signature
        const payload = {
            message: secretMessage,
            signature
        };

        // Encrypt the message and the signature with
        // accountTwo's publicKey. (By encrypting it
        // with accountTwo's public key, only accountTwo
        // can decrypt `payload` with his private key.)
        const encrypted = await EthCrypto.encryptWithPublicKey(
            accountTwo.publicKey,
            JSON.stringify(payload) // Stringify the payload to allow encryption
        );

        // Convert object into smaller string-representation
        const encryptedString = EthCrypto.cipher.stringify(encrypted);

        /* ~~~~ Sending message from accountOne to accountTwo~~~ */

        // Parse the string back to an object
        const encryptedObject = EthCrypto.cipher.parse(encryptedString);

        const decrypted = await EthCrypto.decryptWithPrivateKey(
            accountTwo.privateKey,
            encryptedObject
        );

        const decryptedPayload = JSON.parse(decrypted);

        // Check signature
        const senderAddress = EthCrypto.recover(
            decryptedPayload.signature,
            EthCrypto.hash.keccak256(decryptedPayload.message)
        );

        expect(senderAddress).to.equal(accountOne.address);

        expect(decryptedPayload.message).to.equal(secretMessage);
    })
});