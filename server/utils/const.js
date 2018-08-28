global.maxSystem
global.maxUser


const getCpu = () => {
  
    console.log(global.maxUser)
    console.log(global.maxSystem)
    return  { "system" : global.maxSystem ,
            "user" : global.maxUser}
}

const setCpu = (user , system) => {
  
    console.log(global.maxUser)
    console.log(global.maxSystem)
    global.maxUser = user
    global.maxSystem = system
}


export {setCpu}
export {getCpu}