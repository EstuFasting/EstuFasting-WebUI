export const SYNC_CATERINGS = "SYNC_CATERINGS"

export function syncCaterings(caterings) {
    return {
        type: SYNC_CATERINGS,
        payload: caterings
    }
}
