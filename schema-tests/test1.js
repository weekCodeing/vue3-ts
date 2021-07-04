// Node.js require
const Ajv = require('ajv');
// or ESM/TypeScript import
// import Ajv from 'ajv';
const schema = {
  type: 'string',
  minLength: 10,
}
const ajv = new Ajv();
const validate = ajv.compile(schema);
const valid = validate('jesksonHelloWorld');
if(!valid) console.log(validate.errors);
