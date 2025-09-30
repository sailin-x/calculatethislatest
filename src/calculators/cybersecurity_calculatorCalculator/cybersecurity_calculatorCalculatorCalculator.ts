import { Calculator } from '../../engines/CalculatorEngine';
import { cybersecurity_calculatorCalculatorInputs, cybersecurity_calculatorCalculatorResults, cybersecurity_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cybersecurity_calculatorCalculatorCalculator implements Calculator<cybersecurity_calculatorCalculatorInputs, cybersecurity_calculatorCalculatorResults> {
  readonly id = 'cybersecurity_calculatorCalculator';
  readonly name = 'cybersecurity_calculatorCalculator Calculator';
  readonly description = 'Calculate cybersecurity_calculatorCalculator values';

  calculate(inputs: cybersecurity_calculatorCalculatorInputs): cybersecurity_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cybersecurity_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cybersecurity_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
