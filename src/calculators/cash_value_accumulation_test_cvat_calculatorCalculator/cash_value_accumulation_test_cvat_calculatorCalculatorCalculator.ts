import { Calculator } from '../../engines/CalculatorEngine';
import { cash_value_accumulation_test_cvat_calculatorCalculatorInputs, cash_value_accumulation_test_cvat_calculatorCalculatorResults, cash_value_accumulation_test_cvat_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cash_value_accumulation_test_cvat_calculatorCalculatorCalculator implements Calculator<cash_value_accumulation_test_cvat_calculatorCalculatorInputs, cash_value_accumulation_test_cvat_calculatorCalculatorResults> {
  readonly id = 'cash_value_accumulation_test_cvat_calculatorCalculator';
  readonly name = 'cash_value_accumulation_test_cvat_calculatorCalculator Calculator';
  readonly description = 'Calculate cash_value_accumulation_test_cvat_calculatorCalculator values';

  calculate(inputs: cash_value_accumulation_test_cvat_calculatorCalculatorInputs): cash_value_accumulation_test_cvat_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cash_value_accumulation_test_cvat_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cash_value_accumulation_test_cvat_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
