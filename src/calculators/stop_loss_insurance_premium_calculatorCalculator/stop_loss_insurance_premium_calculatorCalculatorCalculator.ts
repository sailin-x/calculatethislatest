import { Calculator } from '../../engines/CalculatorEngine';
import { stop_loss_insurance_premium_calculatorCalculatorInputs, stop_loss_insurance_premium_calculatorCalculatorResults, stop_loss_insurance_premium_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class stop_loss_insurance_premium_calculatorCalculatorCalculator implements Calculator<stop_loss_insurance_premium_calculatorCalculatorInputs, stop_loss_insurance_premium_calculatorCalculatorResults> {
  readonly id = 'stop_loss_insurance_premium_calculatorCalculator';
  readonly name = 'stop_loss_insurance_premium_calculatorCalculator Calculator';
  readonly description = 'Calculate stop_loss_insurance_premium_calculatorCalculator values';

  calculate(inputs: stop_loss_insurance_premium_calculatorCalculatorInputs): stop_loss_insurance_premium_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: stop_loss_insurance_premium_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: stop_loss_insurance_premium_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
