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
import { PropertyTaxInputs, PropertyTaxOutputs } from './types';
import { calculatePropertyTax } from './formulas';
import { validatePropertyTaxInputs } from './validation';
import { validateField } from './quickValidation';

interface PropertyTaxCalculatorProps {
  onCalculate?: (results: PropertyTaxOutputs) => void;
  initialInputs?: Partial<PropertyTaxInputs>;
}

export function PropertyTaxCalculator({ onCalculate, initialInputs }: PropertyTaxCalculatorProps) {
  const [inputs, setInputs] = useState<PropertyTaxInputs>({
    // Property Information
    propertyValue: 350000,
    propertyAddress: '123 Main St, Anytown, USA',
    propertyType: 'single_family',
    propertySize: 2000,
    propertyAge: 15,
    propertyUse: 'primary_residence',
    propertyCondition: 'good',
    
    // Location Information
    state: 'CA',
    county: 'Los Angeles',
    city: 'Los Angeles',
    zipCode: '90210',
    schoolDistrict: 'Los Angeles Unified',
    specialTaxDistrict: 'None',
    
    // Tax Rates and Assessments
    countyTaxRate: 1.25,
    cityTaxRate: 0.75,
    schoolTaxRate: 1.50,
    specialDistrictTaxRate: 0.25,
    assessmentRatio: 100,
    homesteadExemption: true,
    homesteadExemptionAmount: 7000,
    seniorExemption: false,
    seniorExemptionAmount: 0,
    veteranExemption: false,
    veteranExemptionAmount: 0,
    disabilityExemption: false,
    disabilityExemptionAmount: 0,
    
    // Assessment Information
    assessedValue: 350000,
    previousAssessedValue: 340000,
    assessmentDate: '2024-01-01',
    lastReassessmentDate: '2023-01-01',
    reassessmentCycle: 3,
    
    // Tax Calculation Parameters
    taxYear: 2024,
    paymentSchedule: 'annual',
    escrowAccount: true,
    escrowMonthlyPayment: 300,
    escrowBalance: 1200,
    
    // Additional Taxes and Fees
    specialAssessments: [],
    improvementAssessments: [],
    bondAssessments: [],
    
    // Market and Economic Factors
    marketAppreciationRate: 3.0,
    inflationRate: 2.5,
    localEconomicGrowth: 2.0,
    propertyTaxCap: 2.0,
    
    // Historical Data
    previousYearTax: 4200,
    fiveYearAverageTax: 4000,
    tenYearAverageTax: 3800,
    taxHistory: [
      { year: 2023, assessedValue: 340000, taxAmount: 4200, taxRate: 3.75 },
      { year: 2022, assessedValue: 330000, taxAmount: 4100, taxRate: 3.75 },
      { year: 2021, assessedValue: 320000, taxAmount: 4000, taxRate: 3.75 }
    ],
    
    // Analysis Parameters
    analysisPeriod: 10,
    includeInflation: true,
    includeAppreciation: true,
    includeExemptions: true,
    includeSpecialAssessments: true,
    
    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    includeComparisons: true,
    
    ...initialInputs
  });

  const [results, setResults] = useState<PropertyTaxOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Auto-calculate assessed value based on property value and assessment ratio
  useEffect(() => {
    if (inputs.propertyValue && inputs.assessmentRatio) {
      const newAssessedValue = (inputs.propertyValue * inputs.assessmentRatio) / 100;
      setInputs(prev => ({ ...prev, assessedValue: newAssessedValue }));
    }
  }, [inputs.propertyValue, inputs.assessmentRatio]);

  // Auto-calculate total exemptions
  useEffect(() => {
    let totalExemptions = 0;
    if (inputs.homesteadExemption) totalExemptions += inputs.homesteadExemptionAmount;
    if (inputs.seniorExemption) totalExemptions += inputs.seniorExemptionAmount;
    if (inputs.veteranExemption) totalExemptions += inputs.veteranExemptionAmount;
    if (inputs.disabilityExemption) totalExemptions += inputs.disabilityExemptionAmount;
  }, [inputs.homesteadExemption, inputs.homesteadExemptionAmount, inputs.seniorExemption, inputs.seniorExemptionAmount, inputs.veteranExemption, inputs.veteranExemptionAmount, inputs.disabilityExemption, inputs.disabilityExemptionAmount]);

  const handleInputChange = (field: keyof PropertyTaxInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Quick validation
    const validation = validateField(field, value, inputs);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [field]: validation.error }));
    }
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    setErrors({});

    try {
      // Full validation
      const validation = validatePropertyTaxInputs(inputs);
      if (!validation.isValid) {
        setErrors(validation.errors || {});
        return;
      }

      // Calculate results
      const calculatedResults = calculatePropertyTax(inputs);
      setResults(calculatedResults);

      // Call callback if provided
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
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <span>Property Tax Calculator</span>
        </h1>
        <p className="text-gray-600">
          Calculate and analyze property taxes, exemptions, and payment schedules
        </p>
      </div>

      <Tabs defaultValue="inputs" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="results" disabled={!results}>Results</TabsTrigger>
          <TabsTrigger value="analysis" disabled={!results}>Analysis</TabsTrigger>
          <TabsTrigger value="timeline" disabled={!results}>Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Property Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Property Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="propertyValue">Property Value</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    value={inputs.propertyValue}
                    onChange={(e) => handleInputChange('propertyValue', parseFloat(e.target.value))}
                    placeholder="350000"
                    className={errors.propertyValue ? 'border-red-500' : ''}
                  />
                  {errors.propertyValue && <p className="text-red-500 text-sm">{errors.propertyValue}</p>}
                </div>

                <div>
                  <Label htmlFor="propertyAddress">Property Address</Label>
                  <Input
                    id="propertyAddress"
                    value={inputs.propertyAddress}
                    onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                    placeholder="123 Main St, Anytown, USA"
                    className={errors.propertyAddress ? 'border-red-500' : ''}
                  />
                  {errors.propertyAddress && <p className="text-red-500 text-sm">{errors.propertyAddress}</p>}
                </div>

                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select value={inputs.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                    <SelectTrigger className={errors.propertyType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single_family">Single Family</SelectItem>
                      <SelectItem value="multi_family">Multi-Family</SelectItem>
                      <SelectItem value="condo">Condominium</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                      <SelectItem value="agricultural">Agricultural</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.propertyType && <p className="text-red-500 text-sm">{errors.propertyType}</p>}
                </div>

                <div>
                  <Label htmlFor="propertySize">Property Size (sq ft)</Label>
                  <Input
                    id="propertySize"
                    type="number"
                    value={inputs.propertySize}
                    onChange={(e) => handleInputChange('propertySize', parseFloat(e.target.value))}
                    placeholder="2000"
                    className={errors.propertySize ? 'border-red-500' : ''}
                  />
                  {errors.propertySize && <p className="text-red-500 text-sm">{errors.propertySize}</p>}
                </div>

                <div>
                  <Label htmlFor="propertyAge">Property Age (years)</Label>
                  <Input
                    id="propertyAge"
                    type="number"
                    value={inputs.propertyAge}
                    onChange={(e) => handleInputChange('propertyAge', parseFloat(e.target.value))}
                    placeholder="15"
                    className={errors.propertyAge ? 'border-red-500' : ''}
                  />
                  {errors.propertyAge && <p className="text-red-500 text-sm">{errors.propertyAge}</p>}
                </div>

                <div>
                  <Label htmlFor="propertyUse">Property Use</Label>
                  <Select value={inputs.propertyUse} onValueChange={(value) => handleInputChange('propertyUse', value)}>
                    <SelectTrigger className={errors.propertyUse ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select property use" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary_residence">Primary Residence</SelectItem>
                      <SelectItem value="secondary_residence">Secondary Residence</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="vacant">Vacant</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.propertyUse && <p className="text-red-500 text-sm">{errors.propertyUse}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Tax Rates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tax Rates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="countyTaxRate">County Tax Rate (per $1000)</Label>
                  <Input
                    id="countyTaxRate"
                    type="number"
                    step="0.01"
                    value={inputs.countyTaxRate}
                    onChange={(e) => handleInputChange('countyTaxRate', parseFloat(e.target.value))}
                    placeholder="1.25"
                    className={errors.countyTaxRate ? 'border-red-500' : ''}
                  />
                  {errors.countyTaxRate && <p className="text-red-500 text-sm">{errors.countyTaxRate}</p>}
                </div>

                <div>
                  <Label htmlFor="cityTaxRate">City Tax Rate (per $1000)</Label>
                  <Input
                    id="cityTaxRate"
                    type="number"
                    step="0.01"
                    value={inputs.cityTaxRate}
                    onChange={(e) => handleInputChange('cityTaxRate', parseFloat(e.target.value))}
                    placeholder="0.75"
                    className={errors.cityTaxRate ? 'border-red-500' : ''}
                  />
                  {errors.cityTaxRate && <p className="text-red-500 text-sm">{errors.cityTaxRate}</p>}
                </div>

                <div>
                  <Label htmlFor="schoolTaxRate">School Tax Rate (per $1000)</Label>
                  <Input
                    id="schoolTaxRate"
                    type="number"
                    step="0.01"
                    value={inputs.schoolTaxRate}
                    onChange={(e) => handleInputChange('schoolTaxRate', parseFloat(e.target.value))}
                    placeholder="1.50"
                    className={errors.schoolTaxRate ? 'border-red-500' : ''}
                  />
                  {errors.schoolTaxRate && <p className="text-red-500 text-sm">{errors.schoolTaxRate}</p>}
                </div>

                <div>
                  <Label htmlFor="specialDistrictTaxRate">Special District Tax Rate (per $1000)</Label>
                  <Input
                    id="specialDistrictTaxRate"
                    type="number"
                    step="0.01"
                    value={inputs.specialDistrictTaxRate}
                    onChange={(e) => handleInputChange('specialDistrictTaxRate', parseFloat(e.target.value))}
                    placeholder="0.25"
                    className={errors.specialDistrictTaxRate ? 'border-red-500' : ''}
                  />
                  {errors.specialDistrictTaxRate && <p className="text-red-500 text-sm">{errors.specialDistrictTaxRate}</p>}
                </div>

                <div>
                  <Label htmlFor="assessmentRatio">Assessment Ratio (%)</Label>
                  <Input
                    id="assessmentRatio"
                    type="number"
                    step="0.1"
                    value={inputs.assessmentRatio}
                    onChange={(e) => handleInputChange('assessmentRatio', parseFloat(e.target.value))}
                    placeholder="100"
                    className={errors.assessmentRatio ? 'border-red-500' : ''}
                  />
                  {errors.assessmentRatio && <p className="text-red-500 text-sm">{errors.assessmentRatio}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Exemptions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exemptions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="homesteadExemption"
                    checked={inputs.homesteadExemption}
                    onCheckedChange={(checked) => handleInputChange('homesteadExemption', checked)}
                  />
                  <Label htmlFor="homesteadExemption">Homestead Exemption</Label>
                </div>
                {inputs.homesteadExemption && (
                  <div>
                    <Label htmlFor="homesteadExemptionAmount">Homestead Exemption Amount</Label>
                    <Input
                      id="homesteadExemptionAmount"
                      type="number"
                      value={inputs.homesteadExemptionAmount}
                      onChange={(e) => handleInputChange('homesteadExemptionAmount', parseFloat(e.target.value))}
                      placeholder="7000"
                      className={errors.homesteadExemptionAmount ? 'border-red-500' : ''}
                    />
                    {errors.homesteadExemptionAmount && <p className="text-red-500 text-sm">{errors.homesteadExemptionAmount}</p>}
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="seniorExemption"
                    checked={inputs.seniorExemption}
                    onCheckedChange={(checked) => handleInputChange('seniorExemption', checked)}
                  />
                  <Label htmlFor="seniorExemption">Senior Exemption</Label>
                </div>
                {inputs.seniorExemption && (
                  <div>
                    <Label htmlFor="seniorExemptionAmount">Senior Exemption Amount</Label>
                    <Input
                      id="seniorExemptionAmount"
                      type="number"
                      value={inputs.seniorExemptionAmount}
                      onChange={(e) => handleInputChange('seniorExemptionAmount', parseFloat(e.target.value))}
                      placeholder="5000"
                      className={errors.seniorExemptionAmount ? 'border-red-500' : ''}
                    />
                    {errors.seniorExemptionAmount && <p className="text-red-500 text-sm">{errors.seniorExemptionAmount}</p>}
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="veteranExemption"
                    checked={inputs.veteranExemption}
                    onCheckedChange={(checked) => handleInputChange('veteranExemption', checked)}
                  />
                  <Label htmlFor="veteranExemption">Veteran Exemption</Label>
                </div>
                {inputs.veteranExemption && (
                  <div>
                    <Label htmlFor="veteranExemptionAmount">Veteran Exemption Amount</Label>
                    <Input
                      id="veteranExemptionAmount"
                      type="number"
                      value={inputs.veteranExemptionAmount}
                      onChange={(e) => handleInputChange('veteranExemptionAmount', parseFloat(e.target.value))}
                      placeholder="4000"
                      className={errors.veteranExemptionAmount ? 'border-red-500' : ''}
                    />
                    {errors.veteranExemptionAmount && <p className="text-red-500 text-sm">{errors.veteranExemptionAmount}</p>}
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="disabilityExemption"
                    checked={inputs.disabilityExemption}
                    onCheckedChange={(checked) => handleInputChange('disabilityExemption', checked)}
                  />
                  <Label htmlFor="disabilityExemption">Disability Exemption</Label>
                </div>
                {inputs.disabilityExemption && (
                  <div>
                    <Label htmlFor="disabilityExemptionAmount">Disability Exemption Amount</Label>
                    <Input
                      id="disabilityExemptionAmount"
                      type="number"
                      value={inputs.disabilityExemptionAmount}
                      onChange={(e) => handleInputChange('disabilityExemptionAmount', parseFloat(e.target.value))}
                      placeholder="3000"
                      className={errors.disabilityExemptionAmount ? 'border-red-500' : ''}
                    />
                    {errors.disabilityExemptionAmount && <p className="text-red-500 text-sm">{errors.disabilityExemptionAmount}</p>}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleCalculate} 
              disabled={isCalculating}
              className="px-8 py-2"
            >
              {isCalculating ? 'Calculating...' : 'Calculate Property Tax'}
            </Button>
          </div>

          {errors.general && (
            <Alert className="border-red-500">
              <AlertDescription className="text-red-500">{errors.general}</AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Basic Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tax Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Annual Tax:</span>
                    <span className="font-bold">{formatCurrency(results.totalAnnualTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Tax:</span>
                    <span className="font-bold">{formatCurrency(results.totalMonthlyTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Effective Tax Rate:</span>
                    <span className="font-bold">{formatPercentage(results.effectiveTaxRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Tax Rate:</span>
                    <span className="font-bold">{results.totalTaxRate.toFixed(2)} per $1000</span>
                  </div>
                </CardContent>
              </Card>

              {/* Tax Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tax Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>County Tax:</span>
                    <span>{formatCurrency(results.countyTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>City Tax:</span>
                    <span>{formatCurrency(results.cityTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>School Tax:</span>
                    <span>{formatCurrency(results.schoolTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Special District:</span>
                    <span>{formatCurrency(results.specialDistrictTax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(results.totalAnnualTax)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Exemptions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Exemptions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Exemptions:</span>
                    <span className="font-bold">{formatCurrency(results.totalExemptions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exemption Savings:</span>
                    <span className="font-bold text-green-600">{formatCurrency(results.exemptionSavings)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exemption %:</span>
                    <span className="font-bold">{formatPercentage(results.exemptionPercentage)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxable Value:</span>
                    <span className="font-bold">{formatCurrency(results.taxableValue)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Annual:</span>
                    <span>{formatCurrency(results.paymentAmounts.annual)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Semi-Annual:</span>
                    <span>{formatCurrency(results.paymentAmounts.semiAnnual)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quarterly:</span>
                    <span>{formatCurrency(results.paymentAmounts.quarterly)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly:</span>
                    <span>{formatCurrency(results.paymentAmounts.monthly)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Assessment Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Assessment Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Assessment Ratio:</span>
                    <span>{formatPercentage(results.assessmentToMarketRatio)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assessment Change:</span>
                    <span className={results.assessmentChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatCurrency(results.assessmentChange)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Change %:</span>
                    <span className={results.assessmentChangePercentage >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatPercentage(results.assessmentChangePercentage)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Comparative Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Comparative Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>State Average:</span>
                    <span>{formatPercentage(results.stateAverageTaxRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>County Average:</span>
                    <span>{formatPercentage(results.countyAverageTaxRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>City Average:</span>
                    <span>{formatPercentage(results.cityAverageTaxRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Percentile Rank:</span>
                    <span>{results.comparisonPercentile.toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax Efficiency:</span>
                    <Badge variant={results.taxEfficiency === 'high' ? 'default' : results.taxEfficiency === 'medium' ? 'secondary' : 'destructive'}>
                      {results.taxEfficiency.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Analysis Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Tax Rating:</span>
                    <Badge variant={
                      results.analysis.taxRating === 'Low' ? 'default' : 
                      results.analysis.taxRating === 'Medium' ? 'secondary' : 
                      results.analysis.taxRating === 'High' ? 'destructive' : 'destructive'
                    }>
                      {results.analysis.taxRating}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Affordability:</span>
                    <Badge variant={
                      results.analysis.affordabilityRating === 'Excellent' ? 'default' : 
                      results.analysis.affordabilityRating === 'Good' ? 'secondary' : 
                      results.analysis.affordabilityRating === 'Fair' ? 'destructive' : 'destructive'
                    }>
                      {results.analysis.affordabilityRating}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Recommendation:</span>
                    <span className="font-bold">{results.analysis.recommendation}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Key Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {results.analysis.keyStrengths.map((strength, index) => (
                        <li key={index} className="text-sm">• {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Weaknesses</h4>
                    <ul className="space-y-1">
                      {results.analysis.keyWeaknesses.map((weakness, index) => (
                        <li key={index} className="text-sm">• {weakness}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Optimization Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Optimization Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Exemption Recommendations</h4>
                    <ul className="space-y-1">
                      {results.analysis.exemptionRecommendations.map((rec, index) => (
                        <li key={index} className="text-sm">• {rec}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Appeal Recommendations</h4>
                    <ul className="space-y-1">
                      {results.analysis.appealRecommendations.map((rec, index) => (
                        <li key={index} className="text-sm">• {rec}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {results.analysis.nextSteps.map((step, index) => (
                      <li key={index} className="text-sm flex items-start">
                        <span className="font-bold mr-2">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          {results && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tax Timeline Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Year</th>
                        <th className="text-left p-2">Assessed Value</th>
                        <th className="text-left p-2">Tax Amount</th>
                        <th className="text-left p-2">Tax Rate</th>
                        <th className="text-left p-2">Effective Rate</th>
                        <th className="text-left p-2">Cumulative Tax</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.timelineAnalysis.slice(0, 10).map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-2">{item.year}</td>
                          <td className="p-2">{formatCurrency(item.assessedValue)}</td>
                          <td className="p-2">{formatCurrency(item.taxAmount)}</td>
                          <td className="p-2">{item.taxRate.toFixed(2)} per $1000</td>
                          <td className="p-2">{formatPercentage(item.effectiveRate)}</td>
                          <td className="p-2">{formatCurrency(item.cumulativeTax)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}