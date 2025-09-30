import { Calculator } from '../../engines/CalculatorEngine';
import { fund_level_irr_calculatorCalculatorInputs, fund_level_irr_calculatorCalculatorResults, fund_level_irr_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fund_level_irr_calculatorCalculatorCalculator implements Calculator<fund_level_irr_calculatorCalculatorInputs, fund_level_irr_calculatorCalculatorResults> {
  readonly id = 'fund_level_irr_calculatorCalculator';
  readonly name = 'fund_level_irr_calculatorCalculator Calculator';
  readonly description = 'Calculate fund_level_irr_calculatorCalculator values';

  calculate(inputs: fund_level_irr_calculatorCalculatorInputs): fund_level_irr_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fund_level_irr_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fund_level_irr_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
