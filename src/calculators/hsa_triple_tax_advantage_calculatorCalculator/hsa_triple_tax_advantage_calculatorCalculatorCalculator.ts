import { Calculator } from '../../engines/CalculatorEngine';
import { hsa_triple_tax_advantage_calculatorCalculatorInputs, hsa_triple_tax_advantage_calculatorCalculatorResults, hsa_triple_tax_advantage_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hsa_triple_tax_advantage_calculatorCalculatorCalculator implements Calculator<hsa_triple_tax_advantage_calculatorCalculatorInputs, hsa_triple_tax_advantage_calculatorCalculatorResults> {
  readonly id = 'hsa_triple_tax_advantage_calculatorCalculator';
  readonly name = 'hsa_triple_tax_advantage_calculatorCalculator Calculator';
  readonly description = 'Calculate hsa_triple_tax_advantage_calculatorCalculator values';

  calculate(inputs: hsa_triple_tax_advantage_calculatorCalculatorInputs): hsa_triple_tax_advantage_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hsa_triple_tax_advantage_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hsa_triple_tax_advantage_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
