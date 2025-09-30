import { Calculator } from '../../engines/CalculatorEngine';
import { registerCorporateBondCalculatorInputs, registerCorporateBondCalculatorResults, registerCorporateBondCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerCorporateBondCalculatorCalculator implements Calculator<registerCorporateBondCalculatorInputs, registerCorporateBondCalculatorResults> {
  readonly id = 'registerCorporateBondCalculator';
  readonly name = 'registerCorporateBondCalculator Calculator';
  readonly description = 'Calculate registerCorporateBondCalculator values';

  calculate(inputs: registerCorporateBondCalculatorInputs): registerCorporateBondCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerCorporateBondCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerCorporateBondCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
