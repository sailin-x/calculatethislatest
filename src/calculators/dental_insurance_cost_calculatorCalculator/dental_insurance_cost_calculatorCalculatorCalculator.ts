import { Calculator } from '../../engines/CalculatorEngine';
import { dental_insurance_cost_calculatorCalculatorInputs, dental_insurance_cost_calculatorCalculatorResults, dental_insurance_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class dental_insurance_cost_calculatorCalculatorCalculator implements Calculator<dental_insurance_cost_calculatorCalculatorInputs, dental_insurance_cost_calculatorCalculatorResults> {
  readonly id = 'dental_insurance_cost_calculatorCalculator';
  readonly name = 'dental_insurance_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate dental_insurance_cost_calculatorCalculator values';

  calculate(inputs: dental_insurance_cost_calculatorCalculatorInputs): dental_insurance_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: dental_insurance_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: dental_insurance_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
