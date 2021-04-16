function calculator (string) {

    //объявляем все необходимые переменные
    let romanNumbersArray = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    let symbolsArray = string.split(' ');
    let a = symbolsArray[0];
    let b = symbolsArray[2];
    let arithmeticOperation = symbolsArray[1];
    let typeOfExpression;

    //выполняем все проверки, чтобы убедиться,
    // что данные на входе верные и с ними можно работать дальше
    isDataCorrect(symbolsArray);

    //собсна, вычисляем
    return calculate(a, b);

    //-----------------------------------------------------------------------------------

    //наш скоуп проверок корректности входных данных
    function isDataCorrect(symbolsArray) {

        let incorrectDataError = new Error('Введены неверные данные. Вычисление невозможно.')

        //проверка на количество полученных аргументов
        if (symbolsArray.length !== 3) {
            throw incorrectDataError;
        }

        //Проверяем корректность диапазона в случае ввода римских чисел
        if (isNaN(Number.parseInt(a)) && isNaN(Number.parseInt(b))) {
            if (isNaN(toArabicConverter(a)) || isNaN(toArabicConverter(b))) {
                throw incorrectDataError;
            }
        }
        //Проверяем, что мы получили на вход числа одного и того же типа
        if (isNaN(Number.parseInt(a)) && !isNaN(Number.parseInt(b)) ||
            !isNaN(Number.parseInt(a)) && isNaN(Number.parseInt(b)))
        {
            throw incorrectDataError;
        }
    }

    //метод для проверки каждого отдельного числа на тип
    //используется в общей проверке в методе "isExpressionRoman"
    function isRoman(x) {
        let match = 0;
        for (let i = 0; i < romanNumbersArray.length; i++) {
            if (x === romanNumbersArray[i]) match++;
        }
        return match > 0;
    }

    //выясняем тип чисел для корректности вычислений в методе "calculate"
    function isExpressionRoman(a, b) {
        return isRoman(a) && isRoman(b);
    }

    //конвертер из римских чисел в арабские для проведения расчетов
    function toArabicConverter(x) {
        for (let i = 1; i <= romanNumbersArray.length + 1; i++) {
            if (x === romanNumbersArray[i - 1]) return i;
        }
    }

    //основной метод, производящий конечное вычисление арифметической операции
    function calculate(a, b) {
        let result;

        if (isExpressionRoman(a, b)) {
            a = toArabicConverter(a);
            b = toArabicConverter(b);
            typeOfExpression = 'roman';
        } else {
            a = Number.parseInt(a);
            b = Number.parseInt(b);
        }

        //проверим, что полученные числа не выходят за допустимый диапазон
        if (a < 1 || a > 10 || b < 1 || b > 10) {
            throw new Error('Введены неверные данные. Вычисление невозможно.');
        }

        //определяем оператор и выполняем арифметическую операцию
        switch (arithmeticOperation) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                result = a / b;
                break;
            default:
                throw new Error('Введен неизвестный оператор. Вычисление невозможно.');
        }

        //выполняем округление
        result = rounder(result);

        //возвращаем результат вычислений в зависимости от типа чисел
        if (typeOfExpression === 'roman') {
            return convertToRoman(result);
        } else {
            return '' + result; //приводим результат арабского числа к строке
        }
    }

    //конвертер арабских чисел в римские для возвращения "римского" результата вычислений
    function convertToRoman(x) {
        if (x < 1) {
            //если результат равен нулю или отрицательному числу, то для римских цифр возвращаем пустую строку
            return '';
            //формируем римскую цифру для интервала 1-10
        } else if (x >= 1 && x <= 10) {
            for (let i = 1; i <= romanNumbersArray.length + 1; i++) {
                if (x === i) return x = romanNumbersArray[i - 1];
            }
            //формируем римскую цифру для интервала 11-20
        } else if (x >= 11 && x <= 20) {
            for (let i = 1; i <= romanNumbersArray.length + 1; i++) {
                if (x - 10 === i) return x = 'X' + romanNumbersArray[i - 1];
            }
            //формируем римскую цифру для интервала 21-30
        } else if (x >= 21 && x <= 30) {
            for (let i = 1; i <= romanNumbersArray.length + 1; i++) {
                if (x - 20 === i) return x = 'XX' + romanNumbersArray[i - 1];
            }
            //формируем римскую цифру для интервала 31-39
        } else if (x >= 31 && x <= 39) {
            for (let i = 1; i <= romanNumbersArray.length + 1; i++) {
                if (x - 30 === i) return x = 'XXX' + romanNumbersArray[i - 1];
            }
            //формируем римскую цифру для интервала 40-49
        } else if (x >= 40 && x <= 49) {
            for (let i = 1; i <= romanNumbersArray.length + 1; i++) {
                if (x === 40) {
                    return 'XL'
                } else if (x - 40 === i) return x = 'XL' + romanNumbersArray[i - 1];
            }
            //формируем римскую цифру для интервала 50-59
        } else if (x >= 50 && x <= 59) {
            for (let i = 1; i <= romanNumbersArray.length + 1; i++) {
                if (x === 50) {
                    return 'L'
                } else if (x - 50 === i) return x = 'L' + romanNumbersArray[i - 1];
            }
            //формируем римскую цифру для интервала 60-69
        } else if (x >= 60 && x <= 69) {
            for (let i = 1; i <= romanNumbersArray.length + 1; i++) {
                if (x === 60) {
                    return 'LX'
                } else if (x - 60 === i) return x = 'LX' + romanNumbersArray[i - 1];
            }
            //формируем римскую цифру для интервала 70-79
        } else if (x >= 70 && x <= 79) {
            for (let i = 1; i <= romanNumbersArray.length + 1; i++) {
                if (x === 70) {
                    return 'LXX'
                } else if (x - 70 === i) return x = 'LXX' + romanNumbersArray[i - 1];
            }
            //формируем римскую цифру для интервала 80-89
        } else if (x >= 80 && x <= 89) {
            for (let i = 1; i <= romanNumbersArray.length + 1; i++) {
                if (x === 80) {
                    return 'LXXX'
                } else if (x - 80 === i) return x = 'LXXX' + romanNumbersArray[i - 1];
            }
            //формируем римскую цифру для интервала 90-99
        } else if (x >= 90 && x <= 99) {
            if (x === 90) {
                return 'XC'
            } else for (let i = 1; i <= romanNumbersArray.length + 1; i++) {
                if (x - 90 === i) return x = 'XC' + romanNumbersArray[i - 1];
            }
            //формируем римскую цифру 100
        } else if (x === 100) {
            return 'C';
        }
    }

    function rounder(numberToRound) {
        if (numberToRound <= 0.5 && numberToRound >= 0) {
            return 0;
        } else return Math.round(numberToRound);
    }
}

console.log(calculator("XI * III"));