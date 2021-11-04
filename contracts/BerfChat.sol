// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.4;

contract BerfChat {

    event MessageSent(address from, address to, bytes32 chatId, string messageHash, uint time);

    /// @notice Takes two address and hashes them
    /// together to create a chat id comprised of
    /// the two chat participants.
    /// @dev uses keccak256 as its hashing function.
    /// @param _addr01 Address representing chat participant.
    /// @param _addr02 Address representing chat participant.
    /// @return _addressHash Hash of the provided addresses.
    function hashAddresses(address _addr01, address _addr02)
        private
        pure
        returns(bytes32)
    {
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
    /// @param _messageHash String that is the hash
    /// of the message contents (generated off-chain)
    function sendMessage(address _to, string memory _messageHash) external {
        bytes32 _chatId;

        if(msg.sender > _to) {
            _chatId = hashAddresses(msg.sender, _to);
        } else {
            _chatId = hashAddresses(_to, msg.sender);
        }

        emit MessageSent(msg.sender, _to, _chatId, _messageHash, block.number);
    }
}