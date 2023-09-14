import React from "react";
import "../styles/Introduce.css";

class Home extends React.Component {

  

  render() {
    console.log("hello");
    return (

      <div>
         <div className="container1">
          <div className="content">
                <p>보안성을 고려한 
                클라우드 아키텍처 자동 도식화</p>
          </div>
        </div>

        <div className="container2">
          <p>GAE4COON은 보안 전문가들로 구성되며, <br/>
          클라우드 마이그레이션 이전 단계에서 ISO 27001을 기반으로 한 보안과 도식화를 제공합니다.</p>
        </div>

      </div>
     


    



  )}
}

export default Home;
