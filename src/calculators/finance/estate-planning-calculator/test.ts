import { describe, it, expect } from 'vitest';
import { calculateEstatePlanning } from './formulas';
import { validateEstatePlanningInputs } from './validation';
import {
  quickValidateTotalAssets,
  quickValidateTotalLiabilities,
  quickValidateNetEstate,
  quickValidateEstateOwner,
  quickValidateAge,
  quickValidateHealthStatus,
  quickValidateCash,
  quickValidateStocks,
  quickValidatePrimaryResidence,
  quickValidateBusinessValue,
  quickValidateTraditionalIRA,
  quickValidateDeathBenefit,
  quickValidateMortgages,
  quickValidateCreditCardDebt,
  quickValidateBeneficiaryName,
  quickValidateBeneficiaryPercentage,
  quickValidateBeneficiaryAge,
  quickValidateFederalExemption,
  quickValidateFederalRate,
  quickValidateStateExemption,
  quickValidateStateRate,
  quickValidateAnnualExclusion,
  quickValidateLifetimeExemption,
  quickValidateGiftsMade,
  quickValidateTrustValue,
  quickValidateIncomeReplacement,
  quickValidateDebtPayoff,
  quickValidateEducationFunding,
  quickValidateEstateTaxFunding,
  quickValidateExecutor,
  quickValidateEstimatedCosts
} from './quickValidation';
import { EstatePlanningInputs } from './types';

describe('Estate Planning Calculator', () => {
  const validInputs: EstatePlanningInputs = {
    estateInfo: {
      totalAssets: 5000000,
      totalLiabilities: 500000,
      netEstate: 4500000,
      estateOwner: 'John Smith',
      age: 65,
      healthStatus: 'good'
    },
    assets: {
      liquidAssets: {
        cash: 500000,
        stocks: 1000000,
        mutualFunds: 500000,
        etfs: 300000,
        otherSecurities: 200000
      },
      realEstate: {
        primaryResidence: 800000,
        investmentProperties: 600000,
        commercialProperties: 400000,
        land: 200000
      },
      businessInterests: {
        businessValue: 500000,
        partnershipInterests: 200000,
        llcInterests: 100000,
        stockOptions: 100000
      },
      retirementAccounts: {
        traditionalIRA: 400000,
        rothIRA: 200000,
        employerPlans: 300000,
        annuities: 100000
      },
      lifeInsurance: {
        deathBenefit: 1000000,
        cashValue: 50000,
        policyType: 'whole'
      },
      personalProperty: {
        vehicles: 100000,
        jewelry: 50000,
        artwork: 75000,
        otherPersonalProperty: 25000
      },
      otherAssets: {
        trusts: 200000,
        foreignAssets: 0,
        otherAssets: 50000
      }
    },
    liabilities: {
      mortgages: 300000,
      personalLoans: 50000,
      creditCardDebt: 25000,
      businessDebt: 75000,
      taxLiabilities: 25000,
      otherLiabilities: 25000
    },
    beneficiaries: [
      {
        name: 'Jane Smith',
        relationship: 'Spouse',
        age: 62,
        percentage: 60,
        specificAssets: [],
        specialNeeds: false
      },
      {
        name: 'Michael Smith',
        relationship: 'Son',
        age: 35,
        percentage: 25,
        specificAssets: [],
        specialNeeds: false
      },
      {
        name: 'Sarah Smith',
        relationship: 'Daughter',
        age: 32,
        percentage: 15,
        specificAssets: [],
        specialNeeds: false
      }
    ],
    estateDocuments: {
      will: true,
      trust: true,
      powerOfAttorney: true,
      healthcareDirective: true,
      beneficiaryDesignations: true,
      businessSuccessionPlan: false
    },
    trustInfo: {
      trustType: 'revocable',
      trustValue: 200000,
      trustee: 'Jane Smith',
      beneficiaries: ['Jane Smith', 'Michael Smith', 'Sarah Smith'],
      fundingStatus: 'funded'
    },
    taxConsiderations: {
      federalEstateTax: {
        exemption: 12000000,
        rate: 40,
        portability: true
      },
      stateEstateTax: {
        exemption: 1000000,
        rate: 16,
        state: 'California'
      },
      giftTax: {
        annualExclusion: 17000,
        lifetimeExemption: 12000000,
        giftsMade: 500000
      },
      generationSkippingTax: {
        exemption: 12000000,
        rate: 40,
        transfers: 0
      }
    },
    charitableGiving: {
      charitableTrusts: {
        charitableRemainderTrust: false,
        charitableLeadTrust: false,
        value: 0,
        charitableBeneficiary: ''
      },
      charitableGifts: {
        annualGifts: 10000,
        plannedGifts: 50000,
        charitableDeductions: 15000
      }
    },
    businessSuccession: {
      businessType: 'llc',
      businessValue: 500000,
      successionPlan: 'family',
      keyEmployees: ['Manager 1', 'Manager 2'],
      buySellAgreement: true,
      fundingMechanism: 'life-insurance'
    },
    lifeInsurancePlanning: {
      existingPolicies: [
        {
          policyType: 'whole',
          deathBenefit: 1000000,
          cashValue: 50000,
          premium: 8000,
          ownership: 'individual'
        }
      ],
      insuranceNeeds: {
        incomeReplacement: 2000000,
        debtPayoff: 500000,
        educationFunding: 300000,
        estateTaxFunding: 500000,
        businessContinuation: 500000
      }
    },
    internationalConsiderations: {
      foreignAssets: 0,
      foreignTrusts: false,
      dualCitizenship: false,
      foreignTaxTreaties: [],
      reportingRequirements: false
    },
    specialSituations: {
      blendedFamily: false,
      specialNeedsBeneficiary: false,
      minorChildren: false,
      spendthriftBeneficiary: false,
      creditorProtection: false
    },
    estateAdministration: {
      executor: 'Jane Smith',
      trustee: 'Jane Smith',
      guardian: '',
      attorney: 'Attorney Name',
      accountant: 'Accountant Name',
      estimatedCosts: 50000
    },
    scenarios: [],
    includeTaxAnalysis: true,
    includeTrustAnalysis: true,
    includeInsuranceAnalysis: true,
    includeCharitableAnalysis: true,
    includeBusinessSuccession: true,
    includeDetailedBreakdown: true,
    includeMultipleScenarios: true,
    includeRecommendations: true
  };

  describe('calculateEstatePlanning', () => {
    it('should calculate basic estate planning metrics correctly', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.totalAssets).toBe(5000000);
      expect(result.totalLiabilities).toBe(500000);
      expect(result.netEstate).toBe(4500000);
      expect(result.estateTax).toBeGreaterThan(0);
      expect(result.netToBeneficiaries).toBeLessThan(result.netEstate);
    });

    it('should calculate asset analysis correctly', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.assetAnalysis.totalAssets).toBe(5000000);
      expect(result.assetAnalysis.liquidAssets).toBe(2500000);
      expect(result.assetAnalysis.realEstate).toBe(2000000);
      expect(result.assetAnalysis.businessInterests).toBe(900000);
      expect(result.assetAnalysis.retirementAccounts).toBe(1000000);
      expect(result.assetAnalysis.lifeInsurance).toBe(1000000);
      expect(result.assetAnalysis.personalProperty).toBe(250000);
      expect(result.assetAnalysis.otherAssets).toBe(250000);
    });

    it('should calculate liability analysis correctly', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.liabilityAnalysis.totalLiabilities).toBe(500000);
      expect(result.liabilityAnalysis.mortgages).toBe(300000);
      expect(result.liabilityAnalysis.personalLoans).toBe(50000);
      expect(result.liabilityAnalysis.creditCardDebt).toBe(25000);
      expect(result.liabilityAnalysis.businessDebt).toBe(75000);
      expect(result.liabilityAnalysis.taxLiabilities).toBe(25000);
      expect(result.liabilityAnalysis.otherLiabilities).toBe(25000);
      expect(result.liabilityAnalysis.debtToAssetRatio).toBe(10);
    });

    it('should calculate tax analysis correctly', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.taxAnalysis.federalEstateTax).toBeGreaterThan(0);
      expect(result.taxAnalysis.stateEstateTax).toBeGreaterThan(0);
      expect(result.taxAnalysis.totalEstateTax).toBeGreaterThan(0);
      expect(result.taxAnalysis.effectiveTaxRate).toBeGreaterThan(0);
      expect(result.taxAnalysis.taxExemption).toBe(12000000);
      expect(result.taxAnalysis.taxableEstate).toBe(0); // Below exemption
      expect(result.taxAnalysis.portabilityBenefits).toBeGreaterThan(0);
    });

    it('should calculate gift tax analysis correctly', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.giftTaxAnalysis.annualExclusion).toBe(17000);
      expect(result.giftTaxAnalysis.lifetimeExemption).toBe(12000000);
      expect(result.giftTaxAnalysis.giftsMade).toBe(500000);
      expect(result.giftTaxAnalysis.remainingExemption).toBe(11500000);
      expect(result.giftTaxAnalysis.giftTaxLiability).toBe(0); // Below exemption
      expect(result.giftTaxAnalysis.gstExemption).toBe(12000000);
      expect(result.giftTaxAnalysis.gstTransfers).toBe(0);
    });

    it('should calculate beneficiary analysis correctly', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.beneficiaryAnalysis.totalBeneficiaries).toBe(3);
      expect(result.beneficiaryAnalysis.beneficiaryDistribution).toHaveLength(3);
      expect(result.beneficiaryAnalysis.specialNeedsPlanning).toBe(false);
      expect(result.beneficiaryAnalysis.minorBeneficiaryPlanning).toBe(false);
    });

    it('should calculate life insurance analysis correctly', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.lifeInsuranceAnalysis.totalDeathBenefit).toBe(1000000);
      expect(result.lifeInsuranceAnalysis.totalCashValue).toBe(50000);
      expect(result.lifeInsuranceAnalysis.totalPremium).toBe(8000);
      expect(result.lifeInsuranceAnalysis.insuranceNeeds.totalNeeds).toBe(3800000);
      expect(result.lifeInsuranceAnalysis.coverageGap).toBe(2800000);
      expect(result.lifeInsuranceAnalysis.insuranceEfficiency).toBeGreaterThan(0);
    });

    it('should calculate charitable analysis correctly', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.charitableAnalysis.charitableTrusts).toBe(0);
      expect(result.charitableAnalysis.charitableGifts).toBe(60000);
      expect(result.charitableAnalysis.taxDeductions).toBe(15000);
      expect(result.charitableAnalysis.charitableEfficiency).toBeGreaterThan(0);
      expect(result.charitableAnalysis.philanthropicImpact).toBe(48000);
    });

    it('should calculate business succession analysis correctly', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.businessSuccessionAnalysis.businessValue).toBe(500000);
      expect(result.businessSuccessionAnalysis.successionPlan).toBe('family');
      expect(result.businessSuccessionAnalysis.keyEmployees).toHaveLength(2);
      expect(result.businessSuccessionAnalysis.buySellAgreement).toBe(true);
      expect(result.businessSuccessionAnalysis.fundingMechanism).toBe('life-insurance');
      expect(result.businessSuccessionAnalysis.businessContinuity).toBe(85);
    });

    it('should calculate estate administration analysis correctly', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.estateAdministrationAnalysis.executor).toBe('Jane Smith');
      expect(result.estateAdministrationAnalysis.trustee).toBe('Jane Smith');
      expect(result.estateAdministrationAnalysis.guardian).toBe('');
      expect(result.estateAdministrationAnalysis.estimatedCosts).toBe(50000);
      expect(result.estateAdministrationAnalysis.administrationEfficiency).toBe(90);
      expect(result.estateAdministrationAnalysis.probateAvoidance).toBe(true);
    });

    it('should calculate estate planning efficiency correctly', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.estatePlanningEfficiency.documentCompleteness).toBe(90);
      expect(result.estatePlanningEfficiency.taxEfficiency).toBe(75);
      expect(result.estatePlanningEfficiency.assetProtection).toBe(80);
      expect(result.estatePlanningEfficiency.beneficiaryProtection).toBe(60);
      expect(result.estatePlanningEfficiency.overallEfficiency).toBeGreaterThan(0);
    });

    it('should generate planning opportunities', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.planningOpportunities).toBeInstanceOf(Array);
      expect(result.planningOpportunities.length).toBeGreaterThan(0);
    });

    it('should generate recommendations', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.recommendations).toBeInstanceOf(Array);
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it('should generate action items', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.actionItems).toBeInstanceOf(Array);
      expect(result.actionItems.length).toBeGreaterThan(0);
    });

    it('should generate comprehensive report', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.report).toBeInstanceOf(String);
      expect(result.report.length).toBeGreaterThan(100);
      expect(result.report).toContain('Estate Planning Analysis Report');
    });

    it('should calculate performance metrics', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.performanceMetrics.taxEfficiency).toBe(75);
      expect(result.performanceMetrics.assetProtection).toBe(80);
      expect(result.performanceMetrics.beneficiaryProtection).toBe(60);
      expect(result.performanceMetrics.overallScore).toBeGreaterThan(0);
    });

    it('should calculate risk analysis', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.riskAnalysis.taxRisk).toBeGreaterThan(0);
      expect(result.riskAnalysis.assetProtectionRisk).toBeGreaterThan(0);
      expect(result.riskAnalysis.beneficiaryRisk).toBeGreaterThan(0);
      expect(result.riskAnalysis.administrationRisk).toBeGreaterThan(0);
      expect(result.riskAnalysis.totalRisk).toBeGreaterThan(0);
    });

    it('should calculate cost-benefit analysis', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.costBenefitAnalysis.planningCosts).toBe(15000);
      expect(result.costBenefitAnalysis.taxSavings).toBeGreaterThan(0);
      expect(result.costBenefitAnalysis.administrationSavings).toBe(50000);
      expect(result.costBenefitAnalysis.netBenefit).toBeGreaterThan(0);
      expect(result.costBenefitAnalysis.returnOnInvestment).toBeGreaterThan(0);
    });

    it('should calculate break-even analysis', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.breakEvenAnalysis.breakEvenEstate).toBe(12000000);
      expect(result.breakEvenAnalysis.breakEvenTaxRate).toBe(40);
      expect(result.breakEvenAnalysis.marginOfSafety).toBe(7500000);
      expect(result.breakEvenAnalysis.requiredSavings).toBeGreaterThan(0);
    });

    it('should calculate Monte Carlo results', () => {
      const result = calculateEstatePlanning(validInputs);
      
      expect(result.monteCarloResults.meanEstateTax).toBeGreaterThan(0);
      expect(result.monteCarloResults.medianEstateTax).toBeGreaterThan(0);
      expect(result.monteCarloResults.standardDeviation).toBeGreaterThan(0);
      expect(result.monteCarloResults.percentiles.p10).toBeGreaterThan(0);
      expect(result.monteCarloResults.percentiles.p25).toBeGreaterThan(0);
      expect(result.monteCarloResults.percentiles.p50).toBeGreaterThan(0);
      expect(result.monteCarloResults.percentiles.p75).toBeGreaterThan(0);
      expect(result.monteCarloResults.percentiles.p90).toBeGreaterThan(0);
      expect(result.monteCarloResults.probabilityOfTaxIncrease).toBe(0.3);
    });
  });

  describe('validateEstatePlanningInputs', () => {
    it('should validate valid inputs', () => {
      const result = validateEstatePlanningInputs(validInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing required fields', () => {
      const invalidInputs = { ...validInputs };
      delete invalidInputs.estateInfo.totalAssets;
      
      const result = validateEstatePlanningInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should detect invalid numeric values', () => {
      const invalidInputs = { ...validInputs };
      invalidInputs.estateInfo.totalAssets = -1000;
      
      const result = validateEstatePlanningInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should detect invalid age values', () => {
      const invalidInputs = { ...validInputs };
      invalidInputs.estateInfo.age = 150;
      
      const result = validateEstatePlanningInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should detect invalid beneficiary percentages', () => {
      const invalidInputs = { ...validInputs };
      invalidInputs.beneficiaries[0].percentage = 150;
      
      const result = validateEstatePlanningInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should detect inconsistent net estate calculation', () => {
      const invalidInputs = { ...validInputs };
      invalidInputs.estateInfo.netEstate = 1000000; // Should be 4500000
      
      const result = validateEstatePlanningInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Quick Validation Functions', () => {
    describe('quickValidateTotalAssets', () => {
      it('should validate valid total assets', () => {
        const result = quickValidateTotalAssets(5000000);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative values', () => {
        const result = quickValidateTotalAssets(-1000);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('cannot be negative');
      });

      it('should reject non-numeric values', () => {
        const result = quickValidateTotalAssets('invalid');
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('valid number');
      });

      it('should reject empty values', () => {
        const result = quickValidateTotalAssets('');
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('required');
      });
    });

    describe('quickValidateTotalLiabilities', () => {
      it('should validate valid total liabilities', () => {
        const result = quickValidateTotalLiabilities(500000, { estateInfo: { totalAssets: 5000000 } });
        expect(result.isValid).toBe(true);
      });

      it('should reject liabilities exceeding assets', () => {
        const result = quickValidateTotalLiabilities(6000000, { estateInfo: { totalAssets: 5000000 } });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('should not exceed total assets');
      });
    });

    describe('quickValidateNetEstate', () => {
      it('should validate consistent net estate calculation', () => {
        const result = quickValidateNetEstate(4500000, {
          estateInfo: { totalAssets: 5000000, totalLiabilities: 500000 }
        });
        expect(result.isValid).toBe(true);
      });

      it('should reject inconsistent net estate calculation', () => {
        const result = quickValidateNetEstate(1000000, {
          estateInfo: { totalAssets: 5000000, totalLiabilities: 500000 }
        });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('should equal total assets minus total liabilities');
      });
    });

    describe('quickValidateEstateOwner', () => {
      it('should validate valid estate owner name', () => {
        const result = quickValidateEstateOwner('John Smith');
        expect(result.isValid).toBe(true);
      });

      it('should reject empty names', () => {
        const result = quickValidateEstateOwner('');
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('required');
      });

      it('should reject very short names', () => {
        const result = quickValidateEstateOwner('J');
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('at least 2 characters');
      });
    });

    describe('quickValidateAge', () => {
      it('should validate valid age', () => {
        const result = quickValidateAge(65);
        expect(result.isValid).toBe(true);
      });

      it('should reject ages below 18', () => {
        const result = quickValidateAge(15);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('at least 18');
      });

      it('should reject ages above 120', () => {
        const result = quickValidateAge(150);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('120 or less');
      });
    });

    describe('quickValidateHealthStatus', () => {
      it('should validate valid health statuses', () => {
        expect(quickValidateHealthStatus('excellent').isValid).toBe(true);
        expect(quickValidateHealthStatus('good').isValid).toBe(true);
        expect(quickValidateHealthStatus('fair').isValid).toBe(true);
        expect(quickValidateHealthStatus('poor').isValid).toBe(true);
      });

      it('should reject invalid health status', () => {
        const result = quickValidateHealthStatus('invalid');
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('excellent, good, fair, or poor');
      });
    });

    describe('quickValidateBeneficiaryPercentage', () => {
      it('should validate valid beneficiary percentage', () => {
        const result = quickValidateBeneficiaryPercentage(60);
        expect(result.isValid).toBe(true);
      });

      it('should reject percentages above 100', () => {
        const result = quickValidateBeneficiaryPercentage(150);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('cannot exceed 100%');
      });

      it('should reject negative percentages', () => {
        const result = quickValidateBeneficiaryPercentage(-10);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('cannot be negative');
      });
    });

    describe('quickValidateFederalExemption', () => {
      it('should validate valid federal exemption', () => {
        const result = quickValidateFederalExemption(12000000);
        expect(result.isValid).toBe(true);
      });

      it('should reject negative values', () => {
        const result = quickValidateFederalExemption(-1000);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('cannot be negative');
      });

      it('should reject extremely high values', () => {
        const result = quickValidateFederalExemption(1000000000);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('seems too high');
      });
    });

    describe('quickValidateFederalRate', () => {
      it('should validate valid federal rate', () => {
        const result = quickValidateFederalRate(40);
        expect(result.isValid).toBe(true);
      });

      it('should reject rates above 100', () => {
        const result = quickValidateFederalRate(150);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('cannot exceed 100%');
      });

      it('should reject negative rates', () => {
        const result = quickValidateFederalRate(-10);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('cannot be negative');
      });
    });

    describe('quickValidateGiftsMade', () => {
      it('should validate valid gifts made', () => {
        const result = quickValidateGiftsMade(500000, {
          taxConsiderations: { giftTax: { lifetimeExemption: 12000000 } }
        });
        expect(result.isValid).toBe(true);
      });

      it('should reject gifts exceeding lifetime exemption', () => {
        const result = quickValidateGiftsMade(15000000, {
          taxConsiderations: { giftTax: { lifetimeExemption: 12000000 } }
        });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('should not exceed lifetime exemption');
      });
    });

    describe('quickValidateTrustValue', () => {
      it('should validate valid trust value', () => {
        const result = quickValidateTrustValue(200000, { estateInfo: { totalAssets: 5000000 } });
        expect(result.isValid).toBe(true);
      });

      it('should reject trust value exceeding total assets', () => {
        const result = quickValidateTrustValue(6000000, { estateInfo: { totalAssets: 5000000 } });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('cannot exceed total assets');
      });
    });

    describe('quickValidateIncomeReplacement', () => {
      it('should validate valid income replacement needs', () => {
        const result = quickValidateIncomeReplacement(2000000, { estateInfo: { totalAssets: 5000000 } });
        expect(result.isValid).toBe(true);
      });

      it('should reject income replacement needs too high relative to assets', () => {
        const result = quickValidateIncomeReplacement(20000000, { estateInfo: { totalAssets: 5000000 } });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('seem too high relative to total assets');
      });
    });

    describe('quickValidateDebtPayoff', () => {
      it('should validate valid debt payoff needs', () => {
        const result = quickValidateDebtPayoff(500000, { estateInfo: { totalLiabilities: 500000 } });
        expect(result.isValid).toBe(true);
      });

      it('should reject debt payoff needs too high relative to liabilities', () => {
        const result = quickValidateDebtPayoff(1000000, { estateInfo: { totalLiabilities: 500000 } });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('seem too high relative to total liabilities');
      });
    });

    describe('quickValidateEducationFunding', () => {
      it('should validate valid education funding needs', () => {
        const result = quickValidateEducationFunding(300000);
        expect(result.isValid).toBe(true);
      });

      it('should reject extremely high education funding needs', () => {
        const result = quickValidateEducationFunding(2000000);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('seem too high');
      });
    });

    describe('quickValidateEstateTaxFunding', () => {
      it('should validate valid estate tax funding needs', () => {
        const result = quickValidateEstateTaxFunding(500000, { estateInfo: { totalAssets: 5000000 } });
        expect(result.isValid).toBe(true);
      });

      it('should reject estate tax funding needs too high relative to assets', () => {
        const result = quickValidateEstateTaxFunding(3000000, { estateInfo: { totalAssets: 5000000 } });
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('seem too high relative to total assets');
      });
    });

    describe('quickValidateExecutor', () => {
      it('should validate valid executor name', () => {
        const result = quickValidateExecutor('Jane Smith');
        expect(result.isValid).toBe(true);
      });

      it('should reject empty executor name', () => {
        const result = quickValidateExecutor('');
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('required');
      });

      it('should reject very short executor name', () => {
        const result = quickValidateExecutor('J');
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('at least 2 characters');
      });
    });

    describe('quickValidateEstimatedCosts', () => {
      it('should validate valid estimated costs', () => {
        const result = quickValidateEstimatedCosts(50000);
        expect(result.isValid).toBe(true);
      });

      it('should reject extremely high estimated costs', () => {
        const result = quickValidateEstimatedCosts(2000000);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('seem too high');
      });

      it('should reject negative estimated costs', () => {
        const result = quickValidateEstimatedCosts(-1000);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('cannot be negative');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero assets', () => {
      const zeroAssetsInputs = { ...validInputs };
      zeroAssetsInputs.estateInfo.totalAssets = 0;
      zeroAssetsInputs.estateInfo.totalLiabilities = 0;
      zeroAssetsInputs.estateInfo.netEstate = 0;
      
      const result = calculateEstatePlanning(zeroAssetsInputs);
      expect(result.totalAssets).toBe(0);
      expect(result.totalLiabilities).toBe(0);
      expect(result.netEstate).toBe(0);
      expect(result.estateTax).toBe(0);
      expect(result.netToBeneficiaries).toBe(0);
    });

    it('should handle very large estates', () => {
      const largeEstateInputs = { ...validInputs };
      largeEstateInputs.estateInfo.totalAssets = 100000000;
      largeEstateInputs.estateInfo.totalLiabilities = 10000000;
      largeEstateInputs.estateInfo.netEstate = 90000000;
      
      const result = calculateEstatePlanning(largeEstateInputs);
      expect(result.totalAssets).toBe(100000000);
      expect(result.totalLiabilities).toBe(10000000);
      expect(result.netEstate).toBe(90000000);
      expect(result.estateTax).toBeGreaterThan(0);
    });

    it('should handle negative net estate', () => {
      const negativeNetEstateInputs = { ...validInputs };
      negativeNetEstateInputs.estateInfo.totalAssets = 1000000;
      negativeNetEstateInputs.estateInfo.totalLiabilities = 2000000;
      negativeNetEstateInputs.estateInfo.netEstate = -1000000;
      
      const result = calculateEstatePlanning(negativeNetEstateInputs);
      expect(result.totalAssets).toBe(1000000);
      expect(result.totalLiabilities).toBe(2000000);
      expect(result.netEstate).toBe(-1000000);
      expect(result.estateTax).toBe(0); // No tax on negative estate
    });

    it('should handle missing beneficiaries', () => {
      const noBeneficiariesInputs = { ...validInputs };
      noBeneficiariesInputs.beneficiaries = [];
      
      const result = calculateEstatePlanning(noBeneficiariesInputs);
      expect(result.beneficiaryAnalysis.totalBeneficiaries).toBe(0);
      expect(result.beneficiaryAnalysis.beneficiaryDistribution).toHaveLength(0);
    });

    it('should handle special needs beneficiaries', () => {
      const specialNeedsInputs = { ...validInputs };
      specialNeedsInputs.beneficiaries[0].specialNeeds = true;
      specialNeedsInputs.specialSituations.specialNeedsBeneficiary = true;
      
      const result = calculateEstatePlanning(specialNeedsInputs);
      expect(result.beneficiaryAnalysis.specialNeedsPlanning).toBe(true);
      expect(result.specialSituationsAnalysis.specialNeedsBeneficiary).toBe(true);
    });

    it('should handle minor beneficiaries', () => {
      const minorBeneficiariesInputs = { ...validInputs };
      minorBeneficiariesInputs.beneficiaries[0].age = 15;
      minorBeneficiariesInputs.specialSituations.minorChildren = true;
      
      const result = calculateEstatePlanning(minorBeneficiariesInputs);
      expect(result.beneficiaryAnalysis.minorBeneficiaryPlanning).toBe(true);
      expect(result.specialSituationsAnalysis.minorChildren).toBe(true);
    });

    it('should handle no estate documents', () => {
      const noDocumentsInputs = { ...validInputs };
      noDocumentsInputs.estateDocuments = {
        will: false,
        trust: false,
        powerOfAttorney: false,
        healthcareDirective: false,
        beneficiaryDesignations: false,
        businessSuccessionPlan: false
      };
      
      const result = calculateEstatePlanning(noDocumentsInputs);
      expect(result.estatePlanningEfficiency.documentCompleteness).toBe(0);
      expect(result.estatePlanningEfficiency.assetProtection).toBe(40);
      expect(result.estateAdministrationAnalysis.probateAvoidance).toBe(false);
    });

    it('should handle no life insurance', () => {
      const noInsuranceInputs = { ...validInputs };
      noInsuranceInputs.lifeInsurancePlanning.existingPolicies = [];
      noInsuranceInputs.assets.lifeInsurance.deathBenefit = 0;
      
      const result = calculateEstatePlanning(noInsuranceInputs);
      expect(result.lifeInsuranceAnalysis.totalDeathBenefit).toBe(0);
      expect(result.lifeInsuranceAnalysis.totalCashValue).toBe(0);
      expect(result.lifeInsuranceAnalysis.totalPremium).toBe(0);
      expect(result.lifeInsuranceAnalysis.coverageGap).toBe(3800000);
    });

    it('should handle no business interests', () => {
      const noBusinessInputs = { ...validInputs };
      noBusinessInputs.businessSuccession.businessValue = 0;
      noBusinessInputs.assets.businessInterests.businessValue = 0;
      
      const result = calculateEstatePlanning(noBusinessInputs);
      expect(result.businessSuccessionAnalysis.businessValue).toBe(0);
      expect(result.assetAnalysis.businessInterests).toBe(300000); // Other business interests remain
    });

    it('should handle no charitable giving', () => {
      const noCharitableInputs = { ...validInputs };
      noCharitableInputs.charitableGiving.charitableGifts.annualGifts = 0;
      noCharitableInputs.charitableGiving.charitableGifts.plannedGifts = 0;
      noCharitableInputs.charitableGiving.charitableGifts.charitableDeductions = 0;
      
      const result = calculateEstatePlanning(noCharitableInputs);
      expect(result.charitableAnalysis.charitableGifts).toBe(0);
      expect(result.charitableAnalysis.taxDeductions).toBe(0);
      expect(result.charitableAnalysis.charitableEfficiency).toBe(0);
    });
  });

  describe('Performance Tests', () => {
    it('should handle large beneficiary lists efficiently', () => {
      const largeBeneficiaryInputs = { ...validInputs };
      largeBeneficiaryInputs.beneficiaries = Array.from({ length: 100 }, (_, i) => ({
        name: `Beneficiary ${i + 1}`,
        relationship: 'Family',
        age: 30 + i,
        percentage: 1,
        specificAssets: [],
        specialNeeds: false
      }));
      
      const startTime = Date.now();
      const result = calculateEstatePlanning(largeBeneficiaryInputs);
      const endTime = Date.now();
      
      expect(result.beneficiaryAnalysis.totalBeneficiaries).toBe(100);
      expect(result.beneficiaryAnalysis.beneficiaryDistribution).toHaveLength(100);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should handle complex asset structures efficiently', () => {
      const complexAssetInputs = { ...validInputs };
      // Add many small asset categories
      for (let i = 0; i < 50; i++) {
        complexAssetInputs.assets.liquidAssets[`asset${i}`] = 10000;
      }
      
      const startTime = Date.now();
      const result = calculateEstatePlanning(complexAssetInputs);
      const endTime = Date.now();
      
      expect(result.assetAnalysis.totalAssets).toBeGreaterThan(validInputs.estateInfo.totalAssets);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });

  describe('Risk Analysis', () => {
    it('should identify high tax risk for large estates', () => {
      const largeEstateInputs = { ...validInputs };
      largeEstateInputs.estateInfo.totalAssets = 50000000;
      largeEstateInputs.estateInfo.totalLiabilities = 5000000;
      largeEstateInputs.estateInfo.netEstate = 45000000;
      
      const result = calculateEstatePlanning(largeEstateInputs);
      expect(result.riskAnalysis.taxRisk).toBeGreaterThan(50);
    });

    it('should identify high asset protection risk without trusts', () => {
      const noTrustInputs = { ...validInputs };
      noTrustInputs.estateDocuments.trust = false;
      noTrustInputs.trustInfo.trustValue = 0;
      
      const result = calculateEstatePlanning(noTrustInputs);
      expect(result.riskAnalysis.assetProtectionRisk).toBeGreaterThan(50);
    });

    it('should identify high beneficiary risk with special needs', () => {
      const specialNeedsInputs = { ...validInputs };
      specialNeedsInputs.specialSituations.specialNeedsBeneficiary = true;
      specialNeedsInputs.estateDocuments.trust = false;
      
      const result = calculateEstatePlanning(specialNeedsInputs);
      expect(result.riskAnalysis.beneficiaryRisk).toBeGreaterThan(30);
    });

    it('should identify high administration risk without executor', () => {
      const noExecutorInputs = { ...validInputs };
      noExecutorInputs.estateAdministration.executor = '';
      
      const result = calculateEstatePlanning(noExecutorInputs);
      expect(result.riskAnalysis.administrationRisk).toBeGreaterThan(50);
    });
  });
});
