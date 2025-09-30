import { Calculator } from '../../engines/CalculatorEngine';
import { portfolio_company_ebitda_growth_calculatorCalculatorInputs, portfolio_company_ebitda_growth_calculatorCalculatorResults, portfolio_company_ebitda_growth_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class portfolio_company_ebitda_growth_calculatorCalculatorCalculator implements Calculator<portfolio_company_ebitda_growth_calculatorCalculatorInputs, portfolio_company_ebitda_growth_calculatorCalculatorResults> {
  readonly id = 'portfolio_company_ebitda_growth_calculatorCalculator';
  readonly name = 'portfolio_company_ebitda_growth_calculatorCalculator Calculator';
  readonly description = 'Calculate portfolio_company_ebitda_growth_calculatorCalculator values';

  calculate(inputs: portfolio_company_ebitda_growth_calculatorCalculatorInputs): portfolio_company_ebitda_growth_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: portfolio_company_ebitda_growth_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: portfolio_company_ebitda_growth_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
