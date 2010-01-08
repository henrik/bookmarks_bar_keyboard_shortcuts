document.addEventListener('keydown', handleKeyDown, false);

function handleKeyDown() {
  if (!modifierIsDown(event)) return;

  var number = keyCodeToNumber(event.keyCode);
  if (number != null) {
    triggerByNumber(number);
  }
}

// Ctrl is easier to locate than Alt, so that is used on OS X. While Chrome on
// OS X uses Cmd + numbers to select tabs, Windows and Linux supposedly use Ctrl
// for that purpose, so they get to use Alt with the bookmarks bar.
function modifierIsDown(event) {
  var expected_modifiers = isMac() ? 'Ctrl' : 'Alt';
  return activeModifiers(event) == expected_modifiers;
}

function isMac() {
  return navigator.platform.indexOf("Mac") === 0;
}

function activeModifiers(event) {
  var modifiers = [];
  if (event.shiftKey) modifiers.push('Shift');
  if (event.ctrlKey) modifiers.push('Ctrl');
  if (event.altKey) modifiers.push('Alt');
  if (event.metaKey) modifiers.push('Meta');
  return modifiers.join('+');
}


function keyCodeToNumber(keyCode) {
  var number = keyCode - 48;
  return ((number >= 0 && number <= 9) ? number : null);
}

function triggerByNumber(number) {
  var index = number==0 ? 10 : number;
  chrome.extension.sendRequest(index);
}
