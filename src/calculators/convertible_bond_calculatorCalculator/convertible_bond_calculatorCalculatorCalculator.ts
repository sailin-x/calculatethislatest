import { Calculator } from '../../engines/CalculatorEngine';
import { convertible_bond_calculatorCalculatorInputs, convertible_bond_calculatorCalculatorResults, convertible_bond_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class convertible_bond_calculatorCalculatorCalculator implements Calculator<convertible_bond_calculatorCalculatorInputs, convertible_bond_calculatorCalculatorResults> {
  readonly id = 'convertible_bond_calculatorCalculator';
  readonly name = 'convertible_bond_calculatorCalculator Calculator';
  readonly description = 'Calculate convertible_bond_calculatorCalculator values';

  calculate(inputs: convertible_bond_calculatorCalculatorInputs): convertible_bond_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: convertible_bond_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: convertible_bond_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
