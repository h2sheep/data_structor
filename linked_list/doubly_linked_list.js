// ---------------- doubly linked list -----------------

/* 
  * 双链表与单链表一部分方法相同
  * 通过继承来实现双链表
*/


// Node 
/*
  * 双链表的节点有前指针和后指针
*/

class DoublyNode extends Node {
  constructor(val) {
    super(val)
    this.prev = null
  }
}


// doubly linked list 
/* 
  * 双链表有头指针和尾指针
*/

class DoublyLinkedList extends LinkedList {
  constructor() {
    super()
    this.tail = null
  }
  
  // 尾部添加节点
  append(val) {
    // 创建节点
    const node = new DoublyNode(val)
    
    // 1. 空链表
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      // 2. 尾部添加节点
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }
    
    this.length++
  }
  
  // 插入节点
  insert(position, val) {
    // 越界？
    if (position < 0 || position > this.length) return
    
    const node = new DoublyNode(val)
    
    // 1. 插入到第一个
    if (position === 0) {
      // 1.1 链表为空
      if (!this.head) {
        this.head = node
        this.tail = node
      } else {
        // 1.2 链表不为空
        node.next = this.head
        this.head.prev = node
        this.head = node
      }
    } else if (position === this.length) {
      // 2. 插入到末尾
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    } else {
      // 3. 插入到中间或末尾
      let cur = this.head
      let index = 0
      while (index++ < position) {
        cur = cur.next
      }
      // 插入到cur的前面 四个指针相互指向
      node.prev = cur.prev
      node.next = cur
      cur.prev.next = node
      cur.prev = node
    }
    
    this.length++
    return true
  }
  
  // 删除指定位置节点
  removeAt(position) {
    if (position < 0 || position > this.length - 1) return
    
    let cur = this.head
    
    // 1. 删除第一个
    if (position === 0) {
      // 1.1 只有一个节点
      if (this.length === 1) {
        this.head = null
        this.tail = null
      } else {
        // 1.2 不止一个节点
        this.head = this.head.next
        this.head.prev = null
      }
    } else if (position === this.length - 1) {
      // 2. 删除末尾节点
      cur = this.tail
      this.tail.prev.next = null
      this.tail = this.tail.prev
    } else {
      // 3. 删除中间节点
      let index = 0
      while (index++ < position) {
        cur = cur.next
      }
      cur.prev.next = cur.next
      cur.next.prev = cur.prev
    }
    
    // 清除删除节点指针
    cur.next = null
    cur.prev = null
    
    this.length--
    return cur.val
  }
}