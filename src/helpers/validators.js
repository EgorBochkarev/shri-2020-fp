/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import { allPass, prop, equals, not, compose, map, invert, length, propOr, gt, values, apply, lte } from 'ramda'

const STAR = 'star';
const SQUARE = 'square';
const TRIANGLE = 'triangle';
const CIRCLE = 'circle';

const RED = 'red';
const WHITE = 'white';
const ORANGE = 'orange';
const GREEN = 'green';
const BLUE = 'blue';

const getStar = prop(STAR);
const getSquare = prop(SQUARE);
const getTriangle = prop(TRIANGLE);
const getCircle = prop(CIRCLE);

const isRed = equals(RED);
const isOrange = equals(ORANGE);
const isWhite = equals(WHITE);
const isGreen = equals(GREEN);
const isBlue = equals(BLUE);

const isNotWhite = compose(not, isWhite);
const isNotRed = compose(not, isRed);

const isStarRed = compose(isRed, getStar);

const isSquareGreen = compose(isGreen, getSquare);
const isSquareOrange = compose(isOrange, getSquare);

const isTriangleWhite = compose(isWhite, getTriangle);
const isTriangleGreen = compose(isGreen, getTriangle);

const isCircleWhite = compose(isWhite, getCircle);
const isCircleBlue = compose(isBlue, getCircle);

const numProp = propOr(0);
const getCountColorObject = compose(map(length), invert);
const getWhiteCount = compose( numProp(WHITE), getCountColorObject);
const getGreenCount = compose( numProp(GREEN), getCountColorObject);
const getRedCount = compose( numProp(RED), getCountColorObject);
const getOrangeCount = compose( numProp(ORANGE), getCountColorObject);
const getBlueCount = compose( numProp(BLUE), getCountColorObject);



// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (set) => {
    return allPass([isStarRed,isSquareGreen,isTriangleWhite,isCircleWhite])(set);
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (set) => {
    return compose(lte(2), getGreenCount)(set);
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (set) => {
    return equals(getRedCount(set), getBlueCount(set));
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = (set) => {
    return allPass([isCircleBlue, isStarRed, isSquareOrange])(set);
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (set) => {
    const isThereThreeEqual = compose(lte(3), apply(Math.max), values, getCountColorObject);
    const isWhiteOneOrLess = compose(gt(2), getWhiteCount);
    return allPass([isThereThreeEqual, isWhiteOneOrLess])(set);
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (set) => {
    const isThereTwoGreen = compose(equals(2), getGreenCount);
    const isThereOneRed = compose(equals(1), getRedCount);
    return allPass([isTriangleGreen, isThereTwoGreen, isThereOneRed])(set);
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (set) => {
    return equals(4, getOrangeCount(set));
};

// 8. Не красная и не белая звезда.
export const validateFieldN8 = (set) => {
    const inNotRedAndWhite = allPass([isNotRed, isNotWhite]);
    return compose(inNotRedAndWhite, getStar)(set);
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (set) => {
    return equals(4, getGreenCount(set));
};

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = (set) => {
    const asSquare = compose(equals, getSquare)(set);
    const isNotWhiteAndAsTriangle = allPass([asSquare, isNotWhite]);
    return compose(isNotWhiteAndAsTriangle, getTriangle)(set);
};
