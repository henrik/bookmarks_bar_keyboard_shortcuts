document.addEventListener('keydown', handleKeyDown, false);

function handleKeyDown() {
  if (!event.ctrlKey) return;

  var number = keyCodeToNumber(event.keyCode);
  if (number != null) {
    triggerByNumber(number);
  }
}


function keyCodeToNumber(keyCode) {
  var number = keyCode - 48;
  return ((number >= 0 && number <= 9) ? number : null);
}


function triggerByNumber(number) {
  var index = number==0 ? 10 : number;
  chrome.extension.sendRequest(index);
}
