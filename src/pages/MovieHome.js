import React from  'react'
import '../css/resource.css'

const Home = () =>{
    return (

        <div>
        <div className="resourceInfo">
                <div className="resourceHome" id="infoLeft">
                    <h1>영화 순위 </h1>
                    <p>한국 영상 진흥원 API를 이용한 영화 일일/주간 순위 </p>
                    <p>실시간 데이터를 받아와 두가지 형태로 제공</p>
                    <h1>DailyBoxoffice</h1>
                    <p>일자 영화 순위 표시</p>
                    <p>클릭할경우 영화 상세 정보 모달 팝업 표시</p>
                    <p>데이터는 현재 날짜에서 -7일씩 빼면서 마지막 스크롤에 도달하면 (무한스크롤 구현) 새로운 데이터를 받아서 추가</p>
                    <h1>WeeklyChart</h1>
                    <p>주간 영화 순위 차트 </p>
                    <p>주간 영화 데이터를 모아서 차트로 표현 기본 적으로 6주 데이터를 받아서 표현</p>
                    <p>차트의 기능은 가로 드래그로 날짜의 범위를 정할수 있으며 더블클릭시 초기상태로 돌아간다(모바일 터치 이벤트 미작성)</p>
                    <p>시작과 끝을 정하면 해당 기간의 영화는 모두 표시된다.</p>
                    
                    <p>각각 페이지는 react 컴포넌트로 구성되어있으며 react-Router를 이용하여 단일페이지(SPA)로 구성</p>
                    <h1>package</h1>
                        <p>Node.js v8  Express v4</p>
                        <p>Webpack v4  babel v6  babel preset[react, react-latest , env, es2015 , es2016, es2017] </p>
                        <p>react v16  react-dom v16  react-router v4 </p>
                        <p>mongoDB v3 mongoose v5</p>
                        <p>log4js</p>
                        <p>react-bootstrap</p>
                        <p>css-loader url-loader file-loader style-loader</p>
                    <h1>etc</h1>
                        <p>폰트 -미생체 by윤태호</p>
                        <p><a href="http://webtoon.daum.net/event/misaengfont">http://webtoon.daum.net/event/misaengfont</a></p>
                </div>
                
                <div className="resourceHome" id="infoRight">
                    <div>프로젝트구성</div>
                    <div>Project 프로젝트</div>    
                    <div>├─asset 폰트 , 이미지 원본파일</div>
                    <div>├─build babel을 적용한 node 서버 파일 </div>
                    <div>│  ├─logger 로거설정</div>
                    <div>│  ├─routes  라우터</div>
                    <div>│  └─utils   유틸리티</div>
                    <div>├─log 로그</div>
                    <div>├─public webpack로 번들링된 소스 ,파일</div>
                    <div>│  ├─asset 변환된 폰트, 이미지  </div>
                    <div>│  ├─bundle 번들링된 js파일</div>
                    <div>│  ├─movie 리소스 메인HTML</div>
                    <div>├─server es6 와 es7으로 작성된 node 서버 파일</div>
                    <div>│  ├─logger</div>
                    <div>│  ├─routes</div>
                    <div>│  └─utils</div>
                    <div>├─src  react 컴포넌트</div> 
                    <div>│   ├─client  클라이언트용 js</div>
                    <div>│   ├─pages  클라이언트페이지들 </div>
                    <div>│   ├─shared  react Router가 적용된 기초페이지</div>
                    <div>│   ├─DailyBoxoffice 일일영화순위 react 컴포넌트</div>
                    <div>│   ├─WeeklyChart 주간영화 순위 react 컴포넌트</div>
                </div>
            
            </div>
               
            </div>
       
    )
}

export default Home;