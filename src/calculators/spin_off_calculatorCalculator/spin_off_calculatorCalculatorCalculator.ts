import { Calculator } from '../../engines/CalculatorEngine';
import { spin_off_calculatorCalculatorInputs, spin_off_calculatorCalculatorResults, spin_off_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class spin_off_calculatorCalculatorCalculator implements Calculator<spin_off_calculatorCalculatorInputs, spin_off_calculatorCalculatorResults> {
  readonly id = 'spin_off_calculatorCalculator';
  readonly name = 'spin_off_calculatorCalculator Calculator';
  readonly description = 'Calculate spin_off_calculatorCalculator values';

  calculate(inputs: spin_off_calculatorCalculatorInputs): spin_off_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: spin_off_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: spin_off_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
