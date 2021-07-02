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

> 项目结构

> 开发模式

> Vue3的TS定义

> 单元测试

> 自动化发布流程
