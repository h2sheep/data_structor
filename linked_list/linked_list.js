// --------------- liked list -----------------

/* 
  * Node：节点
    * val 保存的值
    * next 后指针 
*/

class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}


/* 
  * LinkedList：单链表
    * head 头指针
    * length 长度
  * 链表由对象连接
  * 链表只能从头开始找，不能直接获取
*/
class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }
  
  // 添加节点
  append(val) {
    // 创建节点
    const node = new Node(val)
    
    // 1. 空链表
    if (!this.head) {
      this.head = node
    } else {
      // 2. 插入到最后一位
      let cur = this.head
      while (cur.next) {
        cur = cur.next
      }
      cur.next = node
    }
    
    this.length++
  }
  
  // 插入节点
  insert(position, val) {
    // 越界？
    if (position < 0 || position > this.length) return 
    
    const node = new Node(val)
    
    // 1. 插入到头部
    if (position === 0) {
      node.next = this.head
      this.head = node
    } else {
      // 2. 插入到中间或尾部
      let cur = this.head
      let prev = null
      let index = 0
      while (index++ < position) {
        prev = cur 
        cur = cur.next
      }
      // 插入到 prev 和 cur 的中间
      node.next = cur
      prev.next = node
    }
    
    this.length++
    return true
  }
  
  // 获取指定位置节点值
  get(position) {
    if (position < 0 || position > this.length - 1) return
    
    let cur = this.head
    let index = 0
    while(index++ < position) {
      cur = cur.next
    }
    
    return cur.val
  }
  
  // 获取指定值的第一个索引
  indexOf(val) {
    let cur = this.head
    let index = 0
    while (cur) {
      // 找到返回索引
      if (cur.val === val)  return index 
      // 未找到往下找
      index++
      cur = cur.next
    }
    
    // 循环出来表明未找到
    return -1
  }
  
  // 删除指定位置节点
  removeAt(position) {
    if (position < 0 || position > this.length - 1) return
    
    let cur = this.head
    
    // 1. 删除第一个节点
    if (position === 0) {
      this.head = cur.next
    } else {
      // 2. 删除后面节点
      let prev = null
      let index = 0
      while (index++ < position) {
        prev = cur
        cur = cur.next
      }
      // 删除节点的前节点指向后节点
      prev.next = cur.next
    }
    
    // 清除被删除节点的指针
    cur.next = null
    this.length--
    return cur.val
  }
  
  // 删除指定节点
  remove(val) {
    // 获取索引
    const index = this.indexOf(val)
    
    if (index === -1) return
    
    // 删除指定索引节点
    this.removeAt(index) 
  }
  
  // 更新指定位置节点
  update(position, val) {
    // 删除节点
    const delEle = this.removeAt(position)
    
    // 插入节点
    this.insert(position, val)
    
    return delEle
  }
  
  // 是否为空
  isEmpty() {
    return this.length === 0
  }
  
  // 链表长度
  size() {
    return this.length
  }
}