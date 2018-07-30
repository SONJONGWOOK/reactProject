import React from  'react'
import { BrowserRouter} from 'react-router-dom'
import Welcome from '../shared/Welcome'



const Root = () => {
    return(
        <BrowserRouter>
            <Welcome/>
        </BrowserRouter>
    )
}

export default Root;