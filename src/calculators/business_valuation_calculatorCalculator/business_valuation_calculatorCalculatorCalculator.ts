import { Calculator } from '../../engines/CalculatorEngine';
import { business_valuation_calculatorCalculatorInputs, business_valuation_calculatorCalculatorResults, business_valuation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class business_valuation_calculatorCalculatorCalculator implements Calculator<business_valuation_calculatorCalculatorInputs, business_valuation_calculatorCalculatorResults> {
  readonly id = 'business_valuation_calculatorCalculator';
  readonly name = 'business_valuation_calculatorCalculator Calculator';
  readonly description = 'Calculate business_valuation_calculatorCalculator values';

  calculate(inputs: business_valuation_calculatorCalculatorInputs): business_valuation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: business_valuation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: business_valuation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
