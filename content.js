document.addEventListener('keydown', handleKeyDown, false);

function handleKeyDown() {
  if (!event.ctrlKey) return;

  var number = keyCodeToNumber(event.keyCode);
  if (number) {
    triggerByIndex(number);
  }
}


function keyCodeToNumber(keyCode) {
  var number = keyCode - 48;
  return ((number >= 0 && number <= 9) ? number : null);
}


function triggerByIndex(index) {
  chrome.extension.sendRequest(index);
}
