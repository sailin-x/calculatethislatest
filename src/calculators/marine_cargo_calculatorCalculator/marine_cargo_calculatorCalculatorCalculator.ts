import { Calculator } from '../../engines/CalculatorEngine';
import { marine_cargo_calculatorCalculatorInputs, marine_cargo_calculatorCalculatorResults, marine_cargo_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class marine_cargo_calculatorCalculatorCalculator implements Calculator<marine_cargo_calculatorCalculatorInputs, marine_cargo_calculatorCalculatorResults> {
  readonly id = 'marine_cargo_calculatorCalculator';
  readonly name = 'marine_cargo_calculatorCalculator Calculator';
  readonly description = 'Calculate marine_cargo_calculatorCalculator values';

  calculate(inputs: marine_cargo_calculatorCalculatorInputs): marine_cargo_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: marine_cargo_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: marine_cargo_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
