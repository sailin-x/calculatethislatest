// Minimal reproduction test for allInputs bundling issue
// This file will help isolate where allInputs is being dropped during bundling

import { ValidationRuleFactory } from './utils/validation';
import { ValidationEngine } from './engines/ValidationEngine';

// Test 1: Direct ValidationRuleFactory usage
console.log('=== TEST 1: ValidationRuleFactory.createRule ===');
const testRule = ValidationRuleFactory.createRule(
  'testField',
  'Test validation message',
  (value, allInputs) => {
    console.log('Validator called with:', { value, allInputs });
    return allInputs && allInputs.testField !== undefined;
  }
);

console.log('Test rule created:', testRule);

// Test 2: ValidationEngine usage
console.log('=== TEST 2: ValidationEngine.validateField ===');
const validationEngine = new ValidationEngine();
const testInputs = { testField: 'test value', otherField: 'other value' };

try {
  const result = validationEngine.validateField('testField', 'test value', [testRule], testInputs);
  console.log('Validation result:', result);
} catch (error) {
  console.error('Validation error:', error);
}

// Test 3: Direct validator function test
console.log('=== TEST 3: Direct validator function ===');
const directValidator = (value, allInputs) => {
  console.log('Direct validator called with:', { value, allInputs });
  return allInputs && allInputs.testField !== undefined;
};

try {
  const directResult = directValidator('test value', testInputs);
  console.log('Direct validator result:', directResult);
} catch (error) {
  console.error('Direct validator error:', error);
}

export { testRule, validationEngine, directValidator };
