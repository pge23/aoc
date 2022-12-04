const fs = require('fs/promises');

async function part1() {
	try {
		const data = await fs.readFile('input.txt', { encoding: 'utf8' });
		const lines = data.split(/\r\n|\r|\n/).filter(l => l !== '');

		const count = lines.reduce((acc, cv) => {
			const pairs = cv.split(',').map(p => p.split('-').map(Number));
			const overlap = (pairs[0][0] <= pairs[1][0] && pairs[0][1] >= pairs[1][1])
				|| (pairs[1][0] <= pairs[0][0] && pairs[1][1] >= pairs[0][1]);
			return overlap ? ++acc : acc;
		}, 0);

		console.log(count);

	} catch (err) {
    		console.log(err);
  	}
}

async function part2() {
	try {
		const data = await fs.readFile('input.txt', { encoding: 'utf8' });
		const lines = data.split(/\r\n|\r|\n/).filter(l => l !== '');

		const count = lines.reduce((acc, cv) => {
			const pairs = cv.split(',').map(p => p.split('-').map(Number));
			const overlap = (pairs[0][1] >= pairs[1][0] && pairs[0][0] <= pairs[1][1]);
			return overlap ? ++acc : acc;
		}, 0);

		console.log(count);
	} catch (err) {
    		console.log(err);
  	}
}

part2();
