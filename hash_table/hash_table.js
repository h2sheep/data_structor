
// ------ hashFunc -----------

// str  要转化为对应哈希值的字符串
// max 	哈希表的长度


// --------- HashTable -----------

// 装填因子
const MAX_LOAD_FACTOR = 0.75
const MIN_LOAD_FACTOR = 0.25

class HashTable {
	constructor() {
		this.storage = []
		this.count = 0
		this.limit = 7
	}
	
	// 哈希函数
	hashFunc(str, max) {
		let hashcode = 0
		// 霍纳算法
		for (let i = 0; i < str.length; i++) {
			hashcode = 31 * hashcode + str.charCodeAt(i)
		}
		
		// 哈希化
		hashcode %= max
		return hashcode
	}
	

	// put(key, value)	放入/修改键值对
	put(key, value) {
		// 获取哈希值
		const index = this.hashFunc(key, this.limit)
		
		// 存放到哈希表中
		let dataArr = this.storage[index]
		// 哈希表中用数组存放数据
		if (dataArr === undefined) {
			dataArr = []
			this.storage[index] = dataArr
		}
		
		// 判断是否已有该键值对
		let flag = false
		for (let i = 0; i < dataArr.length; i++) {
			// 这里用数组保存数据 [key, value]
			let data = dataArr[i]
			if (data[0] === key) { // key值一样 则修改value
				data[1] = value
				// 表示已经修改
				flag = true
			}
		}
		
		// 如果有新的数据 不是同一key 就放进数组中
		if (!flag) {
			dataArr.push([key, value])
			// 数量+1
			this.count++
			
			// 如果装填因子大于0.75就扩容
			if (this.count / this.limit > MAX_LOAD_FACTOR) {
				let newLimit = this.getPrime(this.limit * 2)
				this.resize(newLimit)
			}
		}
	}
	
	
	// get(key)  根据key查找值
	get(key) {
		// 先获取哈希值
		const index = this.hashFunc(key, this.limit)
		
		let dataArr = this.storage[index]
		// 判断数据数组情况
		if (dataArr === undefined) {
			// 如果没有该数组
			return null
		} else {
			for (let i = 0; i < dataArr.length; i++) {
				let data = dataArr[i]
				// 判断key是否相等
				if (data[0] === key) return data[1]
			}
		}
		
		return null
	}
	
	
	// remove(key)  删除指定元素
	remove(key) {
		// index
		const index = this.hashFunc(key, this.limit)
		
		// dataArr
		const dataArr = this.storage[index]
		if (dataArr === undefined) return null
		
		// data
		for (let i = 0; i < dataArr.length; i++) {
			let data = dataArr[i]
			if (data[0] === key) {
				// 删除元素
				dataArr.splice(i, 1)
				// 数量-1
				this.count--
				
				// 减容
				if (this.limit > 7  &&this.count / this.limit < MIN_LOAD_FACTOR) {
					let newLimit = this.getPrime(Math.floor(this.limit / 2))
					this.resize(newLimit)
				}
				
				// 返回被删除的值
				return data[1]
			}
		}
		
		return null
	}
	
	
	// isEmpty
	isEmpty() {
		return this.count === 0
	}
	
	size() {
		return this.count
	}
	
	
	// resize 扩容/减容 重新分配
	resize(newLimit) {
		// 保存原来的数据
		const oldStorage = this.storage
		
		// 重置属性
		this.limit = newLimit
		this.count = 0
		this.storage = []
		
		// 将原来的数据再次分配
		oldStorage.forEach(dataArr => {
			// 如果当前位置没有保存数据就退出
			if (!dataArr) return
			
			// 遍历数据数组
			for (let i = 0; i < dataArr.length; i++) {
				let data = dataArr[i]
				// 重新put
				this.put(data[0], data[1])
			}
		})
	}
	
	
	// --- 质数 -----
	
	// 是否为质数
	isPrime(num) {
		let temp = Math.ceil(Math.sqrt(num))
		
		for (let i = 2; i < temp; i++) {
			// 存在可以整除的数
			if (num % i === 0) return false
		}
		
		return true
	}
	
	// 获取质数
	getPrime(num) {
		while (!this.isPrime(num)) {
			num++
		}
		
		return num
	}
}