import { Calculator } from '../../engines/CalculatorEngine';
import { itoutsourcingvsinhousecostbenefitanalysisCalculatorInputs, itoutsourcingvsinhousecostbenefitanalysisCalculatorOutputs } from './types';
import { calculateitoutsourcingvsinhousecostbenefitanalysisCalculatorResults } from './formulas';
import { validateitoutsourcingvsinhousecostbenefitanalysisCalculatorInputs } from './validation';

export class itoutsourcingvsinhousecostbenefitanalysisCalculator implements Calculator<
  itoutsourcingvsinhousecostbenefitanalysisCalculatorInputs,
  itoutsourcingvsinhousecostbenefitanalysisCalculatorOutputs
> {
  readonly id = 'it_outsourcing_vs_in_house_cost_benefit_analysis_calculator';
  readonly name = 'it outsourcing vs in house cost benefit analysis Calculator';
  readonly description = 'Professional it outsourcing vs in house cost benefit analysis calculator with domain-specific functionality';

  calculate(inputs: itoutsourcingvsinhousecostbenefitanalysisCalculatorInputs): itoutsourcingvsinhousecostbenefitanalysisCalculatorOutputs {
    const validation = validateitoutsourcingvsinhousecostbenefitanalysisCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculateitoutsourcingvsinhousecostbenefitanalysisCalculatorResults(inputs);
  }

  validateInputs(inputs: itoutsourcingvsinhousecostbenefitanalysisCalculatorInputs): boolean {
    const validation = validateitoutsourcingvsinhousecostbenefitanalysisCalculatorInputs(inputs);
    return validation.isValid;
  }
}
