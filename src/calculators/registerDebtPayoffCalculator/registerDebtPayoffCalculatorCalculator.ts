import { Calculator } from '../../engines/CalculatorEngine';
import { registerDebtPayoffCalculatorInputs, registerDebtPayoffCalculatorResults, registerDebtPayoffCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerDebtPayoffCalculatorCalculator implements Calculator<registerDebtPayoffCalculatorInputs, registerDebtPayoffCalculatorResults> {
  readonly id = 'registerDebtPayoffCalculator';
  readonly name = 'registerDebtPayoffCalculator Calculator';
  readonly description = 'Calculate registerDebtPayoffCalculator values';

  calculate(inputs: registerDebtPayoffCalculatorInputs): registerDebtPayoffCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerDebtPayoffCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerDebtPayoffCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
