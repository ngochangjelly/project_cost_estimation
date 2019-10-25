export const onClickInside = (elementId, parentId) => {
  const targetArea = document?.getElementById(elementId);
  const parentElement = document?.getElementById(parentId);
  parentElement.addEventListener('click', function(event) {
    const isClickInside = targetArea?.contains(event.target);
    return isClickInside;
  });
};
