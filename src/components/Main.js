require('normalize.css/normalize.css');
require('styles/App.scss');
var imgeData = require('../data/imgesdata.json');
// OK ! console.log(imgeData); json loader 正常使用

// 使用自执行函数 得到图片路径
imgeData = (function getImagsUrl(imgeData) {
    for (var i = 0; i < imgeData.length; i++) {
        var singleImg = {};
        singleImg.imageURL = require('../images/' + imgeData[i].fileName);
        singleImg.title = imgeData[i].title;
        singleImg.desc = imgeData[i].desc;
        imgeData[i] = singleImg;
    }
    return imgeData;
})(imgeData)

// 封装一个随机取值的函数
function getRangeRandom(low, high) {
    var result = Math.random() * (high - low) + low;
    return Math.floor(result);
}

import React from 'react';
import ReactDOM from 'react-dom';

// 表 控制按钮
class ControllerUnit extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.stopPropagation();
        e.preventDefault();
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
    }

    render() {
        var self = this;
        var styleName = 'controller-unit';

        if (self.props.arrange.isCenter) {
            styleName += ' selected';
        }

        if (self.props.arrange.inverse) {
            styleName += ' inversed';
        }

        return (
            <span className={styleName} onClick={this.handleClick}> </span>
        )
    }
}

// 表示 单个图片
class ImgFigure extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    handleClick(e) {
        e.stopPropagation();
        e.preventDefault();
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
    }

    handleMouseOver(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.clear();
        console.log('in');
    }

    render() {
        var self = this;
        var styleObj = {};
        // 如果props属性中定义了这张图片的位置 则使用
        if (self.props.arrange.pos) {
            styleObj = self.props.arrange.pos;
        }
        //如果图片的旋转角度不为0 ，添加旋转角度
        if (self.props.arrange.rotate) {
            // 添加厂商前缀
            (['MozTransform', 'WebkitTransform', 'MsTransform', 'transform']).forEach((value) => {
                styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)'
            })
        }
        // 通过类名 来控制 图片的正反
        var imgFigureClassName = 'img-figure';
        if (self.props.arrange.inverse) {
            imgFigureClassName += ' is-inverse'
        }
        if (self.props.arrange.isCenter) {
            styleObj.zIndex = 11;
        }
        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}
                   onMouseOver={this.handleMouseOver} >
                <img src={this.props.data.imageURL}
                     alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>{this.props.data.desc}</p>
                    </div>
                </figcaption>
            </figure>
        )
    }
}

// 照片展示区
class AppComponent extends React.Component {

    constructor(props) {
        super(props)
        // 存放分区位置
        this.Constant = {
            centerPos: {
                left: 0,
                top: 0
            },
            //水平方向是取值范围
            hPosRange: {
                leftSecX: [0, 0],
                rightSecX: [0, 0],
                y: [0, 0]
            },
            vPosRange: {
                x: [0, 0],
                topSecY: [0, 0],
            }
        }
        // 保存图片状态
        this.state = {
            imgArrangeArr: [
                //作为css 样式 使用
                /*    pos:{

                      left:'0',
                      top:'0'
                                },
                rotate:0,
                inverse:false // 正面

                */

            ]
        }

    }

    // 组件加载进来后 开始加载图片位置 计算分区
    componentDidMount() {
        // import ReactDOM 后 得到refs DOM节点
        var stageDom = ReactDOM.findDOMNode(this.refs.stage),
            //scrollWidth：对象的实际内容的宽度，不包边线宽度，会随对象中内容超过可视区后而变大。
            stageW = stageDom.scrollWidth,
            stageH = stageDom.scrollHeight,
            halfStageW = Math.floor(stageW / 2),
            halfStageH = Math.floor(stageH / 2);

        // 拿到一个imageFigure的大小
        var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.floor(imgW / 2),
            halfImgH = Math.floor(imgH / 2);
        /*
         * 开始计算三个分区的范围 ： 以left 和 top 为定位点 计算
         */
        // 计算中心图片的位置点
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH,
        }
        // 左侧区域 -- left 取值
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        // 右侧区域  -- left 取值
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        // 共同的 top 取值范围
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        //计算上区域
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;

        this.Constant.vPosRange.topSecY[0] = -halfImgH;
        this.Constant.vPosRange.topSecY[1] = halfStageH - 3 * halfImgH;
        var firstCenterNum = Math.floor(Math.random() * 10);
        var self = this;
        self.rearrangeImages(firstCenterNum);
        self.CenterNum = firstCenterNum;
        self.autoPlay();
    }

    /*
     * 重新布局所有图片
     */

    rearrangeImages(centerIndex) {
        this.CenterNum = centerIndex;
        var imgsArrangeArr = this.state.imgArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topSecY,
            vPosRangeX = vPosRange.x,
            // 放置上侧区域
            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2),//取一个 或者不取
            topImgSpliceIndex = 0,
            // 得到居中摆放的图片信息
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
        // 居中该图片
        imgsArrangeCenterArr[0] = {
            pos: centerPos,
            rotate: 0,
            isCenter: true,
        }
        // 布局上册的图片信息 随机
        topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        //布局位于上侧的图片
        imgsArrangeTopArr.forEach(function (value, index) {
            imgsArrangeTopArr[index].pos = {
                top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
            }
            imgsArrangeTopArr[index].rotate = getRangeRandom(-30, 30);
            imgsArrangeTopArr[index].isCenter = false;
        });
        // 布局左右两侧的图片
        for (var i = 0, j = imgsArrangeArr.length, k = j / 2;
             i < j; i++) {

            var hPosRangeLORX = null;

            // 前半部分布局左边  有半部分布局右边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {

                hPosRangeLORX = hPosRangeRightSecX;
            }
            imgsArrangeArr[i].pos = {
                top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1]),
                isCenter: false,
            }
            imgsArrangeArr[i].rotate = getRangeRandom(30, -30);

        }
        // 将摆放出去的 图片 放回 arr
        if (imgsArrangeArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
        // 改变State
        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
    }

    /*
     * 翻转图片 通过闭包来记录当前是 哪一张图片被翻转
     */

    inverse(index) {

        return function () {
            var imgsArrangeArr = this.state.imgArrangeArr;

            imgsArrangeArr[index].inverse = !imgsArrangeArr[index].inverse;
            this.setState({
                    imgsArrangeArr: imgsArrangeArr
                }
            )
        }.bind(this)
    }

    center(index) {

        return function () {
            // 重置 isCenter
            this.state.imgArrangeArr.forEach((v) => {
                v.isCenter = false;
            });
            // 重置 inverse
            this.state.imgArrangeArr.forEach((v) => {
                v.inverse = false;
            });
            this.rearrangeImages(index);
        }.bind(this)
    }

    // 自动播放逻辑
    next() {
        var self = this;
        self.CenterNum++;
        self.CenterNum = self.CenterNum % 10;
        self.center(self.CenterNum)();
    }

    autoPlay() {
        var self = this;
        self.intervalHandler = setInterval(
                self.next.bind(self)
            , 2000)
    }


    // 清楚 定时器
    clear() {
        return function () {
            clearInterval(this.intervalHandler)
        }.bind(this)

    }

    render() {
        var self = this;
        // 存放子组件： 控制按钮
        var controllerUnits = [];
        // 存放子组件： 图片数据
        var imgFigures = [];
        imgeData.forEach(function (value, index) {
            // 判断是否已经设置了pos
            if (!self.state.imgArrangeArr[index]) {
                // 如果没有设置 初始化为 0
                self.state.imgArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    inverse: false,
                    isCenter: false,
                }
            }
            // 保存组件
            imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index}
                                       arrange={self.state.imgArrangeArr[index]}
                                       inverse={self.inverse(index)} center={self.center(index)}
                                       clear = {self.clear()}
            />)

            controllerUnits.push(<ControllerUnit key={index} ref={'controllerUnit' + index}
                                                 arrange={self.state.imgArrangeArr[index]}
                                                 inverse={self.inverse(index)} center={self.center(index)}
                                                 intervalHandler={self.intervalHandler} />)
        });
        return (
            <section className="stage" ref='stage'>
                <section className="img-sec">
                    {imgFigures} {/*自动调用数组中所有的子组件*/}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;
