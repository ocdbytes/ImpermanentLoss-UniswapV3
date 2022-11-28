import axios from "axios";
import { URL, POOL_ID } from "../config/config";


const poolQuery = `pools(where: {id: ${POOL_ID}}) {
    tick
    sqrtPrice
}`;

const getPoolInfo = async () => {
    try {
        const result = await axios.post(URL, { query: poolQuery });
        return result["pools"][0];
    } catch (error) {
        console.log("Error Occured while fetching the pool query : ", error);
        return;
    }
}

export default getPoolInfo;