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
import { RealEstateDepreciationScheduleInputs, RealEstateDepreciationScheduleOutputs } from './types';
import { calculateRealEstateDepreciationSchedule } from './formulas';
import { validateRealEstateDepreciationScheduleInputs } from './validation';
import { validateField } from './quickValidation';

interface RealEstateDepreciationScheduleCalculatorProps {
  onCalculate?: (results: RealEstateDepreciationScheduleOutputs) => void;
  initialInputs?: Partial<RealEstateDepreciationScheduleInputs>;
}

export function RealEstateDepreciationScheduleCalculator({ 
  onCalculate, 
  initialInputs 
}: RealEstateDepreciationScheduleCalculatorProps) {
  const [inputs, setInputs] = useState<RealEstateDepreciationScheduleInputs>({
    // Property Information
    propertyName: '',
    propertyType: 'residential',
    propertyAddress: '',
    acquisitionDate: '',
    placedInServiceDate: '',
    totalCost: 500000,
    landValue: 100000,
    buildingValue: 350000,
    improvementsValue: 50000,
    personalPropertyValue: 0,
    
    // Depreciation Method
    depreciationMethod: 'straight-line',
    recoveryPeriod: 27.5,
    convention: 'mid-month',
    salvageValue: 0,
    salvageValuePercentage: 0,
    
    // Cost Segregation Details
    costSegregationStudy: false,
    costSegregationStudyDate: '',
    costSegregationStudyCost: 0,
    segregatedComponents: [],
    
    // Bonus Depreciation
    bonusDepreciationEligible: false,
    bonusDepreciationPercentage: 100,
    bonusDepreciationYear: new Date().getFullYear(),
    
    // Section 179
    section179Eligible: false,
    section179Deduction: 0,
    section179Year: new Date().getFullYear(),
    
    // Property Improvements
    improvements: [],
    renovations: [],
    additions: [],
    
    // Disposition Information
    dispositionDate: '',
    dispositionType: 'sale',
    dispositionAmount: 0,
    adjustedBasis: 0,
    
    // Tax Information
    taxYear: new Date().getFullYear(),
    taxRate: 24,
    stateTaxRate: 5,
    localTaxRate: 2,
    
    // Alternative Minimum Tax
    amtEligible: false,
    amtAdjustments: 0,
    
    // Passive Activity
    passiveActivity: false,
    materialParticipation: false,
    realEstateProfessional: false,
    
    // Reporting Preferences
    reportFormat: 'detailed',
    includeCharts: true,
    includeCalculations: true,
    includeTaxImpact: true,
    currency: 'USD',
    displayFormat: 'currency',
    ...initialInputs
  });

  const [results, setResults] = useState<RealEstateDepreciationScheduleOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Auto-calculate cross-field validations
  useEffect(() => {
    const newErrors = { ...errors };
    
    // Auto-calculate salvage value if percentage is provided
    if (inputs.salvageValuePercentage > 0 && inputs.totalCost > 0) {
      const calculatedSalvage = (inputs.totalCost * inputs.salvageValuePercentage) / 100;
      if (Math.abs(calculatedSalvage - inputs.salvageValue) > 1) {
        setInputs(prev => ({ ...prev, salvageValue: calculatedSalvage }));
      }
    }
    
    // Auto-calculate adjusted basis if disposition is provided
    if (inputs.dispositionDate && inputs.totalCost > 0) {
      const currentYear = new Date().getFullYear();
      const acquisitionYear = new Date(inputs.acquisitionDate).getFullYear();
      const yearsDepreciated = currentYear - acquisitionYear;
      const annualDepreciation = (inputs.totalCost - inputs.landValue) / inputs.recoveryPeriod;
      const calculatedAdjustedBasis = inputs.totalCost - (annualDepreciation * yearsDepreciated);
      if (Math.abs(calculatedAdjustedBasis - inputs.adjustedBasis) > 100) {
        setInputs(prev => ({ ...prev, adjustedBasis: calculatedAdjustedBasis }));
      }
    }
    
    // Validate loan amount vs total cost
    if (inputs.totalCost > 0 && inputs.buildingValue + inputs.improvementsValue + inputs.personalPropertyValue > inputs.totalCost - inputs.landValue) {
      newErrors.buildingValue = 'Building + Improvements + Personal Property cannot exceed Total Cost - Land Value';
    } else {
      delete newErrors.buildingValue;
    }
    
    setErrors(newErrors);
  }, [inputs.totalCost, inputs.landValue, inputs.buildingValue, inputs.improvementsValue, inputs.personalPropertyValue, inputs.salvageValuePercentage, inputs.dispositionDate, inputs.acquisitionDate, inputs.recoveryPeriod]);

  const handleInputChange = (field: keyof RealEstateDepreciationScheduleInputs, value: any) => {
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
      const validation = validateRealEstateDepreciationScheduleInputs(inputs);
      if (!validation.isValid) {
        setErrors(validation.errors || {});
        return;
      }

      const calculatedResults = calculateRealEstateDepreciationSchedule(inputs);
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

  const getDepreciationMethodColor = (method: string) => {
    switch (method) {
      case 'straight-line': return 'bg-blue-100 text-blue-800';
      case 'accelerated': return 'bg-green-100 text-green-800';
      case 'bonus': return 'bg-purple-100 text-purple-800';
      case 'cost-segregation': return 'bg-orange-100 text-orange-800';
      case 'section-179': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPropertyTypeColor = (type: string) => {
    switch (type) {
      case 'residential': return 'bg-blue-100 text-blue-800';
      case 'commercial': return 'bg-green-100 text-green-800';
      case 'mixed-use': return 'bg-purple-100 text-purple-800';
      case 'industrial': return 'bg-orange-100 text-orange-800';
      case 'retail': return 'bg-pink-100 text-pink-800';
      case 'office': return 'bg-indigo-100 text-indigo-800';
      case 'hotel': return 'bg-yellow-100 text-yellow-800';
      case 'multifamily': return 'bg-teal-100 text-teal-800';
      case 'single-family': return 'bg-cyan-100 text-cyan-800';
      case 'land-development': return 'bg-lime-100 text-lime-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Real Estate Depreciation Schedule Calculator</span>
            <Badge variant="secondary">Depreciation</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="tax-impact">Tax Impact</TabsTrigger>
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
                      <Label htmlFor="propertyName">Property Name</Label>
                      <Input
                        id="propertyName"
                        value={inputs.propertyName}
                        onChange={(e) => handleInputChange('propertyName', e.target.value)}
                        placeholder="Enter property name"
                      />
                      {errors.propertyName && <p className="text-red-500 text-sm">{errors.propertyName}</p>}
                    </div>

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
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="hotel">Hotel</SelectItem>
                          <SelectItem value="multifamily">Multifamily</SelectItem>
                          <SelectItem value="single-family">Single-Family</SelectItem>
                          <SelectItem value="land-development">Land Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="propertyAddress">Property Address</Label>
                      <Input
                        id="propertyAddress"
                        value={inputs.propertyAddress}
                        onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                        placeholder="Enter property address"
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
                  </CardContent>
                </Card>

                {/* Property Values */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Property Values</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="totalCost">Total Cost</Label>
                      <Input
                        id="totalCost"
                        type="number"
                        value={inputs.totalCost}
                        onChange={(e) => handleInputChange('totalCost', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="landValue">Land Value</Label>
                      <Input
                        id="landValue"
                        type="number"
                        value={inputs.landValue}
                        onChange={(e) => handleInputChange('landValue', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="buildingValue">Building Value</Label>
                      <Input
                        id="buildingValue"
                        type="number"
                        value={inputs.buildingValue}
                        onChange={(e) => handleInputChange('buildingValue', parseFloat(e.target.value) || 0)}
                        placeholder="0"
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
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="personalPropertyValue">Personal Property Value</Label>
                      <Input
                        id="personalPropertyValue"
                        type="number"
                        value={inputs.personalPropertyValue}
                        onChange={(e) => handleInputChange('personalPropertyValue', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Depreciation Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Depreciation Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="depreciationMethod">Depreciation Method</Label>
                      <Select value={inputs.depreciationMethod} onValueChange={(value) => handleInputChange('depreciationMethod', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="straight-line">Straight-Line</SelectItem>
                          <SelectItem value="accelerated">Accelerated</SelectItem>
                          <SelectItem value="bonus">Bonus Depreciation</SelectItem>
                          <SelectItem value="cost-segregation">Cost Segregation</SelectItem>
                          <SelectItem value="section-179">Section 179</SelectItem>
                          <SelectItem value="bonus-depreciation">Bonus Depreciation</SelectItem>
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

                    <div>
                      <Label htmlFor="convention">Convention</Label>
                      <Select value={inputs.convention} onValueChange={(value) => handleInputChange('convention', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mid-month">Mid-Month</SelectItem>
                          <SelectItem value="mid-quarter">Mid-Quarter</SelectItem>
                          <SelectItem value="half-year">Half-Year</SelectItem>
                          <SelectItem value="full-year">Full-Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="salvageValue">Salvage Value</Label>
                      <Input
                        id="salvageValue"
                        type="number"
                        value={inputs.salvageValue}
                        onChange={(e) => handleInputChange('salvageValue', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="salvageValuePercentage">Salvage Value (%)</Label>
                      <Input
                        id="salvageValuePercentage"
                        type="number"
                        value={inputs.salvageValuePercentage}
                        onChange={(e) => handleInputChange('salvageValuePercentage', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Tax Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tax Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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

                    <div>
                      <Label htmlFor="taxRate">Federal Tax Rate (%)</Label>
                      <Input
                        id="taxRate"
                        type="number"
                        value={inputs.taxRate}
                        onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value) || 0)}
                        placeholder="24"
                      />
                    </div>

                    <div>
                      <Label htmlFor="stateTaxRate">State Tax Rate (%)</Label>
                      <Input
                        id="stateTaxRate"
                        type="number"
                        value={inputs.stateTaxRate}
                        onChange={(e) => handleInputChange('stateTaxRate', parseFloat(e.target.value) || 0)}
                        placeholder="5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="localTaxRate">Local Tax Rate (%)</Label>
                      <Input
                        id="localTaxRate"
                        type="number"
                        value={inputs.localTaxRate}
                        onChange={(e) => handleInputChange('localTaxRate', parseFloat(e.target.value) || 0)}
                        placeholder="2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Advanced Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Advanced Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="costSegregationStudy"
                        checked={inputs.costSegregationStudy}
                        onCheckedChange={(checked) => handleInputChange('costSegregationStudy', checked)}
                      />
                      <Label htmlFor="costSegregationStudy">Cost Segregation Study</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bonusDepreciationEligible"
                        checked={inputs.bonusDepreciationEligible}
                        onCheckedChange={(checked) => handleInputChange('bonusDepreciationEligible', checked)}
                      />
                      <Label htmlFor="bonusDepreciationEligible">Bonus Depreciation Eligible</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="section179Eligible"
                        checked={inputs.section179Eligible}
                        onCheckedChange={(checked) => handleInputChange('section179Eligible', checked)}
                      />
                      <Label htmlFor="section179Eligible">Section 179 Eligible</Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="amtEligible"
                        checked={inputs.amtEligible}
                        onCheckedChange={(checked) => handleInputChange('amtEligible', checked)}
                      />
                      <Label htmlFor="amtEligible">Alternative Minimum Tax</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="passiveActivity"
                        checked={inputs.passiveActivity}
                        onCheckedChange={(checked) => handleInputChange('passiveActivity', checked)}
                      />
                      <Label htmlFor="passiveActivity">Passive Activity</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="realEstateProfessional"
                        checked={inputs.realEstateProfessional}
                        onCheckedChange={(checked) => handleInputChange('realEstateProfessional', checked)}
                      />
                      <Label htmlFor="realEstateProfessional">Real Estate Professional</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button 
                  onClick={handleCalculate} 
                  disabled={isCalculating || Object.keys(errors).length > 0}
                  className="w-full max-w-md"
                >
                  {isCalculating ? 'Calculating...' : 'Calculate Depreciation Schedule'}
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
                  {/* Key Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatCurrency(results.metrics.totalDepreciableBasis)}
                          </div>
                          <div className="text-sm text-gray-600">Total Depreciable Basis</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(results.metrics.totalDepreciationTaken)}
                          </div>
                          <div className="text-sm text-gray-600">Total Depreciation</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {formatCurrency(results.metrics.remainingBasis)}
                          </div>
                          <div className="text-sm text-gray-600">Remaining Basis</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            {formatCurrency(results.metrics.currentYearDepreciation)}
                          </div>
                          <div className="text-sm text-gray-600">Current Year Depreciation</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tax Impact */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tax Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            {formatCurrency(results.metrics.taxSavings)}
                          </div>
                          <div className="text-sm text-gray-600">Tax Savings</div>
                        </div>
                        <div className="text-center p-4 bg-indigo-50 rounded-lg">
                          <div className="text-2xl font-bold text-indigo-600">
                            {formatPercentage(results.metrics.effectiveTaxRate)}
                          </div>
                          <div className="text-sm text-gray-600">Effective Tax Rate</div>
                        </div>
                        <div className="text-center p-4 bg-teal-50 rounded-lg">
                          <div className="text-2xl font-bold text-teal-600">
                            {formatCurrency(results.metrics.cashFlowImpact)}
                          </div>
                          <div className="text-sm text-gray-600">Cash Flow Impact</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recovery Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recovery Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">
                            {formatPercentage(results.metrics.recoveryPercentage)}
                          </div>
                          <div className="text-sm text-gray-600">Recovery Percentage</div>
                        </div>
                        <div className="text-center p-4 bg-pink-50 rounded-lg">
                          <div className="text-2xl font-bold text-pink-600">
                            {results.metrics.yearsRemaining}
                          </div>
                          <div className="text-sm text-gray-600">Years Remaining</div>
                        </div>
                        <div className="text-center p-4 bg-lime-50 rounded-lg">
                          <div className="text-2xl font-bold text-lime-600">
                            {formatCurrency(results.metrics.annualDepreciation)}
                          </div>
                          <div className="text-sm text-gray-600">Annual Depreciation</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see the depreciation schedule.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Depreciation Schedule Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Depreciation Schedule Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="font-semibold">Property Name</Label>
                            <p>{results.depreciationSchedule.propertyName}</p>
                          </div>
                          <div>
                            <Label className="font-semibold">Property Type</Label>
                            <Badge className={getPropertyTypeColor(results.depreciationSchedule.propertyType)}>
                              {results.depreciationSchedule.propertyType}
                            </Badge>
                          </div>
                          <div>
                            <Label className="font-semibold">Total Cost</Label>
                            <p>{formatCurrency(results.depreciationSchedule.totalCost)}</p>
                          </div>
                          <div>
                            <Label className="font-semibold">Depreciable Basis</Label>
                            <p>{formatCurrency(results.depreciationSchedule.depreciableBasis)}</p>
                          </div>
                          <div>
                            <Label className="font-semibold">Recovery Period</Label>
                            <p>{results.depreciationSchedule.recoveryPeriod} years</p>
                          </div>
                          <div>
                            <Label className="font-semibold">Depreciation Method</Label>
                            <Badge className={getDepreciationMethodColor(results.depreciationSchedule.depreciationMethod)}>
                              {results.depreciationSchedule.depreciationMethod}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Annual Depreciation Schedule */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Annual Depreciation Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Beginning Basis</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Depreciation Rate</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Depreciation Amount</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Ending Basis</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Accumulated Depreciation</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Tax Savings</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.depreciationSchedule.years.slice(0, 10).map((year, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="border border-gray-300 px-4 py-2">{year.year}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(year.beginningBasis)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatPercentage(year.depreciationRate)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(year.depreciationAmount)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(year.endingBasis)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(year.accumulatedDepreciation)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(year.taxSavings)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {results.depreciationSchedule.years.length > 10 && (
                          <p className="text-sm text-gray-600 mt-2">
                            Showing first 10 years of {results.depreciationSchedule.years.length} total years
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see the analysis.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Strategy Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Depreciation Strategy Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Strategy Type:</span>
                          <Badge className={getDepreciationMethodColor(results.analysis.depreciationStrategy)}>
                            {results.analysis.depreciationStrategy}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Strategy Score:</span>
                          <div className="flex items-center gap-2">
                            <Progress value={results.analysis.strategyScore} className="w-32" />
                            <span>{results.analysis.strategyScore}/100</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Benefits */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {results.analysis.keyBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Key Risks */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Risks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {results.analysis.keyRisks.map((risk, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">⚠</span>
                            <span>{risk}</span>
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
                            <span className="text-blue-500 mt-1">→</span>
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Cost Segregation Analysis */}
                  {results.costSegregationAnalysis && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Cost Segregation Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">Eligible:</span>
                            <Badge variant={results.costSegregationAnalysis.eligible ? "default" : "secondary"}>
                              {results.costSegregationAnalysis.eligible ? "Yes" : "No"}
                            </Badge>
                          </div>
                          {results.costSegregationAnalysis.eligible && (
                            <>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label className="font-semibold">Potential Savings</Label>
                                  <p className="text-green-600 font-bold">{formatCurrency(results.costSegregationAnalysis.potentialSavings)}</p>
                                </div>
                                <div>
                                  <Label className="font-semibold">Study Cost</Label>
                                  <p className="text-red-600 font-bold">{formatCurrency(results.costSegregationAnalysis.studyCost)}</p>
                                </div>
                                <div>
                                  <Label className="font-semibold">Net Benefit</Label>
                                  <p className="text-blue-600 font-bold">{formatCurrency(results.costSegregationAnalysis.netBenefit)}</p>
                                </div>
                                <div>
                                  <Label className="font-semibold">Payback Period</Label>
                                  <p>{results.costSegregationAnalysis.paybackPeriod} years</p>
                                </div>
                              </div>
                              <div>
                                <Label className="font-semibold">Analysis</Label>
                                <p className="text-sm text-gray-600">{results.costSegregationAnalysis.analysis}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="tax-impact" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see the tax impact analysis.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Tax Impact Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tax Impact Summary</CardTitle>
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
                            {formatPercentage(results.metrics.effectiveTaxRate)}
                          </div>
                          <div className="text-sm text-gray-600">Effective Tax Rate</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {formatCurrency(results.metrics.netTaxBenefit)}
                          </div>
                          <div className="text-sm text-gray-600">Net Tax Benefit</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            {formatCurrency(results.metrics.cashFlowImpact)}
                          </div>
                          <div className="text-sm text-gray-600">Cash Flow Impact</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Annual Tax Impact */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Annual Tax Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Depreciation Deduction</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Tax Savings</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Effective Tax Rate</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Marginal Tax Rate</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Net Tax Benefit</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Cash Flow Impact</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.taxImpacts.slice(0, 10).map((impact, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="border border-gray-300 px-4 py-2">{impact.year}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(impact.depreciationDeduction)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(impact.taxSavings)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatPercentage(impact.effectiveTaxRate)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatPercentage(impact.marginalTaxRate)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(impact.netTaxBenefit)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(impact.cashFlowImpact)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {results.taxImpacts.length > 10 && (
                          <p className="text-sm text-gray-600 mt-2">
                            Showing first 10 years of {results.taxImpacts.length} total years
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tax Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tax Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label className="font-semibold">Tax Analysis</Label>
                          <p className="text-sm text-gray-600">{results.analysis.taxAnalysis}</p>
                        </div>
                        <div>
                          <Label className="font-semibold">Cash Flow Analysis</Label>
                          <p className="text-sm text-gray-600">{results.analysis.cashFlowAnalysis}</p>
                        </div>
                        <div>
                          <Label className="font-semibold">ROI Analysis</Label>
                          <p className="text-sm text-gray-600">{results.analysis.roiAnalysis}</p>
                        </div>
                        <div>
                          <Label className="font-semibold">Risk Analysis</Label>
                          <p className="text-sm text-gray-600">{results.analysis.riskAnalysis}</p>
                        </div>
                      </div>
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