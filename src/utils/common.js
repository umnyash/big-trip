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

function updateArrayItemById(array, updatedItem) {
  const itemIndex = array.findIndex(({ id }) => id === updatedItem.id);

  if (itemIndex === -1) {
    throw new Error(`Can't update item. Id ${updatedItem.id} not found`);
  }

  array[itemIndex] = updatedItem;
}

export { focusFieldAtEnd, isEscapeEvent, updateArrayItemById };
