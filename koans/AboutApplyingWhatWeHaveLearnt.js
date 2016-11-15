var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = products.filter(function(value){
        if (value.ingredients.indexOf('mushrooms') === -1 && value.ingredients.indexOf('walnuts') === -1){
          return value;
        }
      });


      expect(productsICanEat.length).toBe(2);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 7 or 9 (functional)", function () {
    var sum = _(_.range(0, 1000)).chain()
                     .reduce(function(accumulator, value) { 
                        if (value % 7 === 0 || value % 9 === 0){
                          accumulator += value;
                        }
                        return accumulator; 
                      },0)
                     .value();


    
    expect(sum).toBe(119455);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

    var result = _(products).chain()
                     
                     .map(function(x) { return  x.ingredients } )
                     .flatten()
                     .reduce(function(accumulator, value) { 
                        accumulator.push(value);
                        return accumulator; 
                      },[])
                     .value();



    result.forEach(function(value){
      if (typeof ingredientCount[value] === 'undefined'){
        ingredientCount[value] = 1;
      } else {
        ingredientCount[value]++;
      }
    });

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

it("should find the largest prime factor of a composite number", function() {
  function isPrime(num) {
    if (num === 1 || num === 2) return true;
    var result = false;
    for (var i = 2; i < num; i++) {
      if (num % i !== 0) {
        result = true;
      } else {
        result = false;
        break;
      }
    }
    return result;
  }

  function findNextPrimeFactor(num) {
    var prime = 0;
    for (var i = 2; i < num; i++) {
      if (num % i === 0 && isPrime(i)) {
        prime = i;
        break;
      }
    }
    return prime;
  }

  function findAllPrimeFactors(num) {
    if (isPrime(num) === true) {
      return ('The number is a prime! Please enter a composite number instead.');
    } else {
      var primeArray = [];
      var nextPrime = findNextPrimeFactor(num);
      while (!isPrime(num)) {
        num = num / findNextPrimeFactor(num);
        primeArray.push(num);
      }
      return primeArray.pop();
    }
  }
  expect(findAllPrimeFactors(712)).toBe(89);
  expect(findAllPrimeFactors(89)).toBe('The number is a prime! Please enter a composite number instead.');
});

it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
  function isPalindrome(num){
    var numStr = '' + num;
    var numReverse = '';
    for (var i =  numStr.length - 1; i >= 0; i --){
  	  numReverse += numStr[i];
    }
  return numStr === numReverse;
}

  function findLargestPalindrome (){
    var result = [];
    for (var i = 999; i > 100; i --){
      for (var j = 999; j > 100; j --){
  	    if (isPalindrome(i*j)){
  	      result.push(i*j);
  	    }
  	  }
    }
    return Math.max.apply(Math, result);
  }

  expect(findLargestPalindrome()).toBe(906609);

});


it("should find the smallest number divisible by each of the numbers 1 to 20", function() {
  function divisibleBy1to20(num) { 
    var result = false;
    for (var i = 1; i <= 20; i++) {
      if (num % i === 0) {
        result = true;
      } else {
        result = false;
        break;
      }
    }
    
    return result;
   
  }

  function smallestDivisibleBy1to20() {
      
    var i = 1;
    while (!divisibleBy1to20(i)) {
      i++;
    }
      
    return i;
  
  }
  
  expect(smallestDivisibleBy1to20()).toBe(232792560);

});

  it("should find the difference between the sum of the squares and the square of the sums", function () {

    function difference(num1, num2){
    	var sumOfSquares = Math.pow(num1, 2) + Math.pow(num2, 2);
      	var squareOfSums = Math.pow((num1 + num2), 2);
      	
      	return sumOfSquares - squareOfSums;
    }
    
    expect(difference(5, 7)).toBe(-70);


    
  });

it("should find the 10001st prime", function() {
  
  function find1001Prime() {
    
    var result = [];
    var prime = 2;
    
    var test = function(num) {
      for (var i = 2; i < num; i++) {
        if (num % i === 0) {
          return false;
        }
      }
      return true;
    };
    
    while (result.length < 1001) {
      if (test(prime)) {
        result.push(prime);
      }
      prime++;
    }
    
    return result.pop();
  }
  
  expect(find1001Prime()).toBe(7927);
  
});

});
