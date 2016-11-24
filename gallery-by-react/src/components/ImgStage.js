require('normalize.css/normalize.css')
require('styles/App.scss')
import React from 'react'
import ReactDOM from 'react-dom'
import ImgFigure from './ImgFigure'
import ImgControl from './ImgControl'

// 获取并处理图片相关的数据
let imageData = (function(data){
    for(let i = 0, len = data.length;i<len;i++){
      let item = data[i]
      item.imageURL = require('../images/' + item.fileName)
      data[i] = item
    }
    return data
})(require('../data/imageData.json'))


export default class ImgStage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsArrangeArr: [  //一个基本的数据结构
          /*{
              pos: {
                  left: '0',
                  top: '0'
              },
              rotate: 0,    // 旋转角度
              isInverse: false,    // 图片正反面
              isCenter: false,    // 图片是否居中
          }*/
      ]
    };
    this.Constant = {
     // 定义一些常量值
     centerPos: {
         left: 0,
         right: 0
     },
     hPosRange: {   // 水平方向的取值范围
         leftSecX: [0, 0],
         rightSecX: [0, 0],
         y: [0, 0]
     },
     vPosRange: {    // 垂直方向的取值范围
         x: [0, 0],
         topY: [0, 0]
     }
   };
  }

  //组件加载之后 为每张图片计算其图片加载的位置
  componentDidMount(){
    // 首先拿到舞台的大小
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

      // 拿到一个imageFigure的大小
      let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
          imgW = imgFigureDOM.scrollWidth,
          imgH = imgFigureDOM.scrollHeight,
          halfImgW = Math.ceil(imgW / 2),
          halfImgH = Math.ceil(imgH / 2);

      // 计算中心图片的位置点
      this.Constant.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
    };

    // 计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    // 计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);
  }

  //重新布局所有图片
  rearrange(centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),    // 取一个或者不取
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        // 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
        imgsArrangeCenterArr[0] = {
          pos: centerPos,
          rotate: 0,
          isCenter: true
        };

        // 取出要布局上侧的图片的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        // 布局位于上侧的图片
        imgsArrangeTopArr.forEach(function (value, index) {
            imgsArrangeTopArr[index] = {
              pos: {
                  top:  this.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                  left: this.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
              },
              rotate: this.get30DegRandom(),
              isCenter: false
            };
        }.bind(this));

        // 布局左右两侧的图片
        for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            var hPosRangeLORX = null;
            // 前半部分布局左边， 右半部分布局右边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }
            imgsArrangeArr[i] = {
              pos: {
                  top: this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                  left: this.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
              },
              rotate: this.get30DegRandom(),
              isCenter: false
            };

        }
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
  }

  /*
   * 设计一个闭包函数来实现图片翻转的函数
   */
  inverse(index){
    return function () {
        var imgsArrangeArr = this.state.imgsArrangeArr;

        imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

        this.setState({
          imgsArrangeArr: imgsArrangeArr
        });
      }.bind(this);
  }

  center(index){
    return function () {
        this.rearrange(index);
      }.bind(this);
  }

  //获取区间内的一个随机值
  getRangeRandom(low, high) {
      return Math.ceil(Math.random() * (high - low) + low);
  }

  get30DegRandom() {
    return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
  }

  render() {
    let imgFigures = [],  //存放图片组件的数组
        controllers = [];
    imageData.forEach(function (value, index) {
        if (!this.state.imgsArrangeArr[index]) {
            this.state.imgsArrangeArr[index] = {
                pos: {
                    left: 0,
                    top: 0
                },
                rotate: 0,
                isInverse: false,
                isCenter: false
            };
        }
        //添加图片组件以及控制按钮的组件
        imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index) } center={this.center(index)}/>);
        controllers.push(<ImgControl key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
    }.bind(this));

    return (
      <section className="stage" ref="stage">
        <section className="img-section">
          { imgFigures }
        </section>
        <nav className="nav-section">
          { controllers }
        </nav>
      </section>
    );
  }
}

ImgStage.defaultProps = {
};
