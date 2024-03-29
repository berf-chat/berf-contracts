/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BerfChat, BerfChatInterface } from "../BerfChat";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "chatId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "messageHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "MessageSent",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "string",
        name: "_messageHash",
        type: "string",
      },
    ],
    name: "sendMessage",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061056e806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063de6f24bb14610030575b600080fd5b61004a600480360381019061004591906101f8565b610060565b604051610057919061035e565b60405180910390f35b6000808373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1611156100a8576100a13385610143565b90506100f8565b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1610156100ed576100e68433610143565b90506100f7565b600091505061013d565b5b7f5ab80ff36157a3c0540febf125068af09a02fa47b424cf273e52ae1e0ffceb9c338583864360405161012f959493929190610304565b60405180910390a160019150505b92915050565b60008083836040516020016101599291906102d8565b6040516020818303038152906040528051906020012090508091505092915050565b600061018e6101898461039e565b610379565b9050828152602081018484840111156101a657600080fd5b6101b184828561043d565b509392505050565b6000813590506101c881610521565b92915050565b600082601f8301126101df57600080fd5b81356101ef84826020860161017b565b91505092915050565b6000806040838503121561020b57600080fd5b6000610219858286016101b9565b925050602083013567ffffffffffffffff81111561023657600080fd5b610242858286016101ce565b9150509250929050565b610255816103eb565b82525050565b61026c610267826103eb565b6104b0565b82525050565b61027b816103fd565b82525050565b61028a81610409565b82525050565b600061029b826103cf565b6102a581856103da565b93506102b581856020860161044c565b6102be81610503565b840191505092915050565b6102d281610433565b82525050565b60006102e4828561025b565b6014820191506102f4828461025b565b6014820191508190509392505050565b600060a082019050610319600083018861024c565b610326602083018761024c565b6103336040830186610281565b81810360608301526103458185610290565b905061035460808301846102c9565b9695505050505050565b60006020820190506103736000830184610272565b92915050565b6000610383610394565b905061038f828261047f565b919050565b6000604051905090565b600067ffffffffffffffff8211156103b9576103b86104d4565b5b6103c282610503565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b60006103f682610413565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b8381101561046a57808201518184015260208101905061044f565b83811115610479576000848401525b50505050565b61048882610503565b810181811067ffffffffffffffff821117156104a7576104a66104d4565b5b80604052505050565b60006104bb826104c2565b9050919050565b60006104cd82610514565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b60008160601b9050919050565b61052a816103eb565b811461053557600080fd5b5056fea2646970667358221220bb41cb0e3e6e8b954b7f4d1bbb8154aff655d4bcbaf0fd345ffcaf2ae6fc1ccb64736f6c63430008040033";

export class BerfChat__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BerfChat> {
    return super.deploy(overrides || {}) as Promise<BerfChat>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BerfChat {
    return super.attach(address) as BerfChat;
  }
  connect(signer: Signer): BerfChat__factory {
    return super.connect(signer) as BerfChat__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BerfChatInterface {
    return new utils.Interface(_abi) as BerfChatInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BerfChat {
    return new Contract(address, _abi, signerOrProvider) as BerfChat;
  }
}
