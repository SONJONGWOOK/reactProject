import monitorFactory , {removeCpu , removeTcp , removeMem } from '../monitor/monitorFactory'
import schedule from 'node-schedule'

const job = schedule.scheduleJob('0 0 3 * * *' , () => {
    removeCpu()
    removeTcp()
    removeMem()

})


export default job