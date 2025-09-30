import { Calculator } from '../../engines/CalculatorEngine';
import { structured_settlement_payout_calculatorCalculatorInputs, structured_settlement_payout_calculatorCalculatorResults, structured_settlement_payout_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class structured_settlement_payout_calculatorCalculatorCalculator implements Calculator<structured_settlement_payout_calculatorCalculatorInputs, structured_settlement_payout_calculatorCalculatorResults> {
  readonly id = 'structured_settlement_payout_calculatorCalculator';
  readonly name = 'structured_settlement_payout_calculatorCalculator Calculator';
  readonly description = 'Calculate structured_settlement_payout_calculatorCalculator values';

  calculate(inputs: structured_settlement_payout_calculatorCalculatorInputs): structured_settlement_payout_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: structured_settlement_payout_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: structured_settlement_payout_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
