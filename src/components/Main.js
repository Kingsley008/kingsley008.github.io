require('normalize.css/normalize.css');
require('styles/App.scss');
var imgeData = require('../data/imgesdata.json');
// OK ! console.log(imgeData); json loader 正常使用

// 使用自执行函数 得到图片路径
imgeData = (function getImagsUrl(imgeData) {
  for (var i = 0; i < imgeData.length; i++) {
    var singleImg = {};
    singleImg.fileURL = require('../images/' + imgeData[i].fileName);
    imgeData[i] = singleImg;
  }
  return imgeData;
})(imgeData)

console.log(imgeData);

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">

        </section>
        <nav className="controller-nav">

        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
