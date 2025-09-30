import { Calculator } from '../../engines/CalculatorEngine';
import { bond_convexity_calculatorCalculatorInputs, bond_convexity_calculatorCalculatorResults, bond_convexity_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class bond_convexity_calculatorCalculatorCalculator implements Calculator<bond_convexity_calculatorCalculatorInputs, bond_convexity_calculatorCalculatorResults> {
  readonly id = 'bond_convexity_calculatorCalculator';
  readonly name = 'bond_convexity_calculatorCalculator Calculator';
  readonly description = 'Calculate bond_convexity_calculatorCalculator values';

  calculate(inputs: bond_convexity_calculatorCalculatorInputs): bond_convexity_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: bond_convexity_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: bond_convexity_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
