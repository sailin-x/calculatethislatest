import { Calculator } from '../../engines/CalculatorEngine';
import { impermanent_loss_calculatorCalculatorInputs, impermanent_loss_calculatorCalculatorResults, impermanent_loss_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class impermanent_loss_calculatorCalculatorCalculator implements Calculator<impermanent_loss_calculatorCalculatorInputs, impermanent_loss_calculatorCalculatorResults> {
  readonly id = 'impermanent_loss_calculatorCalculator';
  readonly name = 'impermanent_loss_calculatorCalculator Calculator';
  readonly description = 'Calculate impermanent_loss_calculatorCalculator values';

  calculate(inputs: impermanent_loss_calculatorCalculatorInputs): impermanent_loss_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: impermanent_loss_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: impermanent_loss_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
