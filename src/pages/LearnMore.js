import React from "react";
import "../styles/LearnMore.css"
import { Link, NavLink } from 'react-router-dom';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 1 };
  }

  componentDidMount() {
    this.animateText(
      "Get Started with GAE4COON",
      "displayedText1",
      100
    );

  };

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

  renderNameSection(name) {
    return (
      <div className="name">
        {name}
      </div>
    )

  }

  nameSection(name) {
    return (
      <div className="mainname">
        {name}
      </div>
    )

  }

  explain(summary, index, img_src, img_json) {
    console.log("summary", summary);
    console.log("index", index);

    console.log("img_json", img_json);

    return (
      <div className="explain">
        <div className="summary">
          <div className="summary">
            Input에 대해서는 어쩌고 저껒고
          </div>
          <div className="link">
            <Link to={`/learnmore/${index}`}>
              Learn More
            </Link>
          </div>
        </div>

        <div className="img">
            <Link 
              to='/learn-draw'
              state={img_json}
            
            >
              <img className="custom-img" src={img_src} alt="도식화하는 이미지"/>       
            </Link>
         
        </div>

        <div>

        </div>

      </div>
    )

  }



  render() {
    return (
      <div>
        <div className="container1">
          <div className="content">
            <p>{this.state.displayedText1}</p>
          </div>
        </div>

        {this.nameSection("Network Excel")}
        <div className="Excels">
          <div id='Excels-left' />
          <div>
              <div id="block">
               
                <div>
                  {this.renderNameSection("User Guide for Input")}
                </div>
                <div>
                  
                  {this.explain("user",1,"/assets/1/1_diagram.png","/assets/1/1_diagram.json")}
                </div>

            </div>
            <div id="block">

              <div>
                {this.renderNameSection("Network Excel")}
              </div>
              <div>
                {this.explain("User Guide for Input", 2)}
              </div>

            </div>

          </div>
          <div id='Excels-right' />


        </div>


        {this.nameSection("Network Draw")}
        <div className="Excels">
          <div id='Excels-left' />
          <div>

            <div id="block">

              <div>
                {this.renderNameSection("Network Excel")}
              </div>
              <div>
                {this.explain("User Guide for Input", 3)}
              </div>

            </div>
            <div id="block">
              s
              <div>
                {this.renderNameSection("Network Excel")}
              </div>
              <div>
                {this.explain("User Guide for Input", 4)}
              </div>

            </div>
            <div id="block">

              <div>
                {this.renderNameSection("Network Excel")}
              </div>
              <div>
                {this.explain("User Guide for Input", 5)}
              </div>

            </div>
            <div id="block">

              <div>
                {this.renderNameSection("Network Excel")}
              </div>
              <div>
                {this.explain("User Guide for Input", 6)}
              </div>

            </div>
          </div>
          <div id='Excels-right' />
         </div>

      </div>
    );
  }
}

export default Home;