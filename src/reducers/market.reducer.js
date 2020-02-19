import {CHANGE_PAGE,CHANGE_STATUS} from '../actions/market.action';
const initialState={
    status:"all",
    page:1
}
const market_reducer = (state = initialState , action )=>{
    // console.log(state)
    switch(action.type){
        case CHANGE_STATUS:{
            return Object.assign({},state,{
                status: action.status,
            })
        }
        case CHANGE_PAGE:{
            return Object.assign({},state,{
                page: action.page,
            })
        }
        default:
            return state;
    }
}

export default market_reducer;
