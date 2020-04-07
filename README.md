In this article we build a webpack configuration from scratch for developing Vue.js 3 apps. Specifically, we will support `.vue` files, TypeScript, and hot reload.

We start with an almost empty project, with the following files:

`src/main.ts`

```ts
import { createApp } from 'vue'

import App from './App.vue'

createApp(App).mount('#app')
```

`src/App.vue`

```vue
<template>
  <div>Vue app</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  template: `<div>adf</div>`
})
</script>
```

And `index.html`, at the root level:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  <div id="app"></div>
  <script src="/dist/main.js"></script>
</body>
</html>
```

## Installing Webpack

We will use webpack to bundle our app. Install it with `yarn add webpack webpack-cli`. Next create `webpack.config.js` and include:

```js
const path = require('path')

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
  }
}
```

This is a minimal webpack config. We specify the entry file, and the output. `path.resolve` is a cross platform way to specify a directory. If we run `yarn webpack --mode="development" we get:

```sh
ERROR in ./src/App.vue 1:0
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> <template>
|   <div>Vue app</div>
| </template>
 @ ./src/main.ts 3:0-27 5:10-13
```

## Installing Vue Loader

Of course, it has no idea how to read a `.vue` file. Luckily we can use `vue-loader` for this. The latest version is 16, which supports Vue 3. Let's install it, and `vue` and the sfc-compiler, with `yarn add vue-loader@16.0.0-alpha.3 vue@3.0.0-alpha.11 @vue/compiler-sfc@3.0.0-alpha.11`. Next, we configure webpack to us the loader:

```js
const path = require('path')

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}
```

Any file matching the regular expression `/\.vue$/` will be loaded using `vue-loader`. Running the `yarn webpack mode=="development"` again gives us:


```sh
ERROR in ./src/App.vue
Module Error (from ./node_modules/vue-loader/dist/index.js):
vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
 @ ./src/main.ts 3:0-27 5:10-13
```

It even tells us what to do - use `VueLoaderPlugin`. Let's do that:

```js
const path = require('path')

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  // ...
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

Running webpack again yields a successful build! Take a look at `dist/main.ts` to see the messy bundle webpack builds. Let's use a minimal python server to serve the `index.html` - If you don't have python installed, skip this, we will use a node based development server soon. 

Running `python3 -m http.server` and visiting `localhost:8000` gives our Vue app! No problems.

## TypeScript

You may be surprised to see Webpack reading `.ts` files without a problem. Well, turns out, none of those files have any actual TypeScript - just regular JS without type annotations. Let's add a type annotation to `main.ts`:

```ts
import { createApp } from 'vue'

import App from './App.vue'

const s: string = 1

createApp(App).mount('#app')
```

Building the project now gives us an error:

```
ERROR in ./src/main.ts 5:7
Module parse failed: Unexpected token (5:7)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| import App from './App.vue'
|
> const s: string = 1
```

Yep, webpack doesn't know about TypeScript. Let's fix that by installing `typescript` and `ts-loader`: `yarn add typescript and ts-loader`. Now head to the webpack config and add the following:

```js
const path = require('path')

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  // ...
}
```

You will also need a minimal `tsconfig.json` or `ts-loader` will complain. Add the following to `tsconfig.json`:

```json
{
  "compilerOptions": {
  }
}
```

TypeScript's compiler has many options. We will add them as we need them, to ensure we know what they all do.

Running wepback again gives us the expected error:

```
ERROR in /Users/lachlan/code/dump/webpack-boilerplate/src/main.ts
./src/main.ts
[tsl] ERROR in /Users/lachlan/code/dump/webpack-boilerplate/src/main.ts(5,7)
      TS2322: Type '1' is not assignable to type 'string'.
```

We can remove that line from `main.ts` now.

## `appendTsToSuffix`

Although everything seems fine, it's not. If you visit `localhost:8000`, you will see our app is not loading. There is an error in the console:

```
TypeError: component is undefined
```

It's not immediately clear what is going on. If you `console.log(App)` in `main.ts`, you will see it is... undefined. `ts-loader` isn't working correctly with `vue-loader`. It took me a while to figure this out, we actually need to add `.ts` to the end of the `.vue` files to make `ts-loader` process them. Here is how you do it:

```js
const path = require('path')

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  },
  // ...
}
```

Run webpack again. It works!

## Add `devServer`

Let's get rid of the python server, and use a node based webpack development server, that will rebuild the project and refresh the page automatically every time we save. Install it with `yarn add webpack-dev-server`. Now head back to the webpack config and update it:

```
const path = require('path')

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  // ...
  devServer: {
    inline: true,
    hot: true,
    stats: 'minimal',
    contentBase: __dirname,
    overlay: true
  }
}
```

That's it! `hot` will also refresh the page automatically for us, and the other options give us error messages in the browser when compilation fails. You can run the dev server with `yarn webpack-dev-server`. Visit `localhost:8080` to see it.

## Conclusion

We explored the various tools required to use Vue 3 with `.vue` files, TypeScript and have a solid development environment. We can, and will, continue to build on our webpack config as we go, and include features such as:

- minify for production
- source maps
- improve our `tsconfig.json`

This forms the base of my upcoming course, Vue.js 3: TypeScript and the Composition API. It's an advanced course, where we explore tooling, TypeScript, and the Composition API, with test driven development every step of the way. You can learn more [here](https://vuejs-course.com/).
