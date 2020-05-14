import React, { useReducer} from 'react'
import FootballChampionshipStartSettings from "./FootballChampionshipStartSettings";
import GeneratorSettings from "./GeneratorSettings";
import Standings from "./Standings";

const initialState = {
    amountOfTeams : 0,
    whichPage : 0,
    lambda : 1,
    teams : [],
    games : []
}
const reducer = (state, action) => {
    if (action.type === "SET_TEAMS"){
        return{
            ...state,
            teams : [...action.payload]
        };
    }
    else if (action.type === "SET_GAMES"){
        return{
            ...state,
            games : [...action.payload]
        }
    }
    else if (action.type === "SET_LAMBDA"){
        return{
            ...state,
            lambda : action.payload
        }
    }
    else if (action.type === "NEXT_PAGE"){
        return{
            ...state,
            whichPage : state.whichPage + 1
        }
    }
}

const MyContext = React.createContext();


const FootballChampionship = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    if (state.whichPage === 0){
        return (
            <MyContext.Provider value={{ state, dispatch }}>
                <FootballChampionshipStartSettings />
            </MyContext.Provider>
        )
    }
    else if (state.whichPage === 1){
        return (
            <MyContext.Provider value={{ state, dispatch }}>
                <GeneratorSettings />
            </MyContext.Provider>
        )
    }
    else if (state.whichPage === 2){
        return (
            <MyContext.Provider value={{ state, dispatch }}>
                <Standings />
            </MyContext.Provider>
        )
    }
}



export {MyContext, FootballChampionship};