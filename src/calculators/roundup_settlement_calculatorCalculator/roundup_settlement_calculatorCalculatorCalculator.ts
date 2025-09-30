import { Calculator } from '../../engines/CalculatorEngine';
import { roundup_settlement_calculatorCalculatorInputs, roundup_settlement_calculatorCalculatorResults, roundup_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class roundup_settlement_calculatorCalculatorCalculator implements Calculator<roundup_settlement_calculatorCalculatorInputs, roundup_settlement_calculatorCalculatorResults> {
  readonly id = 'roundup_settlement_calculatorCalculator';
  readonly name = 'roundup_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate roundup_settlement_calculatorCalculator values';

  calculate(inputs: roundup_settlement_calculatorCalculatorInputs): roundup_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: roundup_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: roundup_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
