The goal is to

- Continuously monitor the impermanent loss incurred for a position in Uniswap V3
- And if there is a loss, we need to exit the position

# Monitoring a position

We can use the Uniswap V3's subgraph to know a position's details like tokens, price at the time of providing liquidity, etc. We will also know the current tick in the pool.

We can use the following [Impermanent Loss Calculation](https://github.com/atiselsts/uniswap-v3-liquidity-math/blob/master/subgraph-liquidity-single-position-example.py).

When the loss crosses a threshold (like say 50%), we need to trigger the recovery process.

# Exiting a position

We need to deploy a simple smart contract that wraps around Uniswap V3's LP exiting function and trigger this function when the above monitoring logic is executed. The output of this should result in the wallet having the LP tokens back with the position fuly exited.
