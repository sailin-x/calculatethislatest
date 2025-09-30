import { Calculator } from '../../engines/CalculatorEngine';
import { corporate_bond_calculatorCalculatorInputs, corporate_bond_calculatorCalculatorResults, corporate_bond_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class corporate_bond_calculatorCalculatorCalculator implements Calculator<corporate_bond_calculatorCalculatorInputs, corporate_bond_calculatorCalculatorResults> {
  readonly id = 'corporate_bond_calculatorCalculator';
  readonly name = 'corporate_bond_calculatorCalculator Calculator';
  readonly description = 'Calculate corporate_bond_calculatorCalculator values';

  calculate(inputs: corporate_bond_calculatorCalculatorInputs): corporate_bond_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: corporate_bond_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: corporate_bond_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
