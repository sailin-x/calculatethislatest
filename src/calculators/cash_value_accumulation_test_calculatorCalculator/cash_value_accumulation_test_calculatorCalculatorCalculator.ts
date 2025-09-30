import { Calculator } from '../../engines/CalculatorEngine';
import { cash_value_accumulation_test_calculatorCalculatorInputs, cash_value_accumulation_test_calculatorCalculatorResults, cash_value_accumulation_test_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cash_value_accumulation_test_calculatorCalculatorCalculator implements Calculator<cash_value_accumulation_test_calculatorCalculatorInputs, cash_value_accumulation_test_calculatorCalculatorResults> {
  readonly id = 'cash_value_accumulation_test_calculatorCalculator';
  readonly name = 'cash_value_accumulation_test_calculatorCalculator Calculator';
  readonly description = 'Calculate cash_value_accumulation_test_calculatorCalculator values';

  calculate(inputs: cash_value_accumulation_test_calculatorCalculatorInputs): cash_value_accumulation_test_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cash_value_accumulation_test_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cash_value_accumulation_test_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
