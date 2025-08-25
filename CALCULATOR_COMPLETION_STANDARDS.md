# Calculator Completion Standards

## 🚨 CRITICAL: Definition of "COMPLETED" Calculator

A calculator can ONLY be marked as "COMPLETED ✅" when ALL of the following criteria are met:

### ✅ **MANDATORY FILES CHECKLIST**
Every completed calculator MUST have these files:

```
src/calculators/{category}/{calculator-name}/
├── {CalculatorName}Calculator.ts     # Main calculator implementation
├── formulas.ts                       # Core calculation logic
├── validation.ts                     # Comprehensive validation rules
├── quickValidation.ts               # Individual field validation (with allInputs parameter!)
├── {CalculatorName}Calculator.test.ts # Unit tests
├── register.ts                      # Calculator registration
└── index.ts                         # Module exports
```

### ✅ **REGISTRATION REQUIREMENTS**
1. Calculator MUST be imported in `src/calculators/index.ts`
2. Calculator MUST be registered in `registerAllCalculators()` function
3. Calculator MUST appear in the registry when app runs

### ✅ **IMPLEMENTATION REQUIREMENTS**
1. **Main Calculator File**: Complete implementation with all inputs/outputs
2. **Formulas**: All calculation logic implemented and tested
3. **Validation**: Both comprehensive and quick validation implemented
4. **Tests**: Minimum 80% code coverage with meaningful test cases
5. **Registration**: Successfully registered and accessible in the app

### ✅ **VALIDATION FUNCTION SIGNATURE REQUIREMENT**
**ALL validation functions in quickValidation.ts files MUST include the `allInputs` parameter:**

```typescript
// ✅ CORRECT - Include allInputs parameter
export function validateFieldName(value: any, allInputs?: Record<string, any>): ValidationResult {
  // validation logic
}

// ❌ WRONG - Missing allInputs parameter (causes runtime error)
export function validateFieldName(value: any): ValidationResult {
  // validation logic
}
```

### ✅ **TESTING REQUIREMENTS**
1. Unit tests for all calculation functions
2. Validation tests for all input scenarios
3. Edge case testing
4. Error handling tests
5. Integration tests with the calculator engine

### ✅ **QUALITY ASSURANCE**
1. Calculator works in the live application
2. All inputs validate correctly
3. All outputs calculate correctly
4. No console errors or warnings
5. Meets accessibility standards

## 🚫 **INCOMPLETE CALCULATOR INDICATORS**

Mark as **INCOMPLETE** if ANY of these are true:
- Only has `types.ts` file
- Missing test files
- Not registered in `src/calculators/index.ts`
- Validation functions missing `allInputs` parameter
- Throws runtime errors
- Missing core calculation logic
- Not accessible in the live app

## 📋 **COMPLETION VERIFICATION PROCESS**

Before marking ANY calculator as "COMPLETED ✅":

1. **File Check**: Verify all mandatory files exist
2. **Registration Check**: Confirm calculator is registered and imported
3. **Runtime Check**: Test calculator works in the application
4. **Test Check**: Run unit tests and verify they pass
5. **Validation Check**: Verify all validation functions have correct signatures
6. **Quality Check**: No errors, warnings, or accessibility issues

## 🔄 **STATUS DEFINITIONS**

Use these exact status markers:

- `[ ]` **Not Started** - No implementation files exist
- `[~]` **In Progress** - Some files exist but incomplete
- `[x]` **COMPLETED ✅** - ALL requirements met and verified
- `[!]` **Needs Fix** - Implementation exists but has issues

## 📊 **TRACKING ACCURACY**

The calculator list MUST accurately reflect the actual state:
- Total count should match registered calculators
- Completed count should match working calculators
- Status should be verified, not assumed

## 🛡️ **PREVENTION MEASURES**

To prevent future discrepancies:
1. Always verify completion before marking
2. Use automated tests to validate status
3. Regular audits of calculator list vs. implementation
4. Peer review of completion claims
5. Integration tests for all "completed" calculators

---

**Remember: Marking a calculator as "COMPLETED" when it's not fully implemented creates technical debt and misleads stakeholders. Only mark as complete when you can demonstrate it working in the live application.**