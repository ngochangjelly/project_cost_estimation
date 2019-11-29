//method to manage local storage for tree data
const set = tree => {
  window.localStorage.setItem('tree', JSON.stringify(tree));
};
const clear = () => {
  window.localStorage.removeItem('tree');
};

const update = tree => {
  window.localStorage.setItem('tree', JSON.stringify(tree));
};
const get = key => {
  return JSON.parse(
    JSON.parse(window.localStorage.getItem('persist:root'))[key]
  );
};
const check = key => {
  if (window.localStorage.getItem('persist:root')) {
    return !JSON.parse(window.localStorage.getItem('persist:root'))[key];
  } else {
    return false;
  }
};
module.exports = {
  set,
  update,
  clear,
  get,
  check
};
