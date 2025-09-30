import { Calculator } from '../../engines/CalculatorEngine';
import { opioid_settlement_calculatorCalculatorInputs, opioid_settlement_calculatorCalculatorResults, opioid_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class opioid_settlement_calculatorCalculatorCalculator implements Calculator<opioid_settlement_calculatorCalculatorInputs, opioid_settlement_calculatorCalculatorResults> {
  readonly id = 'opioid_settlement_calculatorCalculator';
  readonly name = 'opioid_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate opioid_settlement_calculatorCalculator values';

  calculate(inputs: opioid_settlement_calculatorCalculatorInputs): opioid_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: opioid_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: opioid_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
