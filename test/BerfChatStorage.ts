import { ethers } from "hardhat";
import chai from "chai";
import { Signer } from "ethers";
import { BerfChatStorage } from "../typechain/BerfChatStorage";

const { expect } = chai;

describe("BerfChatStorage contract tests", function () {
    let berfChatStorage: BerfChatStorage;

    /*
    beforeEach(async function() {
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

    it("confirms the first Singer deployed BerfChatStorage contract", async function () {
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



        // Confirm the address that deployed
        // BerfChatStorage contract is firstAccount
        expect(await berfChatStorage.deployTransaction.from).to.equal(firstAccount.address);
    });
});