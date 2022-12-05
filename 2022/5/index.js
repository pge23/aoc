const fs = require('fs/promises');

const stacks = [
	['V','C','D','R','Z','G','B','W'],
	['G','W','F','C','B','S','T','V'],
	['C','B','S','N','W'],
	['Q','G','M','N','J','V','C','P'],
	['T','S','L','F','D','H','B'],
	['J','V','T','W','M','N'],
	['P','F','L','C','S','T','G'],
	['B','D','Z'],
	['M','N','Z','W']
];

async function part1() {
	try {
		const data = await fs.readFile('input.txt', { encoding: 'utf8' });
		const lines = data.split(/\r\n|\r|\n/).filter(l => l !== '').slice(9);
		lines.forEach(line => {
			const [count, from, to] = Array.from(line.matchAll(/\d+/g))
				.map(e => e[0])
				.map(Number)
				.map((v, index) => index > 0 ? v - 1 : v);

			for (var i = 0; i < count; i++) {
				stacks[to].push(stacks[from].pop());
			}
		});

		console.log(stacks.map(e => e.slice(-1)[0]).join(''));

	} catch (err) {
    		console.log(err);
  	}
}

async function part2() {
	try {
		const data = await fs.readFile('input.txt', { encoding: 'utf8' });
		const lines = data.split(/\r\n|\r|\n/).filter(l => l !== '').slice(9);
		lines.forEach(line => {
			const [count, from, to] = Array.from(line.matchAll(/\d+/g))
				.map(e => e[0])
				.map(Number)
				.map((v, index) => index > 0 ? v - 1 : v);

			stacks[to].push(...stacks[from].splice(-count));
		});

		console.log(stacks.map(e => e.slice(-1)[0]).join(''));

	} catch (err) {
    		console.log(err);
  	}
}

part2();
