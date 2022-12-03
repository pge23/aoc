const fs = require('fs/promises');

async function part1() {
	try {
		const data = await fs.readFile('input.txt', { encoding: 'utf8' });
		const lines = data.split(/\r\n|\r|\n/).filter(l => l !== '');

		const sum = lines.reduce((acc, cv) => {
			cv = cv.split('');
			const c1 = cv.slice(0, cv.length / 2);
			const c2 = cv.slice(cv.length / 2);
			const dupe = c1.filter(i => c2.indexOf(i) !== -1);

			const charCode = dupe[0].charCodeAt(0);
			
			const priority = charCode > 90 ? charCode - 96: (charCode - 64) + 26;

			return acc + priority;
		}, 0);

		console.log(sum);

	} catch (err) {
    		console.log(err);
  	}
}

async function part2() {
	try {
		const data = await fs.readFile('input.txt', { encoding: 'utf8' });
		const lines = data.split(/\r\n|\r|\n/).filter(l => l !== '');

		let total = 0;
		for (let i = 0; i < lines.length; i += 3) {
			const r1 = lines[i].split('');
			const r2 = lines[i + 1].split('');
			const r3 = lines[i + 2].split('');
			const dupe = r1.filter(c => r2.indexOf(c) !== -1 && r3.indexOf(c) !== -1);
			const charCode = dupe[0].charCodeAt(0);
			const priority = charCode > 90 ? charCode - 96: (charCode - 64) + 26;
			total += priority;
		}
		console.log(total);
	} catch (err) {
    		console.log(err);
  	}
}

part2();
