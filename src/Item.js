import React, { Component } from 'react';
import './Item.css';
import { IoIosStar } from 'react-icons/io';
const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
  }
  htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    // handle case of empty input
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  onStarClick = () => {
     this.setState({toggle: !this.state.toggle});
     //this.props.data(this.props.title);
  }

  render() {
    var {description} = this.props;
    var xd = this.htmlDecode(description);
    return (
      <div className="item-container">
        <div className="item-title">
          <div onClick={() => this.onStarClick()}>
            <IoIosStar className={(this.state.toggle ? 'star-on' : 'star-off')} />
          </div>
          <div>
            <p>{this.props.title}</p>
          </div>
        </div>
        <div className="item-description">
          {renderHTML(xd)}
        </div>
      </div>
    );
  }
}

export default Item;
