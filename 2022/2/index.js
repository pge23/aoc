const fs = require('fs/promises');

async function part1() {
	try {
		const data = await fs.readFile('input.txt', { encoding: 'utf8' });
		const lines = data.split(/\r\n|\r|\n/);

		const points = { 'X': 1, 'Y': 2, 'Z': 3 };
		const results = {
			'A' : { 'X': 3, 'Y': 6, 'Z': 0 },
			'B' : { 'X': 0, 'Y': 3, 'Z': 6 },
			'C' : { 'X': 6, 'Y': 0, 'Z': 3 },
		}

		const totalScore = lines.reduce((acc, cv) => {
			if (cv === '') {
				return acc;
			}

			const objects = cv.split(' ');
			const score = Number(results[objects[0]][objects[1]]) + Number(points[objects[1]]);
			return acc + score;
		}, 0);

		console.log(totalScore);
	} catch (err) {
    		console.log(err);
  	}
}

async function part2() {
	try {
		const data = await fs.readFile('input.txt', { encoding: 'utf8' });
		const lines = data.split(/\r\n|\r|\n/);

		const results = { 'X': 0, 'Y': 3, 'Z': 6 };
		const points = {
			'A' : { 'X': 3, 'Y': 1, 'Z': 2 },
			'B' : { 'X': 1, 'Y': 2, 'Z': 3 },
			'C' : { 'X': 2, 'Y': 3, 'Z': 1 },
		}

		const totalScore = lines.reduce((acc, cv) => {
			if (cv === '') {
				return acc;
			}

			const objects = cv.split(' ');
			const score = Number(points[objects[0]][objects[1]]) + Number(results[objects[1]]);
			return acc + score;
		}, 0);

		console.log(totalScore);
	} catch (err) {
    		console.log(err);
  	}
}

part2();
