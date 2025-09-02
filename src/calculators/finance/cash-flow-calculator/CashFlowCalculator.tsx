import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { CashFlowInputs, CashFlowOutputs } from './types';
import { calculateCashFlow } from './formulas';
import { validateCashFlowInputs } from './validation';
import { validateField } from './quickValidation';

export default function CashFlowCalculator() {
  const [inputs, setInputs] = useState<CashFlowInputs>({
    // Property Information
    propertyValue: 500000,
    purchasePrice: 500000,
    downPayment: 100000,
    loanAmount: 400000,
    interestRate: 4.5,
    loanTerm: 30,
    propertyType: 'residential',
    propertyAge: 10,
    squareFootage: 2000,
    bedrooms: 3,
    bathrooms: 2,
    
    // Income Information
    monthlyRent: 2500,
    otherIncome: 0,
    rentGrowthRate: 3,
    vacancyRate: 5,
    
    // Operating Expenses
    propertyTaxes: 6000,
    insurance: 1200,
    maintenance: 2400,
    propertyManagement: 1500,
    utilities: 0,
    hoaFees: 0,
    landscaping: 600,
    pestControl: 300,
    advertising: 200,
    legalFees: 0,
    accountingFees: 300,
    otherExpenses: 0,
    
    // Financing Information
    closingCosts: 10000,
    points: 0,
    escrowAccount: 3000,
    prepaidItems: 2000,
    
    // Market Information
    marketRent: 2500,
    marketVacancy: 5,
    marketExpenses: 35,
    marketCapRate: 6,
    
    // Analysis Parameters
    analysisPeriod: 10,
    inflationRate: 2.5,
    appreciationRate: 3,
    taxRate: 25,
    depreciationPeriod: 27.5,
    
    // Additional Information
    isOwnerOccupied: false,
    personalUsePercentage: 0,
    isRentalProperty: true,
    isCommercialProperty: false,
    hasTenant: true,
    leaseTerm: 12,
    rentEscalation: 0,
    
    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    includeProjections: true
  });

  const [results, setResults] = useState<CashFlowOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = validateCashFlowInputs(inputs);
    if (validation.isValid) {
      try {
        const calculatedResults = calculateCashFlow(inputs);
        setResults(calculatedResults);
        setErrors({});
      } catch (error) {
        setErrors({ calculation: 'Error calculating cash flow' });
      }
    } else {
      setErrors(validation.errors || {});
    }
  }, [inputs]);

  const handleInputChange = (field: keyof CashFlowInputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);

    // Auto-calculate related fields
    if (field === 'purchasePrice') {
      const downPayment = newInputs.downPayment;
      const loanAmount = value - downPayment;
      newInputs.loanAmount = Math.max(0, loanAmount);
    }

    if (field === 'downPayment') {
      const purchasePrice = newInputs.purchasePrice;
      const loanAmount = purchasePrice - value;
      newInputs.loanAmount = Math.max(0, loanAmount);
    }

    if (field === 'loanAmount') {
      const purchasePrice = newInputs.purchasePrice;
      const downPayment = purchasePrice - value;
      newInputs.downPayment = Math.max(0, downPayment);
    }

    if (field === 'monthlyRent') {
      newInputs.marketRent = value;
    }

    // Quick validation
    const fieldValidation = validateField(field, value, newInputs);
    if (!fieldValidation.isValid) {
      setErrors(prev => ({ ...prev, [field]: fieldValidation.error || '' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    if (fieldValidation.warning) {
      setWarnings(prev => ({ ...prev, [field]: fieldValidation.warning || '' }));
    } else {
      setWarnings(prev => {
        const newWarnings = { ...prev };
        delete newWarnings[field];
        return newWarnings;
      });
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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Cash Flow Calculator</h1>
        <p className="text-muted-foreground">
          Analyze the cash flow potential of your real estate investment
        </p>
      </div>

      <Tabs defaultValue="inputs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Property Information */}
            <Card>
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyValue">Property Value</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    value={inputs.propertyValue}
                    onChange={(e) => handleInputChange('propertyValue', parseFloat(e.target.value) || 0)}
                    className={errors.propertyValue ? 'border-red-500' : ''}
                  />
                  {errors.propertyValue && <p className="text-sm text-red-500">{errors.propertyValue}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchasePrice">Purchase Price</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={inputs.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', parseFloat(e.target.value) || 0)}
                    className={errors.purchasePrice ? 'border-red-500' : ''}
                  />
                  {errors.purchasePrice && <p className="text-sm text-red-500">{errors.purchasePrice}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="downPayment">Down Payment</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    value={inputs.downPayment}
                    onChange={(e) => handleInputChange('downPayment', parseFloat(e.target.value) || 0)}
                    className={errors.downPayment ? 'border-red-500' : ''}
                  />
                  {errors.downPayment && <p className="text-sm text-red-500">{errors.downPayment}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={inputs.loanAmount}
                    onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value) || 0)}
                    className={errors.loanAmount ? 'border-red-500' : ''}
                  />
                  {errors.loanAmount && <p className="text-sm text-red-500">{errors.loanAmount}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    value={inputs.interestRate}
                    onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
                    className={errors.interestRate ? 'border-red-500' : ''}
                  />
                  {errors.interestRate && <p className="text-sm text-red-500">{errors.interestRate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                  <Select value={inputs.loanTerm.toString()} onValueChange={(value) => handleInputChange('loanTerm', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 Years</SelectItem>
                      <SelectItem value="20">20 Years</SelectItem>
                      <SelectItem value="30">30 Years</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Income Information */}
            <Card>
              <CardHeader>
                <CardTitle>Income Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyRent">Monthly Rent</Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={inputs.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', parseFloat(e.target.value) || 0)}
                    className={errors.monthlyRent ? 'border-red-500' : ''}
                  />
                  {errors.monthlyRent && <p className="text-sm text-red-500">{errors.monthlyRent}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherIncome">Other Income</Label>
                  <Input
                    id="otherIncome"
                    type="number"
                    value={inputs.otherIncome}
                    onChange={(e) => handleInputChange('otherIncome', parseFloat(e.target.value) || 0)}
                    className={errors.otherIncome ? 'border-red-500' : ''}
                  />
                  {errors.otherIncome && <p className="text-sm text-red-500">{errors.otherIncome}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rentGrowthRate">Rent Growth Rate (%)</Label>
                  <Input
                    id="rentGrowthRate"
                    type="number"
                    step="0.1"
                    value={inputs.rentGrowthRate}
                    onChange={(e) => handleInputChange('rentGrowthRate', parseFloat(e.target.value) || 0)}
                    className={errors.rentGrowthRate ? 'border-red-500' : ''}
                  />
                  {errors.rentGrowthRate && <p className="text-sm text-red-500">{errors.rentGrowthRate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vacancyRate">Vacancy Rate (%)</Label>
                  <Input
                    id="vacancyRate"
                    type="number"
                    step="0.1"
                    value={inputs.vacancyRate}
                    onChange={(e) => handleInputChange('vacancyRate', parseFloat(e.target.value) || 0)}
                    className={errors.vacancyRate ? 'border-red-500' : ''}
                  />
                  {errors.vacancyRate && <p className="text-sm text-red-500">{errors.vacancyRate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketRent">Market Rent</Label>
                  <Input
                    id="marketRent"
                    type="number"
                    value={inputs.marketRent}
                    onChange={(e) => handleInputChange('marketRent', parseFloat(e.target.value) || 0)}
                    className={errors.marketRent ? 'border-red-500' : ''}
                  />
                  {errors.marketRent && <p className="text-sm text-red-500">{errors.marketRent}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Operating Expenses */}
            <Card>
              <CardHeader>
                <CardTitle>Operating Expenses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyTaxes">Property Taxes (Annual)</Label>
                  <Input
                    id="propertyTaxes"
                    type="number"
                    value={inputs.propertyTaxes}
                    onChange={(e) => handleInputChange('propertyTaxes', parseFloat(e.target.value) || 0)}
                    className={errors.propertyTaxes ? 'border-red-500' : ''}
                  />
                  {errors.propertyTaxes && <p className="text-sm text-red-500">{errors.propertyTaxes}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insurance">Insurance (Annual)</Label>
                  <Input
                    id="insurance"
                    type="number"
                    value={inputs.insurance}
                    onChange={(e) => handleInputChange('insurance', parseFloat(e.target.value) || 0)}
                    className={errors.insurance ? 'border-red-500' : ''}
                  />
                  {errors.insurance && <p className="text-sm text-red-500">{errors.insurance}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maintenance">Maintenance (Annual)</Label>
                  <Input
                    id="maintenance"
                    type="number"
                    value={inputs.maintenance}
                    onChange={(e) => handleInputChange('maintenance', parseFloat(e.target.value) || 0)}
                    className={errors.maintenance ? 'border-red-500' : ''}
                  />
                  {errors.maintenance && <p className="text-sm text-red-500">{errors.maintenance}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyManagement">Property Management (Annual)</Label>
                  <Input
                    id="propertyManagement"
                    type="number"
                    value={inputs.propertyManagement}
                    onChange={(e) => handleInputChange('propertyManagement', parseFloat(e.target.value) || 0)}
                    className={errors.propertyManagement ? 'border-red-500' : ''}
                  />
                  {errors.propertyManagement && <p className="text-sm text-red-500">{errors.propertyManagement}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hoaFees">HOA Fees (Annual)</Label>
                  <Input
                    id="hoaFees"
                    type="number"
                    value={inputs.hoaFees}
                    onChange={(e) => handleInputChange('hoaFees', parseFloat(e.target.value) || 0)}
                    className={errors.hoaFees ? 'border-red-500' : ''}
                  />
                  {errors.hoaFees && <p className="text-sm text-red-500">{errors.hoaFees}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherExpenses">Other Expenses (Annual)</Label>
                  <Input
                    id="otherExpenses"
                    type="number"
                    value={inputs.otherExpenses}
                    onChange={(e) => handleInputChange('otherExpenses', parseFloat(e.target.value) || 0)}
                    className={errors.otherExpenses ? 'border-red-500' : ''}
                  />
                  {errors.otherExpenses && <p className="text-sm text-red-500">{errors.otherExpenses}</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Key Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Monthly Cash Flow:</span>
                    <span className={`font-bold ${results.metrics.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(results.metrics.monthlyCashFlow)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Cash Flow:</span>
                    <span className={`font-bold ${results.metrics.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(results.metrics.annualCashFlow)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cash on Cash Return:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.cashOnCashReturn)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cap Rate:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.capRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROI:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.roi)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Income Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Income Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Gross Rental Income:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.grossRentalIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vacancy Loss:</span>
                    <span className="font-bold text-red-600">-{formatCurrency(results.metrics.vacancyLoss)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other Income:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.otherIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Effective Gross Income:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.effectiveGrossIncome)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Expense Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Operating Expenses:</span>
                    <span className="font-bold text-red-600">-{formatCurrency(results.metrics.totalOperatingExpenses)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Operating Income:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.netOperatingIncome)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Debt Service:</span>
                    <span className="font-bold text-red-600">-{formatCurrency(results.metrics.debtService)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cash Flow Before Tax:</span>
                    <span className={`font-bold ${results.metrics.cashFlowBeforeTax >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(results.metrics.cashFlowBeforeTax)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Investment Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Investment Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Investment Grade:</span>
                      <Badge variant={results.investmentAnalysis.investmentGrade === 'A' ? 'default' : 
                                     results.investmentAnalysis.investmentGrade === 'B' ? 'secondary' :
                                     results.investmentAnalysis.investmentGrade === 'C' ? 'outline' : 'destructive'}>
                        Grade {results.investmentAnalysis.investmentGrade}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level:</span>
                      <Badge variant={results.investmentAnalysis.riskLevel === 'low' ? 'default' : 
                                     results.investmentAnalysis.riskLevel === 'medium' ? 'secondary' : 'destructive'}>
                        {results.investmentAnalysis.riskLevel}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Recommendations:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.investmentAnalysis.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Risk Factors:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.investmentAnalysis.riskFactors.map((risk, index) => (
                        <li key={index}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Market Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Market Position:</span>
                      <Badge variant={results.marketAnalysis.marketPosition === 'above' ? 'default' : 
                                     results.marketAnalysis.marketPosition === 'at' ? 'secondary' : 'outline'}>
                        {results.marketAnalysis.marketPosition} market
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Risk:</span>
                      <Badge variant={results.marketAnalysis.marketRisk === 'low' ? 'default' : 
                                     results.marketAnalysis.marketRisk === 'medium' ? 'secondary' : 'destructive'}>
                        {results.marketAnalysis.marketRisk}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Market Recommendations:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.marketAnalysis.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="projections" className="space-y-6">
          {results && (
            <div className="space-y-6">
              {/* Cash Flow Projections */}
              <Card>
                <CardHeader>
                  <CardTitle>Cash Flow Projections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Year</th>
                          <th className="text-right p-2">Rental Income</th>
                          <th className="text-right p-2">Operating Expenses</th>
                          <th className="text-right p-2">NOI</th>
                          <th className="text-right p-2">Debt Service</th>
                          <th className="text-right p-2">Cash Flow</th>
                          <th className="text-right p-2">Cumulative CF</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.cashFlowProjections.map((projection, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{projection.year}</td>
                            <td className="text-right p-2">{formatCurrency(projection.rentalIncome)}</td>
                            <td className="text-right p-2">{formatCurrency(projection.operatingExpenses)}</td>
                            <td className="text-right p-2">{formatCurrency(projection.netOperatingIncome)}</td>
                            <td className="text-right p-2">{formatCurrency(projection.debtService)}</td>
                            <td className={`text-right p-2 font-bold ${projection.cashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(projection.cashFlow)}
                            </td>
                            <td className={`text-right p-2 font-bold ${projection.cumulativeCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(projection.cumulativeCashFlow)}
                            </td>
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

        <TabsContent value="comparison" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Expense Breakdown Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.expenseBreakdown.map((expense, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{expense.category}</span>
                          <span>{formatCurrency(expense.amount)} ({formatPercentage(expense.percentage)})</span>
                        </div>
                        <Progress value={expense.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{formatPercentage(results.metrics.cashOnCashReturn)}</div>
                      <div className="text-sm text-gray-600">Cash on Cash Return</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{formatPercentage(results.metrics.capRate)}</div>
                      <div className="text-sm text-gray-600">Cap Rate</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{formatPercentage(results.metrics.roi)}</div>
                      <div className="text-sm text-gray-600">ROI</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{formatPercentage(results.metrics.expenseRatio)}</div>
                      <div className="text-sm text-gray-600">Expense Ratio</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

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

      {Object.keys(warnings).length > 0 && (
        <Alert>
          <AlertDescription>
            Warnings:
            <ul className="list-disc list-inside mt-2">
              {Object.entries(warnings).map(([field, warning]) => (
                <li key={field}>{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}