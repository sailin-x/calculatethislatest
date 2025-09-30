import { Calculator } from '../../engines/CalculatorEngine';
import { CostOfDebtCalculatorInputs, CostOfDebtCalculatorResults, CostOfDebtCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class CostOfDebtCalculatorCalculator implements Calculator<CostOfDebtCalculatorInputs, CostOfDebtCalculatorResults> {
  readonly id = 'CostOfDebtCalculator';
  readonly name = 'CostOfDebtCalculator Calculator';
  readonly description = 'Calculate CostOfDebtCalculator values';

  calculate(inputs: CostOfDebtCalculatorInputs): CostOfDebtCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: CostOfDebtCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: CostOfDebtCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
