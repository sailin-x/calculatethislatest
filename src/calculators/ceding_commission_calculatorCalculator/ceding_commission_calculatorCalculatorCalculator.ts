import { Calculator } from '../../engines/CalculatorEngine';
import { ceding_commission_calculatorCalculatorInputs, ceding_commission_calculatorCalculatorResults, ceding_commission_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ceding_commission_calculatorCalculatorCalculator implements Calculator<ceding_commission_calculatorCalculatorInputs, ceding_commission_calculatorCalculatorResults> {
  readonly id = 'ceding_commission_calculatorCalculator';
  readonly name = 'ceding_commission_calculatorCalculator Calculator';
  readonly description = 'Calculate ceding_commission_calculatorCalculator values';

  calculate(inputs: ceding_commission_calculatorCalculatorInputs): ceding_commission_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ceding_commission_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ceding_commission_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
