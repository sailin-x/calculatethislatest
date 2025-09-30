import { Calculator } from '../../engines/CalculatorEngine';
import { insulation_calculatorCalculatorInputs, insulation_calculatorCalculatorResults, insulation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class insulation_calculatorCalculatorCalculator implements Calculator<insulation_calculatorCalculatorInputs, insulation_calculatorCalculatorResults> {
  readonly id = 'insulation_calculatorCalculator';
  readonly name = 'insulation_calculatorCalculator Calculator';
  readonly description = 'Calculate insulation_calculatorCalculator values';

  calculate(inputs: insulation_calculatorCalculatorInputs): insulation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: insulation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: insulation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
