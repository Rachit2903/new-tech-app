const reducer=(state,action)=>{
    switch(action.type){
        case "SET_ISLOADING":
            return{
                ...state,
                isLoading:true,
            }
        case "GET_STORIES":
            return{
                ...state,
                hits:action.payload.hits,
                nbPages:action.payload.nbPages,
                isLoading:false,
                isData:true,
            }
        case "REMOVE_POST":
            // console.log(action.payload);
            return{
                ...state,
                hits:state.hits.filter((currEle)=>currEle.objectID!==action.payload),
            }
        case "SEARCH_POST":
            return{
                ...state,
                query:action.payload,
            }
        case "PREV_PAGE":
            let pageNo=state.page-1;
            if(pageNo<0){
                pageNo=0;
            }
            return{
                ...state,
                page:pageNo,
            }
        case "NEXT_PAGE":
            let pageNum=state.page+1;
            if(pageNum>state.nbPages){
                pageNum=state.nbPages;
            }
            return{
                ...state,
                page:pageNum,
            }
    }
    return state;
}
export default reducer;