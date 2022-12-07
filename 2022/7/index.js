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

function buildFilesystem(lines) {
	const nav = [];
	const root = { kids: [] };	
	let currentDir = null;

	lines.forEach(line => {
		const cmd = line.match(/\$\s+(cd|ls)\s?([\w\/\.]*)/);
		if (cmd) {
			const [_, opr, param] = cmd;
			if (opr === 'cd'){ 
				if (param === '/'){
					currentDir = root;	
				} 
				else if (param === '..') {
					currentDir = nav.pop();
				} else {
					nav.push(currentDir);
					currentDir = currentDir.kids[param];
				}
			} 

			return;
		}

		const dir = line.match(/dir\s+(\w+)/);
		if (dir) {
			const [_, name] = dir;
			currentDir.kids[name] = { kids: [] };
			return;
		}

		const file = line.match(/(\d+)\s+([\w\.]+)/);
		if (file) {
			const  [_, size, name] = file;
			currentDir.kids[name] = { size: Number(size) };
			return;
		}

		throw `Unable to parse: ${line}`;
	});

	return root;
}

async function part1() {
	const lines = await readLines();
	const root = buildFilesystem(lines);
	const allFolders = [root, ...findFolders(root)];
	const totalSize = allFolders.map(computeSize).filter(s => s <= 100000).reduce((acc, cv) => acc + cv, 0);
	console.log(totalSize);
}

function findFolders(root) {
	const folders = Object.values(root.kids).filter(k => k.kids); 
	return [...folders, ...folders.map(findFolders).flat()];
}

function computeSize(root) {
	if (!root.kids) {
		return Number(root.size);
	}

	 return Object.values(root.kids).reduce((acc, k) => {
		return (k.kids ? computeSize(k) : Number(k.size)) + acc;
	}, 0);
}

async function part2() {
	const lines = await readLines();
	const root = buildFilesystem(lines);
	const allFolders = [...findFolders(root)];
	const currentSize = computeSize(root);
	const free = 70000000 - currentSize;
	const toFree = 30000000 - free;
	const allSizes = allFolders.map(computeSize).sort((a,b) => b - a);
	const smallest = allSizes.find(s => s < toFree);
	console.log(allSizes[allSizes.indexOf(smallest) - 1]);
}

part2();
