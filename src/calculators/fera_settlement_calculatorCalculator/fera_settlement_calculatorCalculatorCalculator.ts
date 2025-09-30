import { Calculator } from '../../engines/CalculatorEngine';
import { fera_settlement_calculatorCalculatorInputs, fera_settlement_calculatorCalculatorResults, fera_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fera_settlement_calculatorCalculatorCalculator implements Calculator<fera_settlement_calculatorCalculatorInputs, fera_settlement_calculatorCalculatorResults> {
  readonly id = 'fera_settlement_calculatorCalculator';
  readonly name = 'fera_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate fera_settlement_calculatorCalculator values';

  calculate(inputs: fera_settlement_calculatorCalculatorInputs): fera_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fera_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fera_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
