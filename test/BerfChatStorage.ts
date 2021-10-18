import { ethers } from "hardhat";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { solidity } from "ethereum-waffle";
import { Signer } from "ethers";
import { BerfChatStorage } from "../typechain/BerfChatStorage";
import EthCrypto from "eth-crypto";
import { rejects } from "assert";

import * as dotenv from "dotenv";
dotenv.config({ path: '../.env' });

chai.use(solidity);
chai.use(chaiAsPromised);

// const { expect } = chai;
const expect = chai.expect;

describe("BerfChatStorage contract tests", async function() {

    // Increase the allowed
    // time for a test to run
    this.timeout(1200000);
    
    // Declare varible of type BerfChatStorage
    let berfChatStorage: BerfChatStorage;

    // Pull array of Signers from
    // ethers and assign to 'accounts'
    let accountOne: any;
    let accountTwo: any;
    let accountThree: any;
    let accountFour: any;

    // Private keys provided from Hardhat
    const accountOnePrivKey: string = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const accountTwoPrivKey: string = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
    const accountThreePrivKey: string = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";

    // AccountOne and AccountTwo
    // private keys from Ropsten network
    const accountOneRopstenPrivKey: any = process.env.ACCOUNT_ONE_PRIVATE_KEY;
    const accountTwoRopstenPrivKey: any = process.env.ACCOUNT_TWO_PRIVATE_KEY;
    const accountThreeRopstenPrivKey: any = process.env.ACCOUNT_THREE_PRIVATE_KEY;

    // Generate public key from accountTwo private key
    let accountOnePubKey: string;
    let accountTwoPubKey: string;

    // Pulled a tx hash from etherscan
    // to use as a test hash
    const testMessageHash: string = "0xa6c0386e78a842666f1e98975f5124872c330638aa147f4b109d286720719fcd";

    // Declaring the variables that will
    // be used to test the functionality
    // of EthCrypto
    let secretMessage: string;
    let signature: string;
    let payload: any;
    let encrypted: any;
    let encryptedString: string;
    let encryptedObject: any;

    let decrypted: string;
    let decryptedPayload: any;

    let secretResponse: string;
    let responseSignature: string;
    let responsePayload: any;
    let encryptedResponse: any;
    let encryptedResponseString: any;

    let encryptedResponseObject: any;
    let decryptedResponse: string;
    let decryptedResponsePayload: any;

    before(async () => {
        // Get BerfChatStorage to deploy
        const BerfChatStorage = await ethers.getContractFactory("BerfChatStorage");

        // Pull array of Signers and
        // assign to 'accounts'
        [accountOne, accountTwo, accountThree, accountFour] = await ethers.getSigners();

        // Deploy berfChatStorage from first account
        // berfChatStorage = (await BerfChatStorage.deploy()) as BerfChatStorage;

        // Pull up existing instace of BerfChatStorage
        // Ropsten testnet
        berfChatStorage = (await BerfChatStorage.attach("0xA9465f88563FF1A4D62Fe50b3A79d104C71c4bB4")) as BerfChatStorage;
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
        const firstHash: any = await berfChatStorage.hashAddresses(accountOne.address, accountTwo.address);
        const secondHash: any = await berfChatStorage.hashAddresses(accountTwo.address, accountOne.address);

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
        await berfChatStorage.sendMessage(accountTwo.address, testMessageHash);
        const chatIdOneToTwo: any = await berfChatStorage.chatId();

        await berfChatStorage.connect(accountTwo).sendMessage(accountOne.address, testMessageHash);
        const chatIdTwoToOne: any = await berfChatStorage.chatId();

        expect(chatIdOneToTwo).to.equal(chatIdTwoToOne);

        // Send a message from accountThree
        // to accountFour and compare to the
        // chat ids from accountOne to accountTwo
        // to verify they are different
        await berfChatStorage.connect(accountThree).sendMessage(accountFour.address, testMessageHash);
        const chatIdThreeToFour: any = await berfChatStorage.chatId();

        expect(chatIdOneToTwo).to.not.equal(chatIdThreeToFour);
    });

    it("tests the functionality of sendMessage", async () => {
        // Confirm the sendMessage function emitted
        // the MessageSent event
        // Note: currently have to hardcode the Hardhat
        // Network block number (parameter number 5)
        await expect(berfChatStorage.sendMessage(accountTwo.address, testMessageHash))
        .to.emit(berfChatStorage, 'MessageSent')
        .withArgs(
            accountOne.address,
            accountTwo.address,
            (await berfChatStorage.hashAddresses(accountOne.address, accountTwo.address)),
            testMessageHash,
            5 //Currently hard coding the HRE block number
        );
    });

    it("tests sending a message via the contract", async () => {
        // Declare and assign variable
        // with secret string.
        secretMessage = "Satoshi is not Vitalik.";

        // Sign the message with accountOne's
        // private key
        signature = EthCrypto.sign(
            accountOnePrivKey,
            EthCrypto.hash.keccak256(secretMessage)
        );

        // Create object with message and signature
        payload = {
            message: secretMessage,
            signature
        };

        // Generate public key from accountTwo private key
        accountTwoPubKey = EthCrypto.publicKeyByPrivateKey(
            accountTwoPrivKey
        );

        // Encrypt the message and the signature with
        // accountTwo' publicKey. (By encrypting it
        // with accountTwo' public key, only accountTwo
        // can decrypt `payload` with its private key.)
        encrypted = await EthCrypto.encryptWithPublicKey(
            accountTwoPubKey,
            JSON.stringify(payload) // Stringify the payload to allow encryption
        );

        // Convert object into smaller string-representation
        encryptedString  = EthCrypto.cipher.stringify(encrypted);

        // Parse the string back to an object
        encryptedObject = EthCrypto.cipher.parse(encryptedString);

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
            6 //Currently hard coding the HRE block number
        );

        // Decrypt the received message with the
        // private key of the recipient, accountTwo
        decrypted = await EthCrypto.decryptWithPrivateKey(
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
    });

    it("tests responding to a message via the contract", async () => {
        // Declare and assign variable
        // with secret string.
        secretResponse = "Now I know Vitalik is not Satoshi.";

        responseSignature = EthCrypto.sign(
            accountTwoPrivKey,
            EthCrypto.hash.keccak256(secretResponse)
        );

        // Create object with message and signature
        responsePayload = {
            message: secretResponse,
            signature: responseSignature
        };

        // Recover accountOnePubKey from
        // previously sent message
        accountOnePubKey = EthCrypto.recoverPublicKey(
            decryptedPayload.signature,
            EthCrypto.hash.keccak256(payload.message)
        );

        encryptedResponse = await EthCrypto.encryptWithPublicKey(
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
            7 //Currently hard coding the HRE block number
        );
    });

    it("confirms that only the public key's private key can decrypt the message", async () => {
        // Confirm that acountTres CANNOT decrypt message
        await rejects(EthCrypto.decryptWithPrivateKey(accountThreePrivKey, encryptedObject));
    });
    
    it("decrypts the response message", async () => {
        // Parse the string back to an object
        encryptedResponseObject = EthCrypto.cipher.parse(encryptedResponseString);
        
        // Decrypt the received message with the
        // private key of the recipient, accountOne
        decryptedResponse = await EthCrypto.decryptWithPrivateKey(
            accountOnePrivKey,
            encryptedResponseObject
        );

        decryptedResponsePayload = JSON.parse(decryptedResponse);

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
    });

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
    */

    // Used this unit test to generate hashes to send
    // from accountOne to accountTwo and vice versa
    // to have data to query from The Graph protocol
    it("sends several messages on the Ropsten testnet", async () => {
        // Declare and assign an array
        // with strings making up
        // a conversation
        let secretMessages = [
            "Hey",
            "Hey, what's going on?",
            "Nothing much. What about you?",
            "Same, just browsing NFTs on OpenSea.",
            "Oh Cool. Any in particular that you're looking at buying?",
            "I wish I had funds for a CryptoPunk. Might get a Meebit though.",
            "Yeah, a Punk would be cool. And nice, a Meebit! I may get a CoolCat myself.",
            "You should get a MoonCat while you're at it. Be a collector.",
            "Haha. I don't like cats THAT much.",
            "I feel you there."
        ];

        // For loop to iterate through an array
        for(let i = 0; i <= secretMessages.length; i++) {
            // If statement that divides the messages
            // by odds and evens, and sends them from
            // accountOne to accountTwo, or vice versa
            if(i % 2 == 0) {
                // Sign the message with accountOne's
                // private key
                signature = EthCrypto.sign(
                    `0x${accountOneRopstenPrivKey}`,
                    EthCrypto.hash.keccak256(secretMessages[i])
                );

                // Create object with message and signature
                payload = {
                    message: secretMessages[i],
                    signature
                };

                // Generate public key from accountTwo private key
                accountTwoPubKey = EthCrypto.publicKeyByPrivateKey(
                    `0x${accountTwoRopstenPrivKey}`
                );

                // Encrypt the message and the signature with
                // accountTwo' publicKey. (By encrypting it
                // with accountTwo' public key, only accountTwo
                // can decrypt `payload` with its private key.)
                encrypted = await EthCrypto.encryptWithPublicKey(
                    accountTwoPubKey,
                    JSON.stringify(payload) // Stringify the payload to allow encryption
                );

                // Convert object into smaller string-representation
                encryptedString  = EthCrypto.cipher.stringify(encrypted);

                // Send message from accountOne to accountTwo
                await berfChatStorage.sendMessage(accountTwo.address, encryptedString);
            } else {
                // Sign the message with accountOne's
                // private key
                signature = EthCrypto.sign(
                    `0x${accountTwoRopstenPrivKey}`,
                    EthCrypto.hash.keccak256(secretMessages[i])
                );

                // Create object with message and signature
                payload = {
                    message: secretMessages[i],
                    signature
                };

                // Generate public key from accountTwo private key
                accountOnePubKey = EthCrypto.publicKeyByPrivateKey(
                    `0x${accountOneRopstenPrivKey}`
                );

                // Encrypt the message and the signature with
                // accountTwo' publicKey. (By encrypting it
                // with accountTwo' public key, only accountTwo
                // can decrypt `payload` with its private key.)
                encrypted = await EthCrypto.encryptWithPublicKey(
                    accountOnePubKey,
                    JSON.stringify(payload) // Stringify the payload to allow encryption
                );

                // Convert object into smaller string-representation
                encryptedString  = EthCrypto.cipher.stringify(encrypted);

                // Send message from accountTwo to accountOne
                await berfChatStorage.connect(accountTwo).sendMessage(accountOne.address, encryptedString);
            }
        }
    })
});