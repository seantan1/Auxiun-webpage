import React, {useEffect} from 'react'
// web3 and axios for NFT data & metadata
import Web3 from 'web3';
// contract data
import {
    TOKEN_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI
} from "../../contract-data/token-contract-data";
const axios = require('axios');
const Purchase = (props) => {
    // Need to change to actual route
    const purchaseRoute = '/purchase/:tokenId';

    // Method for purchasing NFT
    const purchaseNFT = (tokenId) => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS);
        contract.methods.purchaseNFT(tokenId).call()
        .then((result) => {
            const timestamp = new Date().getTime().toString()
            const transaction = {
                'transaction_id': timestamp + tokenId,
                'buyer': result[0], 
                'seller': result[1],
                'token_id': result[2],
                'amount': result[3],
                'timestamp': timestamp
            }
            axios.post(purchaseRoute, transaction)
            .then(response => {
               // Need to error check
            })
        })
    }


    return (
        <div>
            
        </div>
    )
}

export default Purchase
