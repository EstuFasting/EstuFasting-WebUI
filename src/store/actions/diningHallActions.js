export const SYNC_DINING_HALLS = "SYNC_DINING_HALLS"

export function syncDiningHalls(diningHalls) {
    return {
        type: SYNC_DINING_HALLS,
        payload: diningHalls
    }
}