import { Calculator } from '../../engines/CalculatorEngine';
import { preventative_maintenance_savings_calculatorCalculatorInputs, preventative_maintenance_savings_calculatorCalculatorResults, preventative_maintenance_savings_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class preventative_maintenance_savings_calculatorCalculatorCalculator implements Calculator<preventative_maintenance_savings_calculatorCalculatorInputs, preventative_maintenance_savings_calculatorCalculatorResults> {
  readonly id = 'preventative_maintenance_savings_calculatorCalculator';
  readonly name = 'preventative_maintenance_savings_calculatorCalculator Calculator';
  readonly description = 'Calculate preventative_maintenance_savings_calculatorCalculator values';

  calculate(inputs: preventative_maintenance_savings_calculatorCalculatorInputs): preventative_maintenance_savings_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: preventative_maintenance_savings_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: preventative_maintenance_savings_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
