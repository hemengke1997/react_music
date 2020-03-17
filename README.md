## react入门之仿网易云音乐

本人已经使用[vue全家桶](https://github.com/hemengke1997/music_wx)、[微信小程序](https://github.com/hemengke1997/music_wx)两种方式实现了仿网易云。前者是模仿目前网易云音乐的移动web，后者模仿的是目前IOS端的网易云微信小程序，UI以及交互设计跟网易云音乐的相差无几。



#### 前言

为了熟悉react开发，所以考虑继续仿网易云音乐。本来是想用react-native开发app，但是我没有安卓手机，并且没有翻墙软件，所以配置软件和调试那些不太方便，就做web端的了。

之前都是用JS写的，这次打算用TS写一遍

实现了项目之后，截图会放在最后。

### 准备知识

####1.create-react-app

##### 1. 安装

因为是入门react，所以使用react-create-app这个官方的脚手架搭建环境。 首先需要安装node，且node版本 >= 8.10。 

脚手架命令： 

`npx create-react-app music_react`

搭建成功之后，项目路径如图

![1583039365810](C:\Users\A\AppData\Roaming\Typora\typora-user-images\1583039365810.png)

我第一次搭建完成之后很奇怪，这个脚手架完全隐藏了webpack和bebal这些第三方插件的配置。官方的解释是这样的

> Create React App 不会处理后端逻辑或操纵数据库；它只是创建一个前端构建流水线（build pipeline），所以你可以使用它来配合任何你想使用的后端。它在内部使用 [Babel](https://babeljs.io/) 和 [webpack](https://webpack.js.org/)，但你无需了解它们的任何细节。

但是我觉得作为前端开发者，有必要了解并且熟悉webpack的配置，所以我单独创建了一个项目把webpack配置拆分出来了，在终端使用命令`npm run eject` 即可拆分配置出来（这个命令是无法回退的），拆分之后的项目路径如图：

![1583039596342](C:\Users\A\AppData\Roaming\Typora\typora-user-images\1583039596342.png)



##### 2.配置typescript

可以在创建项目的时候使用命令行 `npx create-react-app music_react --template typescript` 直接生成TS环境。如果想在已有项目中添加TS编译，也需要安装依赖

```bash
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
# or
yarn add typescript @types/node @types/react @types/react-dom @types/jest
```



##### 3.Browerslist配置

以前做vue项目的时候配置过这个，具体配置细节我单独写了一篇笔记，[browserslist翻译+理解](https://www.jianshu.com/p/9c55656c5ad7)



##### 4.分析打包之后的包大小

官方推荐使用 `Source map explorer`。 这个工具使用来源映射来分析JS打包的情况，它能帮助我们理解是哪里的代码使得包变大了

- 使用方法

  ```bash
  npm install --save source-map-explorer
  ```

  或

  ```bash
  yarn add source-map-explorer
  ```

  然后在 `package.json` 中添加几行 `scripts`:

  ```json
  "scripts": {
  +    "analyze": "source-map-explorer 'build/static/js/*.js'",
       "start": "react-scripts start",
       "build": "react-scripts build",
       "test": "react-scripts test",
  ```

  然后我们就可以打包然后试着分析一下了

  ```bash
  npm run build
  npm run analyze
  ```

- 分析结果

  ![1583119074349](C:\Users\A\AppData\Roaming\Typora\typora-user-images\1583119074349.png)



##### 5. 开发中使用HTTPS

- 使用方法

  - **windows(cmd.exe)**

    ```shell
    set HTTPS=true&&npm start
    ```

    > 注意： 是故意不加空格的

  - 更改 `package.json`  的 `scripts` 字段

    ```json
    {
        "start": "HTTPS=true react-scripts start"
    }
    ```

  - 设置环境变量。 在 `.env` 文件中

    ```
    HTTPS=true
    ```

    

如果后端接口的主机和端口号跟前端项目一样的话，就不用配置代理（proxy）了。

直接使用 `fetch('/api/todos')` 即可，不需要担心跨域问题之类的



之前做vue开发的时候，局域网环境下访问后端API，我配置了代理，后来部署之后也配置了Nginx反向代理。因为接口的端口跟我不一样，需要跨域吧。这种情况下， 直接去访问 `fetch('/api/todos')` 会报错的。需要配置代理。

- 配置方法

  在 `package.json` 中添加类似的代码

  ```json
  "proxy": "http://localhost:4000"
  ```

  这样的话，我们开发的时候如果访问 `fetch('/api/todos')` 时，dev server会分辨这个资源是否是静态资源，如果不是的话，请求会被代理到 `http://localhost:4000` 上去。

  development server只会代理`Accept header` 中不带有 `text/html`的请求 

  记住，`proxy` 只会在开发环境下生效(使用 `npm start` 启动的项目)，要确保 `fetch('/api/todos')` 这种接口在生产环境中指向正确的东西。 并不是一定要用 `/api` 作为前缀。 只要是不认识的，且 accept header 类型不是 `text/html` 的请求，都会被转发到代理上。

  `proxy` 选项支持HTTP、HTTPS 和 WebSocket

  

如果上述的配置方式对你来说不够灵活的话，可以选择以下三种方式

- 使用Express中间件代理
- 在服务器上配置CORS
- 使用环境变量将正确的服务器主机和端口注入到你的app中

下面，我一一讲解这三种方式是如何实现配置的

##### 一、[Express中间件代理](https://create-react-app.dev/docs/proxying-api-requests-in-development#configuring-the-proxy-manually)

直接使用 `Express` 做一个中间件。推荐你把中间件逻辑都写在 `src/setupProxy.js` 中

- 首先，安装 `http-proxy-middleware`

  ```bash
  npm install http-proxy-middleware --save
  #or
  yarn add http-proxy-middleware
  ```

- 然后，创建 `src/setupProxy.js` 文件，并添加如下内容：

  ```javascript
  const proxy = require('http-proxy-middleware')
  
  module.exports = function(app) {
      // ...
  }
  ```

- 你现在就可以注册你想要的代理了。比如这样子的：

  ```javascript
  const proxy = require('http-proxy-middleware')
  
  module.exports = function(app) {
  	app.use({
          '/api',
          proxy({
              target: 'http://localhost:5000',
              changeOrigin: true  // 是否跨域
          })
      })
  }
  ```

> 注意： 你不需要在每个文件中都引用这个JS文件。当你 `npm start` 时它会被自动注册到开发服务器中。



##### 二、 [在服务器上配置CORS](https://enable-cors.org/server_expressjs.html)

用ExpressJS 应用举例，写如下的代码

```javascript
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/',function(req, res, next){
    // 处理'GET'请求
})

app.post('/', function(req, res, next){
    // 处理'POST'请求
})
```



##### 三、使用环境变量将正确的服务器主机和端口注入到你的app中

默认的环境变量是以 `NODE_ENV` 开头的。开发者自定义的环境变量使用 `REACT_APP_` 开头。

这些环境变量会在build的时候嵌入到程序中。

这些环境变量会定义在 `process.env` 上。比如你又一个名为 `REACT_APP_NOT_SECRET_CODE` 的环境变量，你可以在JS文件中以 `process.env.REACT_APP_NOT_SECRET_CODE` 使用它。

还有个内置的环境变量名为 `NODE_ENV`。 可以使用 `process.env.NODE_ENV` 来读取这个环境变量。 当你使用 `npm start` 启动项目时， 这个变量的值始终等于 `development`， 使用 `npm test` 启动项目时， 这个变量的值始终等于 `test`， 使用 `npm run build` 启动项目时， 这个变量的值始终等于 `production`。

**你不能手动重写  `NODE_ENV`**。这可以防止开发人员意外地将缓慢的开发构建部署到生产环境中。

这些环境变量对于根据项目的部署位置有条件地显示信息或使用版本控制之外的敏感数据非常有用。

声明环境变量

- 首先，你需要定义环境变量。假设你想在 `<form>` 中使用环境变量

```react
render() {
    return (
    	<div>
        	<small>You are running this app in {process.env.NODE_ENV} mode </small>
            <form>
            	<input type="hidden" defaultValue={process.env.REACT_APP_NOT_SECRET_CODE} />
            </form>
        </div>
    )
}
```

build之后，`process.env.REACT_APP_NOT_SECRET_CODE` 会被替换成 `REACT_APP_NOT_SECRET_CODE` 的最新值。记住， `NODE_ENV` 会自动设置。

当你使用 `npm run start`， 在浏览器中启动app，检查 `<input>`， 你会发现 value 被设置成了 `abcdef`

```html
<div>
  <small>You are running this application in <b>development</b> mode.</small>
  <form>
    <input type="hidden" value="abcdef" />
  </form>
</div>
```

以上的表单会在环境中去找一个名为 `REACT_APP_NOT_SECRET_CODE` 的变量。 为了我们使用这个value， 我们需要在环境中定义这个变量。可以使用两种方式定义环境变量：

- 在shell中添加环境变量

  - windows(cmd.exe)

    ```shell
    set "REACT_APP_NOT_SECRET_CODE=abcdef" && npm start
    ```

    > 注意： 需要在环境变量两边加引号，避免后面出现空格

  - windows(Powershell)

    ```shell
    ($env:REACT_APP_NOT_SECRET_CODE = "abcdef") -and (npm start)
    ```

  - Linux. maxOS(bash)

    ```bash
    REACT_APP_NOT_SECRET_CODE=abcdef npm start
    ```

- 在 `.env` 文件中添加环境变量

  在项目的根目录中创建 `.env` 文件

  ```
  REACT_APP_NOT_SECRET_CODE=abcdef
  ```

  > 注意： 必须以 `REACT_APP_` 开头来定义环境变量
  >
  > 改变了 `.env` 文件之后需要重启项目

**还能使用哪些 `.env` 文件？**

- `.env` : 默认
- `.env.local` ： 本地重写。 **这个文件会在除了test环境外加载**
- `.env.development`, `.env.test`, `.env.production`： 指定某个环境下的设置
- `.env.development.local`, `.env.test.local`, `.env.prodution.local` ： 本地重写指定某个环境下的设置

左边的文件比右边的文件优先权更大

- `npm start`: `.env.development.local`, `.env.development`, `.env.local`, `.env`
- `npm run build`: `.env.production.local`, `.env.production`, `.env.local`, `.env`
- `npm test`: `.env.test.local`, `.env.test`, `.env` (注意没有 `.env.local`)



**在`.env`中展开环境变量**

比如，获取 `npm_package_version` 这个环境变量

```
REACT_APP_VERSION=$npm_package_version
# also works:
# REACT_APP_VERSION=${npm_package_version}
```

或是展开当前`.env`文件中的本地变量

```
DOMAIN=www.example.com
REACT_APP_FOO=$DOMAIN/foo
REACT_APP_BAR=$DOMAIN/bar
```



**在HTML中引用环境变量**

你可以在 `public/index.html` 中引用环境变量

```html
<title>%REACT_APP_WEBSITE_NAME%</title>
```

注意：

- 除了一些内嵌的环境变量（`NODE_ENV` 和 `PUBLIC_URL`)， 环境变量名必须以 `REACT_APP_` 开头，才能生效

- 环境变量会在build时生效， 如果你想在开发环境下使用它，可以在[HTML中使用占位符](https://create-react-app.dev/docs/title-and-meta-tags#generating-dynamic-meta-tags-on-the-server)

  

##### 6. 添加样式

- 添加样式表

  `Button.css`

  ```css
  .Button {
      padding: 20px;
  }
  ```

  `Button.js`

  ```react
  import React, { Component } from 'react';
  import './Button.css'; // Tell webpack that Button.js uses these styles
  class Button extends Component {
    render() {
      // You can use them as regular CSS styles
      return <div className="Button" />;
    }
  }
  ```

- 添加CSS Modules

  `Button.module.css`

  ```css
  .error {
      background-color: red;
  }
  ```

  `another-stylesheet.css`

  ```css
  .error {
      color: red;
  }
  ```

  `Button.js`

  ```react
  import React, { Component } from 'react';
  import styles from './Button.module.css'; // Import css modules stylesheet as styles
  import './another-stylesheet.css'; // Import regular stylesheet
  class Button extends Component {
    render() {
      // reference as a js object
      return <button className={styles.error}>Error Button</button>;
    }
  }
  ```

  **结果**

  ```html
  <!-- This button has red background but not red text -->
  <button class="Button_error_ax7yz">Error Button</button>
  ```

  

- 添加Sass样式（less同理）

  - 安装

    ```shell
    npm install node-sass --save
    # or
    yarn add node-sass
    ```

  - 在sass文件中引用其他css文件

    ```scss
    @import 'styles/_colors.scss'; // 假设styles文件夹在src文件夹下
    @import '~nprogress/nprogress'; // 引用node_modules中的css文件，需要加 ~
    ```

  - `node-sass` 也支持 `SASS_PATH` 变量

    要使用相对于您指定的路径的导入，以及不添加 `~` 前缀的node_modules，你可以在项目根目录中添加一个 `.env` 文件，其内容为变量`SASS_PATH=node_modules:src`。要指定更多的目录，可以将它们添加到由`:`分隔的 `SASS_PATH` 中，比如 `path1:path2:path3`。

```
如果你设置了 `SASS_PATH=node_modules:src` ，你可以像这样引用：

​```scss
@import 'styles/colors'; // 假设src目录下有styles文件夹
@import 'nprogress/nprogress'; // 引用node_modules中的css文件
​```

> windows系统使用如下语法
>
> ```scss
> SASS_PATH=./node_modules;./src
> ```
```

​	

- 添加 CSS Reset

  重置css，几乎每个项目都会有的一个操作，因为浏览器会自带一些不好看的样式。

  只需要 `@import-normalize;` 就可以了。 只需要引用一次，重复引用会被删除。因为我们只能引用一次，所以选择一个比较好的文件去引用它： `index.css` 或 `App.css`

  **`index.css`**

  ```css
  @import-normalize; /* bring in normalize.css styles */
  /* rest of app styles */
  ```

- Post-Processing CSS

  这个插件之前在做vue项目时用过，主要用于添加css前缀和压缩css代码

  举个例子， 我们在css中这样写:

  ```css
  .App {
      display: flex;
      flex-direction: row;
      align-items: center;
  }
  ```

  编译之后， 我们在浏览器上看到的：

  ```
  .App {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  ```

  

- 添加图片，字体和文件

  - 使用方法

    ```react
    import React from 'react';
    import logo from './logo.png'; // Tell webpack this JS file uses this image
    console.log(logo); // /logo.84287d09.png
    function Header() {
      // Import result is the URL of your image
      return <img src={logo} alt="Logo" />;
    }
    export default Header;
    ```

    

  - css中

    ```css
    .Logo {
      background-image: url(./logo.png); // 相对路径才生效
    }
    ```

    `webpack` 在CSS中找到所有相关的模块引用(它们以./开头)，并用编译包中的最终路径替换它们

  - 添加svg

    ```react
    import { ReactComponent as Logo } from './logo.svg';
    function App() {
      return (
        <div>
          {/* Logo is an actual React component */}
          <Logo />
        </div>
      );
    }
    ```

    

- 使用public文件夹中的内容

  这点的内容大概意思就是，尽量在JS中去import图片字体等，最好不要直接使用public中的文件，因为webpack不会压缩它们，也不会为他们添加hash，留下的缓存需要自己改名

- 代码分割

  `moduleA.js`

  ```javascript
  const moduleA = 'Hello';
  export { moduleA };
  ```

  `App.js`

  ```react
  import React, { Component } from 'react';
  class App extends Component {
    handleClick = () => {
      import('./moduleA')
        .then(({ moduleA }) => {
          // Use moduleA
        })
        .catch(err => {
          // Handle failure
        });
    };
    render() {
      return (
        <div>
          <button onClick={this.handleClick}>Load</button>
        </div>
      );
    }
  }
  export default App;
  ```

  用户点击之后，才加载那段JS代码，这对优化有帮助。



##### 7. 构建app

- 安装依赖

  当我们需要一些插件的时候，就可以使用 `npm` 或 `yarn` 来安装

- 引入组件

  以前我们是用CommonJS规范， `require()` 和 `module.exports`。 react鼓励我们使用ES6的语法： `import `  , `export`

  例子：

  `Button.js`

  ```react
  import React, { Component } from 'react';
  class Button extends Component {
    render() {
      // ...
    }
  }
  export default Button; // Don’t forget to use export default!
  ```

  `DangerButton.js`

  ```react
  import React, { Component } from 'react';
  import Button from './Button'; // Import a component from another file
  class DangerButton extends Component {
    render() {
      return <Button color="red" />;
    }
  }
  export default DangerButton;
  ```

- 使用绝对路径引用文件

  在根目录新建一个`jsconfig.json` 或 `tsconfig.json` （如果你是用ts写代码的话） 

  ```json
  {
    "compilerOptions": {
      "baseUrl": "src"
    },
    "include": ["src"]
  }
  ```

  然后可以在JS文件中使用绝对路径来引入其他组件了

  ```react
  import Button from 'components/Button';
  ```

------

我服了，到现在才知道有create-react-app的中文文档。。活该我翻译了这么久，还好的是翻译的过程中熟悉了一遍。

------



#### 2. [react-router-dom](https://reacttraining.com/react-router)

- <BrowserRouter> 跟 <HashRouter>的区别

  两者的区别在于它们怎么存储URL以及怎么跟服务器交流

  - <BrowserRouter>使用普通的URL路径，这种路径看起来很舒服，但是需要服务器正确配置。特别地，你的web服务器需要在所有由ReactRouter管理的客户端URL上都提供相同的页面，`create-react-app` 在开发环境上对这种模式提供了开箱即用的支持，但是在生产环境下需要服务器配置。
  - <HashRouter>，跟就vue中的history: hash，一样。URL上会出现`#`这个符号。不需要服务器做任何配置。

  如果要使用路由功能，确保dom的根节点包含在了路由中， 如：

  ```react
  import React from "react";
  import ReactDOM from "react-dom";
  import { BrowserRouter } from "react-router-dom";
  
  function App() {
    return <h1>Hello React Router</h1>;
  }
  
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
  ```

  

- <switch>跟<Route>的作用

  - 如果渲染了<switch>， 它会在其子元素的<Route>中，查找跟当前URL匹配的元素，然后就渲染这个路由，并忽略其他的所有路由，所以`/`应该放在最后面。如果匹配不到的话，<Switch>组件什么都不会渲染(null)
  - 虽然React Router确实支持在<Switch>之外渲染<Route>元素，但在5.1版本中，建议用[useRouteMatch](https://reacttraining.com/react-router/web/guides/primary-components/TODO)钩子。另外，不建议渲染一个没有路径的<Route>，而是建议使用一个钩子来访问您需要的任何变量。

- 导航（路由改变者）

  <Link> ：会被渲染成 <a>标签

  <NavLink>： 是一种特别的Link， 可以设置当路由匹配时的Css类

  <Redirect>:  重定向

- [服务端渲染](https://reacttraining.com/react-router/web/guides/server-rendering)

- 代码分割

  也就是路由懒加载。 `()=>import(组件)`

  需要`webpack`提供支持，`create-react-app` 提供了开箱即用的支持，如果没有使用脚手架，需要自行配置。配置方法：

  ```shell
  npm i @babel/plugin-syntax-dynamic-import -S
  npm i loadable-components
  ```

  `.babelrc` 文件

  ```json
  {
    "presets": ["@babel/preset-react"],
    "plugins": ["@babel/plugin-syntax-dynamic-import"]
  }
  ```

  举个例子

  ```jsx
  // loadable components这个库适用于服务端渲染
  // 如果不用服务端渲染，可以使用React.lazy(https://zh-hans.reactjs.org/docs/code-splitting.html#reactlazy)
  import loadable from "@loadable/component";
  import Loading from "./Loading.js";
  
  const LoadableComponent = loadable(() => import("./Dashboard.js"), {
    fallback: <Loading />
  });
  
  export default class LoadableDashboard extends React.Component {
    render() {
      return <LoadableComponent />;
    }
  }
  ```

  

- 路由跳转之后滚动至某个位置

  `vue-router` 中也实现了类似的功能



#### 3. [react-redux](https://react-redux.js.org/)

跟 `vuex` 是一个道理，数据状态管理中心

有几个核心概念：

- Provider

- connect()

  redux提供了connect方法让我们去读取store中的值

  connect方法接受两个参数：

  - `mapStateToProps` 
    - 当store中的值改变时调用。它接受整个store state， 返回组件需要的数据对象。
  - `mapDispatchToProps`： 这个参数可以是对象或者函数
    - 如果是函数，它会在组件生成的时候被调用一次。它接受 `dispatch` 作为参数，应返回一个包含所有使用 `dispatch` 的对象
    - 如果是对象，不懂。

  例子：

  ```jsx
  const mapStateToProps = (state, ownProps) => ({
    // ... computed data from state and optionally ownProps
  })
  
  const mapDispatchToProps = {
    // ... normally is an object full of action creators
  }
  
  // `connect` returns a new function that accepts the component to wrap:
  const connectToStore = connect(
    mapStateToProps,
    mapDispatchToProps
  )
  // and that function returns the connected, wrapper component:
  const ConnectedComponent = connectToStore(Component)
  
  // We normally do both in one step, like this:
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component)
  ```



#### 4. [react-router-config](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config)

​	这是一个集中配置路由的插件。

​	Routes是一个对象，跟<Route>拥有一样的属性， 但是两者一些区别：

```
+	Routes唯一接受的渲染prop是  `component`
+	使用 `routes` 这个key来描述子路由
+	开发者可以自由添加props到路由中， 然后使用在组件中的 `props.route` 来获取这些props。
+	接受`key` 这个prop，避免在路由跳转到一个相同的组件时缓存。 以前我做vue项目时遇到过这种情况，从a页面跳转到b， ab都是同一个组件，这个时候路由改变了但是页面没有发生改变，因为有缓存。如果添加了key，那么路由改变的时候，页面也会跟着改变了，避免了组件缓存。
```

​	配置例子：

```javascript
const routes = [
  {
    component: Root,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home
      },
      {
        path: "/child/:id",
        component: Child,
        routes: [
          {
            path: "/child/:id/grand-child",
            component: GrandChild
          }
        ]
      }
    ]
  }
];
```

##### 

#### 5. [redux](https://github.com/reduxjs/redux)

​	[redux中文文档](https://www.redux.org.cn/)

#### 6. [redux-thunk](https://github.com/reduxjs/redux-thunk)

​	使用redux，我们只能通过`dispatch` 执行简单的同步更新。 这个中间件扩展了存储的功能并允许我们编写存储交互的异步逻辑



----

熟悉了上述的功能以及文档之后



#### 开始踩坑

##### 1.使用ts作为模板，创建了项目之后， `npm run start` 报错：

```
Module not found: Can't resolve 'react-dom' in 'G:\github\react_music\src'
```

但是我确实安装了`react-dom`， `package.json` 中也有依赖项， 检查 `node_modules` 中也有 `@types/react-dom` 包。

解决方案：

`@types/react-dom` 这个包只是为 `react-dom` 提供类型定义。还是需要 `react-dom` 这个包

```shell
npm i react-dom @types/react-dom -S
```

同理，其他的包也需要装

##### 2.入门TS

+ [在react中使用TS](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#reacttypescript-cheatsheets)
+ [理解TS的类型声明](https://2ality.com/2018/04/type-notation-typescript.html)
+ [TS入门](https://ts.chibicode.com/todo/)
+ [TS中文文档](https://typescript.bootcss.com/basic-types.html)

对于一个JAVA没学懂的人来说， TS入门也太难了吧，文档看得我想吐了，这不就是跟后端语言一样了吗？？



##### 3.项目目录构建

create-react-app官方文档提到，我们所有的js、css文件，都应该写在src文件夹下，因为默认的webpack配置只会解析src下的js和css文件。

我根据项目大概需要的几部分，分成了这样的目录

![1583206188263](C:\Users\A\AppData\Roaming\Typora\typora-user-images\1583206188263.png)



##### 4.依赖是安装到`dependencies`还是`devDependencies`中?

开发环境依赖，它里面的包只用于开发环境，不用于生产环境，这些包通常是单元测试或者打包工具等，例如gulp, grunt, webpack, moca, coffee等。

生产环境依赖，或者叫做业务依赖，这是我们最常用的依赖包管理对象，这些依赖是应用发布后正常执行时所需要的，但不包含测试时或者本地打包时所使用的包。

##### 5.reset css

按照官方文档所说的，在`index.css` 中 `@import-normalize`，然后在`index.ts` 中 `import './index.css'` 。重置失败。

暂时没找到解决方案，我考虑用`normalize.css` 来重置css

```shell
npm i normalize.css
```

在 `index.tsx` 中 `import 'normalize.css'`   失败。**没有效果**。

还是很想把这个问题解决，一气之下`npm run eject`， 看看webpack里面的配置是不是错了，结果。。发现配置没错。

最后还是去复制了一份reset.css， 使用styled-components的createGlobalStyle创建了重置的css

##### 6. 路由配置

我想要的效果是进入主页后，有两个固定组件，一个路由组件，路由组件随着路由变化而变化，固定组件不变。

我最开始是这样写的

```tsx
// 错误写法
const routes: RouteConfig[] = [
  {
    path: "/",
    component: Index,
    render: () => <Redirect to={"/recommend"} />,
    routes: [
      {
        path: "/recommend",
        component: SuspenseComponent(Recommend)
      }
    ]
  }
]
```

可以看到调试工具中

![1583686829591](C:\Users\A\AppData\Roaming\Typora\typora-user-images\1583686829591.png)

暂时搞不懂是为什么。 

后来改成了

```tsx
const routes: RouteConfig[] = [
  {
    path: "/",
    component: Index,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to={"/recommend"} />
      },
      {
        path: "/recommend",
        component: SuspenseComponent(Recommend)
      }
    ]
  }
]
```

就可以了。

##### 7. 关于vscode的检查拼写

我以为是`eslint`导致的， 还专门去官网看了一遍文档，`eslint` 没有关于拼写的检查。是一个叫作 `code spell checker` 的插件的功能，它可以检查单词是否拼写正确。我觉得看着挺不舒服的，把这个插件卸载了。`eslint` 是统一风格，检查错误的。

##### 8. react中的列表渲染

`vue` 中是自带了 `v-for` 列表渲染，`react` 使用的 `jsx` 语法， 可以在 `jsx` 中写 js代码， 所以自己写循环就可以实现列表渲染了。 官方推荐使用 Array的map方法来实现。

##### 9. 关于ajax网络请求放在哪个位置

我在思考哈，如果某部分的数据，只是提供个单个组件使用，这个时候还需要放在reduex中吗？

我觉得还是有必要的。首先放在redux中可以缓存，其次可以统一代码风格。把UI跟数据完全分开，也是一种设计风格。

##### 10. reducer中为了使形参state不变，使用object.assign({},...)

也可以使用对象扩展： `{...obj1, ...obj2}` 。也可以使用第三方库：比如[`immutable`](https://github.com/immutable-js/immutable-js), [`immer`](https://github.com/immerjs/immer) 。个人认为immer配合ts更好用一些

[`immer` 中文小教程](https://github.com/ronffy/immer-tutorial)

##### 11. 往子组件传值，传的值的约束是一个接口。

```tsx
<RecommendSheetList sheetList={sheetList}></RecommendSheetList>
```

其中sheetList的约束是

```typescript
interface sheetListStateInterface {
  name: string;
  picUrl: string;
  id: number;
  playCount: number;
}
```

这时会报错。 我就把这个接口改成了type别名

2020.3.10  这个问题是因为接受参数的组件没有给它的props设定一个接口或者any

比如，给`RecommendSheetList` 组件中的props一个any约束，就可以解决上述的问题了，并不是因为传的值是一个接口而报错。

```tsx
const SheetList: React.FC<any> = props => {...}
```

或者

```tsx
const SheetList: React.FC = (props: any) => {...}
```



##### 12. styled-components导出伪元素的样式

平时使用`styled-components` 导出样式都是用的` styled.div` 这种语法，但是伪元素没有标签，所以直接导出一个字符串就行了

```typescript
export const title_after = `
  content: "";
  background-color: #d33a31;
  position: absolute;
  width: 2px;
  height: 16px;
  left: 0;
  top: 1px;
`
```

tips： styled.css``  可以导出一个插入式。

##### 13. 懒加载

使用的库是[`react-lazyload` ](https://github.com/twobin/react-lazyload)。 可以懒加载图片，也可以懒加载组件，具体使用方法看文档。

##### 14. npm多个命令一起执行

避免每次启动项目时都要去额外启动一次接口，我把接口项目放在了这个项目中，这时需要一个命令同时启动接口和react项目。

研究了一下，可以使用`&&`连接命令， 也可以使用插件。使用插件的话需要安装一个`concurrently` 包。

```shell
npm install -g concurrently
```

全局安装了，以后在其他项目中也可以使用这个插件了。

使用方式

```json
"start:server": "cd NeteaseCloudMusicApi && node app.js",
"start:react": "node scripts/start.js",
"start": "concurrently \"npm run start:server\" \"npm run start:react\"",
```

##### 15. styled-components

```tsx
 <SongWrapper>
    {
      rank && (
        <Rank red={songNeed.red} index={songNeed.index}>

        </Rank>
      )
    }
  </SongWrapper>
```

如上， Rank是一个styled-components，给这个组件传值时报错

```
(JSX attribute) red: any
No overload matches this call.
  Overload 1 of 2, '(props: Pick<Pick<Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "style" | "title" | ... 252 more ... | "onTransitionEndCapture"> & { ...; }, "style" | ... 254 more ... | "onTransitionEndCapture"> & Partial<...>, "style" | ... 254 more ... | "onTransitionEndCapture"> & { ...; } & { ...; }): ReactElement<...>', gave the following error.
    不能将类型“{ children: never[]; red: any; index: any; }”分配给类型“IntrinsicAttributes & Pick<Pick<Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "style" | ... 253 more ... | "onTransitionEndCapture"> & { ...; }, "style" | ... 254 more ... | "onTransitionEndCapture"> & Partial<...>, "style" | ... 254 more ... | "onTransitionEndCapture"> & { ...; } & { ...; }”。
      类型“IntrinsicAttributes & Pick<Pick<Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "style" | ... 253 more ... | "onTransitionEndCapture"> & { ...; }, "style" | ... 254 more ... | "onTransitionEndCapture"> & Partial<...>, "style" | ... 254 more ... | "onTransitionEndCapture"> & { ...; } & { ...; }”上不存在属性“red”。
  Overload 2 of 2, '(props: StyledComponentPropsWithAs<"div", any, {}, never>): ReactElement<StyledComponentPropsWithAs<"div", any, {}, never>, string | ... 1 more ... | (new (props: any) => Component<...>)>', gave the following error.
    不能将类型“{ children: never[]; red: any; index: any; }”分配给类型“IntrinsicAttributes & Pick<Pick<Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "style" | ... 253 more ... | "onTransitionEndCapture"> & { ...; }, "style" | ... 254 more ... | "onTransitionEndCapture"> & Partial<...>, "style" | ... 254 more ... | "onTransitionEndCapture"> & { ...; } & { ...; }”。
      类型“IntrinsicAttributes & Pick<Pick<Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "style" | ... 253 more ... | "onTransitionEndCapture"> & { ...; }, "style" | ... 254 more ... | "onTransitionEndCapture"> & Partial<...>, "style" | ... 254 more ... | "onTransitionEndCapture"> & { ...; } & { ...; }”上不存在属性“red”。ts(2769)
```

翻阅了官方文档解决问题。

```typescript
import styled from 'styled-components';
import Header from './Header';

interface TitleProps {
  readonly isActive: boolean;
};

const Title = styled.h1<TitleProps>`
  color: ${props => props.isActive ? props.theme.colors.main : props.theme.colors.secondary};
`

const NewHeader = styled(Header)<{ customColor: string }>`
  color: ${props => props.customColor};
`
```

需要定义泛型！！！！！！！



##### 16. 中途反省

心好累。现在的工作情况这么困难吗，但凡是招前端，都得至少两年工作经验。我寻思着工作经验有两年的人就比工作经验一年的人强得多吗。。唉。这几天忙着面试，初试问的问题都还好，复试的时候反而不知道怎么去交流了。要学习的东西还有很多很多。。我还年轻，我还能学。加油啊hmk！！  2020.3.17

##### 17. styled-components中添加背景图片

使用import 或者 require 把背景图片导入，然后

```tsx
background-image: url(${xxxx});
```



