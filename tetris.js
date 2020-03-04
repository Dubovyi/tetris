const FIGURES = {
	"I": {
		maxPosition: 2,
		defaultPosition: [
			[[-3, 4], [-3, 5], [-3, 6], [-3, 7]],
			[[-2, 4], [-2, 5], [-2, 6], [-2, 7]],
			[[-1, 4], [-1, 5], [-1, 6], [-1, 7]],
			[[0, 4], [0, 5], [0, 6], [0, 7]]
		],
		positions: {
			1: [
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0]
			],
			2: [
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[0, 0, 0, 0]
			]
		}
	},
	"O": {
		maxPosition: 1,
		defaultPosition: [
			[[-2, 5, 1], [-2, 6, 1]],
			[[-1, 5, 1], [-1, 6, 1]]
		]
	},
	"L": {
		maxPosition: 4,
		defaultPosition: [
			[[-2, 5], [-2, 6], [-2, 7]],
			[[-1, 5], [-1, 6], [-1, 7]],
			[[0, 5], [0, 6], [0, 7]]
		],
		positions: {
			1: [
				[0, 1, 0],
				[0, 1, 0],
				[0, 1, 1]
			],
			2: [
				[0, 0, 0],
				[1, 1, 1],
				[1, 0, 0]
			],
			3: [
				[1, 1, 0],
				[0, 1, 0],
				[0, 1, 0]
			],
			4: [
				[0, 0, 1],
				[1, 1, 1],
				[0, 0, 0]
			]
		}
	},
	"J": {
		maxPosition: 4,
		defaultPosition: [
			[[-2, 5], [-2, 6], [-2, 7]],
			[[-1, 5], [-1, 6], [-1, 7]],
			[[0, 5], [0, 6], [0, 7]]
		],
		positions: {
			1: [
				[0, 1, 0],
				[0, 1, 0],
				[1, 1, 0]
			],
			2: [
				[1, 0, 0],
				[1, 1, 1],
				[0, 0, 0]
			],
			3: [
				[0, 1, 1],
				[0, 1, 0],
				[0, 1, 0]
			],
			4: [
				[0, 0, 0],
				[1, 1, 1],
				[0, 0, 1]
			]
		}
	},
	"S": {
		maxPosition: 2,
		defaultPosition: [
			[[-2, 5], [-2, 6], [-2, 7]],
			[[-1, 5], [-1, 6], [-1, 7]],
			[[0, 5], [0, 6], [0, 7]]
		],
		positions: {
			1: [
				[0, 1, 1],
				[1, 1, 0],
				[0, 0, 0]
			],
			2: [
				[0, 1, 0],
				[0, 1, 1],
				[0, 0, 1]
			]
		}
	},
	"Z": {
		maxPosition: 2,
		defaultPosition: [
			[[-2, 5], [-2, 6], [-2, 7]],
			[[-1, 5], [-1, 6], [-1, 7]],
			[[0, 5], [0, 6], [0, 7]]
		],
		positions: {
			1: [
				[1, 1, 0],
				[0, 1, 1],
				[0, 0, 0]
			],
			2: [
				[0, 1, 0],
				[1, 1, 0],
				[1, 0, 0]
			]
		}
	},
	"T": {
		maxPosition: 4,
		defaultPosition: [
			[[-2, 5], [-2, 6], [-2, 7]],
			[[-1, 5], [-1, 6], [-1, 7]],
			[[0, 5], [0, 6], [0, 7]]
		],
		positions: {
			1: [
				[0, 1, 0],
				[1, 1, 1],
				[0, 0, 0]
			],
			2: [
				[0, 1, 0],
				[0, 1, 1],
				[0, 1, 0]
			],
			3: [
				[0, 0, 0],
				[1, 1, 1],
				[0, 1, 0]
			],
			4: [
				[0, 1, 0],
				[1, 1, 0],
				[0, 1, 0]
			]
		}
	}
};

function createFigure(fieldWidth) {
	let randomFigure = Math.floor(Math.random() * 7);
	let figuresArray = ["I", "O", "L", "J", "S", "Z", "T"];

	let figure = FIGURES[figuresArray[randomFigure]];
	let figurePosition = Math.floor(Math.random() * figure.maxPosition) + 1;
	let fieldCenter = Math.ceil(fieldWidth / 2);
	let figureWidth = figure.defaultPosition[0].length;
	let firstYCoordinateFigure = Math.floor(fieldCenter - (figureWidth / 2));

	let resultFigure = [];

	for (let i = 0; i < figure.defaultPosition.length; i++) {
		if (!resultFigure[i]) resultFigure[i] = [];
		let yCoordinate = firstYCoordinateFigure;

		for (let j = 0; j < figure.defaultPosition[i].length; j++) {
			resultFigure[i][j] = figure.defaultPosition[i][j].slice();

			if (figure.maxPosition !== 1) {
				resultFigure[i][j][2] = figure.positions[figurePosition][i][j];
			}

			resultFigure[i][j][1] = yCoordinate;
			yCoordinate += 1;
		}
	}

	return {coords: resultFigure, position: figurePosition, figureName: figuresArray[randomFigure]};
}

function cicle (arr, cb) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			cb(i, j);
		}
	}
}

function debounceDelay(func, delay, maxDelay) {
	let timeoutId = null;
	let lastTime = Date.now();

	return function () {
		let args = arguments;

		if ( timeoutId ) {
			clearTimeout(timeoutId);
		}
		if ( Date.now() - lastTime > maxDelay ) {
			lastTime = Date.now();
			func.apply(func, args);
		}
		else {
			timeoutId = setTimeout(() => {
				func.apply(func, args);
			}, delay);
		}
	};
}

class Tetris {
	config = {
		fieldSelector: '#tetris .field',
		field: [],
		fieldSize: {
			x: 22,
			y: 13
		},
		timer: null,
		score: 0,
	};

	figure = {
		coords: [],
		position: 1,
		name: "",
		create: () => {
			let figure = createFigure(this.config.fieldSize.y);
			this.figure.coords = figure.coords;
			this.figure.position = figure.position;
			this.figure.name = figure.figureName;
		},
		destroy: () => {
			this.figure.coords = [];
		},
		touched: (condition) => {
			let result = false;

			cicle(this.figure.coords, (row, col) => {
				if (result) return;

				let figureRow = this.figure.coords[row][col][0];
				let figureCol = this.figure.coords[row][col][1];
				let figureColValue = this.figure.coords[row][col][2]; // 1 = filled | 0 = empty
				let lastFieldRow = this.config.fieldSize.x - 1;
				let lastFieldCol = this.config.fieldSize.y - 1;
				let nextFieldRow = this.config.field[figureRow + 1];


				if (condition) {
					if(figureColValue !== 1) return;

					if (condition === "left" && figureCol === 0) {
						result = true;
					} else if (condition === "left" && figureRow >= 0 && figureRow <= lastFieldRow && this.config.field[figureRow][figureCol - 1]) {
						result = true;
					} else if (condition === "right" && figureCol === lastFieldCol) {
						result = true;
					} else if (condition === "right" && figureRow >= 0 && figureRow <= lastFieldRow && this.config.field[figureRow][figureCol + 1]) {
						result = true;
					} else if (condition === "rotate" && figureRow >= 0 && figureRow <= lastFieldRow && figureColValue === this.config.field[figureRow][figureCol]) {
						result = true;
					}
				}else{
					if (figureColValue === 1 && !nextFieldRow && figureRow >= 0) {
						result = true;
					} else if (figureColValue === 1 && nextFieldRow && figureRow >= 0 && nextFieldRow[figureCol]) {
						result = true;
					} else if (figureColValue === 0 && figureRow === lastFieldRow) {
						result = false
					}
				}
			});

			return result;
		},
		nextStep: () => {
			cicle(this.figure.coords, (x, y) => {
				let arr = this.figure.coords[x][y];
				arr[0] += 1; // move to 1 row down
			});

		},
		saveFigure: () => {
			cicle(this.figure.coords, (x, y) => {
				let arr = this.figure.coords[x][y];
				let figureRow = arr[0];
				let figureCol = arr[1];
				let figureVal = arr[2];

				if (figureRow >= 0 && figureCol >= 0 &&
					figureRow <= this.config.fieldSize.x - 1 &&
					figureCol <= this.config.fieldSize.y - 1 &&
					!this.config.field[figureRow][figureCol] &&
					figureVal === 1
				) {
					this.config.field[figureRow][figureCol] = figureVal;
				}
			});

		},
		move: () => {
			if (!Array.isArray(this.figure.coords) || this.figure.coords.length === 0) {
				this.figure.create();
			}

			if(this.figure.touched()){
				this.figure.saveFigure(this.figure.coords[0], this.figure.coords[1]);

				this.checkFullLine();

				if (this.checkGameOver()) {
					clearInterval(this.config.timer);
					alert('game over');
				} else {
					this.figure.destroy();
				}
			}else{
				this.figure.nextStep();
			}
		},
		moveRight: () => {
			if (!this.figure.touched("right")) {
				cicle(this.figure.coords, (x, y) => {
					this.figure.coords[x][y][1] += 1; // move to 1 col right
				});
				this.render();
			}
		},
		moveLeft: () => {
			if (!this.figure.touched("left")) {
				cicle(this.figure.coords, (x, y) => {
					this.figure.coords[x][y][1] -= 1; // move to 1 col left
				});
				this.render();
			}
		},
		rotateFigure: () => {
			let figureModel = FIGURES[this.figure.name];

			if (figureModel.maxPosition === 1) {
				return;
			}

			if (this.figure.position < figureModel.maxPosition) {
				this.figure.position += 1;
			} else if (this.figure.position === figureModel.maxPosition) {
				this.figure.position = 1;
			}

			let columnDifference = 0;
			let figureCoords = this.figure.coords;

			let oldCoords = this.figure.copyCoords();

			cicle(figureCoords, (row, col) => {
				figureCoords[row][col][2] = figureModel.positions[this.figure.position][row][col];

				if (figureCoords[row][col][1] < 0 && figureCoords[row][col][1] < columnDifference) {
					columnDifference = figureCoords[row][col][1];
				}

				if (figureCoords[row][col][1] > this.config.fieldSize.y - 1) {
					let diff = figureCoords[row][col][1] - (this.config.fieldSize.y - 1);
					if (columnDifference < diff) columnDifference = diff;
				}
			});

			if (columnDifference < 0) {
				let diff = columnDifference * -1;

				cicle(figureCoords, (row, col) => {
					figureCoords[row][col][1] = figureCoords[row][col][1] + diff;
				});
			} else if (columnDifference > 0) {
				cicle(figureCoords, (row, col) => {
					figureCoords[row][col][1] = figureCoords[row][col][1] - columnDifference;
				});
			}

			if (this.figure.touched("rotate")) {
				this.figure.coords = this.figure.copyCoords(oldCoords);
			}

			this.render();
		},
		checkCoords: (row, col) => {
			let result = false;

			cicle(this.figure.coords, (x, y) => {
				let figureRow = this.figure.coords[x][y][0];
				let figureCol = this.figure.coords[x][y][1];
				let figureVal = this.figure.coords[x][y][2];

				if (row === figureRow && col === figureCol && figureVal === 1) {
					result = true;
				}
			});

			return result;
		},
		copyCoords: (arr) => {
			if (!arr) arr = this.figure.coords;

			let copyCoords = [];

			for (let i = 0; i < arr.length; i++) {
				if (!copyCoords[i]) copyCoords[i] = [];

				for (let j = 0; j < arr[i].length; j++) {
					copyCoords[i][j] = arr[i][j].slice();
				}
			}

			return copyCoords;
		}
	};

	getFieldElement = () => document.querySelector(this.config.fieldSelector);

	calcAndRenderScore = (amountLines) => {
		this.config.score += this.config.fieldSize.y * amountLines * amountLines;
		document.getElementById('score_value').innerText = this.config.score;
	};

	removeFullLine = (lines) => {
		lines.forEach(i => {
			this.config.field.splice(i, 1);
			this.config.field.unshift([]);
		});

		this.calcAndRenderScore(lines.length);
	};

	checkFullLine = () => {
		let lineIndices = [];

		let currentRow = 0;
		let countFilledColumns = 0;

		cicle(this.config.field, (row, col) => {
			if (row !== currentRow) {
				currentRow = row;
				countFilledColumns = 0;
			}
			if (row === currentRow && this.config.field[row][col] === 1) {
				countFilledColumns += 1;
			}

			if (countFilledColumns === this.config.fieldSize.y) {
				lineIndices.push(row);
			}

		});

		if (lineIndices.length > 0) {
			this.removeFullLine(lineIndices);
		}
	};

	checkGameOver = () => {
		let result = false;

		for (let i = 0; i < this.figure.coords[0].length; i++) {
			let x = this.figure.coords[0][i][0];
			if (x <= 0) {
				result = true;
			}
		}

		return result
	};

	tick = () => {
		this.config.timer = setInterval(() => {
			this.figure.move();
			this.render();
		}, 500);
	};

	render = () => {
		let fieldHtml = '';
		this.getFieldElement().innerHTML = fieldHtml;

		for (let x = 0; x < this.config.fieldSize.x; x++) {
			fieldHtml += '<div class="row">';

			for (let y = 0; y < this.config.fieldSize.y; y++) {
				if (this.config.field[x][y] || this.figure.checkCoords(x, y)) {
					fieldHtml += '<div class="cell filled"></div>';
				} else {
					fieldHtml += '<div class="cell empty"></div>';
				}
			}
			fieldHtml += '</div>';
		}
		this.getFieldElement().innerHTML = fieldHtml;
	};

	createField = () => {
		for (let x = 0; x < this.config.fieldSize.x; x++) {
			if (!this.config.field[x]) {
				this.config.field[x] = [];
			}
			for (let y = 0; y < this.config.fieldSize.y; y++) {
				this.config.field[x][y] = 0;
			}
		}
	};

	onKeyDown = (event) => {
		if (event.code.toLocaleLowerCase() === 'arrowright') {
			this.figure.moveRight();
		} else if (event.code.toLocaleLowerCase() === 'arrowleft') {
			this.figure.moveLeft();
		} else if (event.code.toLocaleLowerCase() === 'arrowup') {
			this.figure.rotateFigure();
		} else if (event.code.toLocaleLowerCase() === 'arrowdown') {
			this.figure.move();
			this.render();
		}
	};

	startGame = (event) => {
		event.currentTarget.classList.add('hidden');
		this.tick();
		window.addEventListener('keydown', debounceDelay(this.onKeyDown, 20, 100));

	};

	init = () => {
		this.createField();
		this.render();

		let tetrisElement = document.getElementById('tetris');
		let buttonStart = document.createElement('button');
		buttonStart.classList.add('button_start');
		buttonStart.innerText = 'Start game';
		tetrisElement.appendChild(buttonStart);
		buttonStart.addEventListener('click', this.startGame);
	};
}

let tetris = new Tetris();

tetris.init();