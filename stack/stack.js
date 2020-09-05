// -------------------- stack -----------------

/* 
  * 特点：后进先出
  * 通过数组来进行封装
*/

class Stack {
  constructor() {
    this.item = []
  }
  
  // 进栈
  push(ele) {
    return this.item.push(ele)
  }
  
  // 出栈
  pop() {
    return this.item.pop()
  }
  
  // 栈顶
  peek() {
    return this.item[this.item.length - 1]
  }
  
  // 是否为空
  isEmpty() {
    return this.item.length === 0
  }
  
  // 元素个数
  size() {
    return this.item.length
  }
}