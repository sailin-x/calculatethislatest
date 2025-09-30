import { Calculator } from '../../engines/CalculatorEngine';
import { surgical_error_settlement_calculatorCalculatorInputs, surgical_error_settlement_calculatorCalculatorResults, surgical_error_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class surgical_error_settlement_calculatorCalculatorCalculator implements Calculator<surgical_error_settlement_calculatorCalculatorInputs, surgical_error_settlement_calculatorCalculatorResults> {
  readonly id = 'surgical_error_settlement_calculatorCalculator';
  readonly name = 'surgical_error_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate surgical_error_settlement_calculatorCalculator values';

  calculate(inputs: surgical_error_settlement_calculatorCalculatorInputs): surgical_error_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: surgical_error_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: surgical_error_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
