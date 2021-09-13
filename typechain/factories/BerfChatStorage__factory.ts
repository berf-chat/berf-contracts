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
    ],
    name: "sendMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610670806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80633b7c4b93146100465780638ea76c3914610062578063f2b24da314610080575b600080fd5b610060600480360381019061005b9190610477565b6100b0565b005b61006a610424565b6040516100779190610591565b60405180910390f35b61009a600480360381019061009591906104a0565b61042a565b6040516100a79190610591565b60405180910390f35b600033905060011515600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515141561016057610155818361042a565b6000819055506103e1565b60011515600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515141561020b57610200828261042a565b6000819055506103e0565b60001515600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515148015610335575060001515600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515145b156103df5760018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506103d8818361042a565b6000819055505b5b5b7f7a71ac99057d6fe1e6eb336e5690f3fb2e31996e9b50f85c25dfce1f00de96c7818360005443604051610418949392919061054c565b60405180910390a15050565b60005481565b6000808383604051602001610440929190610520565b6040516020818303038152906040528051906020012090508091505092915050565b60008135905061047181610623565b92915050565b60006020828403121561048957600080fd5b600061049784828501610462565b91505092915050565b600080604083850312156104b357600080fd5b60006104c185828601610462565b92505060206104d285828601610462565b9150509250929050565b6104e5816105ac565b82525050565b6104fc6104f7826105ac565b6105f2565b82525050565b61050b816105be565b82525050565b61051a816105e8565b82525050565b600061052c82856104eb565b60148201915061053c82846104eb565b6014820191508190509392505050565b600060808201905061056160008301876104dc565b61056e60208301866104dc565b61057b6040830185610502565b6105886060830184610511565b95945050505050565b60006020820190506105a66000830184610502565b92915050565b60006105b7826105c8565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006105fd82610604565b9050919050565b600061060f82610616565b9050919050565b60008160601b9050919050565b61062c816105ac565b811461063757600080fd5b5056fea26469706673582212208e06e50c5a2d817dd42d3c4cb48e1ebccd368e292d85615e4c4f668e5d0b97f364736f6c63430008040033";

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
