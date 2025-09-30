import { Calculator } from '../../engines/CalculatorEngine';
import { debt_avalanche_calculatorCalculatorInputs, debt_avalanche_calculatorCalculatorResults, debt_avalanche_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class debt_avalanche_calculatorCalculatorCalculator implements Calculator<debt_avalanche_calculatorCalculatorInputs, debt_avalanche_calculatorCalculatorResults> {
  readonly id = 'debt_avalanche_calculatorCalculator';
  readonly name = 'debt_avalanche_calculatorCalculator Calculator';
  readonly description = 'Calculate debt_avalanche_calculatorCalculator values';

  calculate(inputs: debt_avalanche_calculatorCalculatorInputs): debt_avalanche_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: debt_avalanche_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: debt_avalanche_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
