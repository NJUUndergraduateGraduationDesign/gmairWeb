export const CHANGE_STATUS="CHANGE_STATUS";
export const CHANGE_PAGE="CHANGE_PAGE";

export function changeStatus(status){
    return {
        type:CHANGE_STATUS,
        status:status,
    }
}

export function changeCurrentPage(page){
    return {
        type:CHANGE_PAGE,
        page:page,
    }
}
