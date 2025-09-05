import { calculateLandlordInsurance } from './formulas';
import { validateLandlordInsuranceInputs } from './validation';
import { LandlordInsuranceInputs } from './types';

describe('LandlordInsuranceCalculator', () => {
  const mockInputs: LandlordInsuranceInputs = {
    propertyValue: 500000,
    propertyAddress: '123 Main St, Los Angeles, CA 90210',
    propertyType: 'single_family',
    propertyAge: 20,
    squareFootage: 2000,
    numberOfUnits: 1,
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
    dwellingCoverage: 500000,
    personalPropertyCoverage: 250000,
    liabilityCoverage: 500000,
    medicalPaymentsCoverage: 5000,
    lossOfRentsCoverage: 36000,
    additionalLivingExpenses: 100000,
    deductible: 1000,
    replacementCost: true,
    extendedReplacementCost: false,
    guaranteedReplacementCost: false,
    inflationProtection: true,
    ordinanceOrLawCoverage: false,
    waterBackupCoverage: true,
    equipmentBreakdownCoverage: false,
    rentalIncomeProtection: true,
    multiPolicyDiscount: false,
    securitySystemDiscount: false,
    smokeDetectorDiscount: true,
    deadboltDiscount: true,
    newHomeDiscount: false,
    claimsFreeDiscount: false,
    loyaltyDiscount: false,
    paperlessDiscount: false,
    autopayDiscount: false,
    age: 45,
    creditScore: 'good',
    claimsHistory: 0,
    insuranceScore: 'good',
    landlordExperience: 5,
    numberOfProperties: 1,
    monthlyRent: 3000,
    annualRent: 36000,
    occupancyRate: 95,
    averageTenantLength: 24,
    tenantScreening: true,
    leaseAgreement: true,
    securityDeposit: 3000,
    swimmingPool: false,
    trampoline: false,
    aggressiveDog: false,
    homeBusiness: false,
    vacantProperty: false,
    shortTermRental: false,
    furnishedRental: false,
    propertyManagement: false,
    regularInspections: true,
    maintenanceProgram: true,
    tenantInsurance: false,
    umbrellaPolicy: false
  };

  describe('calculateLandlordInsurance', () => {
    it('should calculate basic insurance premium', () => {
      const result = calculateLandlordInsurance(mockInputs);
      
      expect(result).toBeDefined();
      expect(result.annualPremium).toBeGreaterThan(0);
      expect(result.monthlyPremium).toBeGreaterThan(0);
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskLevel).toBeDefined();
      expect(result.recommendations).toBeInstanceOf(Array);
    });

    it('should handle different property types', () => {
      const multiFamilyInputs = { ...mockInputs, propertyType: 'multi_family' as const };
      const result = calculateLandlordInsurance(multiFamilyInputs);
      
      expect(result.annualPremium).toBeGreaterThan(mockInputs.propertyValue * 0.004);
    });

    it('should apply discounts correctly', () => {
      const discountInputs = { 
        ...mockInputs, 
        securitySystemDiscount: true,
        claimsFreeDiscount: true 
      };
      const result = calculateLandlordInsurance(discountInputs);
      
      expect(result.annualPremium).toBeGreaterThan(0);
    });

    it('should handle high-risk properties', () => {
      const highRiskInputs = { 
        ...mockInputs, 
        floodZone: 'high_risk' as const,
        crimeRate: 'high' as const 
      };
      const result = calculateLandlordInsurance(highRiskInputs);
      
      expect(result.riskScore).toBeGreaterThan(0);
      expect(result.riskLevel).toBeDefined();
    });
  });

  describe('validateLandlordInsuranceInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateLandlordInsuranceInputs(mockInputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch invalid property value', () => {
      const invalidInputs = { ...mockInputs, propertyValue: 50000 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property value must be at least $100,000');
    });

    it('should catch missing property address', () => {
      const invalidInputs = { ...mockInputs, propertyAddress: '' };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property address is required and must be at least 10 characters');
    });

    it('should catch invalid dwelling coverage', () => {
      const invalidInputs = { ...mockInputs, dwellingCoverage: 50000 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Dwelling coverage must be at least $100,000');
    });

    it('should catch invalid liability coverage', () => {
      const invalidInputs = { ...mockInputs, liabilityCoverage: 50000 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Liability coverage must be at least $100,000');
    });

    it('should catch invalid deductible', () => {
      const invalidInputs = { ...mockInputs, deductible: 250 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Deductible must be at least $500');
    });

    it('should catch invalid occupancy rate', () => {
      const invalidInputs = { ...mockInputs, occupancyRate: 150 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Occupancy rate must be between 0% and 100%');
    });

    it('should catch invalid monthly rent', () => {
      const invalidInputs = { ...mockInputs, monthlyRent: -1000 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Monthly rent cannot be negative');
    });

    it('should catch invalid property age', () => {
      const invalidInputs = { ...mockInputs, propertyAge: -5 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Property age must be between 0 and 200 years');
    });

    it('should catch invalid square footage', () => {
      const invalidInputs = { ...mockInputs, squareFootage: 100 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Square footage must be at least 500 sq ft');
    });

    it('should catch invalid number of units', () => {
      const invalidInputs = { ...mockInputs, numberOfUnits: 0 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Number of units must be at least 1');
    });

    it('should catch invalid landlord experience', () => {
      const invalidInputs = { ...mockInputs, landlordExperience: -1 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Landlord experience must be between 0 and 50 years');
    });

    it('should catch invalid number of properties', () => {
      const invalidInputs = { ...mockInputs, numberOfProperties: -1 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Number of properties must be between 0 and 1000');
    });

    it('should catch invalid claims history', () => {
      const invalidInputs = { ...mockInputs, claimsHistory: -1 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Claims history must be between 0 and 10');
    });

    it('should catch invalid age', () => {
      const invalidInputs = { ...mockInputs, age: 15 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Age must be between 18 and 100');
    });

    it('should catch invalid distance to fire station', () => {
      const invalidInputs = { ...mockInputs, distanceToFireStation: -1 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Distance to fire station must be between 0 and 50 miles');
    });

    it('should catch invalid distance to hydrant', () => {
      const invalidInputs = { ...mockInputs, distanceToHydrant: -1 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Distance to fire hydrant must be between 0 and 5000 feet');
    });

    it('should catch invalid average tenant length', () => {
      const invalidInputs = { ...mockInputs, averageTenantLength: -1 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Average tenant length must be between 0 and 120 months');
    });

    it('should catch invalid security deposit', () => {
      const invalidInputs = { ...mockInputs, securityDeposit: -1000 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Security deposit cannot be negative');
    });

    it('should catch invalid annual rent', () => {
      const invalidInputs = { ...mockInputs, annualRent: -1000 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Annual rent cannot be negative');
    });

    it('should catch invalid loss of rents coverage', () => {
      const invalidInputs = { ...mockInputs, lossOfRentsCoverage: 5000 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Loss of rents coverage must be at least $10,000');
    });

    it('should catch invalid additional living expenses', () => {
      const invalidInputs = { ...mockInputs, additionalLivingExpenses: 5000 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Additional living expenses must be at least $10,000');
    });

    it('should catch invalid medical payments coverage', () => {
      const invalidInputs = { ...mockInputs, medicalPaymentsCoverage: 500 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Medical payments coverage must be at least $1,000');
    });

    it('should catch invalid personal property coverage', () => {
      const invalidInputs = { ...mockInputs, personalPropertyCoverage: 5000 };
      const result = validateLandlordInsuranceInputs(invalidInputs);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Personal property coverage must be at least $10,000');
    });
  });
});
