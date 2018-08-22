'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ModelTcp = exports.ModelCpu = exports.ModelMem = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

// 커넥션
// mongoose.Promise = global.Promise
// mongoose.connect('mongodb://jsplays.iptime.org:27017/resource' , { autoIndex: false })
// .then( ()=> console.log('Successfully connected to mongodb'))
// .catch(e => console.error(e))

var Schema = _mongoose2.default.Schema;

var mem = new Schema({
    // test : {type : Number , require : true , unique : true},
    memTotal: { type: Number },
    memAvailable: { type: Number },
    size: { type: String },
    rss: { type: Number },

    heapTotal: { type: Number },
    heapUsed: { type: Number },
    external: { type: Number },
    date: { type: Date, default: Date.now }
}, {
    timestamps: true
});

var cpu = new Schema({
    user: { type: Number },
    system: { type: Number },
    nice: { type: String },
    idel: { type: Number },
    nodeUser: { type: Number },
    nodeSystem: { type: Number },
    date: { type: Date, default: Date.now }
}, {
    timestamps: true
});

var tcp = new Schema({
    established: { type: Number },
    synSent: { type: Number },
    synRecv: { type: Number },
    finWait1: { type: Number },
    finWait2: { type: Number },
    timeWait: { type: Number },
    close: { type: Number },
    closeWait: { type: Number },
    lastAck: { type: Number },
    listen: { type: Number },
    closing: { type: Number },
    count: {},
    data: { type: Array },
    // ip : { type : Array},
    // port : { type : Array},
    // st : {type : Array},
    date: { type: Date, default: Date.now }
}, {
    timestamps: true
});

// const ModelMem = mongoose.model('Mem' , mem , 'collectionName')
// const ModelCpu = mongoose.model('Cpu' , cpu , 'collectionName')
// const ModelTcp = mongoose.model('Tcp' , tcp , 'collectionName')

var ModelMem = exports.ModelMem = mem;
var ModelCpu = exports.ModelCpu = cpu;
var ModelTcp = exports.ModelTcp = tcp;

// mem
// "MemTotal" : result[1],
// "MemAvailable" : result[4],
// "size" : result[2]
// "osMem" : osMem,
// "nodeMem" : process.memoryUsage()
// cpu
// "user" : user , 
// "system" : system ,
// "nice" : nice,
// "idel" : idel
// "osCpu" : cpuInfo,
// "nodeCpu" :  process.cpuUsage()   
// tcp
// "ip" : ip,
// "port" : port,
// "st" : st,


// //콜렉션 이름을 지정하고싶으면 스키마 생성시 옵션으로 넣는다
// // const todoSchema = new mongoose.Schema({..}, { collection: 'my-collection-name' });
// //모델은 생성자이므로 인스턴스를 생성할수있음으로 속성이나 값을 추가하여 생성할수있다.

//몽구스 컬렉션은 model생성시 첫번째 인자가 컬렉션 이름이 된다. Test면 tests로 컬렉션이 들어각되고 
//이게 싫다면 세번지 인자로 컬렉션 이름을 줄수있다.
// const Test = mongoose.model('Test' , testSchema , 'collectionName')
// const Test = mongoose.model('Test' , testSchema)
// const test = new Test({
// test : 1,
// title: 'test',
// auth : 'js'
// })


// 또는
// const test = new Test()
// test.test =  1
// test.title = 'test'
// test.auth  = 'js'

// CURD
// test.save().then( () => console.log("save complete"))

// const output = mongoose.model('Test' , testSchema)
// export default output