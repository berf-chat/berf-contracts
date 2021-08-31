const { expect } = require("chai");
const { ethers } = require("hardhat");
const EthCrypto = require('eth-crypto');
const { intToBuffer } = require('ethjs-util');
// const BigNumber = require('bignumber.js');

describe("eth-crypto functionality", function() {
    before(async function() {
        // Get EthCryptoTutorial code to deploy
        const ethCryptoTutorial = await ethers.getContractFactory("EthCryptoTutorial");

        /*
        // Create two identities from eth-crypto
        const creatorIdentity = EthCrypto.createIdentity();
        const recieverIdentity = EthCrypto.createIdentity();
        */

        // Pull accounts generated from Hardhat
        [creatorIdentity, receiverIdentity] = await ethers.getSigners();

        // Deploy ethCryptoTutorial from creatorIdentity
        EthCryptoTutorial = await ethCryptoTutorial.deploy();
    })

    it("should verify the deployer address of the contract", async function() {
        expect(await EthCryptoTutorial.deployTransaction.from).to.equal(creatorIdentity.address);
    })

    it("should verify the owner of the contract", async function() {
        // HAD TO HARDCODE CREATORIDENTITY AS THE OWNER SINCE
        // THE CONSTRUCTOR WOULD NOT ACCEPT ANY ARGUMENTS
        expect(await EthCryptoTutorial.owner()).to.equal(creatorIdentity.address);
    })

    it("should send a transaction to the contract and verify its receipt", async function() {
        // Pull contract address and assign
        // it to a variable
        const contractAddress = EthCryptoTutorial.address;

        // Create transaction object
        const tx = {
            to: contractAddress,
            value: ethers.utils.parseEther("1"),
        }

        // Send transaction to contract,
        // activating its default function
        await creatorIdentity.sendTransaction(tx);

        // Declare and assign variable to store the
        // contract's ether balance
        let contractBalance = await EthCryptoTutorial.getBalance();

        // Log the balance of the contract,
        // to confirm it received the funds
        console.log(contractBalance.toString());
    })

    /*
    it("should allow the signing of data with JavaScript and validation of the signature in a smart contract.", async function() {

    })
    */
})