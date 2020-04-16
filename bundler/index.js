window.addEventListener('load', () => {
const request = require('request');
	const HTMLParser = require('node-html-parser');

	const loading = document.querySelectorAll(".loading");
	const totalCases = document.getElementById('total-cases-value');
	const newCases = document.getElementById('new-cases-value');
	const totalDeaths = document.getElementById('total-deaths-value');
	const newDeaths = document.getElementById('new-deaths-value');
	const totalRecovered = document.getElementById('total-recovered-value');
	const testedNegative = document.getElementById('tested-negative-value');
	const remove = document.getElementById('remove');
	const error = document.getElementById('error');
	var flag = 0;


	request('https://www.worldometers.info/coronavirus/', function(err, res, body) {
		if (err) {
			error.className += " anim-err";
			return ;
		}
		const root = HTMLParser.parse(body);
		const table = root.querySelector("#main_table_countries_today tbody");
		table.childNodes.forEach(e => {
			e.childNodes.forEach(d => {
				if (d.nodeType === 1 && d.text === 'Morocco') {
					flag = 1;
					const morocco = d.parentNode;
					let n = parseInt(morocco.childNodes[21].text.replace(',', '')) - parseInt(morocco.childNodes[3].text.replace(',', ''));
					loading.forEach((d) => {
						d.style.display = 'none';
					})
					totalCases.innerHTML = morocco.childNodes[3].text.replace(',', '');
					totalCases.style.display = "block";
					newCases.innerHTML = morocco.childNodes[5].text === '' ? '+0' : morocco.childNodes[5].text;
					newCases.style.display = "block";
					totalDeaths.innerHTML = morocco.childNodes[7].text;
					totalDeaths.style.display = "block";
					newDeaths.innerHTML = morocco.childNodes[9].text === '' ? '+0' : morocco.childNodes[9].text;
					newDeaths.style.display = "block";
					totalRecovered.innerHTML = morocco.childNodes[11].text;
					totalRecovered.style.display = "block";
					testedNegative.innerHTML = n.toString();
					testedNegative.style.display = "block";
					return ;
				}
			})
		})
		if (flag === 0) {
			error.firstChild.innerHTML = 'We couldn\'t retrieve data please try again later.'
			error.className += " anim-err";
			return ;
		}
	})

	remove.onclick = () => {
		remove.parentNode.className = "error";
	}
})