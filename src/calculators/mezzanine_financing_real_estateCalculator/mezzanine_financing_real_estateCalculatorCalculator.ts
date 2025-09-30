import { Calculator } from '../../engines/CalculatorEngine';
import { mezzanine_financing_real_estateCalculatorInputs, mezzanine_financing_real_estateCalculatorResults, mezzanine_financing_real_estateCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mezzanine_financing_real_estateCalculatorCalculator implements Calculator<mezzanine_financing_real_estateCalculatorInputs, mezzanine_financing_real_estateCalculatorResults> {
  readonly id = 'mezzanine_financing_real_estateCalculator';
  readonly name = 'mezzanine_financing_real_estateCalculator Calculator';
  readonly description = 'Calculate mezzanine_financing_real_estateCalculator values';

  calculate(inputs: mezzanine_financing_real_estateCalculatorInputs): mezzanine_financing_real_estateCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mezzanine_financing_real_estateCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mezzanine_financing_real_estateCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
