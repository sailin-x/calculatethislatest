import { Calculator } from '../../engines/CalculatorEngine';
import { surety_bond_calculatorCalculatorInputs, surety_bond_calculatorCalculatorResults, surety_bond_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class surety_bond_calculatorCalculatorCalculator implements Calculator<surety_bond_calculatorCalculatorInputs, surety_bond_calculatorCalculatorResults> {
  readonly id = 'surety_bond_calculatorCalculator';
  readonly name = 'surety_bond_calculatorCalculator Calculator';
  readonly description = 'Calculate surety_bond_calculatorCalculator values';

  calculate(inputs: surety_bond_calculatorCalculatorInputs): surety_bond_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: surety_bond_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: surety_bond_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
