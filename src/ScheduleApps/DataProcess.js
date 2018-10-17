const send = async (targetUrl , data ) =>{
    let output 
    
    let url = targetUrl
     await fetch(url, {  
        method: 'POST',  
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body : JSON.stringify(data)
    })
    .then( (response) =>{
      return response.json()
    })
    .then( (result) =>{  
      console.log('Request success: ', result);  
      output = result
    })  
    .catch(  (error) =>{  
      console.error('Request failure: ', error);  
      output =  error
    })
    return output
}




const recevie = (targetUrl) =>{
  return  fetch(targetUrl)
  .then(data => data.json())
  .catch(err => console.log(err))
}
export {send}
export {recevie}


