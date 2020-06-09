/* ****************************************************************************
*** Console Game "Tic-tac-toe. Man against PC." *******************************
*** (c) Program code author by Sergei Merkoev, 2020 year. *********************
*** Консольная игра "Крестики-нолики. Человек против ПК. " ********************
*** (c) Автор кода программы Сергей Меркоев, 2020 г. **************************
**************************************************************************** */

// Создаём матрицу полей игры ------------------------------------------------: 
let fieldsMatrix = [
	"N", 
	".", ".", ".", 
	".", ".", ".", 
	".", ".", "." 
]; // P.S. Вместо точек, можно поставить "пробелы". 

// Инициализируем служебные переменные ---------------------------------------: 

// Переменные счётчиков: 
var i = 0, j = 0, n = 0; 

// Победитель по-умолчанию: 
var winner = 'none'; 

// Число занятых полей: 
var numOfOccFlds = 0; 

// Текущий маркер поля (" " or "X" or "0"): 
var markField = ' '; 

// Триггер ранее отмеченного поля: 
var fieldAlreadyMarked = false; 

// Триггер нахождения свободного поля: 
var freeFieldFound = false; 

// Проверка на ввод цифры: 
var isNum = false; 

// Инициализируем случайное значение (выбор AI): 
var randNum = 0; 

// Инициализируем переменную начала игры: 
var isGameStart = true; 

// Инициализируем триггер диалога выхода из игры: 
var onExit = false; 

// Триггер окончания игры: 
var isGameOver = false; 

// Инициализируем массив и переменные для определения победителя -------------: 

// Значение текущего узла для анализа: 
var isNode = 'N'; 

// Мини-счётчики узлов: 
var numOfNodesHum = 0, numOfNodesComp = 0;

// Мини-счётчики линий захваченных за партию: 
var numOfLinesHumAll = 0, numOfLinesCompAll = 0;

// Ициниализируем массивы узлов линий: 
let fldsLineOne = ['N']; 
let fldsLineTwo = ['N']; 
let fldsLineThree = ['N']; 
let fldsLineFour = ['N']; 
let fldsLineFive = ['N']; 
let fldsLineSix = ['N']; 
let fldsLineSeven = ['N']; 
let fldsLineEight = ['N']; 

/* **************************************************************************** 
***** Правила игры: *********************************************************** 
**************************************************************************** */

console.log(' ');
console.log('******************************************************');
console.log(' ');
console.log('Консольная игра "Крестики-нолики. Человек против ПК. "');
console.log(' ');
console.log('******************************************************');
console.log(' ');
console.log('##################################################'); // 50
console.log(' ');
console.log('###################   Правила Игры: '); 
console.log('#     |     |     #'); 
console.log('#  B  |  O  |  T  #   Ходите по-очереди с AI!'); 
console.log('# ___ | ___ | ___ #   Просто, поочерёдно нажимайте '); 
console.log('#     |     |     #   любые цифры от 1 до 9 + Enter'); 
console.log('#  V  |  S  |  .  #   Каждому полю соответсвует цифра: '); 
console.log('# ___ | ___ | ___ #   левое-верхнее - цифра 1, '); 
console.log('#     |     |     #   нижнее-правое - цифра 9. '); 
console.log('#  H  |  U  |  M  #'); 
console.log('#     |     |     #   Закрыть программу: CTRL + C'); 
console.log('###################'); 
console.log(' ');
console.log('##################################################'); // 50

/* **************************************************************************** 
***** Начало игры: ************************************************************
**************************************************************************** */
console.log(' '); 
console.log('Готовы начать игру? (Y/N)'); 
console.log(' '); 

// Подключаем модуль чтения стороки: 
var readline = require('readline'); 
rl = readline.createInterface(process.stdin, process.stdout); 

// Позволяем ввод команды (нажатие клавиши): 
rl.prompt(); 

// Обрабатываем ввод команды (при нажатии клавиши): 
rl.on('line', function (line){
	
	// Тест ввода символа: 
	// console.log('Вы ввели: ' + line.trim()); // FOR TESTS. 

	// В зависимости от ввода символа: 
	if ((line.trim() == 'N') || (line.trim() == 'n')) {

		// Если это отменённый выход из Игры, то предлагаем старт игры: 
		if (onExit == true) {
			
			// Отменяем попытку выхода из игры: 
			onExit = false; 
			
			console.log(' '); 
			console.log('Готовы начать/продолжить игру? (Y/N)'); 
			console.log(' '); 
			
		} else {
			
			// На выход из игры: 
			onExitOfTheGame(0); 
			
		} 
		
	} else if ((line.trim() == 'Y') || (line.trim() == 'y')) {
		
		// Узнаём, хочет ли Человек начать новую игру: 
		if (isGameOver) {
			
			// Обновляем матрицу полей игры: 
			fieldsMatrix = [
				"N", 
				".", ".", ".", 
				".", ".", ".", 
				".", ".", "." 
			]; // P.S. Вместо точек, можно поставить "пробелы". 
			
			// Обнуляем число занятых полей: 
			numOfOccFlds = 0; 
			
			// Обновляем переменную начала игры: 
			isGameStart = true; 
			
		} else {
			
			// Если вместо нажатия цифры сделан ход "Y", при уже начатой игре: 
			if (isGameStart == false) {
				
				// Сообщаем процессору, что введено "Y" вместо цифры: 
				isNum = false; 
				
				console.log(' '); 
				console.log('Вы уже начали игру! Введите цифру! '); 
				console.log(' '); 
			
			} 
		
		} // При случайном нажатии "Y". 
		
		// Если это не выход из игры, то старт игры: 
		if (onExit == false) {
			
			// Старт/продолжение игры: 
			gameProcess(0); 
			
		} else {
			
			// Выход из игры: 
			exitTheGame(0); 
			
		}
		
	} else {
		
		// Обязательная проверка, что введено не пустое значение: 
		if (line.trim() != '') {
			
			// Обязательно преобразуем строку в число: 
			keyNum = Number(line.trim()); 
			
			// Проверка, введена цифра или символ: 
			switch (keyNum) {
				case 0 : isNum = false; break; 
				case 1 : isNum = true; break; 
				case 2 : isNum = true; break; 
				case 3 : isNum = true; break; 
				case 4 : isNum = true; break; 
				case 5 : isNum = true; break; 
				case 6 : isNum = true; break; 
				case 7 : isNum = true; break; 
				case 8 : isNum = true; break; 
				case 9 : isNum = true; break; 
				default: isNum = false; 
			}
			
			// Если сделан ход, при старте игры: 
			if (isGameStart == false) {
			
				// Если введена цифра (ключ поля): 
				if (isNum) {
					
					// Чтобы случайно НЕ выйти из игры после нажатия "n" + "цифра" + "Y": 
					onExit = false; // Защита от случайного выхода. 
					
					// Вызов игрового процессора с передачей введённого номера поля: 
					gameProcess(line.trim()); 

					// Обновляем триггер: 
					isNum = false; 
					
				} else {
					
					// Если ещё есть свободные поля: 
					if (numOfOccFlds != 9) {
					
						console.log(' '); 
						console.log('Вы ввели: "' + line.trim() + '" Введите цифру (от 1 до 9)!'); 
						console.log(' '); 
					
					} else {

						console.log(' '); 
						console.log('Игра подошла к концу!... '); 
						console.log(' '); 				
						
						// На выход из игры: 
						onExitOfTheGame(0); 
						
					} 
					
				} // Если введённый символ НЕ цифра. 
				
			} else {
				
				// На выход из игры: 
				onExitOfTheGame(0); 
				
			}
		
		} else {
			
			console.log(' '); 
			console.log('Вы ничего не ввели...'); 
			console.log(' '); 
			
		} // END Обязательная проверка, что введено не пустое значение -------. 
		
	} // Обрабатываем ввод сиволов. 
	
}).on('close', function () {
	
	console.log(' ');
	console.log('Вы закрыли игру!');
	console.log(' ');
	
	// Выходим из программы: 
	process.exit(0); 
	
}); // Выход из программы (CTRL + C). 

// Игровой процессор: --------------------------------------------------------: 
function gameProcess(n) {

	// Если это самое начало игры: 
	if (isGameStart) {

		// Запоминаем, что игра начата (т.е. далее будет продолжение (НЕ начало)). 
		isGameStart = false; 

		// Запускаем рендер: 
		graphConv(0); 

		// Задаём контрольный ключевой вопрос: 
		console.log(' '); 
		console.log('Ваш первый ход. Введите число - номер поля!'); 
		console.log(' '); 
		
	} else {

		// Если это продолжение игры: 
		// console.log('Вы ввели: ' + n); // Тест ввода символа. 

		// Если введена цифра, а НЕ иной символ: 
		if (isNum) {

			// Приобразуем строку в число: 
			keyNum = Number(n);

			// Циклом перебираем матрицу полей: 
			for (i = 9; i >= 0; i--) {
				
				// Смотрим соответствующее введённому номеру поле и заполняем его маркером: 
				if (i == keyNum) {

					// Получаем текущий маркер поля (" " or "X" or "0"): 
					markField = fieldsMatrix[i]; 
					
					// Если данное поле уже ранее отмечено: 
					if ((markField == 'X') || (markField == '0')) {
						
						// Срабатываем триггер ('поле занято'): 
						fieldAlreadyMarked = true; // - поле занято. 
						
					} else {
					
						// Если выбранное поле НЕ ЗАНЯТО, т.е. пустое (or ' ' - имеет пробел, or "."): 
						
						// Ставим маркер Человека (X - крестик): 
						fieldsMatrix[i] = 'X'; 

						// Прибавляем к числу занятых полей ещё одно: 
						numOfOccFlds++; 
						
					} // Если выбранное поле НЕ ЗАНЯТО. 

				} // Занимаем соответствующее поле. 
				
			} // Циклом перебираем матрицу полей. 

			// Если поле ещё не отмечалось: 
			if (fieldAlreadyMarked == false) { 
				
				// Герерим ход компьютера:  
				artInt(0); 
				
				// Запускаем рендер: 
				graphConv(n); 
				
				// Если есть пустые (незанятые) поля: 
				if (numOfOccFlds != 9) {

					// Задаём следующий ключевой вопрос: 
					console.log(' ');
					console.log('Ок, Ваш следующий ход. Введите новое число - номер поля!'); 
					console.log(' '); 
				
				} else {
					
					console.log(' ');
					console.log('Человек захватил линий: ' + numOfLinesHumAll); 
					console.log(' ');
					console.log('Компьютер захватил линий: ' + numOfLinesCompAll); 
					
					// В конце каждой партии показываем результат: 
					if (winner != 'none') {
						console.log(' ');
						console.log('Игра окончена! Победил ' + winner); 
						console.log(' '); 
					} else {
						console.log(' ');
						console.log('Игра окончена! Ничья... '); 
						console.log(' '); 
					}
					
					// Обнуляем мини-счётчики линий захваченных за партию: 
					numOfLinesHumAll = 0; numOfLinesCompAll = 0; 
					
					// Предлагаем сыграть ещё партию: 
					console.log('Хотите продолжить игру? (Y/N)'); 
					console.log(' '); 
					
				} 

			} else {
				
				graphConv(0); 
				
				// Если ещё есть свободные поля: 
				if (numOfOccFlds != 9) {
				
					console.log(' '); 
					console.log('Поле уже занято! Выберите другое (введите цифру)!'); 
					console.log(' '); 
					
				} else {

					console.log(' '); 
					console.log('Игра подошла к концу! '); 
					console.log(' '); 			
					
					// На выход из игры: 
					onExitOfTheGame(0); 
					
				}
				
				// Возращаем триггер в ожидание: 
				fieldAlreadyMarked = false; // - поле НЕ занято. 
				
			} // END Если поле уже занято. 

		} // Если введена цифра (ход - номер поля). 

	} // END Если это продолжение игры. 

} // END Игровой процессор:  -------------------------------------------------. 

// Искусственный интеллект: --------------------------------------------------: 
function artInt(j) {

	// Если ещё есть свободные поля: 
	if (numOfOccFlds != 9) {

		// Проверяем занятость полей и отмечаем свободное: 

		// Триггер 'свободное поле ещё НЕ найдено': 
		freeFieldFound = false; 

		// Получаем случайный вариант (цифру от 1 до 9): 
		randNum = Math.floor(Math.random() * 9) + 1;  // returns a random integer from 1 to 9

		// Циклом перебираем матрицу полей: 
		for (i = 9; i >= 1; i--) {
			
			// Смотрим соответствующее полученному номеру поле и заполняем его маркером: 
			if (i == randNum) {
				
				// Получаем текущий маркер поля (" " or "X" or "0"): 
				markField = fieldsMatrix[randNum]; 
				
				// Если данное поле уже ранее отмечено: 
				if ((markField == 'X') || (markField == '0')) {
					
				// Возвращаемся сразу к началу поиска (начиная с 9-го поля): 
				i = 10; // Именно 10 т.к. при новой итерации будет -- 
				
				// Получаем новый случайный вариант (цифру от 1 до 9): 
				randNum = Math.floor(Math.random() * 9) + 1;  // returns a random integer from 1 to 9
					
				} else {
				
					// Если выбранное поле ещё НЕ отмечалось, т.е. пустое (' ' - имеет пробел): 
					
					// Триггер 'свободное поле найдено': 
					freeFieldFound = true; 

					// Ставим маркер Компьютера ('0' - нолик): 
					fieldsMatrix[randNum] = '0'; 
					
					// Прибавляем к числу занятых полей ещё одно: 
					numOfOccFlds++; 
					
					// Ход компьютера (AI): 
					// console.log('Ход компьютера (AI): ' + randNum); // FOR TESTS. 
					
				} // END if (markField == ' ') {}. 
				
			} // END // Смотрим соответствующее полученному номеру поле и ставим в нём маркер. 

			// Если свободное поле для записи обнаружено: 
			if (freeFieldFound) {

				// Прекращаем поиск свободного поля: 
				i = 0; // Выходим из Цикла. 
				
			} else {
				
				// Если свободное поле для записи ещё НЕ обнаружено: 
				if ((i == 0) && (freeFieldFound == false)) {
					
					// Возвращаемся к начальному индексу поиска: 
					i = 9; // Начинаем поиск с начала. 
				}
				
			} // Если свободных полей НЕ осталось. 
			
		} // END Циклом перебираем матрицу полей. 

	} // END Если есть свободные поля.

	else {
		
		// Если все поля заполнены игроками: 
		
		// Игра (партия) окончена: 
		isGameOver = true; 
		
		// Вычисляем победителя ----------------------------------------------: 
		
		// Циклом перебираем матрицу полей: 
		for (i = 9; i >= 1; i--) {	
		
			// Получаем текущий маркер поля (" " or "X" or "0"): 
			markField = fieldsMatrix[i]; 
			
			/* Строим линии (всего м.б. 8 возможных линий): 
				
				Line 1 == fields 1, 2, 3; // horizontal line
				Line 2 == fields 4, 5, 6; // horizontal line
				Line 3 == fields 7, 8, 9; // horizontal line
				
				Line 4 == fields 1, 4, 7; // vertical line
				Line 5 == fields 2, 5, 8; // vertical line
				Line 6 == fields 3, 6, 9; // vertical line
				
				Line 7 == fields 1, 5, 9; // diagonal line
				Line 8 == fields 7, 5, 3; // diagonal line
			
			---------------------------------------------- */
			
			// Сохраняем узлы линий (т.е. поля отмеченные символами 'X' или '0'): 
			switch (i) {
				case 1 : fldsLineOne[1] = markField; fldsLineFour[1] = markField; fldsLineSeven[1] = markField; break; 
				case 2 : fldsLineOne[2] = markField; fldsLineFive[1] = markField; break; 
				case 3 : fldsLineOne[3] = markField; fldsLineSix[1] = markField; fldsLineEight[3] = markField; break; 
				case 4 : fldsLineTwo[1] = markField; fldsLineFour[2] = markField; break; 
				case 5 : fldsLineTwo[2] = markField; fldsLineFive[2] = markField; fldsLineSeven[2] = markField; fldsLineEight[2] = markField; break; 
				case 6 : fldsLineTwo[3] = markField; fldsLineSix[2] = markField; break; 
				case 7 : fldsLineThree[1] = markField; fldsLineFour[3] = markField; fldsLineEight[1] = markField; break; 
				case 8 : fldsLineThree[2] = markField; fldsLineFive[3] = markField; break; 
				case 9 : fldsLineThree[3] = markField; fldsLineSix[3] = markField; fldsLineSeven[3] = markField; break; 
				default: console.log('err'); 
			}
			
		} // END Циклом перебираем матрицу полей. 
			
			// Вычисляем сколько линий построено Человеком ['X'] и Компьютером ['0']: 
			
			// Берём линии с 1-ой по 8-ю и смотрим их: 
			for (j = 1; j <= 8; j++) {
			
				// Определяем линию для просмотра её узлов: 
				switch (j) {
					case 1 : fldsLineNum = fldsLineOne; break; 
					case 2 : fldsLineNum = fldsLineTwo; break; 
					case 3 : fldsLineNum = fldsLineThree; break; 
					case 4 : fldsLineNum = fldsLineFour; break; 
					case 5 : fldsLineNum = fldsLineFive; break; 
					case 6 : fldsLineNum = fldsLineSix; break; 
					case 7 : fldsLineNum = fldsLineSeven; break; 
					case 8 : fldsLineNum = fldsLineEight; break; 
					default: console.log('err err'); 
				}
			
				// Циклом перебираем узлы линии: 
				for (n = 1; n <= 3; n++) {
				
					// Смотрим, какой узел в точке линии: 
					isNode = fldsLineNum[n]; 
					
					// Считаем количество узлов Человека и Компьютера в линии: 
					if (isNode == 'X') {numOfNodesHum++;} else if (isNode == '0') {numOfNodesComp++;} else {console.log('err 3');} 
				
					// Смотрим, чьих узлов больше и считаем построенную линию Человека или Компьютера: 
					if (numOfNodesHum == 3) {numOfLinesHumAll++;} else if (numOfNodesComp == 3) {numOfLinesCompAll++;} 
				
				}			

					// Обнуляем мини-счётчики узлов: 
					numOfNodesHum = 0; numOfNodesComp = 0; 
			
			} // END Циклом перебираем все узлы линий. 
			
			// Смотрим, чьих линий в итоге больше: 
			if (numOfLinesHumAll > numOfLinesCompAll) {
				
				// Победил Человек: 
				winner = 'Human'; 
				
			} else if (numOfLinesHumAll < numOfLinesCompAll) {
				
				// Победил Компьютер: 
				winner = 'Computer'; 
				
			} else {winner = 'none';} // Если "НИЧЬЯ". 
		
		// END Вычисляем победителя ------------------------------------------. 
		
	} // Если все поля заполнены игроками. 
	
} // END Искусственный интеллект. 

// Граф. конвейер (Рендер) ---------------------------------------------------: 
function graphConv(n) {
	
	// Очищаем консоль (экран): 
	console.clear(); 
	
	// Рисуем матрицу полей и заполнения: 
	console.log(' ');
	console.log('##################################################'); 
	console.log(' ');
	console.log('###################'); 
	console.log('#     |     |     #'); 
	console.log('#  ' + fieldsMatrix[1] +'  |  ' + fieldsMatrix[2] + '  |  ' + fieldsMatrix[3] +'  #'); 
	console.log('# ___ | ___ | ___ #'); 
	console.log('#     |     |     #'); 
	console.log('#  ' + fieldsMatrix[4] +'  |  ' + fieldsMatrix[5] + '  |  ' + fieldsMatrix[6] +'  #' + '    Игра "Крестики-нолики"'); 
	console.log('# ___ | ___ | ___ #'); 
	console.log('#     |     |     #'); 
	console.log('#  ' + fieldsMatrix[7] +'  |  ' + fieldsMatrix[8] + '  |  ' + fieldsMatrix[9] +'  #'); 
	console.log('#     |     |     #'); 
	console.log('###################'); 
	console.log(' ');
	console.log('##################################################'); 
	console.log(' ');
	
} // END Граф. конвейер. 

// На выход из игры ----------------------------------------------------------: 
function onExitOfTheGame(n) {
	
	console.log(' ');
	console.log('Хотите выйти из игры? (Y/N)'); 
	console.log(' ');

	onExit = true; 
	
} // END На выход из игры. 

// Выход из игры -------------------------------------------------------------: 
function exitTheGame(n) {
	
	console.log(' ');
	console.log('Вы закрыли игру!');
	console.log(' ');
	
	// Выходим из программы: 
	process.exit(0);
	
} // END Выход из игры. 

// END of the game - конец игры. 