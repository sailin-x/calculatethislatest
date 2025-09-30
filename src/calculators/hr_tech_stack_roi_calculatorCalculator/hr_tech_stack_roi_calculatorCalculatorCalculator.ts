import { Calculator } from '../../engines/CalculatorEngine';
import { hr_tech_stack_roi_calculatorCalculatorInputs, hr_tech_stack_roi_calculatorCalculatorResults, hr_tech_stack_roi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hr_tech_stack_roi_calculatorCalculatorCalculator implements Calculator<hr_tech_stack_roi_calculatorCalculatorInputs, hr_tech_stack_roi_calculatorCalculatorResults> {
  readonly id = 'hr_tech_stack_roi_calculatorCalculator';
  readonly name = 'hr_tech_stack_roi_calculatorCalculator Calculator';
  readonly description = 'Calculate hr_tech_stack_roi_calculatorCalculator values';

  calculate(inputs: hr_tech_stack_roi_calculatorCalculatorInputs): hr_tech_stack_roi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hr_tech_stack_roi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hr_tech_stack_roi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
