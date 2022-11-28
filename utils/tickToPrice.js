import { TICK_BASE } from "../config/config";

export const tickToPice = (tick) => {
    return TICK_BASE ** tick;
}