import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Signer } from "ethers";
import { BerfChatStorage } from "../typechain/BerfChatStorage";
import EthCrypto from 'eth-crypto';

chai.use(solidity);

const { expect } = chai;

describe("BerfChatStorage contract tests", function () {
    let berfChatStorage: BerfChatStorage;

    /*
    before(async function() {
        // Get BerfChatStorage to deploy
        const berfChatStorageFactory = await ethers.getContractFactory("BerfChatStorage");

        // Pull array of Signers and
        // assign to 'accounts'
        const accounts = await ethers.getSigners();

        // declare first idenx item in
        // 'accounts' to named variable
        const firstAccount = accounts[0];

        // Deploy berfChatStorage from first account
        berfChatStorage = (await berfChatStorageFactory.deploy()) as BerfChatStorage;
    });

    it("confirms the first Signer deployed BerfChatStorage contract", async function() {
        // Get BerfChatStorage to deploy
        const berfChatStorageFactory = await ethers.getContractFactory("BerfChatStorage");

        // Pull array of Signers and
        // assign to 'accounts'
        const accounts = await ethers.getSigners();

        // declare first idex item in
        // 'accounts' to named variable
        const firstAccount = accounts[0];

        // Deploy berfChatStorage from first account
        berfChatStorage = (await berfChatStorageFactory.deploy()) as BerfChatStorage;





        // Confirm the address that deployed
        // BerfChatStorage contract is firstAccount
        expect(await berfChatStorage.deployTransaction.from).to.equal(firstAccount.address);
    });
    

    it("compares two different outputs of hashMessages()", async function() {
        // Get BerfChatStorage to deploy
        const berfChatStorageFactory = await ethers.getContractFactory("BerfChatStorage");

        // Pull array of Signers and
        // assign to 'accounts'
        const accounts = await ethers.getSigners();

        // declare first two accounts
        // as sender and recipient
        // of message
        const sender = accounts[0];
        const recipient = accounts[1];

        // Deploy berfChatStorage from first account
        berfChatStorage = (await berfChatStorageFactory.deploy()) as BerfChatStorage;





        // Hash addresses as two different
        // sequences of inputting as parameters
        const firstHash = await berfChatStorage.hashAddresses(sender.address, recipient.address);
        const secondHash = await berfChatStorage.hashAddresses(recipient.address, sender.address);

        console.log("First hash is " + firstHash);
        console.log("Second hash is " + secondHash);

        // Compare the two different hashes
        // to confirm whether the order of
        // the parameters affects the end hash
        // expect(firstHash).to.not.equal(secondHash);
    });
    */

    it("compares the generated chatId from sendMessage() from different msg.sender's", async function() {
        // Get BerfChatStorage to deploy
        const berfChatStorageFactory = await ethers.getContractFactory("BerfChatStorage");

        // Pull array of Signers and
        // assign to 'accounts'
        const accounts = await ethers.getSigners();

        // declare and assign first two accounts
        const accountOne = accounts[0];
        const accountTwo = accounts[1];

        const accountThree = accounts[2];
        const accountFour = accounts[3];

        // Deploy berfChatStorage from first account
        berfChatStorage = (await berfChatStorageFactory.deploy()) as BerfChatStorage;


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

    /*
    it("tests the functionality of sendMessage", async function() {
        // Get BerfChatStorage to deploy
        const berfChatStorageFactory = await ethers.getContractFactory("BerfChatStorage");

        // Pull array of Signers and
        // assign to 'accounts'
        const accounts = await ethers.getSigners();

        // declare and assign
        // first two accounts
        const accountOne = accounts[0];
        const accountTwo = accounts[1];

        // Deploy berfChatStorage from accountOne
        berfChatStorage = (await berfChatStorageFactory.deploy()) as BerfChatStorage;





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

    it("tests sending message hashes using EthCrypto", async function() {
        // Get BerfChatStorage to deploy
        const berfChatStorageFactory = await ethers.getContractFactory("BerfChatStorage");

        // Pull array of Signers and
        // assign to 'accounts'
        const accounts = await ethers.getSigners();

        // declare and assign
        // first two accounts
        const accountOne = accounts[0];
        const accountTwo = accounts[1];

        // Deploy berfChatStorage from accountOne
        berfChatStorage = (await berfChatStorageFactory.deploy()) as BerfChatStorage;

        // Declare and assign variable
        // with secret string, then hash the string.
        const secretMessage = "Hey, how are you?";
        const messageHash = EthCrypto.hash.keccak256(secretMessage);
        console.log("This is the message hash: " + messageHash);
        // Used ethers signMessage() instead of EthCrypto.sign()
        const signature = await accountOne.signMessage(messageHash);

        console.log("This is the signature: " + signature);
    })
    */
});