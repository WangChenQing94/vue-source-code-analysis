/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.

/**
 * 使用创建编译器方法 创建一个编译器
 * 传一个基础编译器方法 传入一个template模板 和 config编译器配置 flow/compiler.js
 * 返回一个对象 对象定义在flow/compiler.js中
 */
console.log(0);
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  console.log(1)
  // 解析html模板字符串 -> AST
  const ast = parse(template.trim(), options)

  // 如果需要优化
  if (options.optimize !== false) {
    optimize(ast, options)
  }

  /**
   * 根据AST 和 配置
   * 生成代码
   * 返回一个对象 字符串表达式 和 静态渲染方法
   */
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
// console.log('-----------------');
// console.log(createCompiler());
