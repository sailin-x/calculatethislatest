import { Calculator } from '../../engines/CalculatorEngine';
import { business_formation_calculatorCalculatorInputs, business_formation_calculatorCalculatorResults, business_formation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class business_formation_calculatorCalculatorCalculator implements Calculator<business_formation_calculatorCalculatorInputs, business_formation_calculatorCalculatorResults> {
  readonly id = 'business_formation_calculatorCalculator';
  readonly name = 'business_formation_calculatorCalculator Calculator';
  readonly description = 'Calculate business_formation_calculatorCalculator values';

  calculate(inputs: business_formation_calculatorCalculatorInputs): business_formation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: business_formation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: business_formation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
