/**
 * Minimal test case to isolate allInputs is not defined error
 */

export const testAllInputs = () => {
  console.log('=== TESTING allInputs AVAILABILITY ===');
  
  // Test 1: Direct function call
  const testValidator = (value: any, allInputs?: Record<string, any>) => {
    console.log('✅ allInputs in validator:', allInputs);
    return true;
  };
  
  // Test 2: Call with undefined
  console.log('Test 2: Calling with undefined');
  testValidator('test', undefined);
  
  // Test 3: Call with empty object
  console.log('Test 3: Calling with empty object');
  testValidator('test', {});
  
  // Test 4: Call with actual data
  console.log('Test 4: Calling with actual data');
  testValidator('test', { field1: 'value1', field2: 'value2' });
  
  // Test 5: Test ValidationRuleFactory pattern
  console.log('Test 5: Testing ValidationRuleFactory pattern');
  const mockCreateRule = (field: string, message: string, validator: any) => {
    return {
      field,
      type: 'custom',
      message,
      validator: (value: any, inputs?: Record<string, any>) => {
        try {
          const inputsToUse = inputs || {};
          return validator(value, inputsToUse);
        } catch (error) {
          console.error(`❌ Validation error for field ${field}:`, error);
          return false;
        }
      }
    };
  };
  
  const testRule = mockCreateRule(
    'testField',
    'Test validation message',
    (value: any, allInputs?: Record<string, any>) => {
      console.log('✅ Rule validator called with:', { value, allInputs });
      return allInputs && allInputs.testField !== undefined;
    }
  );
  
  // Test the rule
  const result = testRule.validator('test value', { testField: 'exists' });
  console.log('✅ Rule validation result:', result);
  
  console.log('=== allInputs TESTING COMPLETE ===');
};

// Auto-run test when module loads
if (typeof window !== 'undefined') {
  console.log('Debug module loaded, running allInputs test...');
  testAllInputs();
}
