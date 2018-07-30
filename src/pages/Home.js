import React from  'react'

const Home = () =>{
    return (
        <div>
                   
            <div>
                <h1>dailyBoxoffice</h1>
                   일자별 영화 순위 - 어제 날짜 기준으로 스크롤 내리면 7일단위로 리스트 업
            </div>
            <div>
                <h1>weeklyBoxoffice</h1>
                주간 영화 순위  - 차트로 표현
            </div>

            <div>
                <h1>스펙</h1>
                    <p>Node.js v8</p>
                    <p>Webpack v4 / babel v6</p>
                    <p>Express v4 </p>
                    <p>react v16 / react-dom v16 / react-router v4 </p>
            </div>
            <div>
                <h1>폰트</h1>
                    <p>미생체 - 윤태호</p>
                    <p><a href="http://webtoon.daum.net/event/misaengfont">http://webtoon.daum.net/event/misaengfont</a></p>
            </div>
        
        </div>
    )
}

export default Home;