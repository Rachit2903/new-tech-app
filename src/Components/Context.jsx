import { createContext, useContext, useReducer,useEffect } from "react";
import reducer from "./Reducer";

const initialState={
    isLoading:true,
    isData:true,
    query:"",
    nbPages:0,
    page:0,
    hits:[],
};
const AppContext=createContext();

const AppProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,initialState);

    let API = "https://hn.algolia.com/api/v1/search?";

    async function fetchApiData(url) {
        dispatch({type:"SET_ISLOADING"});
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            dispatch({
                type:"GET_STORIES",
                payload:{
                    hits:data.hits,
                    nbPages:data.nbPages,
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    function removePost(post_id){
        dispatch({type:"REMOVE_POST",payload:post_id});
    }

    function searchPost(post_query){
        dispatch({type:"SEARCH_POST",payload:post_query});
    }

    function getPrevPage(){
        dispatch({type:"PREV_PAGE"});
    }

    function getNextPage(){
        dispatch({type:"NEXT_PAGE"});
    }

    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    }, [state.query,state.page])

    return(
        <AppContext.Provider value={{...state,removePost,searchPost,getPrevPage,getNextPage}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext=()=>{
    return useContext(AppContext);
}

export {useGlobalContext,AppProvider};