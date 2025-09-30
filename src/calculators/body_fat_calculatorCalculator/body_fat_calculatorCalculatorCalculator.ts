import { Calculator } from '../../engines/CalculatorEngine';
import { body_fat_calculatorCalculatorInputs, body_fat_calculatorCalculatorResults, body_fat_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class body_fat_calculatorCalculatorCalculator implements Calculator<body_fat_calculatorCalculatorInputs, body_fat_calculatorCalculatorResults> {
  readonly id = 'body_fat_calculatorCalculator';
  readonly name = 'body_fat_calculatorCalculator Calculator';
  readonly description = 'Calculate body_fat_calculatorCalculator values';

  calculate(inputs: body_fat_calculatorCalculatorInputs): body_fat_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: body_fat_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: body_fat_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
