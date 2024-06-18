// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC20, ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract EIP2612Example is ERC20Permit {
    constructor() ERC20("EIP2612Example", "EIP2612") ERC20Permit("EIP2612Example") {
        _mint(_msgSender(), 100 ether);
    }
}
