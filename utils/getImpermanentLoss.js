import { POOL_ID } from "../config/config";
import getPoolInfo from "./getPoolInfo";
import getPositionInfo from "./getPositionInfo";
import { tickToPice } from "./tickToPrice";


const getImpermanentLoss = async () => {
    const position = await getPositionInfo();
    const pool = await getPoolInfo();

    // POSITION PARAMETERS
    let liquidity = Number(position["liquidity"]);
    let tick_lower = Number(position["tickLower"]["tickIdx"]);
    let tick_upper = Number(position["tickUpper"]["tickIdx"]);
    let pool_id = position["pool"]["id"];
    let token0 = position["token0"]["symbol"];
    let token1 = position["token1"]["symbol"];
    let decimals0 = Number(position["token0"]["decimals"]);
    let decimals1 = Number(position["token1"]["decimals"]);

    // POOL PARAMETERS
    let current_tick = Number(pool["tick"]);
    let current_sqrt_price = Number(pool["sqrtPrice"]) / (2 ** 96);

    // Getting the current price
    // -------------------------

    let current_price = tickToPice(current_tick);
    let adjusted_current_price = current_price / (10 ** decimals1 - decimals0);
    console.log(`Adjusted Current Price = ${adjusted_current_price} , ${token1} for ${token0} at tick ${current_tick}`);

    let sa = tickToPice(tick_lower / 2);
    let sb = tickToPice(tick_upper / 2);

    let amount0, amount1;

    if (tick_upper <= current_tick) {
        // ONLY TOKEN-1 LOCKED
        amount0 = 0;
        amount1 = liquidity * (sb - sa);
    } else if (tick_lower < current_tick < tick_upper) {
        // Both tokens present
        amount0 = liquidity * (sb - current_sqrt_price) / (current_sqrt_price * sb);
        amount1 = liquidity * (current_sqrt_price - sa);
    } else {
        // ONLY TOKEN-0 LOCKED
        amount0 = liquidity * (sb - sa) / (sa * sb);
        amount1 = 0;
    }


    // Printing Info about position
    // ----------------------------

    let adjusted_amount0 = amount0 / (10 ** decimals0);
    let adjusted_amount1 = amount1 / (10 ** decimals1);

    print(`position ${Number(POOL_ID)} in range [${tick_lower},${tick_upper}]: ${adjusted_amount0} ${token0} and ${adjusted_amount1} ${token1} at the current price`);

    // Calculating the impermanent loss
    // --------------------------------

    let ratio;
    if (adjusted_amount0 > adjusted_amount1) {
        ratio = adjusted_amount1 / adjusted_amount0;
    } else if (adjusted_amount0 < adjusted_amount1) {
        ratio = adjusted_amount0 / adjusted_amount1;
    }

    return ratio;
}

export default getImpermanentLoss;