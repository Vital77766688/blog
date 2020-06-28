const currYear = document.querySelector('#curr-year')
currYear.innerHTML = new Date().getFullYear()


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