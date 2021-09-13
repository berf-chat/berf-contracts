// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract BerfChatStorage {

    // ONLY PUBLIC FOR TESTING
    bytes32 public chatId;

    // Mapping tracking whether there has already
    // been an established chat between
    // two provided addresses
    mapping(address => mapping(address => bool)) existingChat;

    event MessageSent(address from, address to, bytes32 chatId, uint time);

    /// @notice Takes two address and hashes them
    /// together to create a chat id comprised of
    /// the two chat participants.
    /// @dev uses keccak256 as its hashing function.
    /// @param _addr01 Address representing chat participant.
    /// @param _addr02 Address representing chat participant.
    /// @return _addressHash Hash of the provided addresses.
    function hashAddresses(address _addr01, address _addr02) /*private*/ public pure returns(bytes32) {
        // GOOD APPROACH TO HASHING MULTIPLE VARIABLES?
        bytes32 _addressHash = keccak256(abi.encodePacked(_addr01, _addr02));
        // DATA LOCATION VERIFICATION
        return _addressHash;
    }


    /// @notice Takes the message sent and stores it by
    /// linking it to the chat id, comprised of the two
    /// participant's addresses.
    /// @param _to Address of the message recipient.
    function sendMessage(address _to) public {
        address _from = msg.sender;

        if(existingChat[_from][_to] == true) {
            chatId = hashAddresses(_from, _to);
        } else if (existingChat[_to][_from] == true) {
            chatId = hashAddresses(_to, _from);
        } else if (existingChat[_from][_to] == false && existingChat[_to][_from] == false) {
            existingChat[_from][_to] = true;
            chatId = hashAddresses(_from, _to);
        }

        emit MessageSent(_from, _to, chatId, block.number);
    }
}