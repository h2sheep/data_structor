
//  ---- Node -----

class Node {
	constructor(ele) {
		this.ele = ele
		this.left = null
		this.right = null
	}
}


// ------ BST --------

// 简单封装，不实现节点数据的比较接口，统一用数字比较

class BST {
	constructor() {
		this.root = null
	}
	
	
	// ------------------ insert -------------------
	// insert(ele)
	insert(ele) {
		// 创建新节点
		const node = new Node(ele)
		
		// 树的情况
		if (!this.root) {	// 树为空
			this.root = node
		} else {	// 不为空
			// 比较值再插入
			this.insertNode(this.root, node)
		}
	}
	
	// insertNode(node, newNode) 根据值比较结果插入
	insertNode(node, newNode) {
		if (newNode.ele > node.ele) {		// 如果大于节点
		// 插入到右边
			if (!node.right) {	// 右子节点为空
				node.right = newNode
			} else {	// 右子节点不为空
				// 递归比较
				this.insertNode(node.right, newNode)
			}
		} else {	// 小于等于节点
			// 插入到左边
			if (!node.left) {	// 左子节点为空
				node.left = newNode
			} else {	// 左子节点不为空
				// 递归比较
				this.insertNode(node.left, newNode)
			}
		}
	}
	
	
	// ----------------- 先序 ---------------
	preOrderTraverse() {
		this.preOrderTraverseNode(this.root)
	}
	
	preOrderTraverseNode(node) {
		// 如果为空就退出
		if (!node) return
		
		// 先根节点操作  这里只打印
		console.log(node.ele)
		
		// 递归左子节点
		this.preOrderTraverseNode(node.left)
		// 递归右子节点
		this.preOrderTraverseNode(node.right)
	}
	
	// ----------------- 中序 -------------------
	inOrderTraverse() {
		this.inOrderTraverseNode(this.root)
	}
	
	inOrderTraverseNode(node) {
		if (!node) return null
		
		// 先递归左子节点
		this.inOrderTraverseNode(node.left)
		// 根节点操作
		console.log(node.ele)
		// 递归右节点
		this.inOrderTraverseNode(node.right)
	}
	
	// ---------------- 后序 ---------------------
	postOrderTraverse() {
		this.postOrderTraverseNode(this.root)
	}
	
	postOrderTraverseNode(node) {
		if (!node) return null
		
		// 先递归左子节点
		this.inOrderTraverseNode(node.left)
		// 递归右节点
		this.inOrderTraverseNode(node.right)
		// 根节点操作
		console.log(node.ele)
	}
	
	
	// ---------- 最值 ------------
	min() {
		
		let current = this.root
		// 当存在左子节点时一直找
		while (current.left) {
			current = current.left
		}
		// 找到最下层的左叶节点
		return current.ele
	}
	
	max() {
		let current = this.root
		// 当存在右子节点时一直找
		while (current.right) {
			current = current.right
		}
		// 找到最下层的右叶节点
		return current.ele
	}
	
	
	// -------------- 是否存在 ---------------
	includes(ele) {
		return this.includesNode(this.root, ele)
	}
	
	includesNode(node, ele) {
		// 如果当前节点为空 说明没找到
		if (!node) return false
		
		// 根据大小查找
		if (ele < node.ele) { // 小于节点值
			// 左边
			return this.includesNode(node.left, ele)
		} else if (ele > node.ele) {	// 大于节点值 
			// 右边
			return this.includesNode(node.right, ele)
		} else {	// 相等 说明找到了
			return true
		}
	}
	
	
	// -------------- remove ------------
	
	remove(ele) {
		let current = this.root
		let parent = null
		// 表示是否为左子节点
		let isLeft = true
		
		// 找到该节点
		while (current.ele !== ele) {
			// 找不到直接返回false
			if (!current) return false
			
			// 保存父节点
			parent = current
			
			if (ele < current.ele) {	// 左边
				current = current.left
				isLeft = true
			} else if  (ele > current.ele) {	// 右边
				current = current.right
				isLeft = false
			}
		}
		
		// 节点类型情况
		
		// 1. 是叶子节点
		if (!current.left && !current.right) {
			if (current === this.root) { // 是根节点
				this.root = null
			} else if (isLeft) { // 是左叶节点
				// 父节点左指针置空
				parent.left = null
			} else {	// 是右叶节点
				// 父节点右指针置空
				parent.right = null
			}
		}
		
		// 2. 当前节点只有左节点
		else if (!current.right) {
			if (current === this.root) { // 是根节点
				this.root = current.left
			} else if (isLeft) {	// 当前节点是左子节点 
				parent.left = current.left
			} else {	// 当前节点是右子节点 
				parent.right = current.left
			}
		}
		
		// 3. 当前节点只有右节点
		else if (!current.left) {
			if (current === this.root) { // 是根节点
				this.root = current.right
			} else if (isLeft) {	// 当前节点是左子节点 
				parent.left = current.right
			} else {	// 当前节点是右子节点 
				parent.right = current.right
			}
		}
		
		// 4. 当前节点左右节点都有
		else {
			// 先获取后继节点
			const successor = this.getSuccessor(current)
			
			if (current === this.root) {	// 删除的是根节点
				// 当前根节点替换成后继节点
				this.root = successor
			} else if (isLeft) {	// 左节点
				// 原来的父节点左指针指向后继
				parent.left = successor
			} else {	// 右节点
				// 原来的父节点右指针指向后继
				parent.right = successor
			}
			
			// 后继指向原来节点的左节点
			successor.left = current.left
		}
		
		
		return true
	}
	
	
	// 获取后继节点
	getSuccessor(delNode) {
		
		let successor = delNode
		let successorParent = delNode
		let current = delNode.right
		
		// 后继肯定在右子树的最左边
		while (current) {
			successorParent = successor
			successor = current
			current = current.left
		}
		
		// 有一种情况，后继有右节点
		if (successor !== delNode.right) { // 排除后继就是当前右节点情况
			// 后继的右指针指向delNode的右指向
			successor.right = delNode.right
			// delNodeParent的左指针指向后继的右子树
			successorParent.left = successor.right
		}
		
		// 当current.left === null 时，说明successor已经是后继了
		return successor
	}
	
}