import { Calculator } from '../../engines/CalculatorEngine';
import { registerLifeSettlementValueCalculatorInputs, registerLifeSettlementValueCalculatorResults, registerLifeSettlementValueCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerLifeSettlementValueCalculatorCalculator implements Calculator<registerLifeSettlementValueCalculatorInputs, registerLifeSettlementValueCalculatorResults> {
  readonly id = 'registerLifeSettlementValueCalculator';
  readonly name = 'registerLifeSettlementValueCalculator Calculator';
  readonly description = 'Calculate registerLifeSettlementValueCalculator values';

  calculate(inputs: registerLifeSettlementValueCalculatorInputs): registerLifeSettlementValueCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerLifeSettlementValueCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerLifeSettlementValueCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
