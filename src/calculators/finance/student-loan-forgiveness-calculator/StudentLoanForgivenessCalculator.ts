import { Calculator } from '../../engines/CalculatorEngine';
import { studentloanforgivenesscalculatorInputs, studentloanforgivenesscalculatorOutputs } from './types';
import { calculatestudentloanforgivenesscalculatorResults } from './formulas';
import { validatestudentloanforgivenesscalculatorInputs } from './validation';

export class studentloanforgivenesscalculator implements Calculator<
  studentloanforgivenesscalculatorInputs,
  studentloanforgivenesscalculatorOutputs
> {
  readonly id = 'student_loan_forgiveness_calculator_calculator';
  readonly name = 'student loan forgiveness calculator Calculator';
  readonly description = 'Professional student loan forgiveness calculator calculator with domain-specific functionality';

  calculate(inputs: studentloanforgivenesscalculatorInputs): studentloanforgivenesscalculatorOutputs {
    const validation = validatestudentloanforgivenesscalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatestudentloanforgivenesscalculatorResults(inputs);
  }

  validateInputs(inputs: studentloanforgivenesscalculatorInputs): boolean {
    const validation = validatestudentloanforgivenesscalculatorInputs(inputs);
    return validation.isValid;
  }
}
