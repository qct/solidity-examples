// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

// Example message struct
struct ExampleMessage {
    string message;
    uint256 value;
    address from;
    address to;
}

contract EIP712Example is EIP712 {

    // EIP712 domain separator setup
    constructor(string memory name, string memory version) EIP712(name, version) {
        console.log("deploying contract, blockchain id: %d", block.chainid);
    }

    // Verifies an EIP712 message signature
    function verifyMessageV4(ExampleMessage memory message, uint8 v, bytes32 r, bytes32 s) public view returns (bool) {
        bytes32 digest = _hashTypedDataV4(hashMessage(message));

        address recoveredAddress = ECDSA.recover(digest, v, r, s);

        console.log("from: %s, recoveredAddress: ", msg.sender, recoveredAddress);
        console.logBytes32(digest);

        return (recoveredAddress == message.from);
    }

    // Hashes an EIP712 message struct
    function hashMessage(ExampleMessage memory message) private pure returns (bytes32) {
        return keccak256(
            abi.encode(
                keccak256(bytes("ExampleMessage(string message,uint256 value,address from,address to)")),
                keccak256(bytes(message.message)),
                message.value,
                message.from,
                message.to
            )
        );
    }

    /*function splitSignature(bytes memory signature) internal virtual returns (bytes32 r, bytes32 s, uint8 v) {
        require(signature.length == 65, "invalid signature length");
        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(signature, 32))
            // second 32 bytes
            s := mload(add(signature, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(signature, 96)))
        }
    }*/
}
