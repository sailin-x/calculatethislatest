import { describe, it, expect, beforeEach } from 'vitest';
import { CalculatorEngine } from '../engines/CalculatorEngine';
import { calculatorRegistry } from '../data/calculatorRegistry';
import { ValidationRuleFactory } from '../utils/validation';
import { Calculator, Formula } from '../types/calculator';

describe('Calculator Framework', () => {
  let engine: CalculatorEngine;

  beforeEach(() => {
    engine = new CalculatorEngine();
  });

  describe('CalculatorEngine', () => {
    it('should initialize with default constants', () => {
      expect(engine.getConstant('DAYS_PER_YEAR')).toBe(365);
      expect(engine.getConstant('MONTHS_PER_YEAR')).toBe(12);
      expect(engine.getConstant('CURRENCY_PRECISION')).toBe(2);
    });

    it('should format currency correctly', () => {
      expect(engine.formatNumber(1234.56, 'currency')).toBe('$1,234.56');
      expect(engine.formatNumber(0, 'currency')).toBe('$0.00');
    });

    it('should format percentages correctly', () => {
      expect(engine.formatNumber(4.5, 'percentage')).toBe('4.5000%');
      expect(engine.formatNumber(0, 'percentage')).toBe('0.0000%');
    });

    it('should parse numbers correctly', () => {
      expect(engine.parseNumber('1,234.56')).toBe(1234.56);
      expect(engine.parseNumber('$1,234.56')).toBe(1234.56);
      expect(engine.parseNumber('4.5%')).toBe(4.5);
      expect(engine.parseNumber('invalid')).toBe(0);
    });

    it('should validate ranges correctly', () => {
      expect(engine.isInRange(50, 0, 100)).toBe(true);
      expect(engine.isInRange(-10, 0, 100)).toBe(false);
      expect(engine.isInRange(150, 0, 100)).toBe(false);
    });

    it('should calculate compound interest correctly', () => {
      const result = engine.calculateCompoundInterest(1000, 0.05, 1, 12);
      expect(result).toBeCloseTo(1051.16, 2);
    });

    it('should calculate loan payments correctly', () => {
      const payment = engine.calculatePayment(200000, 0.05/12, 30*12);
      expect(payment).toBeCloseTo(1073.64, 2);
    });
  });

  describe('ValidationRuleFactory', () => {
    it('should create required validation rules', () => {
      const rule = ValidationRuleFactory.required('testField');
      expect(rule.validator('')).toBe(false);
      expect(rule.validator('value')).toBe(true);
      expect(rule.validator(null)).toBe(false);
      expect(rule.validator(undefined)).toBe(false);
    });

    it('should create range validation rules', () => {
      const rule = ValidationRuleFactory.range('testField', 0, 100);
      expect(rule.validator(50)).toBe(true);
      expect(rule.validator(-10)).toBe(false);
      expect(rule.validator(150)).toBe(false);
    });

    it('should create positive number validation rules', () => {
      const rule = ValidationRuleFactory.positive('testField');
      expect(rule.validator(10)).toBe(true);
      expect(rule.validator(0)).toBe(false);
      expect(rule.validator(-10)).toBe(false);
    });

    it('should create percentage validation rules', () => {
      const rule = ValidationRuleFactory.percentage('testField');
      expect(rule.validator(50)).toBe(true);
      expect(rule.validator(0)).toBe(true);
      expect(rule.validator(100)).toBe(true);
      expect(rule.validator(-10)).toBe(false);
      expect(rule.validator(150)).toBe(false);
    });
  });

  describe('CalculatorRegistry', () => {
    it('should register and retrieve calculators', () => {
      const testCalculator: Calculator = {
        id: 'test-calc',
        title: 'Test Calculator',
        category: 'math',
        description: 'A test calculator',
        usageInstructions: [],
        inputs: [],
        outputs: [],
        formulas: [],
        validationRules: [],
        examples: []
      };

      calculatorRegistry.register(testCalculator);
      
      expect(calculatorRegistry.hasCalculator('test-calc')).toBe(true);
      expect(calculatorRegistry.getCalculator('test-calc')).toEqual(testCalculator);
      expect(calculatorRegistry.getCalculatorsByCategory('math')).toContain(testCalculator);
    });

    it('should search calculators correctly', () => {
      const testCalculator: Calculator = {
        id: 'mortgage-calc',
        title: 'Mortgage Calculator',
        category: 'finance',
        description: 'Calculate mortgage payments',
        usageInstructions: [],
        inputs: [],
        outputs: [],
        formulas: [],
        validationRules: [],
        examples: []
      };

      calculatorRegistry.register(testCalculator);
      
      const results = calculatorRegistry.searchCalculators('mortgage');
      expect(results).toContain(testCalculator);
      
      const financeResults = calculatorRegistry.searchCalculators('finance');
      expect(financeResults).toContain(testCalculator);
    });
  });

  describe('Integration Test', () => {
    it('should work end-to-end with a simple calculator', () => {
      // Create a simple addition calculator
      const additionFormula: Formula = {
        id: 'addition',
        name: 'Addition',
        description: 'Adds two numbers together',
        calculate: (inputs) => ({
          outputs: {
            result: inputs.a + inputs.b
          },
          explanation: `${inputs.a} + ${inputs.b} = ${inputs.a + inputs.b}`
        })
      };

      const calculator: Calculator = {
        id: 'addition-calc',
        title: 'Addition Calculator',
        category: 'math',
        description: 'Add two numbers',
        usageInstructions: ['Enter first number', 'Enter second number', 'Click calculate'],
        inputs: [
          {
            id: 'a',
            label: 'First Number',
            type: 'number',
            required: true
          },
          {
            id: 'b',
            label: 'Second Number',
            type: 'number',
            required: true
          }
        ],
        outputs: [
          {
            id: 'result',
            label: 'Sum',
            type: 'number'
          }
        ],
        formulas: [additionFormula],
        validationRules: [
          ValidationRuleFactory.required('a'),
          ValidationRuleFactory.required('b')
        ],
        examples: [
          {
            title: 'Basic Addition',
            description: 'Add 5 and 3',
            inputs: { a: 5, b: 3 },
            expectedOutputs: { result: 8 }
          }
        ]
      };

      // Register calculator and formula
      calculatorRegistry.register(calculator);
      engine.registerFormula(additionFormula);
      engine.registerValidationRules(calculator.id, calculator.validationRules);

      // Test validation
      const validationResult = engine.validate(calculator.id, { a: 5, b: 3 });
      expect(validationResult.isValid).toBe(true);

      // Test calculation
      const calculationResult = engine.calculate('addition', { a: 5, b: 3 });
      expect(calculationResult.outputs.result).toBe(8);
      expect(calculationResult.explanation).toBe('5 + 3 = 8');
    });
  });
});