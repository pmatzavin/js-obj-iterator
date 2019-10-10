module.exports = { 
  forAll
};

function cloneShallowArray(arr) {
  return arr.slice(0);
}

function forAll(
  obj,
  callback = () => {},
  options = {},
  currentPath = null
) {
  const treatArrayAsObject = options.treatArrayAsObject === true;

  if (!currentPath) {
    currentPath = [];
  }

  const shouldApplyCompute = obj && (treatArrayAsObject || !Array.isArray(obj));
  
  if (shouldApplyCompute) {
    Object.keys(obj).forEach(compute);
  }

  function compute(key) {
    const value = obj[key];
    if (typeof value !== 'object') {
      callback(currentPath, key, obj);
    } else {
      const path = cloneShallowArray(currentPath);
      path.push(key);
      forAll(value, callback, options, path);
    }
  }
}
