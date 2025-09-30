import { Calculator } from '../../engines/CalculatorEngine';
import { catastrophe_bond_pricing_calculatorCalculatorInputs, catastrophe_bond_pricing_calculatorCalculatorResults, catastrophe_bond_pricing_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class catastrophe_bond_pricing_calculatorCalculatorCalculator implements Calculator<catastrophe_bond_pricing_calculatorCalculatorInputs, catastrophe_bond_pricing_calculatorCalculatorResults> {
  readonly id = 'catastrophe_bond_pricing_calculatorCalculator';
  readonly name = 'catastrophe_bond_pricing_calculatorCalculator Calculator';
  readonly description = 'Calculate catastrophe_bond_pricing_calculatorCalculator values';

  calculate(inputs: catastrophe_bond_pricing_calculatorCalculatorInputs): catastrophe_bond_pricing_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: catastrophe_bond_pricing_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: catastrophe_bond_pricing_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
