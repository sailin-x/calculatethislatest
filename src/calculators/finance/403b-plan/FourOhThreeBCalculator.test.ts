import { FourOhThreeBCalculator } from './FourOhThreeBCalculator';
import {
  calculateAnnualEmployeeContribution,
  calculateEmployerMatchContribution,
  calculateProjectedBalance,
  calculateTaxDeferralBenefit,
  calculateAnnualRetirementIncome,
  calculateReplacementRatio,
  calculateEffectiveReturn
} from './formulas';
import { validateFourOhThreeBInputs } from './validation';

describe('FourOhThreeBCalculator', () => {
  describe('Calculator Definition', () => {
    it('should have correct calculator properties', () => {
      expect(FourOhThreeBCalculator.id).toBe('403b-plan-calculator');
      expect(FourOhThreeBCalculator.title).toBe('403(b) Plan Calculator');
      expect(FourOhThreeBCalculator.category).toBe('finance');
      expect(FourOhThreeBCalculator.subcategory).toBe('Retirement Planning');
    });

    it('should have required inputs', () => {
      const requiredInputs = FourOhThreeBCalculator.inputs.filter(input => input.required);
      expect(requiredInputs).toHaveLength(13); // Most inputs are required
      expect(requiredInputs.map(i => i.id)).toEqual([
        'currentAge', 'retirementAge', 'currentSalary', 'expectedAnnualSalaryIncrease',
        'employeeContributionPercent', 'employerMatchPercent', 'employerMatchLimitPercent',
        'currentBalance', 'expectedAnnualReturn', 'investmentFees',
        'currentTaxRate', 'retirementTaxRate', 'analysisPeriod'
      ]);
    });

    it('should have correct outputs', () => {
      expect(FourOhThreeBCalculator.outputs).toHaveLength(9);
      expect(FourOhThreeBCalculator.outputs.map(o => o.id)).toEqual([
        'projectedBalance', 'totalContributions', 'annualRetirementIncome', 'totalTaxBenefits',
        'annualEmployeeContribution', 'annualEmployerContribution', 'totalAnnualContribution',
        'effectiveReturn', 'replacementRatio'
      ]);
    });
  });

  describe('Formulas', () => {
    describe('calculateAnnualEmployeeContribution', () => {
      it('should calculate employee contribution correctly', () => {
        const result = calculateAnnualEmployeeContribution(60000, 8, 3, 5);
        expect(result).toBeCloseTo(4992, 0); // 60000 * 1.03^5 * 0.08
      });
    });

    describe('calculateEmployerMatchContribution', () => {
      it('should calculate employer match correctly', () => {
        const result = calculateEmployerMatchContribution(4800, 100, 5, 60000, 3, 0);
        expect(result).toBe(3000); // Min of (4800 * 1.00, 60000 * 0.05)
      });
    });

    describe('calculateProjectedBalance', () => {
      it('should calculate projected balance with growth', () => {
        const inputs = {
          currentAge: 35,
          retirementAge: 65,
          currentSalary: 60000,
          expectedAnnualSalaryIncrease: 3,
          employeeContributionPercent: 8,
          employerMatchPercent: 100,
          employerMatchLimitPercent: 5,
          catchUpContribution: 0,
          currentBalance: 25000,
          expectedAnnualReturn: 7,
          investmentFees: 0.5,
          currentTaxRate: 25,
          retirementTaxRate: 20,
          includeEmployerMatch: true,
          includeCatchUpContributions: false,
          includeInvestmentFees: true,
          analysisPeriod: 'annual' as const
        };
        const result = calculateProjectedBalance(inputs);
        expect(result).toBeGreaterThan(25000);
      });
    });

    describe('calculateTaxDeferralBenefit', () => {
      it('should calculate tax deferral benefit correctly', () => {
        const result = calculateTaxDeferralBenefit(312000, 25);
        expect(result).toBe(78000); // 312000 * 0.25
      });
    });

    describe('calculateAnnualRetirementIncome', () => {
      it('should calculate retirement income using 4% rule', () => {
        const result = calculateAnnualRetirementIncome(892000);
        expect(result).toBe(35680); // 892000 * 0.04
      });
    });

    describe('calculateReplacementRatio', () => {
      it('should calculate replacement ratio correctly', () => {
        const result = calculateReplacementRatio(35680, 60000);
        expect(result).toBeCloseTo(59.47, 2); // (35680 / 60000) * 100
      });
    });

    describe('calculateEffectiveReturn', () => {
      it('should calculate effective return after fees', () => {
        const result = calculateEffectiveReturn(7, 0.5, true);
        expect(result).toBe(6.5);
      });

      it('should return gross return when fees excluded', () => {
        const result = calculateEffectiveReturn(7, 0.5, false);
        expect(result).toBe(7);
      });
    });
  });

  describe('Validation', () => {
    it('should validate correct inputs', () => {
      const inputs = {
        currentAge: 35,
        retirementAge: 65,
        currentSalary: 60000,
        expectedAnnualSalaryIncrease: 3,
        employeeContributionPercent: 8,
        employerMatchPercent: 100,
        employerMatchLimitPercent: 5,
        catchUpContribution: 0,
        currentBalance: 25000,
        expectedAnnualReturn: 7,
        investmentFees: 0.5,
        currentTaxRate: 25,
        retirementTaxRate: 20,
        includeEmployerMatch: true,
        includeCatchUpContributions: false,
        includeInvestmentFees: true,
        analysisPeriod: 'annual' as const
      };
      const errors = validateFourOhThreeBInputs(inputs);
      expect(errors).toHaveLength(0);
    });

    it('should reject retirement age less than current age', () => {
      const inputs = {
        currentAge: 65,
        retirementAge: 60,
        currentSalary: 60000,
        expectedAnnualSalaryIncrease: 3,
        employeeContributionPercent: 8,
        employerMatchPercent: 100,
        employerMatchLimitPercent: 5,
        catchUpContribution: 0,
        currentBalance: 25000,
        expectedAnnualReturn: 7,
        investmentFees: 0.5,
        currentTaxRate: 25,
        retirementTaxRate: 20,
        includeEmployerMatch: true,
        includeCatchUpContributions: false,
        includeInvestmentFees: true,
        analysisPeriod: 'annual' as const
      };
      const errors = validateFourOhThreeBInputs(inputs);
      expect(errors).toContainEqual({
        field: 'retirementAge',
        message: 'Retirement age must be greater than current age'
      });
    });

    it('should warn about low contribution percentage', () => {
      const inputs = {
        currentAge: 35,
        retirementAge: 65,
        currentSalary: 60000,
        expectedAnnualSalaryIncrease: 3,
        employeeContributionPercent: 2, // Low contribution
        employerMatchPercent: 100,
        employerMatchLimitPercent: 5,
        catchUpContribution: 0,
        currentBalance: 25000,
        expectedAnnualReturn: 7,
        investmentFees: 0.5,
        currentTaxRate: 25,
        retirementTaxRate: 20,
        includeEmployerMatch: true,
        includeCatchUpContributions: false,
        includeInvestmentFees: true,
        analysisPeriod: 'annual' as const
      };
      const warnings = validateFourOhThreeBBusinessRules(inputs);
      expect(warnings).toContainEqual({
        field: 'employeeContributionPercent',
        message: 'Low contribution percentage may result in insufficient retirement savings'
      });
    });
  });

  describe('Examples', () => {
    it('should have valid examples', () => {
      expect(FourOhThreeBCalculator.examples).toHaveLength(2);

      const teacher = FourOhThreeBCalculator.examples[0];
      expect(teacher.title).toBe('Teacher Retirement Planning');
      expect(teacher.inputs.currentAge).toBe(35);
      expect(teacher.inputs.retirementAge).toBe(65);
      expect(teacher.expectedOutputs.projectedBalance).toBe(892000);
    });
  });
});