# reactProject
Project info

http://jsplays.iptime.org:3000/

![](http://jsplays.iptime.org:3000/asset/board.png)

![](http://jsplays.iptime.org:3000/asset/movie.png)

![](http://jsplays.iptime.org:3000/asset/wchart.png)


빠르고 간단하지만 파워풀한 node서버를 선택했습니다.
미들웨어의 기능으로써 가장 많은 사용자와 레퍼런스를 보유하고있는 express.js를 사용하였습니다.






Express 라우터를 이용하였습니다. 
왜 모든 페이지를 SPA로 구성하지않았는가? 만약에 대용량 서비스를 구성할경우 많은 웹페이지를 하나의 번들링 된 페이지로 구성해야하는기때문에 초기 구동속도의 문제가 생길 여지가 있다고 판단했습니다
리소스를 청크단위로 묶어서 (webpack에서도 지원하고있습니다.) 코드 스플릿 하여 부분적인 단위리소스 로딩을 하거나 비동기 로딩을 하거나 여러가지 방법이 있지만 물리적으로 나누는게 가장 좋다고 판단되어서
 라우터 기능을 이용하였습니다. 물론 지금 현재 페이지를 그럴만한 이유는 없지만 사이즈가 더 큰 서비스를 생각하면서 서버 구성을 하였습니다.

Express의 라우터 기능을 이용하여 어플리케이션 페이지(리소스 페이지와 영화정보페이지)와 실제 어플리케이션에서 사용하는 데이터를 얻는 API의 서비스를 구성하였습니다.
현재 리눅스 리소스의 관련된 데이터들은 서버에 MongoDB에 저장되어있습니다. 하나의 서버이기때문에 해당 어플리케이션에서 직접 데이터를 가져올 수도있지만  
데이터 가져오는 행위자체를 분리시키고 싶어서 다음과 같은 URL을 구성하였습니다.
Ex1)  http://jsplays.iptime.org:3000/resource/ 리소스 페이지와  http://jsplays.iptime.org:3000/movie/ 영화 순위 및 정보 페이지
Ex2 )  http://jsplays.iptime.org:3000/monitor/findCpu/100  마지막 100이라는URL은 데이터의 개수입니다. 이 페이지에 접속하게 되면 

[{"_id":"5b7e4d06c6c051116ffb9d80","user":821332,"system":6785,"nice":"1656459","idel":41569449,"nodeUser":459603670,"nodeSystem":668562726,"date":"2018-08-23T05:58:30.239Z","createdAt":"2018-08-23T05:58:30.325Z",
"updatedAt":"2018-08-23T05:58:30.325Z","__v":0},{"_id":"5b7e4d05c6c051116ffb9d7d","user":821326,"system":6785,"nice":"1656434","idel":41569033,"nodeUser":459536771,"nodeSystem":668427181,"date":"2018-08-23T05:58:29.066Z"
,"createdAt":"2018-08-23T05:58:29.181Z","updatedAt":"2018-08-23T05:58:29.181Z","__v":0},{"_id":"5b7e4d03c6c051116ffb9d79","user":821313,"system":6785,"nice":"1656410","idel":41568598,"nodeUser":459486547,"nodeSystem":668306826,"date
":"2018-08-23T05:58:27.923Z","createdAt":"2018-08-23T05:58:28.008Z","updatedAt":"2018-08-23T05:58:28.008Z","__v":0}, ...중략
실제 CPU 리소스 데이터를 얻을수 있습니다.  다른 리소스도 동일한 방법으로 얻을 수 있습니다.

데이터들을 json파일로 보관하는 방법도 있지만 여러가지 부가적인 측면에서 데이터 관리를 위해 데이터 베이스를 사용하였습니다. 제가 사용한것은 MongoDB입니다.



RDB의 장점은 정합성이라고 생각합니다 트랜잭션이 필요없는 경우에 적합하며 어떤형태라도 데이터를 저장할 수 있고 캐싱이나 실시간으로 저장되는 데이터는 noSQL계열의 데이터 베이스를 사용해야겠다고 생각하여 
카산드라나 카우치베이스 기타 등등 많은 제품이 존재하지만 node와 연동이 쉽고 다른 서드파트 라이브러리(mongooes.js)가 존재하는 MongoDB를 선택했습니다.
Node에서 mongoDB의 사용을 도와주는 mongoose ODM(Object Document Mapping)을 사용하였습니다. 객체와 문서를 매칭시켜주는것인데 Object는 자바스크립트 객체 이고 Doument는 mongoDB의 문서입니다.
다음과같은 방식으로 모델을 만들 수 있습니다.

1	const cpu = new Schema ({
2	    user : { type : Number},
3	    system : { type : Number},
4	    nice : {type : String},
5	    idel :  {type : Number },
6	    nodeUser :  {type : Number },
7	    nodeSystem :  {type : Number },
8	    date : { type : Date , default : Date.now}
9	    },
10	    {
11	        timestamps: true
12	    }
13	)
Cpu라는 객체를 가지고 리소스 데이터를 넣어서 mongoDB에 각 각 항목마다 특성을 생각하여 Intervel 데이터를 저장하고 조회 시에도 이 모델을 사용합니다.
1	const cpuFind = (CpuModel, count) =>{
2	    return CpuModel.find().sort({date : -1 }).limit(count)
3	}

이러한 데이터를 가지고 시각적인 형태로 보이는 페이지를 구성하고 싶었습니다. Jquery를 이용하여 구성할수도있지만 SPA로 구성하고 싶다는 생각에 여러가지 기술들을(vue.js ,angular2.js) 생각해보고 테스트 해봤습니다. 
선택한것은 바로 React.js였습니다.




React는 vue 나 angular같은 Framework가 아닙니다. Javascrpit라이브러리입니다.  Router처럼 웹을 만드는 기본적인 도구는 포함되어있지않지만 가볍고 배우기 쉽고 빠르기 때문에 선택했습니다.
재 사용성이 뛰어난 Component와 frontEnd개발자에게 친숙한 HTML을 닮은 JSX 그리고 Vitual DOM이라는 가장 큰 특징을 두고 있습니다. 
브라우저가 DOM을 해석하고 랜더링하고 교체하는 작업의 코스트가 굉장히 높다고 알고있습니다. 이러한 작업을 미리 최적화 시켜줄수있을뿐만 아니라 실시간은 많은 데이터가 전송되거나 읽혀지는 페이
지 같은경우에 좋은 도구가 될 수 있다고 생각했습니다. 

React의 컴포넌트는 Render라는 함수를 통하여 실제 DOM과 업데이트를 하게 됩니다. 이 업데이트하는 시점은 3가지의 키워드가 있습니다.
바로 state, props 그리고 LifecycleAPI입니다. 
State와 props로 해당 컴포넌트에 데이터를 set하거나 부모 컴포넌트에서 자식컴포넌트로 값을 받아 state로 동기를 시키거나 해당 값으로 동작합니다. 이럴때마다 브라우져 랜더링이 발생하기도 합니다. 
이와 맞물려 LifecycleAPI로 어떤 state는 변화될때 랜더링의 여부를 결정지을 수도있으며  부모에게 받은 props값을 state로 동기시키거나 데이터를 넘겨서 DOM 랜더링을 할 수도 있습니다.

1	 render() {  
2	    return (
3	      <div id="MainPage">
4	        <p className="headerTitle">{'DailyBoxOfficeList'}</p>
5	           
6	      <div className="App">
7	                
8	          <Modal show={this.state.show} 
9	                handleClose={this._hideModal} 
10	                movieCd={this.state.setModal.movieCd}
11	                poster={this.state.setModal.poster}
12	          ></Modal>       
13	        {this.state.movies ?   this._renderMovies() : <img src={loading}/> }
14	        </div>
15	       </div>
16	    )
17	  }
해당 코드는 state에 movies라는 데이터에 대한 값이 기준으로 longding이미지를 보여줄 것 인가 renderMovies 함수를 실행 시킬 것 인가에 대한 내용이 담겨져 있습니다. 
단순이 코드만 보면 이해가 되진않지만  LifeCycle을 보면  처음 컴포넌트가 mount되었을때 실행되는 componentDidMount라는 함수를 보면
1	  componentDidMount(){
2	    this._getMoives();
3	    window.addEventListener('scroll', this._handleScroll)
4	  }
이 함수는 컴포넌트가 처음으로 1번만 실행하는 내용이며 이때 영화정보를 가져오게 되고 이 정보를 토대로 state에 movies라는 객체가 채워지게 되며 이 과정에서 DOM랜더링이 되는 원리입니다.
컴포넌트를 구성하는 로직은 JSX라는 HTML과 비슷한 형태를 가진 js문법을 이용하면 되기 때문에 개발자에게 친숙하게 다가오지만. 랜더링이 언제 될 것 인지 어떤 식으로 언제 업데이트를 할 것 인지에 대한 내용은 컴포넌트를 
어떤 식 으로 모델링 할 것인지 어떤 데이터를 기준으로 할 것 인지에 대한 명확한 전략이 필요합니다.
하위 컴포넌트의 동작은 <Modal show={this.state.show}  와 같은 하위 컴포넌트에게 현재의 값을 넘겨주어 해당 컴포넌트에서 값을 받아 동작하는 형태로 제작하였습니다. 리소스도 마찬가지입니다.

React는 SPA 서비스에 적합합니다. 그러기 위해선 각각 여러 개의 파일을 각각 로딩 해야하는데 이러한 작업은 많은 네트워크 코스트가 발생하며 각각 스코프를 침범하지않아야 합니다. 또한 React의 상당부분의 코드가 ES6/ES7의 코드로 
되어있으므로 Babel을 이용하여 ECMAscrpit5 로 변환 해야합니다. Babel을 하면서 많은 SPA서비스를 위해 파일들을 번들링 하기 위해서 webpack과 Babel을 사용하였습니다.




React에 Babe은 필수적으로 사용되어야합니다. Babel은 JSX와 ES6/7의 문법을 컴파일 해줄뿐만 아니라 지원이 되지않은 브라우저에서 사용할 수있게  Polyfill역활을 해주기때문에 
크로스 브라우징의 역할도 할 수있기 때문에 꼭 React가 아니여도 눈여겨볼만한 기술입니다. Babel은 다음과같이 코드를 바꿔줍니다.



Webpack은 여러가지 확장자를 지원하며 여러가지 파일을 번들링하여 의존성 관리를 해주는 기술입니다.  


Js뿐만아니라 png , cjs등 여러가지 파일들을 번들링 하여 단일화된 파일로 만들어주고 이 파일들의 의존성을 관리해줍니다. 웹팩의 장점은 이러한 번들링 과정에서 babel같은 기술들을 접목 시킬수 있다는 점. 
현재 프로젝트에서는 webpack을 통하여 폰트와 이미지 그리고 css등을 번들링하며 이 과정에서 ES6/7 , React의 문법을 Babel을 통하여 변환시켜주는 작업까지 하고있습니다.

1	  module :{
2	        rules : [
3	            {
4	               test: /\.js|.jsx$/,
5	               exclude: /node_modules/,
6	               use: {
7	                loader: "babel-loader"      
8	            },
9	            {
10	                test: /\.css$/,
11	                use: [
12	                     'style-loader',
13	                      'css-loader'
14	                ]   
15	            },{
16	                test: /\.(png|svg|jpe?g|gif|ttf|eof|woff)$/,
17	                use:[ 
18	                      { loader : 'url-loader',
19	                          options : {
20	                            publicPath : '/asset',
21	                            name : '../[path][hash].[ext]',
22	                            limit : 10000,..
23
여러가지 loader를 추가하여 js , jsx 의 문법을 교체하고 css를 묶어주며 , 이미지나 폰트의 이름을 바꿔주고 용량이 작은 파일은 코드화 시켜주기도 합니다.

이 프로젝트에서는 node 서버 코드들은 Babel만 사용되고 있으며 , React 컴포넌트 부분은 Webpack과 Babel을 모두 사용하고있습니다.
Webpack으로 영화와 리소스의 대한 코드를 나누고 각각의 메인 React 컴포넌트에서 하위 React컴포넌트를 조건에 따라서 랜더링합니다. 


1	  _navInstace = () =>{
2	       return   <Navbar >
3	        <Navbar.Header className = "mainNav">
4	            <Navbar.Brand >
5	                <NavItem href="/" to="/">HOME</NavItem>
6	            </Navbar.Brand>
7	            </Navbar.Header>
8	            <Nav className = "subNav">
9	                <NavItem componentClass={Link} href="/resource" to="/resource">INFO</NavItem>
10	                <NavItem componentClass={Link} href="/resource/board" to="/resource/board">BOARD</NavItem>
11	                <NavItem componentClass={Link} href="/resource/cpu" to="/resource/cpu">CPU</NavItem>
12	                <NavItem componentClass={Link} href="/resource/mem" to="/resource/mem">MEM</NavItem>
13	                <NavItem componentClass={Link} href="/resource/tcp" to="/resource/tcp">TCP</NavItem>
14	           </Nav>
15	         </Navbar> 
16	    }
17	    render() {
18	        
19	        return(
20	            <div className="resourceRouter">
21	                <div>{this._navInstace()}</div>
22	           
23	                <div></div>
24	                    <Route exact path="/resource" component = {ResourceHome} />
25	                    <Route path="/resource/board/" component ={Board}/>
26	                    <Route path="/resource/cpu/" component ={Cpu}/>
27	                    <Route path="/resource/mem/" component ={Mem}/>
28	                    <Route path="/resource/tcp/" component ={Tcp}/>
29	 
30	            </div>
31	        )
32	    }
33	}

이와 같이 네비게이션 바를 만들고 React-Router를 이용하여 URL은 바뀌지만 실제 페이지를 변화가 없고 컴포넌트만 교체될 수있게 구성되었습니다.




CPU를 클릭하게 되면 스크린샷과 같이  URL은 변경되지만 network상에선 페이지가 교체되진않습니다. CPU란 컴포넌트에서 필요한 데이터만 추가됩니다.  
이런방식으로 각각의 서비스는 React 컴포넌트를 이용한 SPA방식으로 제작하게 되었습니다. 

각 페이지에 사용된 디자인은 bootstrap을 사용하였고 log는 log4js를 이용하여 서버 접속 로그와 어플리케이션 에러 로그만수집되고 있습니다.

"categories": {
"default": { "appenders": [ "app", "errors" , "console" ], "level": "ERROR" },
"http": { "appenders": [ "access" , "console"], "level": "INFO" }
}

프로젝트 사용된 package 내용은 다음과 같습니다.

"dependencies": {
	"babel-preset-react": "^6.24.1",
	"babel-preset-react-latest": "^6.1.0",
	"es6-promise": "^4.2.4",
	"express": "^4.16.3",
	"file-loader": "^1.1.11",
	"isomorphic-fetch": "^2.2.1",
	"log4js": "^3.0.3",
	"mongodb": "^3.1.1",
	"mongoose": "^5.2.7",
	"morgan": "^1.9.0",
	"npm": "^6.2.0",
	"react": "^16.4.1",
	"react-bootstrap": "^0.32.3",
	"react-dom": "^16.4.1",
	"react-hot-loader": "^4.3.3",
	"react-router-dom": "^4.3.1"
},
	"devDependencies": {
	"babel-core": "^6.26.3",
	"babel-loader": "^7.1.5",
	"babel-plugin-transform-async-to-generator": "^6.24.1",
	"babel-polyfill": "^6.26.0",
	"babel-preset-env": "^1.7.0",
	"babel-preset-es2015": "^6.24.1",
	"babel-preset-es2017": "^6.24.1",
	"cross-env": "^5.2.0",
	"css-loader": "^1.0.0",
	"style-loader": "^0.21.0",
	"url-loader": "^1.0.1",
	"webpack": "^4.16.1",
	"webpack-cli": "^3.0.8",
	"webpack-dev-server": "^3.1.4"
	}
}

프로젝트 패키지 관리는 npm과 yarn을 사용하고있습니다.




서버에서 프로젝트 실행 및 관리는 npm , yarn 그리고 빌드 및 실행 스크립트
"build": "babel server --out-dir build && webpack --mode development",
"start": "set NODE_ENV=development&node ./build/index.js",


PM2라는 node 프로젝트 관리 툴을 사용합니다.

PM2는 node프로젝트의 오류가 생길 경우 log를 저장하고 서버 재시작을 해주며 기타 여러가지 리소스를 확인할 수있습니다.

module.exports = {
apps: [
{
	"name": "index",
	"script": "./build/index.js",
	"merge_logs" : true,
	"out_file" : "/hdd2/pm2log/index_out.log",
	"error_file" : "/hdd2/pm2log/index_err.log",
	"log_date_format" : "YYYY-MM-DD HH:mm Z",
	"env": {
	"NODE_ENV": "development"
	},
	"env_production" : {
	"NODE_ENV": "production"
	}
}
]
};

서버는 소형 컴퓨터 라즈베리파이3 B+이며 OS는 debian 기반의 Raspbian GNU/Linux 9 입니다.

간단한 스펙은 CPU 1.4G ARM  RAM 1G DPDDR2입니다. 
Node 모듈 파일들과 데이터베이스와 log 파일을 위해 외장하드 1개를 마운트하여 사용하고있으며, Iptime공유기의 DDNS서비스를 이용하여 집에서 직접 서버를 구동하고 있습니다.
