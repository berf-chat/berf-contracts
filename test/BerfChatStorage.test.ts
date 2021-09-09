import { ethers } from "hardhat";
import { Signer } from "ethers";
const { expect } = require("chai");

describe("BerfChatStorage contract tests", function () {
    let accounts: Signer[];

    beforeEach(async function() {
        // Get BerfChatStorage to deploy
        const berfChatStorage = await ethers.getContractFactory("BerfChatStorage");

        // Pull array of Signers and
        // assign to 'accounts'
        accounts = await ethers.getSigners();

        console.log(accounts[0]);

        /*
        // declare first idenx item in
        // 'accounts' to named variable
        const firstAccount = accounts[0];

        // Deploy berfChatStorage from first account
        const BerfChatStorage = await berfChatStorage.deploy();

        // Confirm the address that deployed
        // BerfChatStorage contract is firstAccount
        expect(await BerfChatStorage.deployTransaction.from).to.equal(firstAccount.address);
        */
    });

    /*
    it("{unit test description}", async function () {
        // Test
    });
    */
});