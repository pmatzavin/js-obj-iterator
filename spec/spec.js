require('should');
const objectIterator = require('../index.js');

const createTestInput = () => {
  return {
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
    'twentytwo': '22',
    'twenteeThree': {
      'tweentyFive': [
        1, 2, 3
      ]
    }
  };
}

function compute(path, key, obj) {
  obj[key] += '_';
}

const testState = {
  assertPathTraversal: []
}
const tests = [
  {
    assert: (arg) => {
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
      arg.twenteeThree.tweentyFive[0].should.equal(1);
      arg.twenteeThree.tweentyFive[1].should.equal(2);
      arg.twenteeThree.tweentyFive[2].should.equal(3);
    },
    compute,
    description: 'should iterate over and update the given object according to the given callback function',
    input: createTestInput()
  },
  {
    assert: (arg) => {
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
      arg.twenteeThree.tweentyFive[0].should.equal('1_');
      arg.twenteeThree.tweentyFive[1].should.equal('2_');
      arg.twenteeThree.tweentyFive[2].should.equal('3_');
    },
    compute,
    description: 'should treat array as object if the treatArrayAsObject option is set to true',
    input: createTestInput(),
    options: {
      treatArrayAsObject: true
    }
  },
  {
    assert: () => {
      testState.assertPathTraversal.should.eql([
        'obj.one.two.three.four=4',
        'obj.one.six.seven=7',
        'obj.one.six.eight=8',
        'obj.one.nine=9',
        'obj.ten=10',
        'obj.eleven=11',
        'obj.twelve.thirteen=13',
        'obj.fourteen.fifteen.sixteen.seventeen=17',
        'obj.fourteen.eighteen.nineteen=19',
        'obj.fourteen.eighteen.twenty=20',
        'obj.fourteen.twentyone=21',
        'obj.twentytwo=22'
      ]);
    },
    compute: function (path, key, obj) {
      testState.assertPathTraversal.push(`obj.${[...path, key].join('.')}=${obj[key]}`);
    },
    description: 'should traverse the object correclty',
    input: createTestInput(),
    stateKey: 'assertPathTraversal'
  }
];

describe('tests', () => {
  tests.forEach((t) => {
    it(t.description, () => {
      const arg = t.input;
      const { assert, compute, input, options } = t;
      objectIterator.forAll(input, compute, options);
      assert(arg);
    });
  });
});
