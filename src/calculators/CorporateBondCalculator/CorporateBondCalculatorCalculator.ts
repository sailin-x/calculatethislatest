import { Calculator } from '../../engines/CalculatorEngine';
import { CorporateBondCalculatorInputs, CorporateBondCalculatorResults, CorporateBondCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class CorporateBondCalculatorCalculator implements Calculator<CorporateBondCalculatorInputs, CorporateBondCalculatorResults> {
  readonly id = 'CorporateBondCalculator';
  readonly name = 'CorporateBondCalculator Calculator';
  readonly description = 'Calculate CorporateBondCalculator values';

  calculate(inputs: CorporateBondCalculatorInputs): CorporateBondCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: CorporateBondCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: CorporateBondCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
