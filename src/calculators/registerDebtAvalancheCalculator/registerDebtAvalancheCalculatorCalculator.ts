import { Calculator } from '../../engines/CalculatorEngine';
import { registerDebtAvalancheCalculatorInputs, registerDebtAvalancheCalculatorResults, registerDebtAvalancheCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerDebtAvalancheCalculatorCalculator implements Calculator<registerDebtAvalancheCalculatorInputs, registerDebtAvalancheCalculatorResults> {
  readonly id = 'registerDebtAvalancheCalculator';
  readonly name = 'registerDebtAvalancheCalculator Calculator';
  readonly description = 'Calculate registerDebtAvalancheCalculator values';

  calculate(inputs: registerDebtAvalancheCalculatorInputs): registerDebtAvalancheCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerDebtAvalancheCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerDebtAvalancheCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
