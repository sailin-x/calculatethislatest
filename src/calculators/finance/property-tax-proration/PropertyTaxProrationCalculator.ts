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
import { PropertyTaxProrationInputs, PropertyTaxProrationOutputs } from './types';
import { calculatePropertyTaxProration } from './formulas';
import { validatePropertyTaxProrationInputs } from './validation';
import { validateField } from './quickValidation';

interface PropertyTaxProrationCalculatorProps {
  onCalculate?: (results: PropertyTaxProrationOutputs) => void;
  initialInputs?: Partial<PropertyTaxProrationInputs>;
}

export function PropertyTaxProrationCalculator({ onCalculate, initialInputs }: PropertyTaxProrationCalculatorProps) {
  const [inputs, setInputs] = useState<PropertyTaxProrationInputs>({
    // Property Information
    propertyValue: 500000,
    propertyAddress: '123 Main St, Anytown, CA 90210',
    propertyType: 'single_family',
    propertySize: 2500,
    propertyAge: 15,
    propertyUse: 'primary_residence',
    propertyCondition: 'good',
    
    // Location Information
    state: 'CA',
    county: 'Los Angeles',
    city: 'Anytown',
    zipCode: '90210',
    schoolDistrict: 'Anytown Unified',
    
    // Tax Rates and Assessments
    countyTaxRate: 1.25,
    cityTaxRate: 0.5,
    schoolTaxRate: 1.0,
    specialDistrictTaxRate: 0.25,
    assessmentRatio: 100,
    
    // Exemptions
    homesteadExemption: true,
    homesteadExemptionAmount: 7000,
    seniorExemption: false,
    seniorExemptionAmount: 0,
    veteranExemption: false,
    veteranExemptionAmount: 0,
    disabilityExemption: false,
    disabilityExemptionAmount: 0,
    
    // Assessment Information
    assessedValue: 500000,
    previousAssessedValue: 480000,
    assessmentDate: '2024-01-01',
    lastReassessmentDate: '2020-01-01',
    reassessmentCycle: 4,
    
    // Proration Specific Information
    closingDate: '2024-06-15',
    taxYear: 2024,
    prorationMethod: '365_day',
    sellerOccupiedUntil: '2024-06-14',
    buyerOccupiedFrom: '2024-06-15',
    taxPaymentSchedule: 'annual',
    lastTaxPaymentDate: '2024-01-01',
    nextTaxPaymentDate: '2025-01-01',
    lastTaxPaymentAmount: 15000,
    nextTaxPaymentAmount: 15000,
    
    // Escrow Information
    escrowAccount: true,
    escrowMonthlyPayment: 500,
    escrowBalance: 2000,
    escrowProrationMethod: 'split_50_50',
    customEscrowSplit: 50,
    
    // Additional Taxes and Fees
    specialAssessments: [],
    improvementAssessments: [],
    bondAssessments: [],
    
    // Market and Economic Factors
    marketAppreciationRate: 3.5,
    inflationRate: 2.5,
    localEconomicGrowth: 2.0,
    propertyTaxCap: 2.0,
    
    // Historical Data
    previousYearTax: 15000,
    fiveYearAverageTax: 14500,
    tenYearAverageTax: 14000,
    taxHistory: [
      { year: 2023, assessedValue: 480000, taxAmount: 15000, taxRate: 3.125, paymentDate: '2023-01-01' },
      { year: 2022, assessedValue: 460000, taxAmount: 14375, taxRate: 3.125, paymentDate: '2022-01-01' },
      { year: 2021, assessedValue: 440000, taxAmount: 13750, taxRate: 3.125, paymentDate: '2021-01-01' }
    ],
    
    // Proration Analysis Parameters
    includeInflation: true,
    includeAppreciation: true,
    includeExemptions: true,
    includeSpecialAssessments: true,
    prorationAccuracy: 'exact',
    
    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    includeComparisons: true,
    includeTimeline: true,
    ...initialInputs
  });

  const [results, setResults] = useState<PropertyTaxProrationOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Auto-calculate assessed value when property value changes
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

  const handleInputChange = (field: keyof PropertyTaxProrationInputs, value: any) => {
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
      setErrors(prev => ({ ...prev, [field]: validation.error || 'Invalid value' }));
    }
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    setErrors({});

    try {
      // Validate all inputs
      const validation = validatePropertyTaxProrationInputs(inputs);
      if (!validation.isValid) {
        setErrors(validation.errors || {});
        return;
      }

      // Calculate results
      const calculatedResults = calculatePropertyTaxProration(inputs);
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
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Property Tax Proration Calculator</span>
            <Badge variant="secondary">Real Estate</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6">
              {/* Property Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Property Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyValue">Property Value</Label>
                    <Input
                      id="propertyValue"
                      type="number"
                      value={inputs.propertyValue}
                      onChange={(e) => handleInputChange('propertyValue', parseFloat(e.target.value))}
                      placeholder="500000"
                    />
                    {errors.propertyValue && <p className="text-sm text-red-500">{errors.propertyValue}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyAddress">Property Address</Label>
                    <Input
                      id="propertyAddress"
                      value={inputs.propertyAddress}
                      onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                      placeholder="123 Main St, Anytown, CA 90210"
                    />
                    {errors.propertyAddress && <p className="text-sm text-red-500">{errors.propertyAddress}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select value={inputs.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single_family">Single Family Home</SelectItem>
                        <SelectItem value="multi_family">Multi-Family</SelectItem>
                        <SelectItem value="condo">Condominium</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="agricultural">Agricultural</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.propertyType && <p className="text-sm text-red-500">{errors.propertyType}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertySize">Property Size (sq ft)</Label>
                    <Input
                      id="propertySize"
                      type="number"
                      value={inputs.propertySize}
                      onChange={(e) => handleInputChange('propertySize', parseFloat(e.target.value))}
                      placeholder="2500"
                    />
                    {errors.propertySize && <p className="text-sm text-red-500">{errors.propertySize}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Proration Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Proration Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="closingDate">Closing Date</Label>
                    <Input
                      id="closingDate"
                      type="date"
                      value={inputs.closingDate}
                      onChange={(e) => handleInputChange('closingDate', e.target.value)}
                    />
                    {errors.closingDate && <p className="text-sm text-red-500">{errors.closingDate}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prorationMethod">Proration Method</Label>
                    <Select value={inputs.prorationMethod} onValueChange={(value) => handleInputChange('prorationMethod', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="365_day">365 Day Year</SelectItem>
                        <SelectItem value="360_day">360 Day Year</SelectItem>
                        <SelectItem value="actual_days">Actual Days</SelectItem>
                        <SelectItem value="banker_30_360">Banker's 30/360</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.prorationMethod && <p className="text-sm text-red-500">{errors.prorationMethod}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sellerOccupiedUntil">Seller Occupied Until</Label>
                    <Input
                      id="sellerOccupiedUntil"
                      type="date"
                      value={inputs.sellerOccupiedUntil}
                      onChange={(e) => handleInputChange('sellerOccupiedUntil', e.target.value)}
                    />
                    {errors.sellerOccupiedUntil && <p className="text-sm text-red-500">{errors.sellerOccupiedUntil}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buyerOccupiedFrom">Buyer Occupied From</Label>
                    <Input
                      id="buyerOccupiedFrom"
                      type="date"
                      value={inputs.buyerOccupiedFrom}
                      onChange={(e) => handleInputChange('buyerOccupiedFrom', e.target.value)}
                    />
                    {errors.buyerOccupiedFrom && <p className="text-sm text-red-500">{errors.buyerOccupiedFrom}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Tax Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Tax Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="countyTaxRate">County Tax Rate (per $1000)</Label>
                    <Input
                      id="countyTaxRate"
                      type="number"
                      step="0.01"
                      value={inputs.countyTaxRate}
                      onChange={(e) => handleInputChange('countyTaxRate', parseFloat(e.target.value))}
                      placeholder="1.25"
                    />
                    {errors.countyTaxRate && <p className="text-sm text-red-500">{errors.countyTaxRate}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cityTaxRate">City Tax Rate (per $1000)</Label>
                    <Input
                      id="cityTaxRate"
                      type="number"
                      step="0.01"
                      value={inputs.cityTaxRate}
                      onChange={(e) => handleInputChange('cityTaxRate', parseFloat(e.target.value))}
                      placeholder="0.5"
                    />
                    {errors.cityTaxRate && <p className="text-sm text-red-500">{errors.cityTaxRate}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolTaxRate">School Tax Rate (per $1000)</Label>
                    <Input
                      id="schoolTaxRate"
                      type="number"
                      step="0.01"
                      value={inputs.schoolTaxRate}
                      onChange={(e) => handleInputChange('schoolTaxRate', parseFloat(e.target.value))}
                      placeholder="1.0"
                    />
                    {errors.schoolTaxRate && <p className="text-sm text-red-500">{errors.schoolTaxRate}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assessedValue">Assessed Value</Label>
                    <Input
                      id="assessedValue"
                      type="number"
                      value={inputs.assessedValue}
                      onChange={(e) => handleInputChange('assessedValue', parseFloat(e.target.value))}
                      placeholder="500000"
                    />
                    {errors.assessedValue && <p className="text-sm text-red-500">{errors.assessedValue}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Exemptions */}
              <Card>
                <CardHeader>
                  <CardTitle>Exemptions</CardTitle>
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
                    <div className="space-y-2">
                      <Label htmlFor="homesteadExemptionAmount">Homestead Exemption Amount</Label>
                      <Input
                        id="homesteadExemptionAmount"
                        type="number"
                        value={inputs.homesteadExemptionAmount}
                        onChange={(e) => handleInputChange('homesteadExemptionAmount', parseFloat(e.target.value))}
                        placeholder="7000"
                      />
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
                    <div className="space-y-2">
                      <Label htmlFor="seniorExemptionAmount">Senior Exemption Amount</Label>
                      <Input
                        id="seniorExemptionAmount"
                        type="number"
                        value={inputs.seniorExemptionAmount}
                        onChange={(e) => handleInputChange('seniorExemptionAmount', parseFloat(e.target.value))}
                        placeholder="0"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button onClick={handleCalculate} disabled={isCalculating} className="w-full">
                {isCalculating ? 'Calculating...' : 'Calculate Proration'}
              </Button>

              {errors.general && (
                <Alert>
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {results ? (
                <>
                  {/* Proration Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Proration Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Seller Credit</p>
                          <p className="text-2xl font-bold text-green-600">{formatCurrency(results.sellerTaxCredit)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Buyer Debit</p>
                          <p className="text-2xl font-bold text-red-600">{formatCurrency(results.buyerTaxDebit)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Net Amount</p>
                          <p className="text-2xl font-bold">{formatCurrency(results.prorationBalance)}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Seller Days</p>
                          <p className="text-lg font-semibold">{results.sellerDays} days ({formatPercentage(results.sellerPercentage)})</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Buyer Days</p>
                          <p className="text-lg font-semibold">{results.buyerDays} days ({formatPercentage(results.buyerPercentage)})</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tax Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Tax Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">County Tax</p>
                          <p className="text-lg font-semibold">{formatCurrency(results.countyTax)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">City Tax</p>
                          <p className="text-lg font-semibold">{formatCurrency(results.cityTax)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">School Tax</p>
                          <p className="text-lg font-semibold">{formatCurrency(results.schoolTax)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Special District Tax</p>
                          <p className="text-lg font-semibold">{formatCurrency(results.specialDistrictTax)}</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm text-muted-foreground">Total Annual Tax</p>
                        <p className="text-2xl font-bold">{formatCurrency(results.totalAnnualTax)}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Settlement Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Settlement Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Credits</p>
                          <p className="text-lg font-semibold text-green-600">{formatCurrency(results.settlementSummary.totalCredits)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Debits</p>
                          <p className="text-lg font-semibold text-red-600">{formatCurrency(results.settlementSummary.totalDebits)}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Net Amount Due</p>
                        <p className="text-2xl font-bold">{formatCurrency(results.settlementSummary.netAmount)}</p>
                        <p className="text-sm text-muted-foreground">Responsible Party: {results.settlementSummary.responsibleParty}</p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">Calculate proration to see results</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {results ? (
                <>
                  {/* Analysis Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Analysis Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <Badge variant={results.analysis.prorationRating === 'Excellent' ? 'default' : 'secondary'}>
                            {results.analysis.prorationRating}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-2">Proration Rating</p>
                        </div>
                        <div className="text-center">
                          <Badge variant={results.analysis.accuracyRating === 'High' ? 'default' : 'secondary'}>
                            {results.analysis.accuracyRating}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-2">Accuracy Rating</p>
                        </div>
                        <div className="text-center">
                          <Badge variant={results.analysis.fairnessRating === 'Very Fair' ? 'default' : 'secondary'}>
                            {results.analysis.fairnessRating}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-2">Fairness Rating</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm text-muted-foreground">Recommendation</p>
                        <p className="text-lg font-semibold">{results.analysis.recommendation}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Points */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Points</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-green-600">Strengths</p>
                        <ul className="text-sm space-y-1 mt-2">
                          {results.analysis.keyStrengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-green-500">✓</span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm font-semibold text-red-600">Weaknesses</p>
                        <ul className="text-sm space-y-1 mt-2">
                          {results.analysis.keyWeaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-red-500">✗</span>
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Assessment */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold">Proration Risks</p>
                        <ul className="text-sm space-y-1 mt-2">
                          {results.analysis.prorationRisks.map((risk, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-orange-500">⚠</span>
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm font-semibold">Mitigation Strategies</p>
                        <ul className="text-sm space-y-1 mt-2">
                          {results.analysis.mitigationStrategies.map((strategy, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-500">→</span>
                              {strategy}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">Calculate proration to see analysis</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              {results ? (
                <>
                  {/* Proration Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Proration Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {results.prorationTimeline.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-semibold">{entry.event}</p>
                            <p className="text-sm text-muted-foreground">{entry.date}</p>
                            <p className="text-sm">{entry.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-green-600">Seller: {formatCurrency(entry.sellerAmount)}</p>
                            <p className="text-sm text-red-600">Buyer: {formatCurrency(entry.buyerAmount)}</p>
                            <p className="text-sm font-semibold">Balance: {formatCurrency(entry.runningBalance)}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Payment Schedule */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Schedule</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {results.paymentSchedule.map((payment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-semibold">{payment.date}</p>
                            <p className="text-sm text-muted-foreground">Status: {payment.status}</p>
                            <p className="text-sm">Responsible: {payment.responsibleParty}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold">{formatCurrency(payment.amount)}</p>
                            <p className="text-sm text-green-600">Seller: {formatCurrency(payment.sellerShare)}</p>
                            <p className="text-sm text-red-600">Buyer: {formatCurrency(payment.buyerShare)}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">Calculate proration to see timeline</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}