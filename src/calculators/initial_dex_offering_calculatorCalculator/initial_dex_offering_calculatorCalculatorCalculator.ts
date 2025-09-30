import { Calculator } from '../../engines/CalculatorEngine';
import { initial_dex_offering_calculatorCalculatorInputs, initial_dex_offering_calculatorCalculatorResults, initial_dex_offering_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class initial_dex_offering_calculatorCalculatorCalculator implements Calculator<initial_dex_offering_calculatorCalculatorInputs, initial_dex_offering_calculatorCalculatorResults> {
  readonly id = 'initial_dex_offering_calculatorCalculator';
  readonly name = 'initial_dex_offering_calculatorCalculator Calculator';
  readonly description = 'Calculate initial_dex_offering_calculatorCalculator values';

  calculate(inputs: initial_dex_offering_calculatorCalculatorInputs): initial_dex_offering_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: initial_dex_offering_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: initial_dex_offering_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
