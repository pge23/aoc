const fs = require('fs/promises');

async function readLines() {
	try {
		const data = await fs.readFile('input.txt', { encoding: 'utf8' });
		const lines = data.split(/\r\n|\r|\n/).filter(l => l !== '');
		return lines;
	} catch (err) {
    		console.log(err);
		return [];
  	}
}

async function part1() {
	const input = (await readLines())[0].split('');
	
	for (var i = 0; i < input.length; i++) {
		const temp = input.slice(i, i + 4);
		const set = new Set(temp);
		if (set.size == 4){
			console.log(temp.join(''));
			console.log(i + 4);
			break;
		}
	}
}

async function part2() {
	const input = (await readLines())[0].split('');
	
	for (var i = 0; i < input.length; i++) {
		const temp = input.slice(i, i + 14);
		const set = new Set(temp);
		if (set.size == 14){
			console.log(temp.join(''));
			console.log(i + 14);
			break;
		}
	}
}

part2();
