**快速搭建 webpack + react + github page**
--

1. 安装yeoman, 一次生成项目依赖包。

    npm install -g yo

    使用yeoman 之前，需要git一下项目。
    yeoman 会自动给git项目，创建合适的.gitignore

2. 安装最新的webpack :   npm install -g generator-react-webpack
3. 为git项目自动创建目录： yo react-webpack gallery-by-react
4. 下载sass插件：  - 以及相关的依赖  
5. 启动服务器：npm start 
6. 在完成项目后 修改cfg 目录下的 default.js  

    `publicPath: 'assets/'`
7. 修改图片打包的路径
      
    `test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
`
8. 构建项目： npm run dist  -- 可在dist/assets 查看
9. 推送到 github page  

    `git subtree push --prefix dist origin gh-pages`  
    
**React实战：知识点总结**
--
* 组件化UI开发思维
  
    * 在react中，使用import 关键字引入需要使用的相关组件
      
        `import App from './components/Main';`
    
        同时在组件编写时候把自己暴露给外界使用
      
        `export default AppComponent;`
    * 使用数组封装子组件，插入到虚拟DOM中
      
        ```jsx harmony        
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
             
          ```
    * 在主组件中保存所有的状态 通过 props 传递给 子组件 
        ```jsx harmony
          // 保存组件
       imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index}
                                  arrange={self.state.imgArrangeArr[index]}
                                  inverse={self.inverse(index)} center={self.center(index)}
                                  clear = {self.clear()}
       />)
         ```
    
* SCSS合理的运用
    * 使用嵌套的写法 写css 能够突出了html 样式 各个部分的嵌套的关系
    * 为特定的组件编写样式，不需要一次性编写所有的样式  可以合理抽象出相似的功能 作为函数
        ````scss
        //如果页面中很多地方都用圆角 直接include调用
        @mixin border-radius {
          -webkit-border-radius: 5px;
          border-radius: 5px;
        }
        // 使用$定义常使用的变量
        $main-sec-ff:Arial,Verdanna,sans-serif;
        ````
    * 使用`@at-root {}` 避免嵌套太深 以至于影响性能
     
* 闭包函数的使用使用闭包函数保存外部函数的参数状态 传给子组件使用
    ````jsx harmony
              /**
               * 清空所有的状态 然后居中一张图片
               * @param index 记录当前对应的子组件的下标 
               * */
              center(index){
          
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
    ````
* CSS3的动画制作翻转效果和3D视觉效果
    ```scss
      // 翻转效果要使用transform-style: preserve-3d;
     /* 先开始时.img-back，旋转了180度，因为translateZ(1px)，位于正面图像的下方*/
     .img-back{transform: rotateY(180deg) translateZ(1px);}             
    ```
* 字体图片的运用  

    ```scss
    // 自定义字体
    @font-face {
        font-family: 'iconfont';
        src: url('../fonts/icons/turn-arrow.eot') format("embedded-opentype"), /* IE9*/
        url('../fonts/icons/turn-arrow.woff') format('woff'), /* chrome、firefox */
        url('../fonts/icons/turn-arrow.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
        url('../fonts/icons/turn-arrow.svg') format('svg'); /* iOS 4.1- */
    }
  // 使用方法
     &.selected::after{
                    content: "\e600"; // unicode 指向字体本身
                    display: inline-block;
                    line-height: 30px;
                    font-family: iconfont;
                    color:#fff;
                }
```
