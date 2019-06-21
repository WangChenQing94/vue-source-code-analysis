项目结构：

scripts: 包含与构建相关的脚本和配置文件。
  scripts/alias.js: 模块导入别名用于所有源代码和测试。
  scripts/config.js: 包含在中找到的所有文件的构建配置dist/.如果要查找dist文件的条目源文件，检查此文件

dist: 包含用于分发的构建文件

flow: 包含flow的类型声明。这些声明是全局加载的，将在普通源代码中看到它们在类型注释中使用。

packages: 包含 vue-server-renderer 和 vue-template-compiler,它们作为单独的npm包分发。它们是从源代码自动生成的，并且始终与主程序vue包具有相同的版本。

test: 包含所有测试。单元测试用Jasmine编写并与Karma一起运行。e2e测试是为Nightwatch.js编写并运行

src: 包含源代码。代码库是使用flow类型注释在es2015中编写的。
  compiler: 包含模板到渲染函数编译器的代码。
  编译器包含一个解析器（将模板字符串转换为元素AST）,一个优化器（检测用于vdom渲染优化的静态树）和一个代码生成器（从元素AST生成渲染函数代码）。请注意，codegen直接从元素AST生成代码字符串 - 它以较小的代码大小完成，因为编译器在独立构建中运送到浏览器。
  core: 包含通用的，与平台无关的运行时代码。
  Vue2.0核心与平台无关。也就是说，内部代码core可以在任何JavaScript环境中运行，无论是浏览器，Node.js还是本机应用程序中的嵌入式JavaScript运行时。
    observer: 包含与反应系统相关的代码。
    vdom: 包含与vdom元素创建和修补相关的代码。
    instance: 包含Vue实例构造函数和原型方法。
    global-api: 包含Vue全局API。
    components: 包含通用抽象组件。
  server: 包含与服务器呈现相关的代码。
  platforms: 包含特定于平台的代码。
  dist构建的条目文件位于各自的平台目录中。
  每个平台模板包含三个部分：compiler, runtime 和 server，对应于上述的三个目录。每个部分都包含特定于平台的模块/实用程序，这些模块/实用程序在平台特定的条目文件中导入并注入到核心对应项。 例如，实现后面逻辑的代码v-bind: class是platforms/web/runtime/modules/class.js- 在其中导入entries/web-runtime.js并用于创建特定于浏览器的vdom修补功能。
  sfc: 包含单文件组件(*.vue文件)解析逻辑。在vue-template-compiler包中使用。
  shared: 包含在整个代码库中共享的实用程序。
  types: 包含TypeScript类型定义
    test: 包含类型定义测试

