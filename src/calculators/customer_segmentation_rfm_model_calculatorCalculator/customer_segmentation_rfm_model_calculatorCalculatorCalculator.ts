import { Calculator } from '../../engines/CalculatorEngine';
import { customer_segmentation_rfm_model_calculatorCalculatorInputs, customer_segmentation_rfm_model_calculatorCalculatorResults, customer_segmentation_rfm_model_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class customer_segmentation_rfm_model_calculatorCalculatorCalculator implements Calculator<customer_segmentation_rfm_model_calculatorCalculatorInputs, customer_segmentation_rfm_model_calculatorCalculatorResults> {
  readonly id = 'customer_segmentation_rfm_model_calculatorCalculator';
  readonly name = 'customer_segmentation_rfm_model_calculatorCalculator Calculator';
  readonly description = 'Calculate customer_segmentation_rfm_model_calculatorCalculator values';

  calculate(inputs: customer_segmentation_rfm_model_calculatorCalculatorInputs): customer_segmentation_rfm_model_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: customer_segmentation_rfm_model_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: customer_segmentation_rfm_model_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
