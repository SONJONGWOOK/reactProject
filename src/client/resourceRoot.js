import React from  'react'
import { BrowserRouter} from 'react-router-dom'
import ResourceRouter from '../shared/ResourceRouter'


const resourceRoot = () => {
    return(
      <BrowserRouter>
        <ResourceRouter/>
      </BrowserRouter>
    )
}

export default resourceRoot;