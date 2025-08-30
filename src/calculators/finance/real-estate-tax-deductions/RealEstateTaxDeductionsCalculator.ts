import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { RealEstateTaxDeductionsInputs, RealEstateTaxDeductionsOutputs } from './types';
import { calculateRealEstateTaxDeductions } from './formulas';
import { validateRealEstateTaxDeductionsInputs } from './validation';
import { validateField } from './quickValidation';

interface RealEstateTaxDeductionsCalculatorProps {
  onCalculate?: (results: RealEstateTaxDeductionsOutputs) => void;
  initialInputs?: Partial<RealEstateTaxDeductionsInputs>;
}

export function RealEstateTaxDeductionsCalculator({ 
  onCalculate, 
  initialInputs 
}: RealEstateTaxDeductionsCalculatorProps) {
  const [inputs, setInputs] = useState<RealEstateTaxDeductionsInputs>({
    // Property Information
    propertyType: 'residential',
    propertyValue: 500000,
    acquisitionDate: '',
    placedInServiceDate: '',
    propertyUse: 'rental',
    personalUsePercentage: 0,
    
    // Income Information
    rentalIncome: 30000,
    otherIncome: 80000,
    totalIncome: 110000,
    filingStatus: 'single',
    taxYear: 2024,
    
    // Property Expenses
    mortgageInterest: 15000,
    propertyTaxes: 5000,
    insurance: 2000,
    utilities: 3000,
    maintenance: 4000,
    repairs: 2000,
    propertyManagement: 1500,
    advertising: 500,
    legalFees: 1000,
    accountingFees: 800,
    travelExpenses: 500,
    homeOfficeExpenses: 0,
    otherExpenses: 1000,
    
    // Depreciation Information
    landValue: 100000,
    buildingValue: 350000,
    improvementsValue: 50000,
    depreciationMethod: 'straight-line',
    recoveryPeriod: 27.5,
    bonusDepreciationEligible: false,
    bonusDepreciationPercentage: 0,
    section179Eligible: false,
    section179Amount: 0,
    
    // Passive Activity Information
    isPassiveActivity: true,
    materialParticipation: false,
    realEstateProfessional: false,
    activeParticipation: true,
    
    // Loss Limitations
    atRiskLimitation: false,
    passiveLossLimitation: true,
    excessBusinessLossLimitation: false,
    
    // Tax Credits
    energyEfficientImprovements: 0,
    renewableEnergyCredits: 0,
    lowIncomeHousingCredits: 0,
    historicRehabilitationCredits: 0,
    
    // State and Local Information
    stateTaxRate: 5,
    localTaxRate: 2,
    stateDeductions: 0,
    localDeductions: 0,
    
    // Additional Information
    casualtyLosses: 0,
    theftLosses: 0,
    casualtyGains: 0,
    netOperatingLoss: 0,
    alternativeMinimumTax: false,
    
    // Reporting Preferences
    includeDetailedBreakdown: true,
    includeScheduleE: true,
    includeForm4562: true,
    includeForm8582: true,
    currency: 'USD',
    displayFormat: 'currency',
    ...initialInputs
  });

  const [results, setResults] = useState<RealEstateTaxDeductionsOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Auto-calculate cross-field validations
  useEffect(() => {
    const newErrors = { ...errors };
    
    // Auto-calculate total income if not provided
    if (inputs.rentalIncome > 0 && inputs.otherIncome > 0 && inputs.totalIncome === 0) {
      const calculatedTotalIncome = inputs.rentalIncome + inputs.otherIncome;
      setInputs(prev => ({ ...prev, totalIncome: calculatedTotalIncome }));
    }
    
    // Auto-calculate building value if not provided
    if (inputs.propertyValue > 0 && inputs.landValue > 0 && inputs.buildingValue === 0) {
      const calculatedBuildingValue = inputs.propertyValue - inputs.landValue;
      setInputs(prev => ({ ...prev, buildingValue: calculatedBuildingValue }));
    }
    
    // Validate property value components
    if (inputs.landValue + inputs.buildingValue + inputs.improvementsValue > inputs.propertyValue * 1.1) {
      newErrors.buildingValue = 'Land + Building + Improvements cannot exceed property value by more than 10%';
    } else {
      delete newErrors.buildingValue;
    }
    
    // Validate personal use percentage
    if (inputs.personalUsePercentage < 0 || inputs.personalUsePercentage > 100) {
      newErrors.personalUsePercentage = 'Personal use percentage must be between 0% and 100%';
    } else {
      delete newErrors.personalUsePercentage;
    }
    
    setErrors(newErrors);
  }, [inputs.propertyValue, inputs.landValue, inputs.buildingValue, inputs.improvementsValue, inputs.rentalIncome, inputs.otherIncome, inputs.totalIncome, inputs.personalUsePercentage]);

  const handleInputChange = (field: keyof RealEstateTaxDeductionsInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    
    // Quick validation
    const validation = validateField(field, value, inputs);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [field]: validation.error || 'Invalid value' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    setErrors({});

    try {
      // Full validation
      const validation = validateRealEstateTaxDeductionsInputs(inputs);
      if (!validation.isValid) {
        setErrors(validation.errors || {});
        return;
      }

      const calculatedResults = calculateRealEstateTaxDeductions(inputs);
      setResults(calculatedResults);
      
      if (onCalculate) {
        onCalculate(calculatedResults);
      }
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors({ general: 'An error occurred during calculation. Please check your inputs.' });
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: inputs.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatDecimal = (value: number) => {
    return value.toFixed(2);
  };

  const getPropertyTypeColor = (type: string) => {
    switch (type) {
      case 'residential': return 'bg-blue-100 text-blue-800';
      case 'commercial': return 'bg-green-100 text-green-800';
      case 'mixed-use': return 'bg-purple-100 text-purple-800';
      case 'industrial': return 'bg-orange-100 text-orange-800';
      case 'rental': return 'bg-teal-100 text-teal-800';
      case 'vacation-home': return 'bg-pink-100 text-pink-800';
      case 'investment': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFilingStatusColor = (status: string) => {
    switch (status) {
      case 'single': return 'bg-blue-100 text-blue-800';
      case 'married-filing-jointly': return 'bg-green-100 text-green-800';
      case 'married-filing-separately': return 'bg-yellow-100 text-yellow-800';
      case 'head-of-household': return 'bg-purple-100 text-purple-800';
      case 'qualifying-widow': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Real Estate Tax Deductions Calculator</span>
            <Badge variant="secondary">Tax</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="deductions">Deductions</TabsTrigger>
              <TabsTrigger value="depreciation">Depreciation</TabsTrigger>
              <TabsTrigger value="schedules">Schedules</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Property Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Property Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="propertyType">Property Type</Label>
                      <Select value={inputs.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="rental">Rental</SelectItem>
                          <SelectItem value="vacation-home">Vacation Home</SelectItem>
                          <SelectItem value="investment">Investment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="propertyValue">Property Value</Label>
                      <Input
                        id="propertyValue"
                        type="number"
                        value={inputs.propertyValue}
                        onChange={(e) => handleInputChange('propertyValue', parseFloat(e.target.value) || 0)}
                        placeholder="500000"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="acquisitionDate">Acquisition Date</Label>
                        <Input
                          id="acquisitionDate"
                          type="date"
                          value={inputs.acquisitionDate}
                          onChange={(e) => handleInputChange('acquisitionDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="placedInServiceDate">Placed in Service Date</Label>
                        <Input
                          id="placedInServiceDate"
                          type="date"
                          value={inputs.placedInServiceDate}
                          onChange={(e) => handleInputChange('placedInServiceDate', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="propertyUse">Property Use</Label>
                      <Select value={inputs.propertyUse} onValueChange={(value) => handleInputChange('propertyUse', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="rental">Rental</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="personalUsePercentage">Personal Use Percentage</Label>
                      <Input
                        id="personalUsePercentage"
                        type="number"
                        value={inputs.personalUsePercentage}
                        onChange={(e) => handleInputChange('personalUsePercentage', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                      {errors.personalUsePercentage && <p className="text-red-500 text-sm">{errors.personalUsePercentage}</p>}
                    </div>
                  </CardContent>
                </Card>

                {/* Income Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Income Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="rentalIncome">Rental Income</Label>
                      <Input
                        id="rentalIncome"
                        type="number"
                        value={inputs.rentalIncome}
                        onChange={(e) => handleInputChange('rentalIncome', parseFloat(e.target.value) || 0)}
                        placeholder="30000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="otherIncome">Other Income</Label>
                      <Input
                        id="otherIncome"
                        type="number"
                        value={inputs.otherIncome}
                        onChange={(e) => handleInputChange('otherIncome', parseFloat(e.target.value) || 0)}
                        placeholder="80000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="totalIncome">Total Income</Label>
                      <Input
                        id="totalIncome"
                        type="number"
                        value={inputs.totalIncome}
                        onChange={(e) => handleInputChange('totalIncome', parseFloat(e.target.value) || 0)}
                        placeholder="110000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="filingStatus">Filing Status</Label>
                      <Select value={inputs.filingStatus} onValueChange={(value) => handleInputChange('filingStatus', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="married-filing-jointly">Married Filing Jointly</SelectItem>
                          <SelectItem value="married-filing-separately">Married Filing Separately</SelectItem>
                          <SelectItem value="head-of-household">Head of Household</SelectItem>
                          <SelectItem value="qualifying-widow">Qualifying Widow(er)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="taxYear">Tax Year</Label>
                      <Input
                        id="taxYear"
                        type="number"
                        value={inputs.taxYear}
                        onChange={(e) => handleInputChange('taxYear', parseInt(e.target.value) || 0)}
                        placeholder="2024"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Property Expenses */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Property Expenses</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="mortgageInterest">Mortgage Interest</Label>
                      <Input
                        id="mortgageInterest"
                        type="number"
                        value={inputs.mortgageInterest}
                        onChange={(e) => handleInputChange('mortgageInterest', parseFloat(e.target.value) || 0)}
                        placeholder="15000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="propertyTaxes">Property Taxes</Label>
                      <Input
                        id="propertyTaxes"
                        type="number"
                        value={inputs.propertyTaxes}
                        onChange={(e) => handleInputChange('propertyTaxes', parseFloat(e.target.value) || 0)}
                        placeholder="5000"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="insurance">Insurance</Label>
                        <Input
                          id="insurance"
                          type="number"
                          value={inputs.insurance}
                          onChange={(e) => handleInputChange('insurance', parseFloat(e.target.value) || 0)}
                          placeholder="2000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="utilities">Utilities</Label>
                        <Input
                          id="utilities"
                          type="number"
                          value={inputs.utilities}
                          onChange={(e) => handleInputChange('utilities', parseFloat(e.target.value) || 0)}
                          placeholder="3000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="maintenance">Maintenance</Label>
                        <Input
                          id="maintenance"
                          type="number"
                          value={inputs.maintenance}
                          onChange={(e) => handleInputChange('maintenance', parseFloat(e.target.value) || 0)}
                          placeholder="4000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="repairs">Repairs</Label>
                        <Input
                          id="repairs"
                          type="number"
                          value={inputs.repairs}
                          onChange={(e) => handleInputChange('repairs', parseFloat(e.target.value) || 0)}
                          placeholder="2000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="propertyManagement">Property Management</Label>
                        <Input
                          id="propertyManagement"
                          type="number"
                          value={inputs.propertyManagement}
                          onChange={(e) => handleInputChange('propertyManagement', parseFloat(e.target.value) || 0)}
                          placeholder="1500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="advertising">Advertising</Label>
                        <Input
                          id="advertising"
                          type="number"
                          value={inputs.advertising}
                          onChange={(e) => handleInputChange('advertising', parseFloat(e.target.value) || 0)}
                          placeholder="500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="legalFees">Legal Fees</Label>
                        <Input
                          id="legalFees"
                          type="number"
                          value={inputs.legalFees}
                          onChange={(e) => handleInputChange('legalFees', parseFloat(e.target.value) || 0)}
                          placeholder="1000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="accountingFees">Accounting Fees</Label>
                        <Input
                          id="accountingFees"
                          type="number"
                          value={inputs.accountingFees}
                          onChange={(e) => handleInputChange('accountingFees', parseFloat(e.target.value) || 0)}
                          placeholder="800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="travelExpenses">Travel Expenses</Label>
                        <Input
                          id="travelExpenses"
                          type="number"
                          value={inputs.travelExpenses}
                          onChange={(e) => handleInputChange('travelExpenses', parseFloat(e.target.value) || 0)}
                          placeholder="500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="homeOfficeExpenses">Home Office Expenses</Label>
                        <Input
                          id="homeOfficeExpenses"
                          type="number"
                          value={inputs.homeOfficeExpenses}
                          onChange={(e) => handleInputChange('homeOfficeExpenses', parseFloat(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="otherExpenses">Other Expenses</Label>
                      <Input
                        id="otherExpenses"
                        type="number"
                        value={inputs.otherExpenses}
                        onChange={(e) => handleInputChange('otherExpenses', parseFloat(e.target.value) || 0)}
                        placeholder="1000"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Depreciation Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Depreciation Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="landValue">Land Value</Label>
                      <Input
                        id="landValue"
                        type="number"
                        value={inputs.landValue}
                        onChange={(e) => handleInputChange('landValue', parseFloat(e.target.value) || 0)}
                        placeholder="100000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="buildingValue">Building Value</Label>
                      <Input
                        id="buildingValue"
                        type="number"
                        value={inputs.buildingValue}
                        onChange={(e) => handleInputChange('buildingValue', parseFloat(e.target.value) || 0)}
                        placeholder="350000"
                      />
                      {errors.buildingValue && <p className="text-red-500 text-sm">{errors.buildingValue}</p>}
                    </div>

                    <div>
                      <Label htmlFor="improvementsValue">Improvements Value</Label>
                      <Input
                        id="improvementsValue"
                        type="number"
                        value={inputs.improvementsValue}
                        onChange={(e) => handleInputChange('improvementsValue', parseFloat(e.target.value) || 0)}
                        placeholder="50000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="depreciationMethod">Depreciation Method</Label>
                      <Select value={inputs.depreciationMethod} onValueChange={(value) => handleInputChange('depreciationMethod', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="straight-line">Straight-Line</SelectItem>
                          <SelectItem value="declining-balance">Declining Balance</SelectItem>
                          <SelectItem value="sum-of-years-digits">Sum-of-Years-Digits</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="recoveryPeriod">Recovery Period (Years)</Label>
                      <Input
                        id="recoveryPeriod"
                        type="number"
                        value={inputs.recoveryPeriod}
                        onChange={(e) => handleInputChange('recoveryPeriod', parseFloat(e.target.value) || 0)}
                        placeholder="27.5"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bonusDepreciationEligible"
                        checked={inputs.bonusDepreciationEligible}
                        onCheckedChange={(checked) => handleInputChange('bonusDepreciationEligible', checked)}
                      />
                      <Label htmlFor="bonusDepreciationEligible">Bonus Depreciation Eligible</Label>
                    </div>

                    {inputs.bonusDepreciationEligible && (
                      <div>
                        <Label htmlFor="bonusDepreciationPercentage">Bonus Depreciation Percentage</Label>
                        <Input
                          id="bonusDepreciationPercentage"
                          type="number"
                          value={inputs.bonusDepreciationPercentage}
                          onChange={(e) => handleInputChange('bonusDepreciationPercentage', parseFloat(e.target.value) || 0)}
                          placeholder="100"
                        />
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="section179Eligible"
                        checked={inputs.section179Eligible}
                        onCheckedChange={(checked) => handleInputChange('section179Eligible', checked)}
                      />
                      <Label htmlFor="section179Eligible">Section 179 Eligible</Label>
                    </div>

                    {inputs.section179Eligible && (
                      <div>
                        <Label htmlFor="section179Amount">Section 179 Amount</Label>
                        <Input
                          id="section179Amount"
                          type="number"
                          value={inputs.section179Amount}
                          onChange={(e) => handleInputChange('section179Amount', parseFloat(e.target.value) || 0)}
                          placeholder="1000000"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Passive Activity Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Passive Activity Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isPassiveActivity"
                        checked={inputs.isPassiveActivity}
                        onCheckedChange={(checked) => handleInputChange('isPassiveActivity', checked)}
                      />
                      <Label htmlFor="isPassiveActivity">Is Passive Activity</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="materialParticipation"
                        checked={inputs.materialParticipation}
                        onCheckedChange={(checked) => handleInputChange('materialParticipation', checked)}
                      />
                      <Label htmlFor="materialParticipation">Material Participation</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="realEstateProfessional"
                        checked={inputs.realEstateProfessional}
                        onCheckedChange={(checked) => handleInputChange('realEstateProfessional', checked)}
                      />
                      <Label htmlFor="realEstateProfessional">Real Estate Professional</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="activeParticipation"
                        checked={inputs.activeParticipation}
                        onCheckedChange={(checked) => handleInputChange('activeParticipation', checked)}
                      />
                      <Label htmlFor="activeParticipation">Active Participation</Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={handleCalculate} 
                  disabled={isCalculating || Object.keys(errors).length > 0}
                  className="w-full max-w-md"
                >
                  {isCalculating ? 'Calculating...' : 'Calculate Tax Deductions'}
                </Button>
              </div>

              {errors.general && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see results.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Tax Savings Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tax Savings Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(results.metrics.taxSavings)}
                          </div>
                          <div className="text-sm text-gray-600">Total Tax Savings</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatCurrency(results.metrics.totalDeductions)}
                          </div>
                          <div className="text-sm text-gray-600">Total Deductions</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {formatPercentage(results.metrics.effectiveTaxRate)}
                          </div>
                          <div className="text-sm text-gray-600">Effective Tax Rate</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            {formatCurrency(results.metrics.afterTaxCashFlow)}
                          </div>
                          <div className="text-sm text-gray-600">After-Tax Cash Flow</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tax Liability Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tax Liability Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            {formatCurrency(results.metrics.federalTaxLiability)}
                          </div>
                          <div className="text-sm text-gray-600">Federal Tax</div>
                        </div>
                        <div className="text-center p-4 bg-indigo-50 rounded-lg">
                          <div className="text-2xl font-bold text-indigo-600">
                            {formatCurrency(results.metrics.stateTaxLiability)}
                          </div>
                          <div className="text-sm text-gray-600">State Tax</div>
                        </div>
                        <div className="text-center p-4 bg-teal-50 rounded-lg">
                          <div className="text-2xl font-bold text-teal-600">
                            {formatCurrency(results.metrics.localTaxLiability)}
                          </div>
                          <div className="text-sm text-gray-600">Local Tax</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Income Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Income Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">
                            {formatCurrency(results.metrics.totalIncome)}
                          </div>
                          <div className="text-sm text-gray-600">Total Income</div>
                        </div>
                        <div className="text-center p-4 bg-pink-50 rounded-lg">
                          <div className="text-2xl font-bold text-pink-600">
                            {formatCurrency(results.metrics.rentalIncome)}
                          </div>
                          <div className="text-sm text-gray-600">Rental Income</div>
                        </div>
                        <div className="text-center p-4 bg-cyan-50 rounded-lg">
                          <div className="text-2xl font-bold text-cyan-600">
                            {formatCurrency(results.metrics.taxableIncome)}
                          </div>
                          <div className="text-sm text-gray-600">Taxable Income</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="deductions" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see deductions breakdown.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Deductions Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Deductions Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Percentage</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">Form</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">Line</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.deductionBreakdown.map((deduction, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="border border-gray-300 px-4 py-2">{deduction.category}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(deduction.amount)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatPercentage(deduction.percentage)}</td>
                                <td className="border border-gray-300 px-4 py-2">{deduction.form}</td>
                                <td className="border border-gray-300 px-4 py-2">{deduction.line}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="depreciation" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see depreciation schedule.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Depreciation Schedule */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Depreciation Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Beginning Basis</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Depreciation</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Bonus Depreciation</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Section 179</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Ending Basis</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.depreciationSchedule.slice(0, 10).map((depreciation, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="border border-gray-300 px-4 py-2">{depreciation.year}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(depreciation.beginningBasis)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(depreciation.depreciation)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(depreciation.bonusDepreciation)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(depreciation.section179)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(depreciation.endingBasis)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {results.depreciationSchedule.length > 10 && (
                          <p className="text-sm text-gray-600 mt-2">
                            Showing first 10 years of {results.depreciationSchedule.length} total years
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="schedules" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see tax schedules.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Tax Schedules */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tax Schedules & Forms</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-4 py-2 text-left">Schedule</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">Form</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.taxSchedules.map((schedule, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="border border-gray-300 px-4 py-2">{schedule.schedule}</td>
                                <td className="border border-gray-300 px-4 py-2">{schedule.form}</td>
                                <td className="border border-gray-300 px-4 py-2">{schedule.description}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(schedule.amount)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see analysis.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Risk Assessment */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Audit Risk:</span>
                          <Badge className={results.analysis.auditRisk === 'low' ? 'bg-green-100 text-green-800' : results.analysis.auditRisk === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                            {results.analysis.auditRisk.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <span className="font-semibold">Risk Factors:</span>
                          <ul className="list-disc list-inside space-y-1">
                            {results.analysis.riskFactors.map((factor, index) => (
                              <li key={index} className="text-sm text-gray-600">{factor}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Deductions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Deductions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {results.analysis.keyDeductions.map((deduction, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>{deduction}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Tax Savings Opportunities */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tax Savings Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {results.analysis.taxSavingsOpportunities.map((opportunity, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">→</span>
                            <span>{opportunity}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {results.analysis.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-purple-500 mt-1">•</span>
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}