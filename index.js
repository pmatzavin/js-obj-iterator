var Promise = require('bluebird');

module.exports = { "forAll": forAll };

function forAll(obj, callback, currentPath) {

    if (!currentPath) { currentPath = []; }

    if (obj) { Object.keys(obj).forEach(compute); }

    function compute(key) {
        var value = obj[key];
        if (typeof value !== 'object') {
            callback(currentPath, key, obj);
        } else {
            var path = currentPath.slice(0);    // clone array
            path.push(key);
            forAll(value, callback, path);      // recursion
        }
    }

    return;

}