# 🧮 Individual Calculator Implementation Guide

## 🚨 **MANDATORY READING BEFORE ANY DEVELOPMENT**

### **READ THESE DOCUMENTS FIRST:**
1. `PROJECT_NARRATIVE.md` - Understand the audit crisis and why standards matter
2. `CALCULATOR_COMPLETION_STANDARDS.md` - What "COMPLETED ✅" actually means
3. `calculator-list-CORRECTED.md` - Accurate status of all calculators

### **CRITICAL RULE:**
**NEVER mark any calculator as "COMPLETED ✅" unless you can demonstrate it working in the live application and passing all verification checks.**

## 🎯 **IMPLEMENTATION PROCESS**

### **Step 0: Verification Check**
Before starting, run: `npm run verify-calculators` to see current accurate status.

### **Step 1: Choose Calculator**
Only work on calculators marked as `[ ]` Not Started or `[!]` Needs Fix in `calculator-list-CORRECTED.md`.

### **Step 2: Follow Exact File Structure**

### 📁 Required File Structure (5 files per calculator)
```
src/calculators/{category}/{calculator-name}/
├── {CalculatorName}Calculator.ts     # Calculator definition (~50 lines)
├── formulas.ts                       # Domain-specific formulas (~100-200 lines)
├── validation.ts                     # Business validation rules (~20-30 lines)
├── {CalculatorName}Calculator.test.ts # Test cases (~50-100 lines)
└── index.ts                          # Export file (~3 lines)
```

### 🔄 Implementation Steps (ALWAYS follow this order)
1. **Calculator Definition**: Define inputs, outputs, examples, and metadata
2. **Formula Implementation**: Implement domain-specific mathematical/business logic
3. **Validation Rules**: Add calculator-specific business rules using ValidationRuleFactory
4. **Test Suite**: Create comprehensive test cases using existing TestFramework
5. **Registration**: Add to calculatorRegistry.ts and main index.ts
6. **Integration**: Leverage existing infrastructure (UI, validation, testing, data integration)

### ✅ Quality Standards (NON-NEGOTIABLE)
- **Industry Accuracy**: Validate against professional tools and standards
- **Comprehensive Testing**: Include unit tests, edge cases, and performance tests
- **Professional Documentation**: Clear examples, tooltips, and explanations
- **Accessibility Compliance**: Ensure WCAG AA compliance through existing framework
- **Performance Standards**: Meet established benchmarks for execution time

### 🚀 Automatic Platform Benefits (Already Built)
- ✅ UI rendering and responsive design
- ✅ Input validation and error handling
- ✅ Real-world data integration
- ✅ Performance monitoring
- ✅ Accessibility compliance
- ✅ Professional testing and certification
- ✅ Export and sharing capabilities
- ✅ Search and categorization

### 📋 Implementation Checklist (Use for EVERY calculator)
- [ ] Create calculator definition with proper interface implementation
- [ ] Implement domain-specific formulas with error handling
- [ ] Add business validation rules using ValidationRuleFactory
- [ ] Write comprehensive test suite with edge cases
- [ ] Register calculator in calculatorRegistry.ts
- [ ] Export from main index.ts
- [ ] Verify all platform features work automatically
- [ ] Test accessibility compliance
- [ ] Validate against industry standards
- [ ] Document examples and use cases

### 🎯 Key Principle
**The platform infrastructure handles 80%+ of the work. Individual calculators focus purely on domain expertise and business logic.**

### 📚 Reference Files
- Design document: `.kiro/specs/calculator-platform/design.md`
- Calculator list: `calculator-list.md`
- Existing examples: `src/calculators/` (mortgage, investment, etc.)

---
**REMEMBER: Each calculator should take 30-60 minutes to implement because all the infrastructure is already built!**