import { Calculator } from '../../engines/CalculatorEngine';
import { aiops-implementation-savings-calculatorInputs, aiops-implementation-savings-calculatorResults, aiops-implementation-savings-calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class aiops-implementation-savings-calculatorCalculator implements Calculator<aiops-implementation-savings-calculatorInputs, aiops-implementation-savings-calculatorResults> {
  readonly id = 'aiops-implementation-savings-calculator';
  readonly name = 'aiops implementation savings calculator Calculator';
  readonly description = 'Calculate aiops implementation savings calculator values';

  calculate(inputs: aiops-implementation-savings-calculatorInputs): aiops-implementation-savings-calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: aiops-implementation-savings-calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: aiops-implementation-savings-calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
