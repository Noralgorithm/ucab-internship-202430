export function pascalToSentenceLikeCase(str: string): string {
	return str
		.replace(
			/([A-Z]+)([A-Z][a-z])/g,
			(_, p1, p2) => ` ${p1} ${p2.toLowerCase()}`
		)
		.replace(/([a-z\d])([A-Z])/g, (_, p1, p2) => `${p1} ${p2.toLowerCase()}`)
		.replace(/([a-z])(\d)/g, '$1 $2')
		.replace(/([^A-Za-z\s])([A-Za-z])/g, '$1 $2')
		.replace(/(\s[A-Z]\s|\s[A-Z]$)/g, (str) => str.toLowerCase())
		.trim()
}
/* Test Cases:
document.body.appendChild(document.createTextNode(camelPad("EYDLessThan5Days")));
document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createTextNode(camelPad("LOLAllDayFrom10To9")));
document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createTextNode(camelPad("ILikeToStayUpTil9O'clock")));
document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createTextNode(camelPad("WhatRYouDoing?")));
document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createTextNode(camelPad("WhereRYouFrom?AreUFromThere?")));
document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createTextNode(camelPad("ABC")));
document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createTextNode(camelPad("ABCDEF")));
*/
