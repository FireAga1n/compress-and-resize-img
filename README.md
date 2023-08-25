## example

```js
import compressImage from 'compress-and-resize-img'
// 创建一个 input 元素
var input = document.createElement('input')
input.type = 'file'

// 监听 input 元素的 change 事件
input.addEventListener('change', function (e) {
  // 获取选择的文件
  var file = e.target.files[0]

  // 调用上传函数
  compressImage(file,100,100,0.6)
    .then(response => {
    })
    .catch(error => {
      // 处理上传失败后的逻辑
      console.log(error, 'error')
    })
})
// 将 input 元素添加到页面中
document.body.appendChild(input)
```
## 注意
当入参为(file,maxWidth,null,0.6)代表只压缩宽度，高度自适应，压缩质量为0.6