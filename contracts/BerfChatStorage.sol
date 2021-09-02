pragma solidity ^0.8.4;

contract BerfChatStorage {

    // Mapping storing an array of hashed messages
    // mapped to a conversation id
    mapping(bytes => bytes[]) private conversation;

    event MessageSent(address from, address to);

    // Hash the participant's addresses
    // to use as a id for a specific chat
    function hashAddresses(address _addr01, address _addr02) private {
        bytes addressHash = keccak256(_addr01, _addr02);
        Return addressHash;
    }

    // Function to store message's hash
    function storeMessage(address _to, bytes _message) public {
        bytes chatIdHash = hashAddresses(msg.sender, _to);
        conversation[chatIdHash].push(_message);
        emit MessageSent(msg.sender, _to);
    }

    // Function that is called to pull
    // relevant chat messages
    function pullMessages(address _addr01, address _addr02) public view returns(bytes[] _chat) {
        bytes chatId = hashAddresses(_addr01,_addr02);
        bytes[] _chat = conversation[chatId];
        return _chat;
    }
}