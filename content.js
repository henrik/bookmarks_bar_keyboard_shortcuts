document.addEventListener('keydown', handleKeyDown, false);

function handleKeyDown() {
  if (!modifierIsDown(event)) return;

  var number = keyCodeToNumber(event.keyCode);
  if (number != null) {
    triggerByNumber(number);
  }
}

function modifierIsDown(event) {
  return activeModifiers(event) == expectedModifiers();
}

// Ctrl is easier to locate than Alt, so that is used on OS X. While Chrome on
// OS X uses Cmd + numbers to select tabs, Windows supposedly uses Ctrl for
// that purpose, so Windows gets to use Alt with the bookmarks bar.
// Chrome on Linux allegedly hogs both Ctrl and Alt, so they get to use Meta:
// http://github.com/henrik/bookmarks_bar_keyboard_shortcuts/issues#issue/1
//
// Note that including Shift in expected modifiers will break, as pressing a
// number key will send some shifted symbol, not a number.

function expectedModifiers() {
  if (navigator.platform.indexOf("Mac") === 0) {  // OS X
    return 'Ctrl';
  } else if (navigator.platform.indexOf("Win") === 0) {  // Windows
    return 'Alt';
  } else {  // Linux
    return 'Meta';
  }
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
