import axios from "axios";
import { URL, POOL_ID } from "../config/config";

const positionQuery = `{
  positions(where: {id: ${POOL_ID}}) {
    liquidity
    tickLower { tickIdx }
    tickUpper { tickIdx }
    pool { id }
    token0 {
      symbol
      decimals
    }
    token1 {
      symbol
      decimals
    }
  }
}`;

const getPositionInfo = async () => {
    try {
        const result = await axios.post(URL, { query: positionQuery });
        return result["positions"][0];
    } catch (error) {
        console.log("Error Occured while fetching the pool query : ", error);
        return;
    }
}

export default getPositionInfo;