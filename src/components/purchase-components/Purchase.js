import React, {useEffect} from 'react'
// web3 and axios for NFT data & metadata
import Web3 from 'web3';
// contract data
import {
    TOKEN_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI
} from "../../contract-data/token-contract-data";

const Purchase = (props) => {

    // Method for purchasing NFT
    const purchaseNFT = () => {
        const web3 = new Web3(window.ethereum)
    }


    return (
        <div>
            
        </div>
    )
}

export default Purchase
