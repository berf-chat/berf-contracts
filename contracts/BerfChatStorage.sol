// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract BerfChatStorage {

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
    /// @param _message Hash of the intended message.
    /// (the message has been hashed off-chain.)
    function sendMessage(address _to) public {
        address _from = msg.sender;
        bytes32 _chatId;

        if(existingChat[_from][_to] == true) {
            _chatId = hashAddresses(_from, _to);
        } else if (existingChat[_to][_from] == true) {
            _chatId = hashAddresses(_to, _from);
        } else if (existingChat[_from][_to] == false && existingChat[_to][_from] == false) {
            existingChat[_from][_to] = true;
            _chatId = hashAddresses(_from, _to);
        }

        // DO NOT STORE HASHES
        // chat[_chatId].push(_message);
        emit MessageSent(_from, _to, _chatId, block.number);
    }

    /*
    /// @notice Pulls the hashes of the chat messages
    /// as requested
    /// @param _addr01 Address representing chat participant.
    /// @param _addr02 Address representing chat participant.
    /// @return _chat Hashes of the chat messages.
    function pullMessages(address _addr01, address _addr02) public view returns(bytes[] memory) {
        bytes32 _chatId = hashAddresses(_addr01,_addr02);
        bytes[] memory _chat = chat[_chatId];
        return _chat;
    }
    */
}