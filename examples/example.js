var iterator = require('object-recursive-iterator');

var myJSONObject = {    // example JSON Object
    'one': {
        'two': {
            'three': {
                'four': '4'
            }
        },
        'six': {
            'seven': '7',
            'eight': '8'
        },
        'nine': '9'
    }
};

iterator.forAll(myJSONObject, function (path, key, obj) {
    console.log('----------');
    console.log('path: ', path);
    console.log('key: ', key);
    console.log('value before processing: ', obj[key]);
    obj[key] += '_processed';   // update value
    console.log('value after processing: ', obj[key]);
    console.log('----------');
});