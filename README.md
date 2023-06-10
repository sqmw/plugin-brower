# plugin-browser
## plugin-block
- manifest 版本 3
- 现在的目的是为了实现通过关键字屏蔽哔哩哔哩里面的部分内容
- 后面需要能够类似其他的屏蔽软件一样能够选中屏蔽，这里增加一个功能，选中的是模板，之后可以根据模板以及当前的location.href来进行屏蔽
- 现在实现功能：能够添加关键字，屏蔽哔哩哔哩里面不想看到的任何内容

## 总结

- 编写代码的过程是学习的过程
通过编写代码，实现了popup.js和background.js的通信，他们使用的都是浏览器提供的API
`chrome.storage.local.get` 或者 `chrome.storage.local.set 实现`，经过自己测试发现，该函数和localStorage不一样
- 为了安全考虑，绑定事件不能在`html`里面直接 `onclick = "XXX"` 的形式编写，需要在js里面获取需要绑定事件的dom，之后
`addEventListener()`
## 参考教程
https://developer.chrome.com/docs/extensions/

## 使用的第三方库
- bootstrap5：https://getbootstrap.com/