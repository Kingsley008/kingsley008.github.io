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
9. 推送到 github page `git subtree push --prefix dist origin gh-pages`
