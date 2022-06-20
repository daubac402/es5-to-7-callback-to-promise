// ES5 -----------------------------------------------------------------
const getCallbackA = function(callback) {
  setTimeout(function() {
    callback('resultFromA');
  }, 100);
}

const getCallbackB = function(resultBefore, callback) {
  setTimeout(function() {
    callback(`${resultBefore}, resultFromB`);
  }, 200);
}

const getCallbackC = function(resultBefore, callback) {
  setTimeout(function() {
    callback(`${resultBefore}, resultFromC`);
  }, 200);
}

function mainES5() {
  getCallbackA(function (resultFromA) {
    getCallbackB(resultFromA, function (resultFromB) {
      getCallbackC(resultFromB, function (resultFromC) {
        console.log(`mainES5: ${resultFromC}`);
      });
    });
  });
}

// FROM ES6 ------------------------------------------------------------

const getPromiseA = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve('resultFromA');
  }, 100);
});

const getPromiseB = (resultBefore) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(`${resultBefore}, resultFromB`);
  }, 200);
});

const getPromiseC = (resultBefore) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(`${resultBefore}, resultFromC`);
  }, 200);
});

// ES6
function mainES6() {
  getPromiseA().then(function (resultFromA) {
    getPromiseB(resultFromA).then(function (resultFromB) {
      getPromiseC(resultFromB).then(function (resultFromC) {
        console.log(`mainES6: ${resultFromC}`);
      });
    });
  });
}

// ES6 with arrow functions
function mainES6Arrow() {
  getPromiseA().then(
    resultFromA => getPromiseB(resultFromA).then(
      resultFromB => getPromiseC(resultFromB).then(
        resultFromC => console.log(`mainES6Arrow: ${resultFromC}`)
      )
    )
  );
}

// ES7 async/await
async function mainES7() {
  const resultFromA = await getPromiseA();
  const resultFromB = await getPromiseB(resultFromA);
  const resultFromC = await getPromiseC(resultFromB);
  console.log(`mainES7: ${resultFromC}`);
}

// Run -----------------------------------------------------------------

mainES5();
mainES6();
mainES6Arrow();
mainES7();

// Result --------------------------------------------------------------
// mainES5: resultFromA, resultFromB, resultFromC
// mainES6: resultFromA, resultFromB, resultFromC
// mainES6Arrow: resultFromA, resultFromB, resultFromC
// mainES7: resultFromA, resultFromB, resultFromC
