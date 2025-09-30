import { Calculator } from '../../engines/CalculatorEngine';
import { jonesactsettlementcalculatormaritimeCalculatorInputs, jonesactsettlementcalculatormaritimeCalculatorOutputs } from './types';
import { calculatejonesactsettlementcalculatormaritimeCalculatorResults } from './formulas';
import { validatejonesactsettlementcalculatormaritimeCalculatorInputs } from './validation';

export class jonesactsettlementcalculatormaritimeCalculator implements Calculator<
  jonesactsettlementcalculatormaritimeCalculatorInputs,
  jonesactsettlementcalculatormaritimeCalculatorOutputs
> {
  readonly id = 'jones_act_settlement_calculator_maritime_calculator';
  readonly name = 'jones act settlement calculator maritime Calculator';
  readonly description = 'Professional jones act settlement calculator maritime calculator with domain-specific functionality';

  calculate(inputs: jonesactsettlementcalculatormaritimeCalculatorInputs): jonesactsettlementcalculatormaritimeCalculatorOutputs {
    const validation = validatejonesactsettlementcalculatormaritimeCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatejonesactsettlementcalculatormaritimeCalculatorResults(inputs);
  }

  validateInputs(inputs: jonesactsettlementcalculatormaritimeCalculatorInputs): boolean {
    const validation = validatejonesactsettlementcalculatormaritimeCalculatorInputs(inputs);
    return validation.isValid;
  }
}
