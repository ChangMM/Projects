/*
 * 控制图片的组件
 */
import React from 'react'
export default class ImgControl extends React.Component{
  handleClick(e) {
      // 如果点击的是当前正在选中态的按钮，则翻转图片，否则将对应的图片居中
      if (this.props.arrange.isCenter) {
          this.props.inverse();
      } else {
          this.props.center();
      }
      e.preventDefault();
      e.stopPropagation();
  }
  render() {
      var controlItemClassName = 'control-item';
      // 如果对应的是居中的图片，显示控制按钮的居中态
      if (this.props.arrange.isCenter) {
          controlItemClassName += ' is-center';
          // 如果同时对应的是翻转图片， 显示控制按钮的翻转态
          if (this.props.arrange.isInverse) {
              controlItemClassName += ' is-inverse';
          }
      }
      return (
          <span className={controlItemClassName} onClick={this.handleClick.bind(this)}></span>
      );
  }
}
