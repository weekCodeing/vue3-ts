# vue3-ts
Vue3.0+TS打造企业级组件库

- 项目发布流程
- 合理设计广泛适用性的API
- 代码质量
- Vue3的实现原理（源码，响应式原理，深入浅出Vue3）

表单组件库

- 高频场景
- 交互复杂
- 定制性高
- 涉及安全

1. 代码质量高
2. 适应场景丰富
3. 开源
4. 发布流程

功能：表单生成，主题系统，插件系统(无需写代码，可以全栈通用，可以跨平台)

# Basic example

Using `v-slot` to declare the props passed to the scoped slots of `<foo>`:

```html
<!-- default slot -->
<foo v-slot="{ msg }">
	{{msg}}
</foo>

<!-- named slot -->
<foo>
	<template v-slot:one="{msg}">
		{{msg}}
	</template>
</foo>
```

> TS

1. 任何变量都声明类型
2. 不要用any
3. 对象声明接口

```
npm i -g @vue/cli
vue create vue3-project
vue3-babel,typescript,eslint,uni-jest
```

`.prettierrc`

```
{
	"semi": false, // 是否使用分号
	"singleQuote": false, // 是否使用单引号
	"arrowParens": "always", // Always include parens.Example: `(x)=>x`
	"trailingComma": "all",
}
```

> 如何用ts在vue3中定义组件

`defineComponent`四种重载

```
import { defineComponent, PropType } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

interface Config {
	name: string
}

export default defineComponent({
	name: 'App',
	props: {
		age: {
			type: Number as PropType<number>
		},
		config: {
			type: Object as PropType<Config>,
			required: true
		}
	},
	components: {
		HelloWorld,
	},
	data() {
		return {
			name: 'jeskson',
		}
	},
	mounted() {
		this.config.name
	}
})
```

> 如何提取props定义

```
<template>
	<div class="hello">
		{{age}}
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'HelloWorld',
	props: {
		msg: String,
		age: Number,
	},
})
```

```
<template>
	<div class="hello">
		{{age}}
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

const PropsType = {
	msg: String,
	age: {
		type: Number,
		required: true
	},
} as const

export default defineComponent({
	name: 'HelloWorld',
	props: PropsType,
	mounted() {
		this.age // (property) age?: number | undefined
		// age?: number 
	}
})
```

> vue的h函数详细讲解

```
import { createApp, defineComponent } from 'vue'

const App = defineCompoent({
	render() {
		return 123
	},
})
```

```
import { createApp, defineComponent, h } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
// const img = require('./assets/logo.png') // eslint-disable-line
const App = defineCompoent({
	render() {
		return h('div', { id: 'app' },[
			h('img', {
				alt: 'Vue logo',
				src: img
				// src: "./assets/logo.png"
			}),
			h(HelloWorld, {
				msg: 'www.1024bibi.com',
				age: 12
			})
		])
	},
})
```

vue如何去渲染我们的节点内容

```
export function h(type: any, propsOrChildren?: any, children?: any): VNode {
	if (arguments.length === 2) {
		if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
			// single vnode without props
			if (isNode(propsOrChildren)) {
				return createVNode(type, null, [propsOrChildren])
			}
			// props without children
			return createVNode(type, propsOrChildren)
		} else {
			// omit props
			return createVNode(type, null, propsOrChildren)
		}
	} else {
		if (isVNode(children)) {
			children = [children]
		}
		return createVNode(type, propsOrChildren, children)
	}
}
```

> setup的运用和其意义

```
import { createApp, defineComponent, createVNode } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
// import App from './App.vue'

const img = require('./assets/logo.png') // eslint-disable-line

// createElement
const App = defineComponent({
	render() {
		return createVNode('div', {id: 'app'}, [
			createVNode('img', {
				alt: 'Vue logo',
				src: img,
			}),
			createVNode(HelloWorld, {
				msg: 'www.1024bibi.com',
				age: 12,
			}),
		])
	}
})
```

```
// {state.name} = {name}
<script lang="ts">
import { defineComponent, PropType, reactive, ref, computed } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
	name: 'App',
	components: {
		HelloWorld,
	},
	setup(props, {slots,attrs,emit}) {
		// let name = 'jeskson'
		<!-- const state = reactive({
			name: 'jeskson'
		}) -->
		const nameRef = ref('jeskson')
		const ref2 = ref(123)
		
		setInterval(() => {
			// state.name += '1'
			nameRef.value += '1'
		}, 5000)
		
		setInterval(() => {
			// state.name += '1'
			ref2.value += '1'
		}, 1000)
		
		const computedNameRef = computed() => {
			return nameRef.value + '2'
		}
		
		watchEffect(()=>{
			console.log(nameRef.value)
		})
		
		return {
			// state,
			name: nameRef,
			name2: computedNameRef,
			ref2
		}
	}
})


// 组件初始化的时候执行一次
setup(props, { slots, attrs, emit }) {
	return {
		name: 'www.1024bibi.com'
	}
}
```

> setup返回render函数的用法

main.ts
```
import { createApp, defineComponent, h, reactive, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
const img = require('./assets/logo.png') // eslint-disable-line

const App = defineComponent({
	setup() {
		const state = reactive({
			name: 'jeskson'
		})
		const numberRef = ref(1)
		setInterval(() => {
			state.name += '1'
			numberRef.value += 1
		}, 1000)
		// const number = numberRef.value 更新不促发
		return () => {
			// 更新促发return 函数
			const number = numberRef.value
			return h('div', {id: 'app'}, [
				h('img', {
					alt: 'vue logo',
					src: img,
				}),
				h('p', state.name + number),
			])
		}
	},
})
createApp(App).mount('#app')
```

> 使用jsx开发vue3组件

`.vue`文件简单易读，`jsx`：

There are currently two JSX transform implements fro Vue3 with slightly differing syntax(for Vue specific features):

```
vue Component/jsx
HcySunYang/vue-next-jsx
``` 

```
return {
	<div id="app">
		<img src={img} alt = "Vue logo" />
		<p>{state.name + number}</p>
	</div>
}
```

> 为什么vscode没有对props类型进行提醒

## 【准备基础】

> 什么是json-schema

The fastest JSON Schema Validator

如何试用ajv来定义和校验json-schema

node -v
v14.12.0

npm -v
6.14.8

yarn -v
1.22.10

yarn add ajv -S

The fastest validation call: 

```
// Node.js require
var Ajv = require('ajv');
// or ESM/TypeScript import
import Ajv from 'ajv';

var ajv = new Ajv();
var validate = ajv.compile(schema);
var valid = validate(data);
if(!valid) console.log(validate.errors);
```

```
[
  {
    instancePath: '',
    schemaPath: '#/minLength',
    keyword: 'minLength',
    params: { limit: 10 },
    message: 'must NOT have fewer than 10 characters'
  }
]
```

```
// Node.js require
const Ajv = require('ajv');
// or ESM/TypeScript import
// import Ajv from 'ajv';
const schema = {
  type: 'string',
  minLength: 10,
}
const ajv = new Ajv();
const validate = ajv.compile(schema);
const valid = validate('jesksonHelloWorld');
if(!valid) console.log(validate.errors);
```

```
const Ajv = require('ajv')

const schema = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			minLength: 10,
		},
		age: {
			type: 'number'
		},
		pets: {
			type: 'array',
			items: [
				{
					type: 'string',
				},
				{
					type: 'number',
				},
			],
			<!-- items: {
				type: 'string'
			} -->
		},
		isWorker: {
			type: 'boolean',
		},
	},
	required: ['name','age']
}
```

### json-schema的fomart和自定义format

### 如何自定义关键字

> 项目结构

> 开发模式

> Vue3的TS定义

> 单元测试

> 自动化发布流程
