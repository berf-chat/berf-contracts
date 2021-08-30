const { expect } = require("chai");
const { ethers } = require("hardhat");
const EthCrypto = require('eth-crypto');
const { intToBuffer } = require('ethjs-util');

describe("eth-crypto functionality", function() {
    before(async function() {
        /*
        // Create two identities from eth-crypto
        const creatorIdentity = EthCrypto.createIdentity();
        const recieverIdentity = EthCrypto.createIdentity();
        */

        // Pull accounts generated from Hardhat
        [deployerAccount, creatorIdentity, receiverIdentity] = await ethers.getSigners();

        
    })

    /*
    it("should allow the signing of data with JavaScript and validation of the signature in a smart contract.", async function() {

    })
    */
})