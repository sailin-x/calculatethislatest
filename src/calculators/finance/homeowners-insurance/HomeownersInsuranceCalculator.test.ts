import { calculateHomeownersInsurance } from './formulas';
import { validateHomeownersInsuranceInputs } from './validation';
import { HomeownersInsuranceInputs } from './types';

describe('HomeownersInsuranceCalculator', () => {
  const mockInputs: HomeownersInsuranceInputs = {
    propertyValue: 350000,
    propertyAddress: '123 Main St, Los Angeles, CA 90210',
    propertyType: 'single_family',
    propertyAge: 15,
    squareFootage: 2000,
    constructionType: 'frame',
    roofType: 'asphalt_shingle',
    foundationType: 'concrete',
    state: 'CA',
    city: 'Los Angeles',
    zipCode: '90210',
    floodZone: 'low_risk',
    earthquakeRisk: 'moderate',
    wildfireRisk: 'low',
    crimeRate: 'low',
    distanceToFireStation: 2.5,
    distanceToHydrant: 500,
    dwellingCoverage: 350000,
    personalPropertyCoverage: 175000,
    liabilityCoverage: 300000,
    medicalPaymentsCoverage: 5000,
    additionalLivingExpenses: 70000,
    deductible: 1000,
    replacementCost: true,
    extendedReplacementCost: false,
    guaranteedReplacementCost: false,
    inflationProtection: true,
    ordinanceOrLawCoverage: false,
    waterBackupCoverage: true,
    identityTheftCoverage: false,
    equipmentBreakdownCoverage: false,
    multiPolicyDiscount: true,
    securitySystemDiscount: true,
    smokeDetectorDiscount: true,
    deadboltDiscount: true,
    newHomeDiscount: false,
    claimsFreeDiscount: true,
    loyaltyDiscount: false,
    paperlessDiscount: true,
    autopayDiscount: true,
    age: 35,
    creditScore: 'good',
    claimsHistory: 0,
    insuranceScore: 'good',
    swimmingPool: false,
    trampoline: false,
    aggressiveDog: false,
    homeBusiness: false,
    rentalIncome: false,
    vacantProperty: false
  };

  describe('calculateHomeownersInsurance', () => {
    it('should calculate basic premium components', () => {
      const result = calculateHomeownersInsurance(mockInputs);
      
      expect(result).toBeDefined();
      expect(result.basePremium).toBeGreaterThan(0);
      expect(result.dwellingPremium).toBeGreaterThan(0);
      expect(result.personalPropertyPremium).toBeGreaterThan(0);
      expect(result.liabilityPremium).toBeGreaterThan(0);
      expect(result.medicalPaymentsPremium).toBeGreaterThan(0);
      expect(result.additionalLivingExpensesPremium).toBeGreaterThan(0);
    });

    it('should calculate payment frequencies correctly', () => {
      const result = calculateHomeownersInsurance(mockInputs);
      
      expect(result.annualPremium).toBeGreaterThan(0);
      expect(result.monthlyPremium).toBeCloseTo(result.annualPremium / 12, 2);
      expect(result.quarterlyPremium).toBeCloseTo(result.annualPremium / 4, 2);
      expect(result.semiannualPremium).toBeCloseTo(result.annualPremium / 2, 2);
    });

    it('should apply discounts correctly', () => {
      const result = calculateHomeownersInsurance(mockInputs);
      
      expect(result.totalDiscounts).toBeGreaterThan(0);
      expect(result.multiPolicyDiscount).toBeGreaterThan(0);
      expect(result.securitySystemDiscount).toBeGreaterThan(0);
      expect(result.smokeDetectorDiscount).toBeGreaterThan(0);
      expect(result.deadboltDiscount).toBeGreaterThan(0);
      expect(result.claimsFreeDiscount).toBeGreaterThan(0);
      expect(result.paperlessDiscount).toBeGreaterThan(0);
      expect(result.autopayDiscount).toBeGreaterThan(0);
    });

    it('should provide coverage recommendations', () => {
      const result = calculateHomeownersInsurance(mockInputs);
      
      expect(result.coverageAdequacy).toBeDefined();
      expect(result.recommendedDwellingCoverage).toBeGreaterThan(0);
      expect(result.recommendedPersonalPropertyCoverage).toBeGreaterThan(0);
      expect(result.recommendedLiabilityCoverage).toBeGreaterThan(0);
    });

    it('should calculate risk assessment', () => {
      const result = calculateHomeownersInsurance(mockInputs);
      
      expect(result.overallRiskScore).toBeGreaterThanOrEqual(1);
      expect(result.overallRiskScore).toBeLessThanOrEqual(100);
      expect(Array.isArray(result.riskFactors)).toBe(true);
      expect(Array.isArray(result.riskMitigationRecommendations)).toBe(true);
    });

    it('should provide cost analysis', () => {
      const result = calculateHomeownersInsurance(mockInputs);
      
      expect(result.costPerThousand).toBeGreaterThan(0);
      expect(result.premiumToValueRatio).toBeGreaterThan(0);
      expect(result.deductibleImpact).toBeDefined();
      expect(result.deductibleImpact.currentDeductible).toBe(mockInputs.deductible);
      expect(result.deductibleImpact.savings).toBeGreaterThan(0);
    });

    it('should provide recommendations', () => {
      const result = calculateHomeownersInsurance(mockInputs);
      
      expect(Array.isArray(result.coverageRecommendations)).toBe(true);
      expect(Array.isArray(result.discountRecommendations)).toBe(true);
      expect(Array.isArray(result.riskReductionRecommendations)).toBe(true);
      expect(Array.isArray(result.policyOptimizationRecommendations)).toBe(true);
    });

    it('should provide market comparison', () => {
      const result = calculateHomeownersInsurance(mockInputs);
      
      expect(result.marketComparison).toBeDefined();
      expect(result.marketComparison.averagePremium).toBeGreaterThan(0);
      expect(result.marketComparison.premiumPercentile).toBeGreaterThanOrEqual(10);
      expect(result.marketComparison.premiumPercentile).toBeLessThanOrEqual(90);
    });

    it('should provide summary', () => {
      const result = calculateHomeownersInsurance(mockInputs);
      
      expect(result.summary).toBeDefined();
      expect(result.summary.totalAnnualCost).toBeGreaterThan(0);
      expect(result.summary.totalMonthlyCost).toBeGreaterThan(0);
      expect(Array.isArray(result.summary.keyBenefits)).toBe(true);
      expect(Array.isArray(result.summary.keyRisks)).toBe(true);
      expect(Array.isArray(result.summary.nextSteps)).toBe(true);
    });
  });

  describe('validateHomeownersInsuranceInputs', () => {
    it('should validate valid inputs', () => {
      const result = validateHomeownersInsuranceInputs(mockInputs);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch invalid property value', () => {
      const invalidInputs = { ...mockInputs, propertyValue: 10000 };
      const result = validateHomeownersInsuranceInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be at least $50,000');
    });

    it('should catch invalid property address', () => {
      const invalidInputs = { ...mockInputs, propertyAddress: '123' };
      const result = validateHomeownersInsuranceInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property address is required and must be at least 10 characters');
    });

    it('should catch invalid dwelling coverage', () => {
      const invalidInputs = { ...mockInputs, dwellingCoverage: 10000 };
      const result = validateHomeownersInsuranceInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Dwelling coverage must be at least $50,000');
    });

    it('should catch invalid liability coverage', () => {
      const invalidInputs = { ...mockInputs, liabilityCoverage: 50000 };
      const result = validateHomeownersInsuranceInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Liability coverage must be at least $100,000');
    });

    it('should catch invalid deductible', () => {
      const invalidInputs = { ...mockInputs, deductible: 100 };
      const result = validateHomeownersInsuranceInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Deductible must be at least $250');
    });

    it('should catch invalid age', () => {
      const invalidInputs = { ...mockInputs, age: 15 };
      const result = validateHomeownersInsuranceInputs(invalidInputs);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Age must be at least 18');
    });

    it('should provide warnings for coverage adequacy', () => {
      const lowCoverageInputs = { 
        ...mockInputs, 
        dwellingCoverage: 100000, // Less than 80% of property value
        personalPropertyCoverage: 30000 // Less than 50% of dwelling coverage
      };
      const result = validateHomeownersInsuranceInputs(lowCoverageInputs);
      
      expect(result.warnings).toContain('Dwelling coverage is less than 80% of property value');
      expect(result.warnings).toContain('Personal property coverage is less than 50% of dwelling coverage');
    });

    it('should provide warnings for low liability coverage', () => {
      const lowLiabilityInputs = { ...mockInputs, liabilityCoverage: 200000 };
      const result = validateHomeownersInsuranceInputs(lowLiabilityInputs);
      
      expect(result.warnings).toContain('Consider increasing liability coverage to at least $300,000');
    });
  });
});
