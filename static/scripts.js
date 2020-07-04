const currYear = document.querySelector('#curr-year')
currYear.innerHTML = new Date().getFullYear()


function is_touch_device4() {
    
    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    
    const mq = function (query) {
        return window.matchMedia(query).matches;
    }

    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}


function getChildren(from, where) {
	for (let el in from) {
		if (typeof from[el] === 'object') {
			where.push(from[el])
			if (from[el].children.length > 0) {
				where = getChildren(from[el].children, where)
			}
		}
	}
	return where
}


const body = document.querySelector('body')

if (is_touch_device4()) {
	body.classList.add('touch')
} else {
	body.classList.add('mouse')
}

const navSpoiler = document.querySelector('.nav-menu-list-spoiler')
const navSpoilerList = navSpoiler.querySelector('.nav-menu-list-spoiler-list')
function checkNavSpoiler() {
	if (navSpoilerList.children.length > 0) {
		navSpoiler.style.display = 'block'
	} else {
		navSpoiler.style.display = 'none'
	}
}
checkNavSpoiler()


let navSpoilerListChildren = []
navSpoilerListChildren = getChildren(navSpoilerList.children, navSpoilerListChildren) 

const navSpoilerLink = navSpoiler.querySelector('.nav-menu-list-spoiler-link')
navSpoilerLink.onclick = e => {
	e.preventDefault()
	navSpoiler.classList.toggle('active')
}

const searchForm = document.querySelector('.search-form')
const searchFormInput = searchForm.querySelector('input')
const searchFormIcon = searchForm.querySelector('i')

let searchFormChildren = [] 
searchFormChildren = getChildren(searchForm.children, searchFormChildren)

searchFormInput.addEventListener('focus', () => {
	searchForm.classList.add('focus')
})
searchFormInput.addEventListener('blur', () => {
	searchForm.classList.remove('focus')
})
searchFormIcon.addEventListener('click', () => {
	searchForm.classList.toggle('active')
	if (searchFormIcon.classList.contains('fa-search')) {
		searchFormIcon.classList.remove('fa-search')
		searchFormIcon.classList.add('fa-times')
	} else {
		searchFormIcon.classList.add('fa-search')
		searchFormIcon.classList.remove('fa-times')
	}
})

window.addEventListener('click', e => {
	if (e.target != searchFormIcon
	 && !searchFormChildren.includes(e.target)) {
		searchForm.classList.remove('active')
		searchFormIcon.classList.add('fa-search')
		searchFormIcon.classList.remove('fa-times')
	}

	if (e.target != navSpoilerLink
	 && !navSpoilerListChildren.includes(e.target)) {
		navSpoiler.classList.remove('active')
	}
})

const daElements = document.querySelectorAll('[data-da]')
const elements = []


daElements.forEach(element => {
	const data = element.dataset.da.split(',')
	elements.push(
		{'element': element,
	     'where': document.querySelector(`.${data[0]}`),
	     'new_index': data[1],
	 	 'breakpoint': data[2],
	 	 'current': element.parentNode,
	 	 'current_index': Array.from(element.parentNode.children).indexOf(element)}
	)
})

dynamicAdapt(elements)


function dynamicAdapt(elements) {
	elements.forEach(element => {
		const listener = e => {
			let index = 0
			if (element.new_index === 'first') {
				index = 0
			} else if(element.new_index === 'last') {
				index = element.where.children.length
			} else {
				index = element.new_index
			}
			element.where.insertBefore(element.element, element.where.children[index])
			swapElementPosition(element)	
			checkNavSpoiler()		
		}
		const matchMedia = window.matchMedia(`(max-width: ${element.breakpoint}px)`)
		matchMedia.addListener(listener)
		if (matchMedia.matches) {
			listener()
		}
	})
	return false
}

function swapElementPosition(element) {
	const buffWhere = element.current
	const buffNewIndex = element.current_index
	element.current = element.where
	element.current_index = element.new_index
	element.where = buffWhere
	element.new_index = buffNewIndex
}


const archiveMonths = document.querySelectorAll('.archive-month')
archiveMonths[0].style.maxHeight = archiveMonths[0].scrollHeight + 'px'
archiveMonths.forEach(archiveMonth => {
	const link = archiveMonth.previousElementSibling
	link.onclick = e => {
		e.preventDefault()
		archiveMonth.classList.toggle('expanded')
		if (archiveMonth.style.maxHeight) {
			archiveMonth.style.maxHeight = null
		} else {
			archiveMonth.style.maxHeight = archiveMonth.scrollHeight + 'px'
		}
		archiveMonths.forEach(am => {
			if (am != archiveMonth) {
				am.classList.remove('expanded')
				am.style.maxHeight = null
			}
		})
	}
})

anychart.onDocumentReady(() => {
	const data = [
		{'x': 'Tag1', 'value': 5},
		{'x': 'Tag2', 'value': 5},
		{'x': 'Tag3', 'value': 2},
		{'x': 'Tag4', 'value': 1},
		{'x': 'Tag5', 'value': 1},
		{'x': 'Tag7', 'value': 3},
		{'x': 'Tag8', 'value': 4},
		{'x': 'Tag9', 'value': 3},
	]
	const chart = anychart.tagCloud(data)
	chart.angles([0])
	chart.container('tag-cloud')
	chart.listen('pointClick', e => {
		window.open(`${window.location.href}#${e.point.get('x')}`, '_self')
	})
	chart.draw()
})