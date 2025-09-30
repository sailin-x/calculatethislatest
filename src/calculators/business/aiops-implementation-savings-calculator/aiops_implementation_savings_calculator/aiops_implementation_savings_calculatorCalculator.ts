import { Calculator } from '../../engines/CalculatorEngine';
import { aiops_implementation_savings_calculatorInputs, aiops_implementation_savings_calculatorResults, aiops_implementation_savings_calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class aiops_implementation_savings_calculatorCalculator implements Calculator<aiops_implementation_savings_calculatorInputs, aiops_implementation_savings_calculatorResults> {
  readonly id = 'aiops_implementation_savings_calculator';
  readonly name = 'aiops_implementation_savings_calculator Calculator';
  readonly description = 'Calculate aiops_implementation_savings_calculator values';

  calculate(inputs: aiops_implementation_savings_calculatorInputs): aiops_implementation_savings_calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: aiops_implementation_savings_calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: aiops_implementation_savings_calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
