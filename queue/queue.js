// -------------- test -------------

/*
 * 特点：先进先出
 * 通过数组来封装
*/

class Queue {
  constructor() {
    this.item = []
  }
  
  // 入队列
  enqueue(ele) {
    return this.item.push(ele)
  }
  
  // 出队列
  dequeue() {
    return this.item.shift()
  }
  
  // 队列第一元素
  front() {
    return this.item[0]
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