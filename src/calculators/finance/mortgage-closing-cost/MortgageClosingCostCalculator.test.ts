import { describe, it, expect } from 'vitest';
import { calculateMortgageClosingCosts, calculateEstimatedClosingCosts, calculateBreakdownByCategory, generateClosingCostAnalysis } from './formulas';
import { validateMortgageClosingCostInputs, validateClosingCostReasonableness, validateEscrowRequirements, validateFeeConsistency } from './validation';
import { 
  quickValidateLoanAmount, 
  quickValidatePropertyValue, 
  quickValidateDownPayment, 
  quickValidateInterestRate,
  quickValidatePoints,
  quickValidateCreditScore,
  quickValidateOriginationFee,
  quickValidateTitleInsurance,
  quickValidateAppraisalFee,
  quickValidatePropertyTax,
  quickValidateHomeInsurance,
  quickValidatePMIRate,
  quickValidateEscrowMonths,
  quickValidateAllInputs
} from './quickValidation';
import { MortgageClosingCostInputs } from './formulas';

describe('Mortgage Closing Cost Calculator', () => {
  describe('Core Closing Cost Calculations', () => {
    it('should calculate basic closing costs correctly', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 400000,
        propertyValue: 500000,
        downPayment: 100000,
        originationFee: 1000,
        processingFee: 500,
        underwritingFee: 800,
        appraisalFee: 400,
        titleInsurance: 1200,
        titleSearch: 150,
        recordingFee: 100,
        creditReport: 50,
        floodCert: 20,
        taxService: 75,
        wireFee: 25,
        homeInspection: 400,
        pestInspection: 100,
        attorneyFee: 500,
        escrowFee: 200,
        otherFees: 200,
        propertyTax: 6000,
        homeInsurance: 1200,
        prepaidInterest: 500,
        prepaidInsurance: 1000,
        prepaidTaxes: 2000,
        escrowMonths: 2
      };

      const result = calculateMortgageClosingCosts(inputs);

      expect(result.totalClosingCosts).toBeGreaterThan(0);
      expect(result.lenderFees).toBeGreaterThan(0);
      expect(result.thirdPartyFees).toBeGreaterThan(0);
      expect(result.prepaidItems).toBeGreaterThan(0);
      expect(result.costPercentage).toBeGreaterThan(0);
      expect(result.cashToClose).toBe(100000 + result.totalClosingCosts);
      expect(result.monthlyEscrow).toBeGreaterThan(0);
      expect(result.recommendations).toBeTruthy();
    });

    it('should handle zero fees scenario', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 300000,
        propertyValue: 375000,
        downPayment: 75000
      };

      const result = calculateMortgageClosingCosts(inputs);

      expect(result.totalClosingCosts).toBe(0);
      expect(result.lenderFees).toBe(0);
      expect(result.thirdPartyFees).toBe(0);
      expect(result.prepaidItems).toBe(0);
      expect(result.costPercentage).toBe(0);
      expect(result.cashToClose).toBe(75000);
    });

    it('should calculate points cost correctly', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 400000,
        propertyValue: 500000,
        points: 2,
        originationFee: 1000
      };

      const result = calculateMortgageClosingCosts(inputs);

      expect(result.costBreakdown.lenderFees.pointsCost).toBe(8000); // 2% of 400000
      expect(result.lenderFees).toBe(9000); // 1000 + 8000
    });

    it('should calculate PMI correctly for high LTV', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 400000,
        propertyValue: 500000,
        downPayment: 50000, // 10% down, 90% LTV
        pmiRate: 0.5,
        escrowMonths: 2
      };

      const result = calculateMortgageClosingCosts(inputs);

      expect(result.costBreakdown.escrowItems.pmi).toBeGreaterThan(0);
      expect(result.monthlyEscrow).toBeGreaterThan(0);
    });

    it('should not calculate PMI for low LTV', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 400000,
        propertyValue: 500000,
        downPayment: 100000, // 20% down, 80% LTV
        pmiRate: 0.5,
        escrowMonths: 2
      };

      const result = calculateMortgageClosingCosts(inputs);

      expect(result.costBreakdown.escrowItems.pmi).toBe(0);
    });
  });

  describe('Cost Breakdown Analysis', () => {
    it('should calculate cost breakdown by category correctly', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 400000,
        propertyValue: 500000,
        originationFee: 1000,
        appraisalFee: 400,
        titleInsurance: 1200,
        prepaidInterest: 500,
        propertyTax: 6000,
        escrowMonths: 2
      };

      const breakdown = calculateBreakdownByCategory(inputs);

      expect(breakdown).toHaveLength(4);
      expect(breakdown[0].category).toBe('Lender Fees');
      expect(breakdown[1].category).toBe('Third-Party Fees');
      expect(breakdown[2].category).toBe('Prepaid Items');
      expect(breakdown[3].category).toBe('Escrow Items');

      const totalPercentage = breakdown.reduce((sum, item) => sum + item.percentage, 0);
      expect(totalPercentage).toBe(100);
    });

    it('should handle zero costs in breakdown', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 300000,
        propertyValue: 375000
      };

      const breakdown = calculateBreakdownByCategory(inputs);

      expect(breakdown.every(item => item.amount === 0)).toBe(true);
      expect(breakdown.every(item => item.percentage === 0)).toBe(true);
    });
  });

  describe('Estimated Closing Costs', () => {
    it('should calculate estimated costs for conventional purchase', () => {
      const estimated = calculateEstimatedClosingCosts(400000, 'Conventional', 'Purchase');
      
      expect(estimated).toBeGreaterThan(0);
      expect(estimated).toBeLessThan(400000 * 0.05); // Should be less than 5%
    });

    it('should calculate estimated costs for FHA purchase', () => {
      const estimated = calculateEstimatedClosingCosts(400000, 'FHA', 'Purchase');
      
      expect(estimated).toBeGreaterThan(0);
      expect(estimated).toBeGreaterThan(calculateEstimatedClosingCosts(400000, 'Conventional', 'Purchase'));
    });

    it('should calculate estimated costs for VA purchase', () => {
      const estimated = calculateEstimatedClosingCosts(400000, 'VA', 'Purchase');
      
      expect(estimated).toBeGreaterThan(0);
      expect(estimated).toBeLessThan(calculateEstimatedClosingCosts(400000, 'Conventional', 'Purchase'));
    });

    it('should apply state adjustments correctly', () => {
      const baseEstimated = calculateEstimatedClosingCosts(400000, 'Conventional', 'Purchase');
      const caEstimated = calculateEstimatedClosingCosts(400000, 'Conventional', 'Purchase', 'CA');
      
      expect(caEstimated).toBeGreaterThan(baseEstimated);
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const inputs = {} as MortgageClosingCostInputs;
      const errors = validateMortgageClosingCostInputs(inputs);

      expect(errors).toContain('Loan amount is required');
      expect(errors).toContain('Property value is required');
    });

    it('should validate loan amount range', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 5000,
        propertyValue: 500000
      };
      const errors = validateMortgageClosingCostInputs(inputs);

      expect(errors).toContain('Loan amount must be between $10,000 and $10,000,000');
    });

    it('should validate property value range', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 400000,
        propertyValue: 5000
      };
      const errors = validateMortgageClosingCostInputs(inputs);

      expect(errors).toContain('Property value must be between $10,000 and $10,000,000');
    });

    it('should validate down payment logic', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 400000,
        propertyValue: 500000,
        downPayment: 450000
      };
      const errors = validateMortgageClosingCostInputs(inputs);

      expect(errors).toContain('Down payment cannot be greater than or equal to loan amount');
    });

    it('should validate LTV ratio', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 600000,
        propertyValue: 500000,
        downPayment: 50000
      };
      const errors = validateMortgageClosingCostInputs(inputs);

      expect(errors).toContain('Loan amount minus down payment cannot exceed property value');
    });

    it('should validate loan type requirements', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 500000,
        propertyValue: 625000,
        loanType: 'FHA',
        occupancyType: 'Investment Property'
      };
      const errors = validateMortgageClosingCostInputs(inputs);

      expect(errors).toContain('FHA loans are only available for primary residences');
    });

    it('should validate purchase type requirements', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 400000,
        propertyValue: 500000,
        purchaseType: 'Cash-Out Refinance'
      };
      const errors = validateMortgageClosingCostInputs(inputs);

      expect(errors).toContain('Cash-out refinance typically requires LTV ratio below 80%');
    });

    it('should validate fee reasonableness', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 400000,
        propertyValue: 500000,
        originationFee: 5000 // 1.25% of loan amount
      };
      const errors = validateClosingCostReasonableness(inputs);

      expect(errors).toContain('Origination fee should typically not exceed 1% of loan amount');
    });

    it('should validate escrow requirements', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 400000,
        propertyValue: 500000,
        escrowMonths: 2
      };
      const errors = validateEscrowRequirements(inputs);

      expect(errors).toContain('Escrow account requires at least one of: property tax, home insurance, or HOA fees');
    });

    it('should validate fee consistency', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 400000,
        propertyValue: 500000,
        loanType: 'VA',
        originationFee: 2000
      };
      const errors = validateFeeConsistency(inputs);

      expect(errors).toContain('VA loans typically have lower origination fees due to government backing');
    });
  });

  describe('Quick Validation', () => {
    it('should provide real-time validation feedback for loan amount', () => {
      const result = quickValidateLoanAmount(5000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('at least $10,000');

      const result2 = quickValidateLoanAmount(6000000);
      expect(result2.isValid).toBe(true);
      expect(result2.severity).toBe('warning');
      expect(result2.message).toContain('Large loan amount');
    });

    it('should provide real-time validation feedback for property value', () => {
      const result = quickValidatePropertyValue(-1000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('must be positive');

      const result2 = quickValidatePropertyValue(500000);
      expect(result2.isValid).toBe(true);
      expect(result2.severity).toBe('success');
    });

    it('should provide real-time validation feedback for down payment', () => {
      const result = quickValidateDownPayment(450000, 400000, 500000);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('greater than or equal to loan amount');

      const result2 = quickValidateDownPayment(50000, 400000, 500000);
      expect(result2.isValid).toBe(true);
      expect(result2.severity).toBe('warning');
      expect(result2.message).toContain('High LTV ratio');
    });

    it('should provide real-time validation feedback for interest rate', () => {
      const result = quickValidateInterestRate(25);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('cannot exceed 20%');

      const result2 = quickValidateInterestRate(2.5);
      expect(result2.isValid).toBe(true);
      expect(result2.severity).toBe('success');
      expect(result2.message).toContain('Excellent interest rate');
    });

    it('should provide real-time validation feedback for points', () => {
      const result = quickValidatePoints(15);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('cannot exceed 10');

      const result2 = quickValidatePoints(5);
      expect(result2.isValid).toBe(true);
      expect(result2.severity).toBe('warning');
      expect(result2.message).toContain('High points cost');
    });

    it('should provide real-time validation feedback for credit score', () => {
      const result = quickValidateCreditScore(250);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('at least 300');

      const result2 = quickValidateCreditScore(750);
      expect(result2.isValid).toBe(true);
      expect(result2.severity).toBe('success');
      expect(result2.message).toContain('Very good credit score');
    });

    it('should provide real-time validation feedback for origination fee', () => {
      const result = quickValidateOriginationFee(5000, 400000);
      expect(result.isValid).toBe(true);
      expect(result.severity).toBe('warning');
      expect(result.message).toContain('High origination fee');
    });

    it('should provide real-time validation feedback for title insurance', () => {
      const result = quickValidateTitleInsurance(3000, 400000);
      expect(result.isValid).toBe(true);
      expect(result.severity).toBe('warning');
      expect(result.message).toContain('High title insurance cost');
    });

    it('should provide real-time validation feedback for appraisal fee', () => {
      const result = quickValidateAppraisalFee(1200);
      expect(result.isValid).toBe(true);
      expect(result.severity).toBe('warning');
      expect(result.message).toContain('High appraisal fee');
    });

    it('should provide real-time validation feedback for property tax', () => {
      const result = quickValidatePropertyTax(25000);
      expect(result.isValid).toBe(true);
      expect(result.severity).toBe('warning');
      expect(result.message).toContain('High property tax');
    });

    it('should provide real-time validation feedback for home insurance', () => {
      const result = quickValidateHomeInsurance(5000);
      expect(result.isValid).toBe(true);
      expect(result.severity).toBe('warning');
      expect(result.message).toContain('High insurance premium');
    });

    it('should provide real-time validation feedback for PMI rate', () => {
      const result = quickValidatePMIRate(2);
      expect(result.isValid).toBe(true);
      expect(result.severity).toBe('warning');
      expect(result.message).toContain('High PMI rate');
    });

    it('should provide real-time validation feedback for escrow months', () => {
      const result = quickValidateEscrowMonths(8);
      expect(result.isValid).toBe(true);
      expect(result.severity).toBe('warning');
      expect(result.message).toContain('High escrow requirement');
    });

    it('should validate all inputs at once', () => {
      const inputs = {
        loanAmount: 400000,
        propertyValue: 500000,
        downPayment: 100000,
        interestRate: 6.5,
        points: 1,
        creditScore: 750,
        originationFee: 1000,
        titleInsurance: 1200,
        appraisalFee: 400,
        propertyTax: 6000,
        homeInsurance: 1200,
        pmiRate: 0.5,
        escrowMonths: 2
      };

      const results = quickValidateAllInputs(inputs);

      expect(results).toHaveLength(13);
      expect(results.every(r => r.isValid)).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle maximum loan amounts', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 10000000,
        propertyValue: 12500000,
        originationFee: 100000
      };

      const result = calculateMortgageClosingCosts(inputs);

      expect(result.totalClosingCosts).toBeGreaterThan(0);
      expect(result.costPercentage).toBeLessThan(5);
    });

    it('should handle minimum loan amounts', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 10000,
        propertyValue: 12500,
        originationFee: 100
      };

      const result = calculateMortgageClosingCosts(inputs);

      expect(result.totalClosingCosts).toBeGreaterThan(0);
      expect(result.costPercentage).toBeLessThan(10);
    });

    it('should handle zero escrow months', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 400000,
        propertyValue: 500000,
        propertyTax: 6000,
        homeInsurance: 1200,
        escrowMonths: 0
      };

      const result = calculateMortgageClosingCosts(inputs);

      expect(result.costBreakdown.escrowItems.total).toBe(0);
      expect(result.escrowItems).toBe(0);
    });

    it('should handle maximum escrow months', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 400000,
        propertyValue: 500000,
        propertyTax: 6000,
        homeInsurance: 1200,
        escrowMonths: 12
      };

      const result = calculateMortgageClosingCosts(inputs);

      expect(result.costBreakdown.escrowItems.propertyTax).toBe(6000);
      expect(result.costBreakdown.escrowItems.homeInsurance).toBe(1200);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete conventional purchase scenario', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 400000,
        propertyValue: 500000,
        downPayment: 100000,
        loanType: 'Conventional',
        purchaseType: 'Purchase',
        state: 'CA',
        propertyType: 'Single Family Home',
        occupancyType: 'Primary Residence',
        creditScore: 750,
        interestRate: 6.5,
        loanTerm: 30,
        points: 0,
        originationFee: 1000,
        processingFee: 500,
        underwritingFee: 800,
        applicationFee: 200,
        appraisalFee: 400,
        titleInsurance: 1200,
        titleSearch: 150,
        recordingFee: 100,
        creditReport: 50,
        floodCert: 20,
        taxService: 75,
        wireFee: 25,
        homeInspection: 400,
        pestInspection: 100,
        attorneyFee: 500,
        escrowFee: 200,
        otherFees: 200,
        propertyTax: 6000,
        homeInsurance: 1200,
        hoaFees: 200,
        pmiRate: 0.5,
        prepaidInterest: 500,
        prepaidInsurance: 1000,
        prepaidTaxes: 2000,
        escrowMonths: 2
      };

      const result = calculateMortgageClosingCosts(inputs);
      const errors = validateMortgageClosingCostInputs(inputs);

      expect(result.totalClosingCosts).toBeGreaterThan(0);
      expect(result.costPercentage).toBeGreaterThan(0);
      expect(result.costPercentage).toBeLessThan(5);
      expect(result.cashToClose).toBe(100000 + result.totalClosingCosts);
      expect(result.monthlyEscrow).toBeGreaterThan(0);
      expect(result.recommendations).toBeTruthy();
      expect(errors).toHaveLength(0);
    });

    it('should handle FHA refinance scenario', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 350000,
        propertyValue: 450000,
        loanType: 'FHA',
        purchaseType: 'Refinance',
        state: 'TX',
        propertyType: 'Single Family Home',
        occupancyType: 'Primary Residence',
        creditScore: 680,
        interestRate: 6.25,
        loanTerm: 30,
        points: 0,
        originationFee: 1500,
        processingFee: 600,
        underwritingFee: 900,
        applicationFee: 300,
        appraisalFee: 450,
        titleInsurance: 1300,
        titleSearch: 180,
        recordingFee: 120,
        creditReport: 60,
        floodCert: 25,
        taxService: 80,
        wireFee: 30,
        attorneyFee: 600,
        escrowFee: 250,
        otherFees: 250,
        propertyTax: 5400,
        homeInsurance: 1080,
        prepaidInterest: 450,
        prepaidInsurance: 900,
        prepaidTaxes: 1800,
        escrowMonths: 2
      };

      const result = calculateMortgageClosingCosts(inputs);
      const errors = validateMortgageClosingCostInputs(inputs);

      expect(result.totalClosingCosts).toBeGreaterThan(0);
      expect(result.costPercentage).toBeGreaterThan(0);
      expect(result.costPercentage).toBeLessThan(5);
      expect(result.cashToClose).toBe(result.totalClosingCosts); // No down payment for refinance
      expect(result.monthlyEscrow).toBeGreaterThan(0);
      expect(result.recommendations).toBeTruthy();
      expect(errors).toHaveLength(0);
    });

    it('should handle VA loan purchase scenario', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 300000,
        propertyValue: 375000,
        downPayment: 0,
        loanType: 'VA',
        purchaseType: 'Purchase',
        state: 'FL',
        propertyType: 'Single Family Home',
        occupancyType: 'Primary Residence',
        creditScore: 720,
        interestRate: 6.0,
        loanTerm: 30,
        points: 0,
        originationFee: 500,
        processingFee: 300,
        underwritingFee: 400,
        applicationFee: 100,
        appraisalFee: 400,
        titleInsurance: 1000,
        titleSearch: 120,
        recordingFee: 80,
        creditReport: 45,
        floodCert: 15,
        taxService: 60,
        wireFee: 20,
        homeInspection: 350,
        pestInspection: 80,
        attorneyFee: 400,
        escrowFee: 150,
        otherFees: 150,
        propertyTax: 4500,
        homeInsurance: 900,
        prepaidInterest: 400,
        prepaidInsurance: 900,
        prepaidTaxes: 1500,
        escrowMonths: 2
      };

      const result = calculateMortgageClosingCosts(inputs);
      const errors = validateMortgageClosingCostInputs(inputs);

      expect(result.totalClosingCosts).toBeGreaterThan(0);
      expect(result.costPercentage).toBeGreaterThan(0);
      expect(result.costPercentage).toBeLessThan(5);
      expect(result.cashToClose).toBe(result.totalClosingCosts); // No down payment
      expect(result.monthlyEscrow).toBeGreaterThan(0);
      expect(result.recommendations).toBeTruthy();
      expect(errors).toHaveLength(0);
    });
  });

  describe('Analysis Generation', () => {
    it('should generate comprehensive closing cost analysis', () => {
      const inputs: MortgageClosingCostInputs = {
        loanAmount: 400000,
        propertyValue: 500000,
        downPayment: 100000,
        originationFee: 1000,
        appraisalFee: 400,
        titleInsurance: 1200,
        prepaidInterest: 500,
        propertyTax: 6000,
        escrowMonths: 2
      };

      const outputs = calculateMortgageClosingCosts(inputs);
      const analysis = generateClosingCostAnalysis(inputs, outputs);

      expect(analysis).toContain('Mortgage Closing Cost Analysis');
      expect(analysis).toContain('Summary');
      expect(analysis).toContain('Cost Breakdown');
      expect(analysis).toContain('Detailed Fee Breakdown');
      expect(analysis).toContain('Recommendations');
      expect(analysis).toContain(outputs.totalClosingCosts.toString());
      expect(analysis).toContain(outputs.costPercentage.toString());
    });
  });
});