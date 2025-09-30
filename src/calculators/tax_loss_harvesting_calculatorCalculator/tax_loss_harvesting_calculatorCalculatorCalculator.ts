import { Calculator } from '../../engines/CalculatorEngine';
import { tax_loss_harvesting_calculatorCalculatorInputs, tax_loss_harvesting_calculatorCalculatorResults, tax_loss_harvesting_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class tax_loss_harvesting_calculatorCalculatorCalculator implements Calculator<tax_loss_harvesting_calculatorCalculatorInputs, tax_loss_harvesting_calculatorCalculatorResults> {
  readonly id = 'tax_loss_harvesting_calculatorCalculator';
  readonly name = 'tax_loss_harvesting_calculatorCalculator Calculator';
  readonly description = 'Calculate tax_loss_harvesting_calculatorCalculator values';

  calculate(inputs: tax_loss_harvesting_calculatorCalculatorInputs): tax_loss_harvesting_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: tax_loss_harvesting_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: tax_loss_harvesting_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
