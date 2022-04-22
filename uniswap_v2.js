const ethers = require('ethers')
const uniswap_sdk_core = require('@uniswap/sdk-core')
const uniswap_v2_sdk = require('@uniswap/v2-sdk')
const fs = require('fs')

const RPC = JSON.parse(fs.readFileSync("rpc.json"))
const provider = new ethers.providers.StaticJsonRpcProvider(RPC.url, "mainnet");

function exponentiate(number, decimals) {
    return ethers.BigNumber.from(number).mul(ethers.BigNumber.from(10).pow(decimals))
}

// generate a quote from a static usdc and weth amount
async function static_quote() {
    const chainId = 1 // mainnet
    const usdc_token = new uniswap_sdk_core.Token(chainId, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6)
    const weth_token = new uniswap_sdk_core.Token(chainId, "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18)
    const usdc_token_amount = new uniswap_sdk_core.TokenAmount(usdc_token, exponentiate(3000 * 100, usdc_token.decimals))
    const weth_token_amount = new uniswap_sdk_core.TokenAmount(weth_token, exponentiate(1 * 100, weth_token.decimals))
    const pair = new uniswap_v2_sdk.Pair(weth_token_amount, usdc_token_amount);
    const route = new uniswap_v2_sdk.Route([pair], weth_token);
    const trade = new uniswap_v2_sdk.Trade(
        route,
        new uniswap_sdk_core.TokenAmount(weth_token, exponentiate(2, weth_token.decimals - 2)),
        uniswap_sdk_core.TradeType.EXACT_INPUT
    );
    console.log(trade.executionPrice.toSignificant())
}

static_quote()