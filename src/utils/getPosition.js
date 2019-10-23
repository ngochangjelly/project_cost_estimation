export const getPosition = (length, position) => {
  if (position === 0 && length > 0) {
    return 'isFirstChild';
  }
  if (position === length && position !== 0) {
    return 'isLastChild';
  }
  if (position !== 0 && position < length && length > 2) {
    return 'isChild';
  }
};
export const getConnectLine = position => {
  console.log(position);
  switch (position) {
    case 'isFirstChild':
      return 'right-connect-line';
    case 'isChild':
      return 'full-connect-line';
    case 'isLastChild':
      return 'left-connect-line';
    default:
      return '';
  }
};
