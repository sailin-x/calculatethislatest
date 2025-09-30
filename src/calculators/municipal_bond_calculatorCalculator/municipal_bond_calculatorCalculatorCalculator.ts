import { Calculator } from '../../engines/CalculatorEngine';
import { municipal_bond_calculatorCalculatorInputs, municipal_bond_calculatorCalculatorResults, municipal_bond_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class municipal_bond_calculatorCalculatorCalculator implements Calculator<municipal_bond_calculatorCalculatorInputs, municipal_bond_calculatorCalculatorResults> {
  readonly id = 'municipal_bond_calculatorCalculator';
  readonly name = 'municipal_bond_calculatorCalculator Calculator';
  readonly description = 'Calculate municipal_bond_calculatorCalculator values';

  calculate(inputs: municipal_bond_calculatorCalculatorInputs): municipal_bond_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: municipal_bond_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: municipal_bond_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
