import { ethers } from "hardhat";
import chai from "chai";
import { Signer } from "ethers";
import { BerfChatStorage } from "../typechain/BerfChatStorage";

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
    */

    /*
    it("confirms the first Singer deployed BerfChatStorage contract", async function () {
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

    it("compares two different outputs of hashMessages()", async function () {
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

        // Compare the two different hashes
        // to confirm whether the order of
        // the parameters affects the end hash
        expect(firstHash).to.not.equal(secondHash);
    });
    */

    it("tests the functionality of sendMessage", async function () {
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



        
    })
});