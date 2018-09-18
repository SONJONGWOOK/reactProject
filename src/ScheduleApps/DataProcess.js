const send = (targetUrl , data ) =>{
    
    let url = targetUrl
    fetch(url, {  
        method: 'POST',  
        headers: {
            'Content-Type': 'application/json'
          },
        body : JSON.stringify(data)
    })
    .then(function (data) {  
      console.log('Request success: ', data);  
    })  
    .catch(function (error) {  
      console.error('Request failure: ', error);  
    });

}

const recevie = (targetUrl) =>{
  return  fetch(targetUrl)
  .then(data => data.json())
  .catch(err => console.log(err))
}
export {send}
export {recevie}


