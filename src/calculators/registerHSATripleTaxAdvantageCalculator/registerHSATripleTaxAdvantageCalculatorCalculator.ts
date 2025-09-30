import { Calculator } from '../../engines/CalculatorEngine';
import { registerHSATripleTaxAdvantageCalculatorInputs, registerHSATripleTaxAdvantageCalculatorResults, registerHSATripleTaxAdvantageCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerHSATripleTaxAdvantageCalculatorCalculator implements Calculator<registerHSATripleTaxAdvantageCalculatorInputs, registerHSATripleTaxAdvantageCalculatorResults> {
  readonly id = 'registerHSATripleTaxAdvantageCalculator';
  readonly name = 'registerHSATripleTaxAdvantageCalculator Calculator';
  readonly description = 'Calculate registerHSATripleTaxAdvantageCalculator values';

  calculate(inputs: registerHSATripleTaxAdvantageCalculatorInputs): registerHSATripleTaxAdvantageCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerHSATripleTaxAdvantageCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerHSATripleTaxAdvantageCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
