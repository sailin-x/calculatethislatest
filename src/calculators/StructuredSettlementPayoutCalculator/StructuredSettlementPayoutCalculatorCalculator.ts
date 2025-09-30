import { Calculator } from '../../engines/CalculatorEngine';
import { StructuredSettlementPayoutCalculatorInputs, StructuredSettlementPayoutCalculatorResults, StructuredSettlementPayoutCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class StructuredSettlementPayoutCalculatorCalculator implements Calculator<StructuredSettlementPayoutCalculatorInputs, StructuredSettlementPayoutCalculatorResults> {
  readonly id = 'StructuredSettlementPayoutCalculator';
  readonly name = 'StructuredSettlementPayoutCalculator Calculator';
  readonly description = 'Calculate StructuredSettlementPayoutCalculator values';

  calculate(inputs: StructuredSettlementPayoutCalculatorInputs): StructuredSettlementPayoutCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: StructuredSettlementPayoutCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: StructuredSettlementPayoutCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
