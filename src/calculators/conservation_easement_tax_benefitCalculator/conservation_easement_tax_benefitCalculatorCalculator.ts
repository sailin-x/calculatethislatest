import { Calculator } from '../../engines/CalculatorEngine';
import { conservation_easement_tax_benefitCalculatorInputs, conservation_easement_tax_benefitCalculatorResults, conservation_easement_tax_benefitCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class conservation_easement_tax_benefitCalculatorCalculator implements Calculator<conservation_easement_tax_benefitCalculatorInputs, conservation_easement_tax_benefitCalculatorResults> {
  readonly id = 'conservation_easement_tax_benefitCalculator';
  readonly name = 'conservation_easement_tax_benefitCalculator Calculator';
  readonly description = 'Calculate conservation_easement_tax_benefitCalculator values';

  calculate(inputs: conservation_easement_tax_benefitCalculatorInputs): conservation_easement_tax_benefitCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: conservation_easement_tax_benefitCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: conservation_easement_tax_benefitCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
