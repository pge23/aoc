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

function isHidden(row, col, map) {
	const height = map[row][col];
	return (map[row].slice(0, col).some(h => h >= height)) && // left
		(map[row].slice(col + 1).some(h => h >= height)) && // right
		(map.map(r => r[col]).slice(0, row).some(h => h >= height)) && // top
		(map.map(r => r[col]).slice(row + 1).some(h => h >= height));  // bottom 
}

function countShorter(height, otherHeights) {
	let count = 0;
	for (const h of otherHeights) {
		count++;
		if (h >= height) {
			break;
		}
	}

	return count;
}

function getScenicScore(row, col, map) {
	const height = map[row][col];
	return countShorter(height, map[row].slice(0, col).reverse()) * // left
		countShorter(height, map[row].slice(col + 1)) * // right
		countShorter(height, map.map(r => r[col]).slice(0, row).reverse()) * // top
		countShorter(height, map.map(r => r[col]).slice(row  + 1)); // bottom
}

async function part1() {
	const map = (await readLines()).map(line => line.split('').map(Number));
	let count = (map.length * 2) + (map[0].length * 2) - 4;
	for (var r = 1; r < map.length - 1; r++) {
		for (var c = 1; c < map[r].length - 1; c++) {
			count += isHidden(r, c, map) ? 0 : 1;
		}
	}

	console.log(count);
}

async function part2() {
	const map = (await readLines()).map(line => line.split('').map(Number));
	const input = (await readLines())[0].split('');
	let highest = 0;	
	for (var r = 1; r < map.length - 1; r++) {
		for (var c = 1; c < map[r].length - 1; c++) {
			highest = Math.max(highest, getScenicScore(r, c, map));
		}
	}

	console.log(highest);
}

part2();
