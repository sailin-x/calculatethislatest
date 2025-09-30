import { Calculator } from '../../engines/CalculatorEngine';
import { protein_calculatorCalculatorInputs, protein_calculatorCalculatorResults, protein_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class protein_calculatorCalculatorCalculator implements Calculator<protein_calculatorCalculatorInputs, protein_calculatorCalculatorResults> {
  readonly id = 'protein_calculatorCalculator';
  readonly name = 'protein_calculatorCalculator Calculator';
  readonly description = 'Calculate protein_calculatorCalculator values';

  calculate(inputs: protein_calculatorCalculatorInputs): protein_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: protein_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: protein_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
