/* @flow */

import { extend } from 'shared/util'
import { detectErrors } from './error-detector'
import { createCompileToFunctionFn } from './to-function'

// baseCompile 方法

/**
 * 接收一个参数  是一个函数
 * 返回一个函数
 */
export function createCompilerCreator (baseCompile: Function): Function {
  /**
   * 接收一个编译器配置项
   * 返回一个对象
   * 包含一个函数 和 一个对象
   */
  console.log(2)
  return function createCompiler (baseOptions: CompilerOptions) {
    console.log(3);
    console.log(baseOptions);
    function compile (
      template: string,
      options?: CompilerOptions
    ): CompiledResult {
      console.log(4);
      /**
       * Object.create()创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
       * Object.create(proto, [propertiesObject])
       * proto 新创建对象的原型对象
       */
      const finalOptions = Object.create(baseOptions)
      const errors = []
      const tips = []

      let warn = (msg, range, tip) => {
        (tip ? tips : errors).push(msg)
      }

      if (options) {
        if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
          // $flow-disable-line
          const leadingSpaceLength = template.match(/^\s*/)[0].length

          warn = (msg, range, tip) => {
            const data: WarningMessage = { msg }
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength
              }
            }
            (tip ? tips : errors).push(data)
          }
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules)
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          )
        }
        // copy other options
        for (const key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key]
          }
        }
      }

      finalOptions.warn = warn

      const compiled = baseCompile(template.trim(), finalOptions)
      if (process.env.NODE_ENV !== 'production') {
        detectErrors(compiled.ast, warn)
      }
      compiled.errors = errors
      compiled.tips = tips
      return compiled
    }

    console.log(5);
    return {
      compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}
