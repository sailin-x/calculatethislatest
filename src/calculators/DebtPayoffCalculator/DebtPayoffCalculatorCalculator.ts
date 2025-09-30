import { Calculator } from '../../engines/CalculatorEngine';
import { DebtPayoffCalculatorInputs, DebtPayoffCalculatorResults, DebtPayoffCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class DebtPayoffCalculatorCalculator implements Calculator<DebtPayoffCalculatorInputs, DebtPayoffCalculatorResults> {
  readonly id = 'DebtPayoffCalculator';
  readonly name = 'DebtPayoffCalculator Calculator';
  readonly description = 'Calculate DebtPayoffCalculator values';

  calculate(inputs: DebtPayoffCalculatorInputs): DebtPayoffCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: DebtPayoffCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: DebtPayoffCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
