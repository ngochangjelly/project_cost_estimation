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
const get = () => {
  return JSON.parse(window.localStorage.getItem('tree'));
};
const check = () => {
  return window.localStorage.getItem('tree');
};
module.exports = {
  set,
  update,
  clear,
  get,
  check
};
