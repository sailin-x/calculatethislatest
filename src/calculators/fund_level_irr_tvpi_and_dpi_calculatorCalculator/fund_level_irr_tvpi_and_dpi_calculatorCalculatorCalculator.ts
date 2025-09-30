import { Calculator } from '../../engines/CalculatorEngine';
import { fund_level_irr_tvpi_and_dpi_calculatorCalculatorInputs, fund_level_irr_tvpi_and_dpi_calculatorCalculatorResults, fund_level_irr_tvpi_and_dpi_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class fund_level_irr_tvpi_and_dpi_calculatorCalculatorCalculator implements Calculator<fund_level_irr_tvpi_and_dpi_calculatorCalculatorInputs, fund_level_irr_tvpi_and_dpi_calculatorCalculatorResults> {
  readonly id = 'fund_level_irr_tvpi_and_dpi_calculatorCalculator';
  readonly name = 'fund_level_irr_tvpi_and_dpi_calculatorCalculator Calculator';
  readonly description = 'Calculate fund_level_irr_tvpi_and_dpi_calculatorCalculator values';

  calculate(inputs: fund_level_irr_tvpi_and_dpi_calculatorCalculatorInputs): fund_level_irr_tvpi_and_dpi_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: fund_level_irr_tvpi_and_dpi_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: fund_level_irr_tvpi_and_dpi_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
