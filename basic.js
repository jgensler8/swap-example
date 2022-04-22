const ethers = require('ethers');
const fs = require('fs')

// Create the ethers.Contract
const abi = JSON.parse(fs.readFileSync("abi.json"))
const RPC = JSON.parse(fs.readFileSync("rpc.json"))
const provider = new ethers.providers.StaticJsonRpcProvider(RPC.url, "mainnet");
const sushi_contract_addr = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F"
const sushi_swap = new ethers.Contract(sushi_contract_addr, abi, provider)

async function quote(contract, amount, amount_token_addr, other_token_addr) {
    // getAmountIn
    // Returns the minimum input asset amount required to buy the given output asset amount (accounting for fees) given reserves.
    // "what is the minimum 'other tokens' needed to buy 'amount' 'amount tokens?'
    // amm should quote higher than mid price
    const amountsInRes = await contract.getAmountsIn(amount, [other_token_addr, amount_token_addr])
    console.log(`getAmountsIn: ${amountsInRes}`)
    // getAmountsOut
    // Given an input asset amount, returns the maximum output amount of the other asset (accounting for fees) given reserves.
    // "given 'amount' 'amount token', how many 'other' tokens can we buy?"
    // amm should quote lower than mid price
    const amountsOutRes = await contract.getAmountsOut(amount, [amount_token_addr, other_token_addr])
    console.log(`getAmountsOut: ${amountsOutRes}`)
}

async function all_quotes() {
    // Token Addresses
    const usdc_addr = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    const weth_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

    // Manually move the decimal place to represent "one" USDC (6 places)
    const usdc_in_param = ethers.BigNumber.from("1000000")
    await quote(sushi_swap, usdc_in_param, usdc_addr, weth_addr)

    // Manually move the decimal place to represent "one" WETH (18 places)
    const weth_in_param = ethers.BigNumber.from("1000000000000000000")
    await quote(sushi_swap, weth_in_param, weth_addr, usdc_addr)
}

all_quotes()