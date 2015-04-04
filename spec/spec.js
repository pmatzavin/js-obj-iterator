var iterator = require('../index.js');
var should = require('should');

describe('Should iterate and update the given object', function () {

    it('should iterate over and update the given object according to the given callback function  ', function () {

        var arg = {
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
            },
            'ten': '10',
            'eleven': '11',
            'twelve': {
                'thirteen': '13'
            },
            'fourteen': {
                'fifteen': {
                    'sixteen': {
                        'seventeen': '17'
                    }
                },
                'eighteen': {
                    'nineteen': '19',
                    'twenty': '20'
                },
                'twentyone': '21'
            },
            'twentytwo': '22'
        };

        function compute(path, key, obj) {
            obj[key] += '_';
        }

        iterator.forAll(arg, compute);

        arg.one.two.three.four.should.equal('4_');
        arg.one.six.seven.should.equal('7_');
        arg.one.six.eight.should.equal('8_');
        arg.one.nine.should.equal('9_');
        arg.ten.should.equal('10_');
        arg.eleven.should.equal('11_');
        arg.twelve.thirteen.should.equal('13_');
        arg.fourteen.fifteen.sixteen.seventeen.should.equal('17_');
        arg.fourteen.eighteen.nineteen.should.equal('19_');
        arg.fourteen.eighteen.twenty.should.equal('20_');
        arg.fourteen.twentyone.should.equal('21_');
        arg.twentytwo.should.equal('22_');

    });


});
