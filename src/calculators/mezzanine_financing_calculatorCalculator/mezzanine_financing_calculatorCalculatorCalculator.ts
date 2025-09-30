import { Calculator } from '../../engines/CalculatorEngine';
import { mezzanine_financing_calculatorCalculatorInputs, mezzanine_financing_calculatorCalculatorResults, mezzanine_financing_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mezzanine_financing_calculatorCalculatorCalculator implements Calculator<mezzanine_financing_calculatorCalculatorInputs, mezzanine_financing_calculatorCalculatorResults> {
  readonly id = 'mezzanine_financing_calculatorCalculator';
  readonly name = 'mezzanine_financing_calculatorCalculator Calculator';
  readonly description = 'Calculate mezzanine_financing_calculatorCalculator values';

  calculate(inputs: mezzanine_financing_calculatorCalculatorInputs): mezzanine_financing_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mezzanine_financing_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mezzanine_financing_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
