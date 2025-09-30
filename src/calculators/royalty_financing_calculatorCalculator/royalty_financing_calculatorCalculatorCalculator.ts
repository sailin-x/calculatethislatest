import { Calculator } from '../../engines/CalculatorEngine';
import { royalty_financing_calculatorCalculatorInputs, royalty_financing_calculatorCalculatorResults, royalty_financing_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class royalty_financing_calculatorCalculatorCalculator implements Calculator<royalty_financing_calculatorCalculatorInputs, royalty_financing_calculatorCalculatorResults> {
  readonly id = 'royalty_financing_calculatorCalculator';
  readonly name = 'royalty_financing_calculatorCalculator Calculator';
  readonly description = 'Calculate royalty_financing_calculatorCalculator values';

  calculate(inputs: royalty_financing_calculatorCalculatorInputs): royalty_financing_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: royalty_financing_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: royalty_financing_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
