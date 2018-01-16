$('document').ready(function() {
  
  var onDisplay = [];
  var calcTracker = [];
  var displayClearTracker = 0;
  var afterSumTracker = 0;
  var decimalCounter = 0;
  var displayNum = $('#display-num');
  
  var clearCalcTracker = () => {
    calcTracker = [];
  }

  var clearDisplay = () => {
    onDisplay = [];
    displayNum.text('');
  };

  var doMath = () => {
    switch (calcTracker[1]) {
      case '/':
        calcTracker = [(parseFloat(calcTracker[0]) / parseFloat(displayNum.text())).toFixed(2)];
        console.log(calcTracker);
        return calcTracker;
        break;
      case '*':
        calcTracker = [(parseFloat(calcTracker[0]) * parseFloat(displayNum.text())).toFixed(2)];
        console.log(calcTracker);
        return calcTracker;
        break;
      case '-':
        calcTracker = [(parseFloat(calcTracker[0]) - parseFloat(displayNum.text())).toFixed(2)];
        console.log(calcTracker);
        return calcTracker;
        break;
      case '+':
        calcTracker = [(parseFloat(calcTracker[0]) + parseFloat(displayNum.text())).toFixed(2)];
        console.log(calcTracker);
        return calcTracker;
        break;
    }
  };

  //AC
  $('#ac').on('click', function() {
    clearDisplay();
    calcTracker = [];
    displayClearTracker = 0;
    afterSumTracker = 0; 
  });
  
  //CE
  $('#ce').on('click', function() {
    if (afterSumTracker === 0) {
      clearDisplay();
    }
  });  

  //Numbers and decimal
  $('.num-button').on('click', function() {

    if (onDisplay.length < 11) {

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

      if (onDisplay.indexOf('.') !== -1) {

        for (i = onDisplay.indexOf('.') + 1; i < onDisplay.length; i++) {
          if (onDisplay[i] === '.') {
            onDisplay.splice(-1, 1);
          }
        }

        if (!Number.isInteger(parseFloat(onDisplay[0])) && decimalCounter > 0) {
            if (onDisplay[onDisplay.length - 1] === '.') {
              onDisplay.splice(-1, 1);   
            }
          }
      }

      if (onDisplay[0] === '0' && onDisplay[1] === '0') {
        console.log('removing');
        onDisplay.splice(-1, 1);
      }

      displayNum.text(onDisplay.join(''));
      displayClearTracker = 0; 
    }
  });

  //Does Math
  $('.maths').on('click', function() {
    if (calcTracker.length === 0  && displayNum.text() !== '') {
      calcTracker.push(displayNum.text());
      calcTracker.push($(this).find($('p')).text());
      displayClearTracker++;
    } else if (calcTracker.length === 2 && afterSumTracker === 0  && displayNum.text() !== '') {
      doMath();
      clearDisplay();
      calcTracker.push($(this).find($('p')).text());      
      displayNum.text(calcTracker[0]);
    } else if (calcTracker.length === 1 && afterSumTracker === 1  && displayNum.text() !== '') {
      calcTracker.push($(this).find($('p')).text());
      afterSumTracker++;      
    }

    decimalCounter = 0;
  }); 

  //Sum
  $('#sum').on('click', function() {   

    if (calcTracker.length > 1 && displayNum.text() !== '') {
      doMath();
      displayNum.text(calcTracker);
      onDisplay = [calcTracker[0].toString()];
      afterSumTracker++;
      decimalCounter++;
    }
  }); 


  
  
  
});