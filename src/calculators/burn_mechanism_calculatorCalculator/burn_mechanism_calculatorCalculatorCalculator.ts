import { Calculator } from '../../engines/CalculatorEngine';
import { burn_mechanism_calculatorCalculatorInputs, burn_mechanism_calculatorCalculatorResults, burn_mechanism_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class burn_mechanism_calculatorCalculatorCalculator implements Calculator<burn_mechanism_calculatorCalculatorInputs, burn_mechanism_calculatorCalculatorResults> {
  readonly id = 'burn_mechanism_calculatorCalculator';
  readonly name = 'burn_mechanism_calculatorCalculator Calculator';
  readonly description = 'Calculate burn_mechanism_calculatorCalculator values';

  calculate(inputs: burn_mechanism_calculatorCalculatorInputs): burn_mechanism_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: burn_mechanism_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: burn_mechanism_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
