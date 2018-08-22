import React from  'react'
import '../css/resource.css'
import { Well , Table } from 'react-bootstrap'
const Resource = () =>{
    return (
        <div>
        <div id="resourceInfo">
                <div className="resourceHome" id="infoLeft">
                    <h1>리눅스 모니터링</h1>
                    <p>proc 파일시스템과 node process API를 이용한 모니터링</p>
                    <p>서버에서 mongoDB에 저장 후 조회 api를 만들어 각 컴포넌트에서 실시간 조회 차트생성 </p>
                    <h1>CPU</h1>
                    <p>/proc/stat 와 node process.cpuUsage 정보 파싱 </p>
                    <h1>MEM</h1>
                    <p>/proc/meminfo 와 node process.memoryUsage 정보 파싱 </p>
                    <h1>TCP</h1>
                    <p>/proc/net/tcp 와 tcp6 정보 파싱 </p>
                    <p>프로젝트 포트(현재 3000, 30001)를 선택적으로 파싱하여 저장</p>
                    <h1>React와 Router</h1>
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
                    <div>│  ├─models 몽구스(몽고DB)모델스키마</div>
                    <div>│  ├─monitor 리소스 로직</div>
                    <div>│  ├─routes  라우터</div>
                    <div>│  └─utils   유틸리티</div>
                    <div>├─log 로그</div>
                    <div>├─public webpack로 번들링된 소스 ,파일</div>
                    <div>│  ├─asset 변환된 폰트, 이미지  </div>
                    <div>│  ├─bundle 번들링된 js파일</div>
                    <div>│  ├─resource 리소스 메인HTML</div>
                    <div>├─server es6 와 es7으로 작성된 node 서버 파일</div>
                    <div>│  ├─logger</div>
                    <div>│  ├─models</div>
                    <div>│  ├─monitor</div>
                    <div>│  ├─routes</div>
                    <div>│  └─utils</div>
                    <div>├─src  react 컴포넌트</div> 
                    <div>│   ├─Chartlib  차트제작 </div>
                    <div>│   ├─client  클라이언트용 js</div>
                    <div>│   ├─css  각각의 css</div>
                    <div>│   ├─pages  클라이언트페이지들 </div>
                    <div>│   ├─Resource  리소스용 react 컴포넌트 </div>
                    <div>│   ├─shared  react Router가 적용된 기초페이지</div>
                </div>
            
            </div>
               
            </div>
        
        
    )
}

export default Resource;