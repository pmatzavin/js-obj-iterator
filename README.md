# js-object-iterator

Iterate and update the enumerable properties of an object.


## About

This module provides a method to recursively iterate over the enumerable properties of an object.
The method takes a callback as an argument that will be called for every non object property.
The callback provides handlers to the current object, the current key, and the key's path.


## Installation

```
npm install
```

## Module Usage

```
var iterator = require('object-recursive-iterator');
```

```
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
```

```
iterator.forAll(myJSONObject, function (path, key, obj) {
    console.log('----------');
    console.log('path: ', path);
    console.log('key: ', key);
    console.log('value before processing: ', obj[key]);
    obj[key] += '_processed';   // update value
    console.log('value after processing: ', obj[key]);
    console.log('----------');
});
```

An example can be found at the examples folder.
To run the example go to the example folder.
Run:

```
npm install
```

and then:

```
node example.js
```

## Running the tests

From inside the root project folder run:

```
npm install
```
and then
```
npm test
```

