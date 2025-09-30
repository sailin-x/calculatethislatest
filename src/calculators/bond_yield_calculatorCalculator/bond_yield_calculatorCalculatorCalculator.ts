import { Calculator } from '../../engines/CalculatorEngine';
import { bond_yield_calculatorCalculatorInputs, bond_yield_calculatorCalculatorResults, bond_yield_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class bond_yield_calculatorCalculatorCalculator implements Calculator<bond_yield_calculatorCalculatorInputs, bond_yield_calculatorCalculatorResults> {
  readonly id = 'bond_yield_calculatorCalculator';
  readonly name = 'bond_yield_calculatorCalculator Calculator';
  readonly description = 'Calculate bond_yield_calculatorCalculator values';

  calculate(inputs: bond_yield_calculatorCalculatorInputs): bond_yield_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: bond_yield_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: bond_yield_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
