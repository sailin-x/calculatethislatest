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
import { NetOperatingIncomeInputs, NetOperatingIncomeOutputs } from './types';
import { calculateNetOperatingIncome } from './formulas';
import { validateNetOperatingIncomeInputs } from './validation';
import { validateField } from './quickValidation';

interface NetOperatingIncomeCalculatorProps {
  onCalculate?: (results: NetOperatingIncomeOutputs) => void;
  initialInputs?: Partial<NetOperatingIncomeInputs>;
}

export function NetOperatingIncomeCalculator({ onCalculate, initialInputs }: NetOperatingIncomeCalculatorProps) {
  const [inputs, setInputs] = useState<NetOperatingIncomeInputs>({
    // Property Information
    propertyValue: 1000000,
    propertyAddress: '',
    propertyType: 'commercial',
    propertySize: 10000,
    propertyAge: 15,
    propertyClass: 'class_b',
    propertyCondition: 'good',
    
    // Income Information
    grossRentalIncome: 120000,
    otherIncome: 5000,
    vacancyRate: 5,
    creditLossRate: 2,
    lateFeeIncome: 1000,
    parkingIncome: 3000,
    storageIncome: 2000,
    laundryIncome: 1500,
    vendingIncome: 800,
    advertisingIncome: 500,
    utilityReimbursement: 2000,
    petFees: 1200,
    applicationFees: 800,
    leaseTerminationFees: 500,
    otherMiscellaneousIncome: 1000,
    
    // Operating Expenses
    propertyManagementFees: 6000,
    propertyTaxes: 15000,
    propertyInsurance: 8000,
    utilities: 12000,
    maintenanceAndRepairs: 10000,
    landscaping: 3000,
    janitorial: 5000,
    security: 4000,
    pestControl: 1500,
    trashRemoval: 2000,
    snowRemoval: 1000,
    advertising: 2000,
    legalFees: 1500,
    accountingFees: 2000,
    professionalServices: 1000,
    licensesAndPermits: 500,
    supplies: 1000,
    equipmentRental: 500,
    contractServices: 2000,
    otherOperatingExpenses: 1500,
    
    // Capital Expenditures
    roofReplacement: 5000,
    hvacReplacement: 3000,
    plumbingReplacement: 2000,
    electricalReplacement: 1500,
    flooringReplacement: 2000,
    painting: 1500,
    applianceReplacement: 1000,
    structuralRepairs: 2000,
    otherCapitalExpenditures: 1000,
    
    // Market Information
    marketLocation: 'urban',
    marketCondition: 'stable',
    marketGrowthRate: 3.0,
    comparableNOI: 85000,
    comparableCapRate: 8.5,
    
    // Analysis Parameters
    analysisPeriod: 10,
    inflationRate: 2.5,
    expenseGrowthRate: 3.0,
    incomeGrowthRate: 3.5,
    vacancyTrend: 0,
    
    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    ...initialInputs
  });

  const [results, setResults] = useState<NetOperatingIncomeOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof NetOperatingIncomeInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    
    // Quick validation
    const validation = validateField(field, value, inputs);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [field]: validation.error || '' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateInputs = (): boolean => {
    const validation = validateNetOperatingIncomeInputs(inputs);
    if (!validation.isValid) {
      setErrors(validation.errors || {});
      return false;
    }
    setErrors({});
    return true;
  };

  const calculate = async () => {
    if (!validateInputs()) return;
    
    setIsCalculating(true);
    try {
      const calculatedResults = calculateNetOperatingIncome(inputs);
      setResults(calculatedResults);
      onCalculate?.(calculatedResults);
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors({ general: 'An error occurred during calculation' });
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

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatValue = (value: number, type: 'currency' | 'percentage' | 'number' = 'currency') => {
    switch (type) {
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return formatPercentage(value);
      case 'number':
        return formatNumber(value);
      default:
        return formatCurrency(value);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Net Operating Income (NOI) Calculator
            <Badge variant="secondary">Finance</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6">
              {/* Property Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Property Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyValue">Property Value</Label>
                    <Input
                      id="propertyValue"
                      type="number"
                      value={inputs.propertyValue}
                      onChange={(e) => handleInputChange('propertyValue', parseFloat(e.target.value))}
                      placeholder="1000000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select value={inputs.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="multifamily">Multifamily</SelectItem>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="warehouse">Warehouse</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertySize">Property Size (sq ft)</Label>
                    <Input
                      id="propertySize"
                      type="number"
                      value={inputs.propertySize}
                      onChange={(e) => handleInputChange('propertySize', parseFloat(e.target.value))}
                      placeholder="10000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyClass">Property Class</Label>
                    <Select value={inputs.propertyClass} onValueChange={(value) => handleInputChange('propertyClass', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class_a">Class A</SelectItem>
                        <SelectItem value="class_b">Class B</SelectItem>
                        <SelectItem value="class_c">Class C</SelectItem>
                        <SelectItem value="class_d">Class D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyCondition">Property Condition</Label>
                    <Select value={inputs.propertyCondition} onValueChange={(value) => handleInputChange('propertyCondition', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Income Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Income Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grossRentalIncome">Gross Rental Income</Label>
                    <Input
                      id="grossRentalIncome"
                      type="number"
                      value={inputs.grossRentalIncome}
                      onChange={(e) => handleInputChange('grossRentalIncome', parseFloat(e.target.value))}
                      placeholder="120000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vacancyRate">Vacancy Rate (%)</Label>
                    <Input
                      id="vacancyRate"
                      type="number"
                      value={inputs.vacancyRate}
                      onChange={(e) => handleInputChange('vacancyRate', parseFloat(e.target.value))}
                      placeholder="5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="creditLossRate">Credit Loss Rate (%)</Label>
                    <Input
                      id="creditLossRate"
                      type="number"
                      value={inputs.creditLossRate}
                      onChange={(e) => handleInputChange('creditLossRate', parseFloat(e.target.value))}
                      placeholder="2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parkingIncome">Parking Income</Label>
                    <Input
                      id="parkingIncome"
                      type="number"
                      value={inputs.parkingIncome}
                      onChange={(e) => handleInputChange('parkingIncome', parseFloat(e.target.value))}
                      placeholder="3000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storageIncome">Storage Income</Label>
                    <Input
                      id="storageIncome"
                      type="number"
                      value={inputs.storageIncome}
                      onChange={(e) => handleInputChange('storageIncome', parseFloat(e.target.value))}
                      placeholder="2000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otherIncome">Other Income</Label>
                    <Input
                      id="otherIncome"
                      type="number"
                      value={inputs.otherIncome}
                      onChange={(e) => handleInputChange('otherIncome', parseFloat(e.target.value))}
                      placeholder="5000"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Operating Expenses */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Operating Expenses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyTaxes">Property Taxes</Label>
                    <Input
                      id="propertyTaxes"
                      type="number"
                      value={inputs.propertyTaxes}
                      onChange={(e) => handleInputChange('propertyTaxes', parseFloat(e.target.value))}
                      placeholder="15000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyInsurance">Property Insurance</Label>
                    <Input
                      id="propertyInsurance"
                      type="number"
                      value={inputs.propertyInsurance}
                      onChange={(e) => handleInputChange('propertyInsurance', parseFloat(e.target.value))}
                      placeholder="8000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="utilities">Utilities</Label>
                    <Input
                      id="utilities"
                      type="number"
                      value={inputs.utilities}
                      onChange={(e) => handleInputChange('utilities', parseFloat(e.target.value))}
                      placeholder="12000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenanceAndRepairs">Maintenance & Repairs</Label>
                    <Input
                      id="maintenanceAndRepairs"
                      type="number"
                      value={inputs.maintenanceAndRepairs}
                      onChange={(e) => handleInputChange('maintenanceAndRepairs', parseFloat(e.target.value))}
                      placeholder="10000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyManagementFees">Property Management Fees</Label>
                    <Input
                      id="propertyManagementFees"
                      type="number"
                      value={inputs.propertyManagementFees}
                      onChange={(e) => handleInputChange('propertyManagementFees', parseFloat(e.target.value))}
                      placeholder="6000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="advertising">Advertising</Label>
                    <Input
                      id="advertising"
                      type="number"
                      value={inputs.advertising}
                      onChange={(e) => handleInputChange('advertising', parseFloat(e.target.value))}
                      placeholder="2000"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Market Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Market Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="marketLocation">Market Location</Label>
                    <Select value={inputs.marketLocation} onValueChange={(value) => handleInputChange('marketLocation', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urban">Urban</SelectItem>
                        <SelectItem value="suburban">Suburban</SelectItem>
                        <SelectItem value="rural">Rural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketCondition">Market Condition</Label>
                    <Select value={inputs.marketCondition} onValueChange={(value) => handleInputChange('marketCondition', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="growing">Growing</SelectItem>
                        <SelectItem value="stable">Stable</SelectItem>
                        <SelectItem value="declining">Declining</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comparableNOI">Comparable NOI</Label>
                    <Input
                      id="comparableNOI"
                      type="number"
                      value={inputs.comparableNOI}
                      onChange={(e) => handleInputChange('comparableNOI', parseFloat(e.target.value))}
                      placeholder="85000"
                    />
                  </div>
                </div>
              </div>

              {Object.keys(errors).length > 0 && (
                <Alert variant="destructive">
                  <AlertDescription>
                    Please fix the following errors:
                    <ul className="list-disc list-inside mt-2">
                      {Object.entries(errors).map(([field, error]) => (
                        <li key={field}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <Button onClick={calculate} disabled={isCalculating} className="w-full">
                {isCalculating ? 'Calculating...' : 'Calculate NOI'}
              </Button>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {results ? (
                <div className="space-y-6">
                  {/* Core NOI Results */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Net Operating Income Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {formatValue(results.netOperatingIncome)}
                          </div>
                          <div className="text-sm text-gray-600">Net Operating Income</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatValue(results.noiMargin, 'percentage')}
                          </div>
                          <div className="text-sm text-gray-600">NOI Margin</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {formatValue(results.noiPerSquareFoot)}
                          </div>
                          <div className="text-sm text-gray-600">NOI per Sq Ft</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">
                            {formatValue(results.expenseRatio, 'percentage')}
                          </div>
                          <div className="text-sm text-gray-600">Expense Ratio</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Income vs Expenses */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Income vs Expenses</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Income Breakdown</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Gross Rental Income:</span>
                              <span>{formatValue(results.totalGrossIncome)}</span>
                            </div>
                            <div className="flex justify-between text-red-600">
                              <span>Vacancy Loss:</span>
                              <span>-{formatValue(results.vacancyLoss)}</span>
                            </div>
                            <div className="flex justify-between text-red-600">
                              <span>Credit Loss:</span>
                              <span>-{formatValue(results.creditLoss)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                              <span>Effective Gross Income:</span>
                              <span>{formatValue(results.effectiveGrossIncome)}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Expense Breakdown</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Operating Expenses:</span>
                              <span>{formatValue(results.totalOperatingExpenses)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Capital Expenditures:</span>
                              <span>{formatValue(results.totalCapitalExpenditures)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                              <span>Total Expenses:</span>
                              <span>{formatValue(results.totalExpenses)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">{formatValue(results.operatingEfficiency, 'percentage')}</div>
                          <div className="text-sm text-gray-600">Operating Efficiency</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">{formatValue(results.vacancyLossRatio, 'percentage')}</div>
                          <div className="text-sm text-gray-600">Vacancy Loss Ratio</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">{formatValue(results.creditLossRatio, 'percentage')}</div>
                          <div className="text-sm text-gray-600">Credit Loss Ratio</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Calculate NOI to see results</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {results?.analysis ? (
                <div className="space-y-6">
                  {/* Analysis Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Analysis Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center">
                          <Badge variant={results.analysis.noiRating === 'excellent' ? 'default' : 'secondary'}>
                            {results.analysis.noiRating.toUpperCase()}
                          </Badge>
                          <div className="text-sm text-gray-600 mt-1">NOI Rating</div>
                        </div>
                        <div className="text-center">
                          <Badge variant={results.analysis.efficiencyRating === 'excellent' ? 'default' : 'secondary'}>
                            {results.analysis.efficiencyRating.toUpperCase()}
                          </Badge>
                          <div className="text-sm text-gray-600 mt-1">Efficiency Rating</div>
                        </div>
                        <div className="text-center">
                          <Badge variant={results.analysis.marketRating === 'excellent' ? 'default' : 'secondary'}>
                            {results.analysis.marketRating.toUpperCase()}
                          </Badge>
                          <div className="text-sm text-gray-600 mt-1">Market Rating</div>
                        </div>
                        <div className="text-center">
                          <Badge variant={results.analysis.confidenceRating === 'high' ? 'default' : 'secondary'}>
                            {results.analysis.confidenceRating.toUpperCase()}
                          </Badge>
                          <div className="text-sm text-gray-600 mt-1">Confidence</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendation */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommendation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-medium">{results.analysis.recommendation}</p>
                    </CardContent>
                  </Card>

                  {/* Key Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Key Strengths</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-1">
                          {results.analysis.keyStrengths.map((strength, index) => (
                            <li key={index} className="text-green-700">{strength}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Areas for Improvement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-1">
                          {results.analysis.keyWeaknesses.map((weakness, index) => (
                            <li key={index} className="text-red-700">{weakness}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Market Comparison */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Market Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>NOI vs Market:</span>
                          <Badge variant={results.analysis.marketComparison.noiVsMarket > 0 ? 'default' : 'secondary'}>
                            {results.analysis.marketComparison.noiVsMarket > 0 ? '+' : ''}{formatValue(results.analysis.marketComparison.noiVsMarket, 'percentage')}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Efficiency vs Market:</span>
                          <Badge variant={results.analysis.marketComparison.efficiencyVsMarket > 0 ? 'default' : 'secondary'}>
                            {results.analysis.marketComparison.efficiencyVsMarket > 0 ? '+' : ''}{formatValue(results.analysis.marketComparison.efficiencyVsMarket, 'percentage')}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Market Position:</span>
                          <span className="font-medium">{results.analysis.marketComparison.marketPosition}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Calculate NOI to see analysis</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-6">
              {results ? (
                <div className="space-y-6">
                  {/* Income Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Income Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {results.incomeBreakdown.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span>{item.category}</span>
                            <div className="flex items-center gap-4">
                              <span className="font-medium">{formatValue(item.amount)}</span>
                              <span className="text-sm text-gray-500">({formatValue(item.percentage, 'percentage')})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Expense Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Expense Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {results.expenseBreakdown.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span>{item.category}</span>
                            <div className="flex items-center gap-4">
                              <span className="font-medium">{formatValue(item.amount)}</span>
                              <span className="text-sm text-gray-500">({formatValue(item.percentage, 'percentage')})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Capital Expenditure Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Capital Expenditure Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {results.capitalExpenditureBreakdown.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span>{item.category}</span>
                            <div className="flex items-center gap-4">
                              <span className="font-medium">{formatValue(item.amount)}</span>
                              <span className="text-sm text-gray-500">({formatValue(item.percentage, 'percentage')})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Calculate NOI to see breakdown</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}