import React from "react";
import { connect } from 'react-redux'


const App = () => {
    console.log(testStore)
    return (
        <div>app</div>
    )
}

export default connect(
    mapStateToProps => ({ 
        testStore : store
     }),
    dispatch => ({})
)(App);