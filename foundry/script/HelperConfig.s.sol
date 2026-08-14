//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";

contract HelperConfig is Script{
    struct NetworkConfig{
        address paymentToken;
    }

    NetworkConfig public activeNetworkConfig;

    constructor() {
        if(block.chainid == 31337) {
            activeNetworkConfig = getAnvilConfig();
        }
        else if(block.chainid == 11155111){
            activeNetworkConfig = getSepoliaETHConfig();
        }
    }

    function getSepoliaETHConfig() pure public returns(NetworkConfig memory) {
        return NetworkConfig({
            paymentToken: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
        });
    }

    function getAnvilConfig() pure public returns(NetworkConfig memory) {
        return NetworkConfig({
            paymentToken: 0x5FbDB2315678afecb367f032d93F642f64180aa3
        });
    }
}