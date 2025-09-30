import { Calculator } from '../../engines/CalculatorEngine';
import { home_insurance_calculatorCalculatorInputs, home_insurance_calculatorCalculatorResults, home_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class home_insurance_calculatorCalculatorCalculator implements Calculator<home_insurance_calculatorCalculatorInputs, home_insurance_calculatorCalculatorResults> {
  readonly id = 'home_insurance_calculatorCalculator';
  readonly name = 'home_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate home_insurance_calculatorCalculator values';

  calculate(inputs: home_insurance_calculatorCalculatorInputs): home_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: home_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: home_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
