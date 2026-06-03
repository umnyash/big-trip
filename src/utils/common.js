const KeyCode = {
  ESCAPE: 'Escape',
};

function focusFieldAtEnd(fieldElement) {
  fieldElement.focus();

  try {
    const valueLength = fieldElement.value.length;
    fieldElement.setSelectionRange(valueLength, valueLength);
  } catch {
    const value = fieldElement.value;
    fieldElement.value = '';
    fieldElement.value = value;
  }
}

function isEscapeEvent(evt) {
  return evt.code === KeyCode.ESCAPE;
}

export { focusFieldAtEnd, isEscapeEvent };
