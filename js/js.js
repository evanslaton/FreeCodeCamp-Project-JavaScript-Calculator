$('document').ready(function() {
  
  var onDisplay = [];
  var calcTracker = [];
  var displayClearTracker = 0;
  var afterSumTracker = 0;
  var displayNum = $('#display-num');


  var charCodes = {
    '&#37;': '%',
    '&#47;': '/',
    '&#42;': '*',
    '&#45;': '-',
    '&#43;': '+'
  };
  
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
        calcTracker = [parseFloat(calcTracker[0]) / parseFloat(displayNum.text())];
        console.log(calcTracker);
        return calcTracker;
        break;
      case '*':
        calcTracker = [parseFloat(calcTracker[0]) * parseFloat(displayNum.text())];
        console.log(calcTracker);
        return calcTracker;
        break;
      case '-':
        calcTracker = [parseFloat(calcTracker[0]) - parseFloat(displayNum.text())];
        console.log(calcTracker);
        return calcTracker;
        break;
      case '+':
        calcTracker = [parseFloat(calcTracker[0]) + parseFloat(displayNum.text())];
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
  
  //Does Math
  $('.maths').on('click', function() {
    if (calcTracker.length === 0) {
      calcTracker.push(displayNum.text());
      calcTracker.push($(this).find($('p')).text());
      displayClearTracker++;
    } else if (calcTracker.length === 1 && afterSumTracker === 0) {
      calcTracker.push($(this).find($('p')).text());
      displayClearTracker++;
      doMath();
      console.log(calcTracker);
    } else if (calcTracker.length === 1 && afterSumTracker === 1) {

      calcTracker.push($(this).find($('p')).text());
            console.log(calcTracker);
      afterSumTracker++;      
    }
  }); 

  //Sum
  $('#sum').on('click', function() {       
    if (calcTracker.length > 1) {
      doMath();
      displayNum.text(calcTracker);
      onDisplay = [calcTracker[0].toString()];
      afterSumTracker++;
      console.log('sum displayNum: ' + displayNum.text());
      console.log('clearTracker: ' + displayClearTracker);
      console.log('onDisplay: ' + onDisplay);
      console.log('calcTracker: ' + calcTracker);
      console.log('afterSumTracker: ' + afterSumTracker);      
    }


  }); 

  $('#decimal').on('click', function() {
    if (onDisplay.indexOf('.') === -1) {
      onDisplay.push('.');
      console.log(onDisplay);
    }
  });
  
  $('.num-button').on('click', function() {
    if (onDisplay.length < 14) {
      if (displayClearTracker > 0) {
        clearDisplay();
              console.log('calcTracker: ' + calcTracker);   
      }
      if (afterSumTracker === 1) {
        console.log(afterSumTracker);
        clearCalcTracker();
        afterSumTracker = 0; 
              console.log('calcTracker: ' + calcTracker);   
      } else if (afterSumTracker === 2) {
        clearDisplay();
        displayNum.text(onDisplay.join(''));
        calcTracker.push($(this).find($('.num')).text());
        afterSumTracker = 0;
        console.log(calcTracker);   
      }
      onDisplay.push($(this).find($('.num')).text());
      displayNum.text(onDisplay.join(''));
      displayClearTracker = 0;     
            console.log('calcTracker: ' + calcTracker);   
    }
  });
  
  
  
});