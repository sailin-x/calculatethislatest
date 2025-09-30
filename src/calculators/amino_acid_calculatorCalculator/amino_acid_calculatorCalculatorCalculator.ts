import { Calculator } from '../../engines/CalculatorEngine';
import { amino_acid_calculatorCalculatorInputs, amino_acid_calculatorCalculatorResults, amino_acid_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class amino_acid_calculatorCalculatorCalculator implements Calculator<amino_acid_calculatorCalculatorInputs, amino_acid_calculatorCalculatorResults> {
  readonly id = 'amino_acid_calculatorCalculator';
  readonly name = 'amino_acid_calculatorCalculator Calculator';
  readonly description = 'Calculate amino_acid_calculatorCalculator values';

  calculate(inputs: amino_acid_calculatorCalculatorInputs): amino_acid_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: amino_acid_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: amino_acid_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
