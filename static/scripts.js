const currYear = document.querySelector('#curr-year')
currYear.innerHTML = new Date().getFullYear()


const navMenuList = document.querySelector('.nav-menu-list')
const searchForm = document.querySelector('.search-form')
const searchIcon = document.querySelector('.search-icon')

searchIcon.onclick = () => {
	navMenuList.classList.toggle('shrinked')
	searchForm.classList.toggle('expanded')
	if (searchIcon.querySelector('i').classList.contains('fa-search')) {
		searchIcon.querySelector('i').classList.remove('fa-search')
		searchIcon.querySelector('i').classList.add('fa-chevron-right')
	} else {
		searchIcon.querySelector('i').classList.add('fa-search')
		searchIcon.querySelector('i').classList.remove('fa-chevron-right')
	}
}


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
	]
	const chart = anychart.tagCloud(data)
	chart.angles([0])
	chart.container('tag-cloud')
	chart.listen('pointClick', e => {
		window.open(`${window.location.href}#${e.point.get('x')}`, '_self')
	})
	chart.draw()
})