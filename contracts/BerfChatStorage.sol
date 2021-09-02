pragma solidity ^0.8.4;

contract BerfChatStorage {

    /// Mapping storing an array of hashed messages
    /// mapped to a chat id.
    mapping(bytes => bytes[]) private chat;

    event MessageSent(address from, address to);

    /// @notice Takes two address and hashes them
    /// together to create a chat id comprised of
    /// the two chat participants.
    /// @dev uses keccak256 as its hashing function.
    /// @param _addr01 Address representing chat participant.
    /// @param _addr02 Address representing chat participant.
    /// @return Hash of the provided addresses.
    function hashAddresses(address _addr01, address _addr02) private returns(bytes _addressHash) {
        bytes _addressHash = keccak256(_addr01, _addr02);
        return _addressHash;
    }

    /// @notice Takes the message sent and stores it by
    /// linking it to the chat id, comprised of the two
    /// participant's addresses.
    /// @param _to Address of the message recipient.
    /// @param _message Hash of the intended message.
    /// (the message has been hashed off-chain.)
    function storeMessage(address _to, bytes _message) public {
        bytes _chatId = hashAddresses(msg.sender, _to);
        chat[_chatId].push(_message);
        emit MessageSent(msg.sender, _to);
    }

    /// @notice Pulls the hashes of the chat messages
    /// as requested
    /// @param _addr01 Address representing chat participant.
    /// @param _addr02 Address representing chat participant.
    /// @return _chat Hashes of the chat messages.
    function pullMessages(address _addr01, address _addr02) public view returns(bytes[] _chat) {
        bytes _chatId = hashAddresses(_addr01,_addr02);
        bytes[] _chat = chat[_chatId];
        return _chat;
    }
}