import { Calculator } from '../../engines/CalculatorEngine';
import { DebtAvalancheCalculatorInputs, DebtAvalancheCalculatorResults, DebtAvalancheCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class DebtAvalancheCalculatorCalculator implements Calculator<DebtAvalancheCalculatorInputs, DebtAvalancheCalculatorResults> {
  readonly id = 'DebtAvalancheCalculator';
  readonly name = 'DebtAvalancheCalculator Calculator';
  readonly description = 'Calculate DebtAvalancheCalculator values';

  calculate(inputs: DebtAvalancheCalculatorInputs): DebtAvalancheCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: DebtAvalancheCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: DebtAvalancheCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
