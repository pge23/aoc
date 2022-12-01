const fs = require('fs/promises');

async function run() {
	try {
		const data = await fs.readFile('input.txt', { encoding: 'utf8' });
		const lines = data.split(/\r\n|\r|\n/);

		let tempMostCalories = 0;
		lines.reduce((acc,cv) => {
			if (cv === '') {
				tempMostCalories = Math.max(acc, tempMostCalories);
				return 0;
			}

			return Number(cv) + acc;
		}, 0);
	
		console.log(tempMostCalories);
	} catch (err) {
    		console.log(err);
  	}
}

async function run2() {
	try {
		const data = await fs.readFile('input.txt', { encoding: 'utf8' });
		const lines = data.split(/\r\n|\r|\n/);

		let groupIndex = 0;
		const grouped = lines
			.reduce((acc,cv) => {
				if (cv === '') {
					groupIndex++;
					acc[groupIndex] = 0;
				} else {
					acc[groupIndex] += Number(cv);
				}

				return acc;
			}, [0])
			.sort((a, b) => (b - a))
			.splice(0, 3)
			.reduce((acc, cv) => acc + cv, 0);
	
		console.log(grouped);
	} catch (err) {
    		console.log(err);
  	}
}

run2();
