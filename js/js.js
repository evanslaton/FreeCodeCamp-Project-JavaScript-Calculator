$('document').ready(function() {

  var onDisplay = [];
  var calcTracker = [];
  var displayClearTracker = 0;
  var afterSumTracker = 0;
  var answerToString;
  var decimalCounter = 0;
  var percent;
  var displayNum = $('#display-num');
  var answer;

  var clearCalcTracker = () => {
    calcTracker = [];
  }

  var clearDisplay = () => {
    onDisplay = [];
    displayNum.text('0');
  };

  var isInt = (n) => {
     return n % 1 === 0;
  };

  var tooBig = () => {
    if (answer > 999999999) {
      displayNum.text('Too big!');
      onDisplay = [];
      calcTracker = [];
      displayClearTracker = 0;
      afterSumTracker = 0;
      percent = undefined;
    } else {
      displayNum.text(answer);
    }
  }



  var doMath = () => {
    if (onDisplay.indexOf('%') !== -1) {
      percent = parseFloat(onDisplay.join(''));
      percent = (percent * parseFloat(calcTracker[0])) / 100;
      displayNum.text(percent.toString());
      onDisplay = [];
    }

    switch (calcTracker[1]) {
      case '/':
        calcTracker = [parseFloat(calcTracker[0]) / parseFloat(displayNum.text())];
        answer = calcTracker[0];
        onDisplay = [answer];
        return answer;
        break;
      case '*':
        calcTracker = [parseFloat(calcTracker[0]) * parseFloat(displayNum.text())];
        answer = calcTracker[0];
        onDisplay = [answer];
        return answer;
        break;
      case '-':
        calcTracker = [parseFloat(calcTracker[0]) - parseFloat(displayNum.text())];
        answer = calcTracker[0];
        onDisplay = [answer];
        return answer;
        break;
      case '+':
        calcTracker = [parseFloat(calcTracker[0]) + parseFloat(displayNum.text())];
        answer = calcTracker[0];
        // onDisplay = [answer];
        return answer;
        break;
    }
  };

  //AC
  $('#ac').on('click', function() {
    clearDisplay();
    calcTracker = [];
    displayClearTracker = 0;
    afterSumTracker = 0;
    displayNum.text('0'); 
  });
  
  //CE
  $('#ce').on('click', function() {
    if (afterSumTracker === 0) {
      clearDisplay();
    }
  });  

  //Numbers and decimal
  $('.num-button').on('click', function() {
    if (onDisplay.length < 9) {

      if (onDisplay.indexOf('%') === -1) {

        if (displayClearTracker > 0) {
          clearDisplay();  
        }

        if (afterSumTracker === 1) {
          clearCalcTracker();
          afterSumTracker = 0;  
        } else if (afterSumTracker === 2) {
          clearDisplay();
          displayNum.text(onDisplay.join(''));
          calcTracker.push($(this).find($('.num')).text());
          afterSumTracker = 0;
        }

        onDisplay.push($(this).find($('.num')).text());
        displayNum.text(onDisplay.join(''));
        displayClearTracker = 0; 
      }
    }
  });

  $('#decimal').on('click', function() {
    if (onDisplay && onDisplay.toString().indexOf('.') !== -1) {

      for (i = 0; i < onDisplay.length; i++) {
        if (onDisplay[i].indexOf('.') !== -1) {
          decimalCounter++;
        }
      }

      if (decimalCounter > 1) {
        onDisplay.splice(-1, 1);
        displayNum.text(onDisplay.join(''));
        decimalCounter = 0;       
      }
    }
  });

  //Does Math
  $('.maths').on('click', function() {
    if (onDisplay[0]) {
      if (calcTracker.length === 0  && displayNum.text() !== '') {
        calcTracker.push(displayNum.text());
        calcTracker.push($(this).find($('p')).text());
        displayClearTracker++;
      } else if (calcTracker.length === 2 && afterSumTracker === 0  && displayNum.text() !== '') {
        doMath();
        clearDisplay();
        calcTracker.push($(this).find($('p')).text());
        tooBig();
      } else if (calcTracker.length === 1 && afterSumTracker === 1  && displayNum.text() !== '') {
        calcTracker.push($(this).find($('p')).text());
        afterSumTracker++;      
      }
    }
  }); 

  //Sum
  $('#sum').on('click', function() {
    if (calcTracker.length > 1 && displayNum.text() !== '') {
      doMath();
      afterSumTracker++;
      onDisplay =  [calcTracker[0].toString()];
      tooBig();
    }
  }); 

  $('#percent').on('click', function() {
    if (onDisplay[0]) {
      if (onDisplay.indexOf('%') === -1 && calcTracker[0]) {
        onDisplay.push($(this).find($('p')).text());
        displayNum.text(onDisplay.join(''));
      }
    }
  });

});