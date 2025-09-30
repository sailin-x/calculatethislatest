import { Calculator } from '../../engines/CalculatorEngine';
import { registerStructuredSettlementPayoutCalculatorInputs, registerStructuredSettlementPayoutCalculatorResults, registerStructuredSettlementPayoutCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerStructuredSettlementPayoutCalculatorCalculator implements Calculator<registerStructuredSettlementPayoutCalculatorInputs, registerStructuredSettlementPayoutCalculatorResults> {
  readonly id = 'registerStructuredSettlementPayoutCalculator';
  readonly name = 'registerStructuredSettlementPayoutCalculator Calculator';
  readonly description = 'Calculate registerStructuredSettlementPayoutCalculator values';

  calculate(inputs: registerStructuredSettlementPayoutCalculatorInputs): registerStructuredSettlementPayoutCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerStructuredSettlementPayoutCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerStructuredSettlementPayoutCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
