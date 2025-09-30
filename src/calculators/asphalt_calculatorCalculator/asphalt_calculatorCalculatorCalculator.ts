import { Calculator } from '../../engines/CalculatorEngine';
import { asphalt_calculatorCalculatorInputs, asphalt_calculatorCalculatorResults, asphalt_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class asphalt_calculatorCalculatorCalculator implements Calculator<asphalt_calculatorCalculatorInputs, asphalt_calculatorCalculatorResults> {
  readonly id = 'asphalt_calculatorCalculator';
  readonly name = 'asphalt_calculatorCalculator Calculator';
  readonly description = 'Calculate asphalt_calculatorCalculator values';

  calculate(inputs: asphalt_calculatorCalculatorInputs): asphalt_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: asphalt_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: asphalt_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
