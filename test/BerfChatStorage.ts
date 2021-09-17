import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Signer } from "ethers";
import { BerfChatStorage } from "../typechain/BerfChatStorage";
import EthCrypto from 'eth-crypto';

import { toBuffer, unpadBuffer, privateToAddress, privateToPublic } from "ethereumjs-util";
import getPublicKeyString from "ethereumjs-wallet";
import Wallet from "ethereumjs-wallet";

import privateKeyToPublicKey from "ethereum-private-key-to-public-key";

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
        /*
        THIS GENERATES DIFFERENT ADDRESSES THAN 
        THE ONES PROVIDED BY HARDHAT EVEN IF IT
        USES THE SAME PRIVATE KEYS

        // Declare and assign variables the value
        // of the account private keys provided
        // by Hardhat
        const accountOnePrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        const accountTwoPrivateKey = 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;

        // Make Buffers out of both private keyes
        const privateKeyBufferOne = toBuffer(accountOnePrivateKey);
        const privateKeyBufferTwo = toBuffer(accountTwoPrivateKey);

        // Create wallets out of those Buffers
        const accountOneWallet = Wallet.fromPrivateKey(privateKeyBufferOne);
        const accountTwoWallet = Wallet.fromPrivateKey(privateKeyBufferTwo);

        // Derive the public keys from those wallets
        const accountOnePublicKey = accountOneWallet.getPublicKeyString();
        const accountTwoPublicKey = accountTwoWallet.getPublicKeyString();

        const accountOneAddress = accountOneWallet.getAddressString();
        const accountTwoAddress = accountTwoWallet.getAddressString();
        */

        // Declare and assign variable
        // with secret string, then hash the string.
        const secretMessage = "Hey, how are you?";
        const messageHash = EthCrypto.hash.keccak256(secretMessage);

        // Used ethers signMessage() instead of EthCrypto.sign()
        const signature = await accountOne.signMessage(messageHash);

        // Create object with message and signature
        const payload = {
            message: messageHash,
            signature
        }

        // const privateKeyToAccountOneAddress = privateToAddress(toBuffer(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80));
        // const accountOnePublicKey = privateToPublic(toBuffer(accountOnePrivateKey));
        // const accountOneWallet = new getPublicKeyString(privateKeyBuffer);
        // console.log(accountOneWallet.publicKey);
        // console.log(unpadBuffer(accountOnePublicKey));
        // console.log(unpadBuffer(privateKeyToAccountOneAddress);

        /*
        // Encrypt the payload with
        // accountTwo's public key
        const encrypted = await EthCrypto.encryptWithPublicKey(
            accountTwo.publicKey,
            JSON.stringify(payload)
        );

        // Convert the object into a smaller string-representation
        const encryptedString = EthCrypto.cipher.stringify(encrypted);

        // ~~~~ Sending message from accountOne to accountTwo~~~

        // Parse the string into the object again
        const encryptedObject = EthCrypto.cipher.parse(encryptedString);

        // Decrypt using accountTwo's private key
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

        console.log(
            'Got message from ' +
            senderAddress +
            ': ' +
            decryptedPayload.message
        );
        */
    })
});