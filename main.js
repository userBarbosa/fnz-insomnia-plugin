// For help writing plugins, visit the documentation to get started:
//   https://support.insomnia.rest/article/173-plugins

function arrayHelper(array) {
  let helper = []
  for (let i = 0; i < 9; i++) {
    helper[i] = [];
  };

  array.forEach(p => {
    let splitted = p.split(",")
    helper[splitted[0]].push(splitted[1])
  });

  Object.keys(helper).forEach(n => {
    if (helper[n].length === 0) {
      helper[n] = randomInteger(9)
    } else if (helper[n].length > 1) {
      let options = helper[n];
      let rp = randomInteger(helper[n].length - 1);
      helper[n] = Number(options[rp]);
    }
  });

  return helper;
}

function randomInteger(i) {
  return Math.round(Math.random() * i);
}

function mount(arr, punct) {
  verifierDigits(verifierDigits(arr));

  let pn = '';
  arr.forEach(digit => {
    pn = pn.concat(digit);
  })
  if (punct) {
    pn = pn.slice(0, 3) + "." + pn.slice(3, 6) + "." + pn.slice(6, 9) + "-" + pn.slice(-2)
  }
  return pn
}

function verifierDigits(arr) {
  let x = 0;
  for (let i = (arr.length + 1), j = 0; i >= 2; i--, j++) {
    x += parseInt(arr[j]) * i;
  }
  const y = 11 - (x % 11);
  arr.push(y >= 10 ? 0 : y)
  return arr;
}

module.exports.templateTags = [{
  name: 'randomInteger',
  displayName: 'Random Integer',
  description: 'Generate a random integer.',
  args: [{
      displayName: 'Minimum',
      description: 'Minimum potential value',
      type: 'number',
      defaultValue: 0
    },
    {
      displayName: 'Maximum',
      description: 'Maximum potential value',
      type: 'number',
      defaultValue: 100
    }
  ],
  async run(context, min, max) {
    return Math.round(min + Math.random() * (max - min));
  }
}, {
  name: 'specificCPF',
  displayName: 'Specific CPF',
  description: 'Generate a personal number with specific integers.',
  args: [{
    displayName: 'Filter',
    description: 'Filter integers',
    type: 'string',
    defaultValue: "|6,9|"
  }, {
    displayName: 'Punctuation',
    description: 'Should have punctuation',
    type: 'boolean',
    defaultValue: false
  }],
  run(context, pattern, punct) {
    const arr = pattern.split('|').filter(p => p != '');
    const helper = arrayHelper(arr);
    return mount(helper, punct);
  }
}];