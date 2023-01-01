export const SYNC_CATERINGS = "SYNC_CATERINGS"
export const SYNC_MAIN_PAGE_CATERINGS = "SYNC_MAIN_PAGE_CATERINGS"

export function syncCaterings(caterings) {
    return {
        type: SYNC_CATERINGS,
        payload: caterings
    }
}

export function syncMainPageCaterings(caterings) {
    return {
        type: SYNC_MAIN_PAGE_CATERINGS,
        payload: caterings
    }
}

