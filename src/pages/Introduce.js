import React, {Component} from "react";
import "../styles/Introduce.css";

class Home extends React.Component {

  
  state = {
    displayedText1:"",
  }

  componentDidMount() {
    this.animateText(
      "보안성을 고려한 클라우드 아키텍처 자동 도식화",
      "displayedText1",
      100
    );
   
  }
  animateText = (fullText, stateKey, speed) => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      this.setState({
        [stateKey]: fullText.substring(0, index)
      });
      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, speed);
  };


  render() {
    
    return (
      <div>
        <div className="container1">
          <div className="content">
                <p>{this.state.displayedText1}</p>
          </div>
        </div>

        <div className="container2">
          <p>GAE4COON은  <span class='highlight'>보안 전문가들</span>로 구성되며, <br/>
          클라우드 마이그레이션 이전 단계에서 <span class='highlight'>ISO 27001</span>을 기반으로 한 <span class='highlight'>보안과 도식화</span>를 제공합니다.</p>
        </div>

        <div className="container3">
          <div>
            <p className="title">ISO 27001이란?</p>
            <p>
              ISO 27001 is an international standard
              for Information Security Management Systems (ISMS). 
              It provides a framework for establishing, implementing, maintaining,
              and continually improving an ISMS within the context of an organization's overall business risks.
              The standard outlines a risk management process and specifies a set of controls that organizations 
              can implement to secure their information assets.
            </p>
          </div>
          <div>
            <p className="title">클라우드 보안의 'Rehost'란?</p>
            <p>
              ISO 27001 is an international standard
              for Information Security Management Systems (ISMS). 
              It provides a framework for establishing, implementing, maintaining,
              and continually improving an ISMS within the context of an organization's overall business risks.
              The standard outlines a risk management process and specifies a set of controls that organizations 
              can implement to secure their information assets.
            </p>
          </div>
        </div>

        <div className="img">
          <img src="/assets/img/input.png"  alt="input_img" className="box-shadow" width="600px" height="600px"/>
          <p className="text">On Premise</p>

          <img src="/assets/img/output.png"  alt="output_img" className="box-shadow" width="600px" height="600px" />
          <p className="text"> After Migration </p> 

        </div>
        <div className="Excels">
        <div id='Excels-left' />
          <div className="container5">
          
            <div className="content1">
              <p className="summary">보안성을 고려한 클라우드 아키텍처 자동 도식화 </p>
              <p className="security">보안 기능  </p>
            </div>
            <div className="content2">
              <p className="summary">보안성을 고려한 클라우드 아키텍처 자동 도식화 </p>
              <p className="security">성능 최적화</p>
            </div>
            
            <div className="content1">
              <p className="summary">보안성을 고려한 클라우드 아키텍처 자동 도식화 </p>
              <p className="security">비용 최적화</p>
            </div>
            
          </div>
          <div id='Excels-right' />
      </div>
     
    </div>

  
  )}
}

export default Home;
