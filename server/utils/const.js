global.maxSystem
global.maxUser


const getCpu = () => {
  
    
    return  { "system" : global.maxSystem ,
            "user" : global.maxUser}
}

const setCpu = (user , system) => {
  
    
    global.maxUser = user
    global.maxSystem = system
}


export {setCpu}
export {getCpu}