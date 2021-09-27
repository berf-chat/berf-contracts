/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  BerfChatStorage,
  BerfChatStorageInterface,
} from "../BerfChatStorage";

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
    inputs: [],
    name: "chatId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr01",
        type: "address",
      },
      {
        internalType: "address",
        name: "_addr02",
        type: "address",
      },
    ],
    name: "hashAddresses",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
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
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506105a7806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80638ea76c3914610046578063de6f24bb14610064578063f2b24da314610080575b600080fd5b61004e6100b0565b60405161005b91906103a3565b60405180910390f35b61007e6004803603810190610079919061024c565b6100b6565b005b61009a60048036038101906100959190610210565b61015b565b6040516100a791906103a3565b60405180910390f35b60005481565b60003390508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161115610104576100f9818461015b565b600081905550610115565b61010e838261015b565b6000819055505b7f5ab80ff36157a3c0540febf125068af09a02fa47b424cf273e52ae1e0ffceb9c8184600054854360405161014e959493929190610349565b60405180910390a1505050565b600080838360405160200161017192919061031d565b6040516020818303038152906040528051906020012090508091505092915050565b60006101a66101a1846103e3565b6103be565b9050828152602081018484840111156101be57600080fd5b6101c9848285610476565b509392505050565b6000813590506101e08161055a565b92915050565b600082601f8301126101f757600080fd5b8135610207848260208601610193565b91505092915050565b6000806040838503121561022357600080fd5b6000610231858286016101d1565b9250506020610242858286016101d1565b9150509250929050565b6000806040838503121561025f57600080fd5b600061026d858286016101d1565b925050602083013567ffffffffffffffff81111561028a57600080fd5b610296858286016101e6565b9150509250929050565b6102a981610430565b82525050565b6102c06102bb82610430565b6104e9565b82525050565b6102cf81610442565b82525050565b60006102e082610414565b6102ea818561041f565b93506102fa818560208601610485565b6103038161053c565b840191505092915050565b6103178161046c565b82525050565b600061032982856102af565b60148201915061033982846102af565b6014820191508190509392505050565b600060a08201905061035e60008301886102a0565b61036b60208301876102a0565b61037860408301866102c6565b818103606083015261038a81856102d5565b9050610399608083018461030e565b9695505050505050565b60006020820190506103b860008301846102c6565b92915050565b60006103c86103d9565b90506103d482826104b8565b919050565b6000604051905090565b600067ffffffffffffffff8211156103fe576103fd61050d565b5b6104078261053c565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600061043b8261044c565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b838110156104a3578082015181840152602081019050610488565b838111156104b2576000848401525b50505050565b6104c18261053c565b810181811067ffffffffffffffff821117156104e0576104df61050d565b5b80604052505050565b60006104f4826104fb565b9050919050565b60006105068261054d565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b60008160601b9050919050565b61056381610430565b811461056e57600080fd5b5056fea2646970667358221220cb6635ba56e2a242274017e66f291b5d69bbd8f14fa3864a336f4442f07bd84464736f6c63430008040033";

export class BerfChatStorage__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BerfChatStorage> {
    return super.deploy(overrides || {}) as Promise<BerfChatStorage>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BerfChatStorage {
    return super.attach(address) as BerfChatStorage;
  }
  connect(signer: Signer): BerfChatStorage__factory {
    return super.connect(signer) as BerfChatStorage__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BerfChatStorageInterface {
    return new utils.Interface(_abi) as BerfChatStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BerfChatStorage {
    return new Contract(address, _abi, signerOrProvider) as BerfChatStorage;
  }
}
