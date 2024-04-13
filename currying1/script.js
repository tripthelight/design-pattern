// 함수형 패턴 - 커링(Currying) & 부분적용(Partial Application)

// 커링: 함수의 분해기법, 다수의 인자를 가지는 함수 대신, 하나의 인자를 가지는 연속된 함수들의 중첨
// 부분적용: 함수의 인자 일부를 고정한 새로운 함수를 생성
// Currying: f(a, b, c) -> f(a)(b)(c)

function fn(x, y) {
  return x + y;
}

fn(1, 2);

function curried_fn(x) {
  return function (y) {
    return x + y;
  };
}
const curried_fn2 = (x) => (y) => x + y;

console.log(
  curried_fn(1)(2),
  curried_fn2(1)(2)
);

// 커피 만들기
function makeCoffee (roastType) {
  return function (sugar) {
    return function (cream) {
      return console.log(`Coffee: ${roastType}, sugar: ${sugar}, cream: ${cream}`);
    }
  }
}
//makeCoffee('Dark Roast')(1)(2)
const mediumRoast = makeCoffee('Medium Roast')
const order1 = mediumRoast(1)(2)
const order2 = mediumRoast(2)(3)

console.log('#########################');
/**
 * Currying
 * Named after Haskell B. Curry
 * Concept from lambda calculus
 * Currying takes a function that receives more than on parameter
 * and breaks it into a series of unary (one parameter) functions
 * Therefore, a curried function only takes one parameter at a time
 */

const buildSandwich = (ingredient1) => {
  return (ingredient2) => {
    return (ingredient3) => {
      return `${ingredient1}, ${ingredient2}, ${ingredient3}`
    }
  }
}

const mySandwich = buildSandwich('Bacon')('Lettuce')('Tomato')
console.log(mySandwich);

// It works but thats getting ugly and nested the further we go

const buildSammy = ingred1 => ingred2 => ingred3 => `${ingred1}, ${ingred2}, ${ingred3}`
const mySammy = buildSammy('turkey')('cheese')('bread')
console.log(mySammy);

// Another Example of a curried function
const multiply1 = (x, y) => x * y
const curriedMultiply1 = x => y => x * y

console.log(
  multiply1(2, 3),
  curriedMultiply1(2),
  curriedMultiply1(2)(3)
);

// Partially applied function are a common use of currying
const timesTen = curriedMultiply1(10)
console.log(
  timesTen,
  timesTen(10)
);

// Another Example
const updateElemText = id => content => document.querySelector(`#${id}`).textContent = content
const updateHeaderText = updateElemText('header')
updateHeaderText('Hello Dave!')

// Another common use of currying is function composition
// Allows calling small functions in a specific order
const addCustomer = fn => (...args) => {
  console.log('saving customer info...');
  return fn(...args)
}
function addCustomer_ (...args) {
  return function processOrder(...args) {
    return function completeOrder(...args) {
      // end
    }
  }
}
const processOrder = fn => (...args) => {
  console.log(`processing order #${args[0]}`);
  return fn(...args)
}
let completeOrder = (...args) => {
  console.log(`Order #${[...args].toString()} completed.`);
}
completeOrder = (processOrder(completeOrder))
console.log(completeOrder);
completeOrder = (addCustomer(completeOrder))
completeOrder('1000')

// Requires a function with a fixed number of parameters
const curryRequire = (fn) => {
  // console.log('1 : ', fn.length);
  return curried = (...args) => {
    // console.log('2_1 : ', fn.length);
    // console.log('2_2 : ', args.length);
    if (fn.length !== args.length) {
      console.log('...args : ', ...args);
      return curried.bind(null, ...args) // bind creates new func
    }
    return fn(...args)
  }
}
const total = (x, y, z) => x + y + z;
const curriedTotal = curryRequire(total)
console.log(
  curriedTotal(10)(20)(30)
);

// #############################################################
console.log('#########################');
let multiply2 = function (x, y) {
  console.log(x * y);
}
let multiply2_ = function (y) {
  let x = 2
  console.log(x + y);
}
let multiplyByTwo = multiply2.bind(this, 2)
multiplyByTwo(5)
let multiplyByThree = multiply2.bind(this, 3)
multiplyByThree(5)

let multiply2_1 = function (x) {
  return function (y) {
    console.log(x * y);
  }
}
let multiplyByTwo_ = multiply2_1(20)
multiplyByTwo_(50)

// #############################################################
console.log('#########################');
// Closure
let l0 = 'l0'
function fn1Closure () {
  let l1 = 'l1'
}
fn1Closure()
