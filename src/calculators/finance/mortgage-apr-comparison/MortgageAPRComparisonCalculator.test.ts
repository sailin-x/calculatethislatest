import { describe, it, expect } from 'vitest';
import { calculateMortgageAPRComparison } from './formulas';
import { validateMortgageAPRComparisonInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

describe('Mortgage APR Comparison Calculator', () => {
  describe('Core APR Calculations', () => {
    it('should calculate basic APR comparison correctly', () => {
      const inputs = {
        loanAmount: 400000,
        loanTerm: 30,
        offers: [
          {
            lender: 'Bank A',
            interestRate: 6.5,
            points: 0,
            originationFee: 1000,
            processingFee: 500,
            underwritingFee: 800,
            appraisalFee: 400,
            titleInsurance: 1200,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          },
          {
            lender: 'Bank B',
            interestRate: 6.25,
            points: 1,
            originationFee: 1500,
            processingFee: 600,
            underwritingFee: 900,
            appraisalFee: 450,
            titleInsurance: 1300,
            recordingFee: 120,
            creditReport: 60,
            floodCert: 25,
            taxService: 80,
            wireFee: 30,
            otherFees: 250
          }
        ]
      };

      const result = calculateMortgageAPRComparison(inputs);

      expect(result.aprComparison.offers).toHaveLength(2);
      expect(result.bestOffer.lender).toBe('Bank B');
      expect(result.bestOffer.apr).toBeLessThan(result.aprComparison.offers[1].apr);
      expect(result.monthlyPaymentComparison.difference).toBeGreaterThan(0);
      expect(result.totalCostComparison.difference).toBeGreaterThan(0);
    });

    it('should handle single offer comparison', () => {
      const inputs = {
        loanAmount: 300000,
        loanTerm: 30,
        offers: [
          {
            lender: 'Single Bank',
            interestRate: 6.0,
            points: 0,
            originationFee: 1000,
            processingFee: 500,
            underwritingFee: 800,
            appraisalFee: 400,
            titleInsurance: 1200,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          }
        ]
      };

      const result = calculateMortgageAPRComparison(inputs);

      expect(result.aprComparison.offers).toHaveLength(1);
      expect(result.bestOffer.lender).toBe('Single Bank');
      expect(result.monthlyPaymentComparison.difference).toBe(0);
      expect(result.totalCostComparison.difference).toBe(0);
    });

    it('should calculate break-even analysis correctly', () => {
      const inputs = {
        loanAmount: 350000,
        loanTerm: 30,
        offers: [
          {
            lender: 'Current Loan',
            interestRate: 7.5,
            points: 0,
            originationFee: 0,
            processingFee: 0,
            underwritingFee: 0,
            appraisalFee: 0,
            titleInsurance: 0,
            recordingFee: 0,
            creditReport: 0,
            floodCert: 0,
            taxService: 0,
            wireFee: 0,
            otherFees: 0
          },
          {
            lender: 'Refinance Option',
            interestRate: 6.0,
            points: 0,
            originationFee: 2000,
            processingFee: 800,
            underwritingFee: 1200,
            appraisalFee: 500,
            titleInsurance: 1500,
            recordingFee: 150,
            creditReport: 75,
            floodCert: 30,
            taxService: 100,
            wireFee: 40,
            otherFees: 400
          }
        ]
      };

      const result = calculateMortgageAPRComparison(inputs);

      expect(result.breakEvenAnalysis.breakEvenMonths).toBeGreaterThan(0);
      expect(result.breakEvenAnalysis.closingCosts).toBeGreaterThan(0);
      expect(result.breakEvenAnalysis.monthlySavings).toBeGreaterThan(0);
      expect(result.breakEvenAnalysis.recommendation).toContain('breaks even');
    });

    it('should handle different comparison periods', () => {
      const inputs = {
        loanAmount: 400000,
        loanTerm: 30,
        comparisonPeriod: 5,
        offers: [
          {
            lender: 'Bank A',
            interestRate: 6.5,
            points: 0,
            originationFee: 1000,
            processingFee: 500,
            underwritingFee: 800,
            appraisalFee: 400,
            titleInsurance: 1200,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          },
          {
            lender: 'Bank B',
            interestRate: 6.25,
            points: 1,
            originationFee: 1500,
            processingFee: 600,
            underwritingFee: 900,
            appraisalFee: 450,
            titleInsurance: 1300,
            recordingFee: 120,
            creditReport: 60,
            floodCert: 25,
            taxService: 80,
            wireFee: 30,
            otherFees: 250
          }
        ]
      };

      const result = calculateMortgageAPRComparison(inputs);

      expect(result.aprComparison.offers).toHaveLength(2);
      expect(result.aprComparison.offers[0].totalCost).toBeLessThan(result.aprComparison.offers[0].monthlyPayment * 30 * 12);
    });
  });

  describe('APR Calculation Accuracy', () => {
    it('should calculate APR with points correctly', () => {
      const inputs = {
        loanAmount: 300000,
        loanTerm: 30,
        offers: [
          {
            lender: 'No Points',
            interestRate: 6.5,
            points: 0,
            originationFee: 1000,
            processingFee: 500,
            underwritingFee: 800,
            appraisalFee: 400,
            titleInsurance: 1200,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          },
          {
            lender: 'With Points',
            interestRate: 6.0,
            points: 2,
            originationFee: 1000,
            processingFee: 500,
            underwritingFee: 800,
            appraisalFee: 400,
            titleInsurance: 1200,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          }
        ]
      };

      const result = calculateMortgageAPRComparison(inputs);

      const noPointsOffer = result.aprComparison.offers.find(o => o.lender === 'No Points');
      const withPointsOffer = result.aprComparison.offers.find(o => o.lender === 'With Points');

      expect(noPointsOffer!.apr).toBeGreaterThan(withPointsOffer!.apr);
      expect(withPointsOffer!.totalFees).toBeGreaterThan(noPointsOffer!.totalFees);
    });

    it('should handle zero interest rate edge case', () => {
      const inputs = {
        loanAmount: 100000,
        loanTerm: 30,
        offers: [
          {
            lender: 'Zero Interest',
            interestRate: 0,
            points: 0,
            originationFee: 1000,
            processingFee: 500,
            underwritingFee: 800,
            appraisalFee: 400,
            titleInsurance: 1200,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          }
        ]
      };

      const result = calculateMortgageAPRComparison(inputs);

      expect(result.aprComparison.offers[0].monthlyPayment).toBe(100000 / (30 * 12));
      expect(result.aprComparison.offers[0].apr).toBeGreaterThan(0);
    });
  });

  describe('Cost Breakdown Analysis', () => {
    it('should calculate cost breakdown correctly', () => {
      const inputs = {
        loanAmount: 400000,
        loanTerm: 30,
        propertyTax: 6000,
        homeInsurance: 1200,
        pmiRate: 0.5,
        hoaFees: 200,
        offers: [
          {
            lender: 'Test Bank',
            interestRate: 6.5,
            points: 0,
            originationFee: 1000,
            processingFee: 500,
            underwritingFee: 800,
            appraisalFee: 400,
            titleInsurance: 1200,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          }
        ]
      };

      const result = calculateMortgageAPRComparison(inputs);
      const offer = result.aprComparison.offers[0];

      expect(offer.costBreakdown.principal).toBe(400000);
      expect(offer.costBreakdown.interest).toBeGreaterThan(0);
      expect(offer.costBreakdown.fees).toBeGreaterThan(0);
      expect(offer.costBreakdown.taxes).toBe(6000 * 30);
      expect(offer.costBreakdown.insurance).toBe(1200 * 30);
      expect(offer.costBreakdown.pmi).toBe((0.5 / 100) * 400000 * 30);
      expect(offer.costBreakdown.hoa).toBe(200 * 12 * 30);
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const inputs = {
        loanAmount: 0,
        loanTerm: -1,
        offers: []
      };

      const errors = validateMortgageAPRComparisonInputs(inputs);

      expect(errors).toContain('Loan amount must be positive');
      expect(errors).toContain('Loan term must be positive');
      expect(errors).toContain('At least one mortgage offer is required');
    });

    it('should validate offer structure', () => {
      const inputs = {
        loanAmount: 400000,
        loanTerm: 30,
        offers: [
          {
            lender: '',
            interestRate: -1,
            points: -1,
            originationFee: -1000,
            processingFee: 500,
            underwritingFee: 800,
            appraisalFee: 400,
            titleInsurance: 1200,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          }
        ]
      };

      const errors = validateMortgageAPRComparisonInputs(inputs);

      expect(errors).toContain('Lender name is required for offer 1');
      expect(errors).toContain('Interest rate must be positive for offer 1');
      expect(errors).toContain('Points must be positive for offer 1');
      expect(errors).toContain('Origination fee must be positive for offer 1');
    });

    it('should validate business logic constraints', () => {
      const inputs = {
        loanAmount: 500000,
        loanTerm: 30,
        propertyValue: 400000,
        downPayment: 100000,
        offers: [
          {
            lender: 'Test Bank',
            interestRate: 6.5,
            points: 0,
            originationFee: 1000,
            processingFee: 500,
            underwritingFee: 800,
            appraisalFee: 400,
            titleInsurance: 1200,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          }
        ]
      };

      const errors = validateMortgageAPRComparisonInputs(inputs);

      expect(errors).toContain('Loan amount minus down payment cannot exceed property value');
    });

    it('should validate loan type specific requirements', () => {
      const inputs = {
        loanAmount: 500000,
        loanTerm: 30,
        loanType: 'FHA',
        creditScore: 550,
        debtToIncomeRatio: 50,
        offers: [
          {
            lender: 'Test Bank',
            interestRate: 6.5,
            points: 0,
            originationFee: 1000,
            processingFee: 500,
            underwritingFee: 800,
            appraisalFee: 400,
            titleInsurance: 1200,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          }
        ]
      };

      const errors = validateMortgageAPRComparisonInputs(inputs);

      expect(errors).toContain('FHA requires minimum 580 credit score for 3.5% down payment');
      expect(errors).toContain('FHA debt-to-income ratio should not exceed 43%');
    });
  });

  describe('Quick Validation', () => {
    it('should provide real-time validation feedback', () => {
      const inputs = {
        loanAmount: 5000000,
        creditScore: 850,
        debtToIncomeRatio: 45
      };

      const results = quickValidateAllInputs(inputs);

      const loanAmountResult = results.find(r => r.message?.includes('Loan amount'));
      const creditScoreResult = results.find(r => r.message?.includes('Excellent credit'));
      const dtiResult = results.find(r => r.message?.includes('DTI > 43%'));

      expect(loanAmountResult).toBeDefined();
      expect(creditScoreResult).toBeDefined();
      expect(dtiResult).toBeDefined();
      expect(creditScoreResult!.severity).toBe('info');
      expect(dtiResult!.severity).toBe('warning');
    });

    it('should validate mortgage offers in real-time', () => {
      const offers = [
        {
          lender: 'Bank A',
          interestRate: 8.5,
          points: 2,
          originationFee: 2000
        },
        {
          lender: 'Bank B',
          interestRate: 6.0,
          points: 0,
          originationFee: 1000
        }
      ];

      const results = quickValidateAllInputs({ offers });

      const highRateResult = results.find(r => r.message?.includes('High interest rate'));
      const pointsResult = results.find(r => r.message?.includes('High points cost'));

      expect(highRateResult).toBeDefined();
      expect(pointsResult).toBeDefined();
      expect(highRateResult!.severity).toBe('warning');
    });
  });

  describe('Edge Cases', () => {
    it('should handle maximum loan amounts', () => {
      const inputs = {
        loanAmount: 10000000,
        loanTerm: 30,
        offers: [
          {
            lender: 'Jumbo Bank',
            interestRate: 7.0,
            points: 0,
            originationFee: 5000,
            processingFee: 1000,
            underwritingFee: 1500,
            appraisalFee: 800,
            titleInsurance: 3000,
            recordingFee: 200,
            creditReport: 100,
            floodCert: 50,
            taxService: 150,
            wireFee: 50,
            otherFees: 500
          }
        ]
      };

      const result = calculateMortgageAPRComparison(inputs);

      expect(result.aprComparison.offers[0].monthlyPayment).toBeGreaterThan(60000);
      expect(result.aprComparison.offers[0].totalCost).toBeGreaterThan(20000000);
    });

    it('should handle minimum loan amounts', () => {
      const inputs = {
        loanAmount: 10000,
        loanTerm: 15,
        offers: [
          {
            lender: 'Small Loan Bank',
            interestRate: 5.5,
            points: 0,
            originationFee: 500,
            processingFee: 200,
            underwritingFee: 300,
            appraisalFee: 200,
            titleInsurance: 800,
            recordingFee: 50,
            creditReport: 25,
            floodCert: 10,
            taxService: 50,
            wireFee: 15,
            otherFees: 100
          }
        ]
      };

      const result = calculateMortgageAPRComparison(inputs);

      expect(result.aprComparison.offers[0].monthlyPayment).toBeLessThan(100);
      expect(result.aprComparison.offers[0].totalCost).toBeLessThan(20000);
    });

    it('should handle comparison period longer than loan term', () => {
      const inputs = {
        loanAmount: 300000,
        loanTerm: 15,
        comparisonPeriod: 30,
        offers: [
          {
            lender: 'Test Bank',
            interestRate: 6.0,
            points: 0,
            originationFee: 1000,
            processingFee: 500,
            underwritingFee: 800,
            appraisalFee: 400,
            titleInsurance: 1200,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          }
        ]
      };

      const result = calculateMortgageAPRComparison(inputs);

      expect(result.aprComparison.offers[0].totalCost).toBeLessThan(result.aprComparison.offers[0].monthlyPayment * 30 * 12);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete refinance comparison scenario', () => {
      const inputs = {
        loanAmount: 350000,
        loanTerm: 30,
        propertyValue: 450000,
        propertyTax: 5400,
        homeInsurance: 1080,
        loanType: 'Conventional',
        occupancyType: 'Primary Residence',
        creditScore: 780,
        debtToIncomeRatio: 32,
        state: 'TX',
        propertyType: 'Single Family Home',
        purchaseType: 'Refinance',
        comparisonPeriod: 30,
        offers: [
          {
            lender: 'Current Loan',
            interestRate: 7.5,
            points: 0,
            originationFee: 0,
            processingFee: 0,
            underwritingFee: 0,
            appraisalFee: 0,
            titleInsurance: 0,
            recordingFee: 0,
            creditReport: 0,
            floodCert: 0,
            taxService: 0,
            wireFee: 0,
            otherFees: 0
          },
          {
            lender: 'Refinance Option A',
            interestRate: 6.0,
            points: 0,
            originationFee: 2000,
            processingFee: 800,
            underwritingFee: 1200,
            appraisalFee: 500,
            titleInsurance: 1500,
            recordingFee: 150,
            creditReport: 75,
            floodCert: 30,
            taxService: 100,
            wireFee: 40,
            otherFees: 400
          },
          {
            lender: 'Refinance Option B',
            interestRate: 5.75,
            points: 1,
            originationFee: 2500,
            processingFee: 900,
            underwritingFee: 1400,
            appraisalFee: 550,
            titleInsurance: 1600,
            recordingFee: 180,
            creditReport: 85,
            floodCert: 35,
            taxService: 110,
            wireFee: 45,
            otherFees: 450
          }
        ]
      };

      const result = calculateMortgageAPRComparison(inputs);

      expect(result.aprComparison.offers).toHaveLength(3);
      expect(result.bestOffer.lender).toBe('Refinance Option B');
      expect(result.breakEvenAnalysis.breakEvenMonths).toBeGreaterThan(0);
      expect(result.savingsAnalysis.totalSavings).toBeGreaterThan(100000);
      expect(result.recommendations).toContain('Refinance Option B');
    });

    it('should handle ARM vs Fixed rate comparison', () => {
      const inputs = {
        loanAmount: 300000,
        loanTerm: 30,
        propertyValue: 375000,
        downPayment: 75000,
        propertyTax: 4500,
        homeInsurance: 900,
        loanType: 'Conventional',
        occupancyType: 'Primary Residence',
        creditScore: 760,
        debtToIncomeRatio: 35,
        state: 'FL',
        propertyType: 'Single Family Home',
        purchaseType: 'Purchase',
        comparisonPeriod: 30,
        offers: [
          {
            lender: 'Fixed Rate Option',
            interestRate: 6.75,
            points: 0,
            originationFee: 1200,
            processingFee: 600,
            underwritingFee: 900,
            appraisalFee: 400,
            titleInsurance: 1100,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          },
          {
            lender: '5/1 ARM Option',
            interestRate: 5.5,
            points: 0,
            originationFee: 1000,
            processingFee: 500,
            underwritingFee: 800,
            appraisalFee: 400,
            titleInsurance: 1100,
            recordingFee: 100,
            creditReport: 50,
            floodCert: 20,
            taxService: 75,
            wireFee: 25,
            otherFees: 200
          }
        ]
      };

      const result = calculateMortgageAPRComparison(inputs);

      expect(result.aprComparison.offers).toHaveLength(2);
      expect(result.bestOffer.lender).toBe('5/1 ARM Option');
      expect(result.monthlyPaymentComparison.difference).toBeGreaterThan(200);
      expect(result.recommendations).toContain('ARM');
    });
  });
});