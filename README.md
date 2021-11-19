# Vue3-TypeScript-CMS

## 代码规范
1. editorconfig配置
```yaml
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

2. 代码格式化 prettier
```
npm install prettier -D
```
- 配置.prettierrc
```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```
- 配置package.json
```
"prettier": "prettier --write ."
```
3. .prettierignore忽略文件
```yaml
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

4. 配置ESLint
- vue在创建项目时，如果选择prettier，那么这两个插件会自动安装
```
npm i eslint-plugin-prettier eslint-config-prettier -D
```

- 添加prettier插件
```yaml
extends: [
  "plugin:vue/vue3-essential",
  "eslint:recommended",
  "@vue/typescript/recommended",
  "@vue/prettier",
  "@vue/prettier/@typescript-eslint",
  'plugin:prettier/recommended'
],
```

5. git commit规范
- 安装Commitizen
```js
npm install commitizen -D
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```
| Type		 | 作用|
|	---			 |---|
|	feat		 |新增特性 (feature) | 
| fix			 | 修复 Bug(bug fix)                                        |
| docs		 | 修改文档 (documentation)                                 |
| style		 | 代码格式修改(white-space, formatting, missing semi colons, etc) |
| refactor | 代码重构(refactor)                                       |
| perf     | 改善性能(A code change that improves performance)        |
| test     | 测试(when adding missing tests)                          |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                 |
| revert   | 代码回退                                                 |

6. 第三方库集成
- vue.config.js配置
```js
const path = require('path')

module.exports = {
	outputDir: './build',
	configureWebpack: {
    resolve: {
      alias: {
        views: '@/views',
				components: '@/components'
      }
    }
  }
}
```

- element-plus集成
```
npm install element-plus
```

- axios集成

```js
npm install axios
```
```js
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Result } from './types'
import { useUserStore } from '/@/store/modules/user'

class HYRequest {
  private instance: AxiosInstance

  private readonly options: AxiosRequestConfig

  constructor(options: AxiosRequestConfig) {
    this.options = options
    this.instance = axios.create(options)

    this.instance.interceptors.request.use(
      (config) => {
        const token = useUserStore().getToken
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 拦截响应的数据
        if (res.data.code === 0) {
          return res.data.data
        }
        return res.data
      },
      (err) => {
        return err
      }
    )
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<Result<T>>>(config)
        .then((res) => {
          resolve((res as unknown) as Promise<T>)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
}

export default HYRequest
```
