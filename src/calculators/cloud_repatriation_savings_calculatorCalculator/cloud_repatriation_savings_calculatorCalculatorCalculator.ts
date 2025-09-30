import { Calculator } from '../../engines/CalculatorEngine';
import { cloud_repatriation_savings_calculatorCalculatorInputs, cloud_repatriation_savings_calculatorCalculatorResults, cloud_repatriation_savings_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cloud_repatriation_savings_calculatorCalculatorCalculator implements Calculator<cloud_repatriation_savings_calculatorCalculatorInputs, cloud_repatriation_savings_calculatorCalculatorResults> {
  readonly id = 'cloud_repatriation_savings_calculatorCalculator';
  readonly name = 'cloud_repatriation_savings_calculatorCalculator Calculator';
  readonly description = 'Calculate cloud_repatriation_savings_calculatorCalculator values';

  calculate(inputs: cloud_repatriation_savings_calculatorCalculatorInputs): cloud_repatriation_savings_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cloud_repatriation_savings_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cloud_repatriation_savings_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
