import { Calculator } from '../../engines/CalculatorEngine';
import { soil_amendment_calculatorCalculatorInputs, soil_amendment_calculatorCalculatorResults, soil_amendment_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class soil_amendment_calculatorCalculatorCalculator implements Calculator<soil_amendment_calculatorCalculatorInputs, soil_amendment_calculatorCalculatorResults> {
  readonly id = 'soil_amendment_calculatorCalculator';
  readonly name = 'soil_amendment_calculatorCalculator Calculator';
  readonly description = 'Calculate soil_amendment_calculatorCalculator values';

  calculate(inputs: soil_amendment_calculatorCalculatorInputs): soil_amendment_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: soil_amendment_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: soil_amendment_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
