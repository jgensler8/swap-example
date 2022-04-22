# swap-example

AMM swap example javascript

## basic.js

Generates quotes based on the ABI. Uses only `ethers` package.

You'll need a URL from RPC provider (like Infura). Plase the url in a `rpc.json` file:

```
{
    "url": "<paste your url>"
}
```

Example Output:
```
$ node .\basic.js
getAmountsIn: 339925535658310,1000000
getAmountsOut: 1000000,337889034491400
getAmountsIn: 2959645727,1000000000000000000
getAmountsOut: 1000000000000000000,2941727395
```

## uniswap_v2.js

Utilizes the @uniswap/v2-sdk client library to generate static quote given fetching Pair balances has been removed.