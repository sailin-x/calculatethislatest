import { Calculator } from '../../engines/CalculatorEngine';
import { crowdfunding_calculatorCalculatorInputs, crowdfunding_calculatorCalculatorResults, crowdfunding_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class crowdfunding_calculatorCalculatorCalculator implements Calculator<crowdfunding_calculatorCalculatorInputs, crowdfunding_calculatorCalculatorResults> {
  readonly id = 'crowdfunding_calculatorCalculator';
  readonly name = 'crowdfunding_calculatorCalculator Calculator';
  readonly description = 'Calculate crowdfunding_calculatorCalculator values';

  calculate(inputs: crowdfunding_calculatorCalculatorInputs): crowdfunding_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: crowdfunding_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: crowdfunding_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
