const CTRL = 17; 

document.addEventListener('keydown', handleKeyDown, false);
document.addEventListener('keyup', handleKeyUp, false);


function handleKeyDown() {
  if (!event.ctrlKey) return;
  if (event.keyCode == CTRL) {
    setTimeout(function() {
      chrome.extension.sendRequest({showIndices: true});
    }, 1000);
  } else {
    var number = keyCodeToNumber(event.keyCode);
    if (number) {
      triggerByIndex(number);
    }
  }
}

function handleKeyUp() {
  if (event.keyCode == CTRL) {
    chrome.extension.sendRequest({hideIndices: true});
  }
}

function keyCodeToNumber(keyCode) {
  var number = keyCode - 48;
  return ((number >= 0 && number <= 9) ? number : null);
}

function triggerByIndex(index) {
  console.log("trigger by index %o", index);
  chrome.extension.sendRequest({triggerByIndex: index});
}
