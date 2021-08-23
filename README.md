**适用人群：该框架集成了react开发常用技术栈，将dva与create-react-app结合，适用于想要学习单向数据流框架搭建的新手、以及想要一个比较干净、简洁的框架从事前端项目的开发者。**

### 4.0.0版本更新说明

> 在4.0.0版本之前，我采用的是完全自定义的架构模式。这种方式维护成本高，要解决各种插件升级之后的兼容性问题。

> 此次我将架构抽离，采用 [create-react-app][4] 作为脚手架，然后保持原来的redux结构不变，与此同时，增加了路由配置文件。

> 虽然基础架构做了大更新，但是尽量保证原来有的功能都存在，脚手架的配置你可以直接参考create-react-app的官方文档。

> 新架构的好处：脚手架交给react团队维护，个人或者企业开发者只需要专注业务逻辑实现，大大节省了开发成本，而且，
官方脚手架的体验不错。

#### 客户端渲染

本项目是客户端渲染版本

### Installation 教程

fork到你的账号，简单省事，或者 download 项目到本地

**1、 安装依赖包，已经解决了一些依赖包安装最新版可能出现的bug，如果还有问题，可以看相关社区的issue。**
```
npm install 或cnpm install 或 yarn
```

**2、打包发布 ** 

```nodemon
npm run build
```

非常抱歉的是由于各个插件版本升级太快，一些文档教程没有实时跟上维护修改。

#### echarts 使用方案
想要在react恰当的使用echarts，可以查看 [react中使用echarts的最优方案][1]

#### 学习ES6语法
React项目中，使用了大量的ES6语法，如果你还没有学习过ES6，那么推荐你看 [深入理解ES6笔记][2]

#### 更多React教程
这里积累了react博客+react官方文档的中文翻译
[React系列教程][3]

