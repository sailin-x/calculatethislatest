import { Calculator } from '../../engines/CalculatorEngine';
import { inheritance_tax_estimatorCalculatorInputs, inheritance_tax_estimatorCalculatorResults, inheritance_tax_estimatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class inheritance_tax_estimatorCalculatorCalculator implements Calculator<inheritance_tax_estimatorCalculatorInputs, inheritance_tax_estimatorCalculatorResults> {
  readonly id = 'inheritance_tax_estimatorCalculator';
  readonly name = 'inheritance_tax_estimatorCalculator Calculator';
  readonly description = 'Calculate inheritance_tax_estimatorCalculator values';

  calculate(inputs: inheritance_tax_estimatorCalculatorInputs): inheritance_tax_estimatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: inheritance_tax_estimatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: inheritance_tax_estimatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
