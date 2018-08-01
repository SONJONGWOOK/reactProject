import React from  'react'
import { BrowserRouter} from 'react-router-dom'
import MovieRouter from '../shared/MovieRouter'


const Root = () => {
    return(
        <BrowserRouter>
            <MovieRouter/>
        </BrowserRouter>
    )
}

export default Root;