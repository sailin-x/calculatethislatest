import { Calculator } from '../../engines/CalculatorEngine';
import { lifeSettlementValueCalculatorInputs, lifeSettlementValueCalculatorResults, lifeSettlementValueCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class lifeSettlementValueCalculatorCalculator implements Calculator<lifeSettlementValueCalculatorInputs, lifeSettlementValueCalculatorResults> {
  readonly id = 'lifeSettlementValueCalculator';
  readonly name = 'lifeSettlementValueCalculator Calculator';
  readonly description = 'Calculate lifeSettlementValueCalculator values';

  calculate(inputs: lifeSettlementValueCalculatorInputs): lifeSettlementValueCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: lifeSettlementValueCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: lifeSettlementValueCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
