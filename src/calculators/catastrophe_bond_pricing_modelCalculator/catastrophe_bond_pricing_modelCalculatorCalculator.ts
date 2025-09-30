import { Calculator } from '../../engines/CalculatorEngine';
import { catastrophe_bond_pricing_modelCalculatorInputs, catastrophe_bond_pricing_modelCalculatorResults, catastrophe_bond_pricing_modelCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class catastrophe_bond_pricing_modelCalculatorCalculator implements Calculator<catastrophe_bond_pricing_modelCalculatorInputs, catastrophe_bond_pricing_modelCalculatorResults> {
  readonly id = 'catastrophe_bond_pricing_modelCalculator';
  readonly name = 'catastrophe_bond_pricing_modelCalculator Calculator';
  readonly description = 'Calculate catastrophe_bond_pricing_modelCalculator values';

  calculate(inputs: catastrophe_bond_pricing_modelCalculatorInputs): catastrophe_bond_pricing_modelCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: catastrophe_bond_pricing_modelCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: catastrophe_bond_pricing_modelCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
