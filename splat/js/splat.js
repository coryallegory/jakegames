var number;
var count;


function restart() {
  number = Math.floor(Math.random() * 100) + 1;
  count = 0;
  clearFields();
  document.getElementById('count').innerHTML = count;
  document.getElementById('message').innerHTML = "Ok! I'm ready!";
  document.getElementById('avatar').innerHTML = "😃";
}
function numPress(value) {
  var guessElem = document.getElementById('guess');
  guessElem.innerHTML = guessElem.innerHTML + value;
  document.getElementById('avatar').innerHTML = "🙂";
  document.getElementById('message').innerHTML = "";
}
function clearFields() {
  document.getElementById('guess').innerHTML = "";
}
function guess() {
  var messageElem = document.getElementById('message');
  var value = document.getElementById('guess').innerHTML;
  if (isNaN(value)) {
    messageElem.innerHTML = "Is that a number?";
    document.getElementById('avatar').innerHTML = "😐";
  } else if (value > 100 || value < 1) {
    messageElem.innerHTML = "It is between 1 and 100!";
    document.getElementById('avatar').innerHTML = "😯";
  } else if (value < number) {
    messageElem.innerHTML = "HIGHER than " + value;
    count++;
    document.getElementById('count').innerHTML = count;
    document.getElementById('avatar').innerHTML = "😊";
    document.getElementById('guess').innerHTML = "";
  } else if (value > number) {
    messageElem.innerHTML = "LOWER than " + value;
    count++;
    document.getElementById('count').innerHTML = count;
    document.getElementById('avatar').innerHTML = "😌";
    document.getElementById('guess').innerHTML = "";
  } else if (value == number) {
    count++;
    document.getElementById('count').innerHTML = count;
    messageElem.innerHTML = "YES! it is " + value + " 🏆";
    document.getElementById('avatar').innerHTML = "😎";
    document.getElementById('guess').innerHTML = "";
  } else {
    messageElem.innerHTML = "ERROR try again";
    document.getElementById('avatar').innerHTML = "😐";
  }
}
