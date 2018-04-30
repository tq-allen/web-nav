function init(hashname){	
	var keys = [
		['q','w','e','r','t','y','u','i','o','p'],
		['a','s','d','f','g','h','j','k','l'],
		['z','x','c','v','b','n','m'],
	]
	var hash = {
				'q': 'qq.com',
				'w': 'weibo.com',
				'e': 'ele.me',
				'r': 'renren.com',
				't': 'taobao.com',
				'i': 'iqiyi.com',
				'z': 'zhihu.com'
			}

	var hashInLocastorage = JSON.parse(localStorage.getItem(hashname) || 'null')
	if(hashInLocastorage){
		hash = hashInLocastorage
	}

	return {
		"keys": keys,
		"hash": hash
	}
}

var keys = init('newHash').keys
var hash = init('newHash').hash


for(var index =0; index<keys.length; index++){
	var div = document.createElement('div')
	var main = document.querySelector('#main')
	for(var indexSub=0; indexSub<keys[index].length; indexSub++){
		var editBtn = document.createElement('button')
		editBtn.textContent = 'E'
		editBtn.id = keys[index][indexSub]
		editBtn.classList.add('edit-button')
		
		var delBtn = document.createElement('button')
		delBtn.textContent = 'D'
		delBtn.id = keys[index][indexSub].toUpperCase()
		delBtn.classList.add('del-button')

		var img = document.createElement('img')
		img.src = 'http://' + hash[keys[index][indexSub]] + '/favicon.ico'

		var kbd = document.createElement('kbd')
		kbd.textContent = keys[index][indexSub]
		kbd.appendChild(editBtn)
		kbd.appendChild(delBtn)
		kbd.appendChild(img)

		div.appendChild(kbd)
	}
	main.appendChild(div)
}

var invalidWebSite = document.querySelector('.invalid-website')
var invalidWebSiteTips = function(){
	invalidWebSite.classList.add('active')
	setTimeout(function(){
		invalidWebSite.classList.remove('active')
	}, 1500)
}

var keyPress = function(e){
	var pressKey = e.key
	var webSite = hash[pressKey]
	if(webSite === undefined || webSite === ''){
		invalidWebSiteTips()
	}else{
		window.open('http://'+webSite, '_blank')
	}
}

document.onkeypress = keyPress

var kbdBtn = document.querySelectorAll('kbd')
var editButton = document.querySelectorAll('kbd button.edit-button')
var delButton = document.querySelectorAll('kbd button.del-button')
var editWebSiteDialog = document.querySelector('.edit-website-dialog')
var editWebSiteTitle = document.querySelector('.edit-website span')
var editWebSiteInput = document.querySelector('.edit-website input')
var editWebSiteBtnSure = document.querySelector('.edit-website button.sure')
var editWebSiteBtnCancel = document.querySelector('.edit-website button.cancel')

var delWebSiteDialog = document.querySelector('.del-website-dialog')
var delWebSiteTitle = document.querySelector('.del-website span')
var delWebSiteBtnSure = document.querySelector('.del-website button.sure')
var delWebSiteBtnCancel = document.querySelector('.del-website button.cancel')

var kbdIcon = document.querySelectorAll('kbd img')

var editBtnId, delBtnId, editImg, delImg

kbdBtn.forEach(function(kbdItem){
	kbdItem.onclick = function(){
		var webSite = hash[this.textContent[0]]
		if(webSite === undefined || webSite === ''){
			invalidWebSiteTips()
		}else{
			window.open('http://' + webSite, '_blank')
		}
	}
})

editButton.forEach(function(editItem){
	editItem.onclick = function(e){
		e.stopPropagation()
		editImg = e.target.nextSibling.nextSibling
		editBtnId = this.id
		document.onkeypress = null
		editWebSiteTitle.textContent = '请输入为' + editBtnId.toUpperCase() +'绑定的网址:'
		if(hash[editBtnId]){
			editWebSiteInput.placeholder = '原先绑定网址为：' + hash[editBtnId]
		}else{
			editWebSiteInput.placeholder = '原先绑定网址为空'
		}

		
		editWebSiteDialog.classList.add('active')

		editWebSiteBtnSure.onclick = editWeb

		editWebSiteInput.focus()
	}
})
editWebSiteBtnCancel.onclick = function(){

	editWebSiteDialog.classList.remove('active')
	editWebSiteInput.value = ''

	document.onkeypress = keyPress
}

editWebSiteInput.onkeyup = function(e){
	if(e.key === 'Enter'){
		editWeb()
	}
}


//编辑绑定的网址
var editWeb = function(){
	hash[editBtnId] = editWebSiteInput.value
	editImg.src = 'http://' + hash[editBtnId] + '/favicon.ico'
	editWebSiteDialog.classList.remove('active')
	editWebSiteInput.value = ''

	localStorage.setItem('newHash', JSON.stringify(hash))

	document.onkeypress = keyPress
}

delButton.forEach(function(delItem){
	delItem.onclick = function(e){
		e.stopPropagation()
		delBtnId = this.id.toLowerCase()

		delWebSiteTitle.textContent = '确定删除'+ delBtnId.toUpperCase() +'绑定的网址吗？'

		delWebSiteDialog.classList.add('active')

		delImg = e.target.nextSibling
	}
})

delWebSiteBtnSure.onclick = function(){
	delImg.src = './icon.png'
	delWebSiteDialog.classList.remove('active')
	hash[delBtnId] = undefined
	localStorage.setItem('newHash', JSON.stringify(hash))
}
delWebSiteBtnCancel.onclick = function(){
	delWebSiteDialog.classList.remove('active')
}

kbdIcon.forEach(function(iconItem){
	iconItem.onerror = function(){
		this.src = './icon.png'
	}
})