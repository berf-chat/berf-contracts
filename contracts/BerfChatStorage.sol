// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract BerfChatStorage {

    // ONLY PUBLIC FOR TESTING
    bytes32 public chatId;

    event MessageSent(address from, address to, /*bytes32 messageHash,*/ bytes32 chatId, uint time);

    /// @notice Takes two address and hashes them
    /// together to create a chat id comprised of
    /// the two chat participants.
    /// @dev uses keccak256 as its hashing function.
    /// @param _addr01 Address representing chat participant.
    /// @param _addr02 Address representing chat participant.
    /// @return _addressHash Hash of the provided addresses.
    function hashAddresses(address _addr01, address _addr02)
        public /*private PUBLIC ONLY FOR TESTING*/
        pure
        returns(bytes32)
    {
        // GOOD APPROACH TO HASHING MULTIPLE VARIABLES?
        bytes32 _addressHash = keccak256(abi.encodePacked(_addr01, _addr02));
        return _addressHash;
    }


    /// @notice Takes the msg.sender's and _to's
    /// address and hashes them to generate a chat
    /// id, then emit an event with the necessary
    /// chat information.
    /// @dev Uses if/else to pass the addresses
    /// in the same order into the hashing function,
    /// to generate the exact same chat id hash.
    /// @param _to Address of the message recipient.
    function sendMessage(address _to/*, bytes32 _messageHash*/) public {
        address _from = msg.sender;

        if(_from > _to) {
            chatId = hashAddresses(_from, _to);
        } else {
            chatId = hashAddresses(_to, _from);
        }

        emit MessageSent(_from, _to, chatId, /*_messageHash,*/ block.number);
    }
}