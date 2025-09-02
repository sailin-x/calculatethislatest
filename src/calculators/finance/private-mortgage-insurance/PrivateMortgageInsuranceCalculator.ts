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
import { PrivateMortgageInsuranceInputs, PrivateMortgageInsuranceOutputs } from './types';
import { calculatePrivateMortgageInsurance } from './formulas';
import { validatePrivateMortgageInsuranceInputs } from './validation';
import { validateField } from './quickValidation';

interface PrivateMortgageInsuranceCalculatorProps {
  onCalculate?: (results: PrivateMortgageInsuranceOutputs) => void;
  initialInputs?: Partial<PrivateMortgageInsuranceInputs>;
}

export function PrivateMortgageInsuranceCalculator({ 
  onCalculate, 
  initialInputs 
}: PrivateMortgageInsuranceCalculatorProps) {
  const [inputs, setInputs] = useState<PrivateMortgageInsuranceInputs>({
    // Loan Information
    loanAmount: 300000,
    interestRate: 4.5,
    loanTerm: 30,
    loanType: 'conventional',
    paymentType: 'principal_interest',
    
    // Property Information
    propertyValue: 375000,
    propertyAddress: '',
    propertyType: 'single_family',
    propertySize: 2000,
    propertyAge: 15,
    
    // Down Payment Information
    downPayment: 75000,
    downPaymentPercentage: 20,
    downPaymentSource: 'savings',
    
    // PMI Information
    pmiRequired: true,
    pmiRate: 0.5,
    pmiType: 'monthly',
    pmiCancellationMethod: 'automatic',
    
    // Borrower Information
    borrowerIncome: 80000,
    borrowerCreditScore: 720,
    borrowerDebtToIncomeRatio: 35,
    borrowerEmploymentType: 'employed',
    borrowerTaxRate: 22,
    
    // Loan History
    loanStartDate: new Date().toISOString().split('T')[0],
    paymentsMade: 0,
    monthsSinceLoanStart: 0,
    currentPrincipalBalance: 300000,
    
    // Market Information
    marketLocation: '',
    marketCondition: 'stable',
    marketGrowthRate: 3.0,
    propertyAppreciationRate: 3.0,
    
    // PMI Requirements
    ltvThreshold: 80,
    paymentHistory: [],
    
    // Analysis Parameters
    analysisPeriod: 60,
    inflationRate: 2.5,
    discountRate: 6.0,
    
    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    ...initialInputs
  });

  const [results, setResults] = useState<PrivateMortgageInsuranceOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof PrivateMortgageInsuranceInputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);

    // Quick validation
    const validation = validateField(field, value, newInputs);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [field]: validation.error || '' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Auto-calculate down payment percentage
    if (field === 'downPayment' || field === 'propertyValue') {
      const downPaymentPercent = (newInputs.downPayment / newInputs.propertyValue) * 100;
      setInputs(prev => ({ ...prev, downPaymentPercentage: downPaymentPercent }));
    }

    // Auto-calculate down payment from percentage
    if (field === 'downPaymentPercentage') {
      const downPayment = (newInputs.propertyValue * value) / 100;
      setInputs(prev => ({ ...prev, downPayment }));
    }

    // Auto-calculate loan amount
    if (field === 'downPayment' || field === 'propertyValue') {
      const loanAmount = newInputs.propertyValue - newInputs.downPayment;
      setInputs(prev => ({ ...prev, loanAmount, currentPrincipalBalance: loanAmount }));
    }

    // Auto-calculate LTV
    if (field === 'loanAmount' || field === 'propertyValue') {
      const ltv = (newInputs.loanAmount / newInputs.propertyValue) * 100;
      setInputs(prev => ({ ...prev, ltvThreshold: ltv > 80 ? 80 : 78 }));
    }
  };

  const calculateResults = async () => {
    setIsCalculating(true);
    try {
      const validation = validatePrivateMortgageInsuranceInputs(inputs);
      if (!validation.isValid) {
        setErrors(validation.errors || {});
        return;
      }

      const calculatedResults = calculatePrivateMortgageInsurance(inputs);
      setResults(calculatedResults);
      onCalculate?.(calculatedResults);
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors({ calculation: 'An error occurred during calculation' });
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && inputs.loanAmount > 0) {
      calculateResults();
    }
  }, [inputs]);

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Private Mortgage Insurance Calculator</span>
            {results?.pmiRequired && (
              <Badge variant="destructive">PMI Required</Badge>
            )}
            {results?.cancellationEligibility && (
              <Badge variant="default">Eligible for Cancellation</Badge>
            )}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Loan Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Loan Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loanAmount">Loan Amount</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        value={inputs.loanAmount}
                        onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value) || 0)}
                        placeholder="300000"
                      />
                      {errors.loanAmount && (
                        <Alert variant="destructive">
                          <AlertDescription>{errors.loanAmount}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interestRate">Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.01"
                        value={inputs.interestRate}
                        onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
                        placeholder="4.5"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loanTerm">Loan Term (years)</Label>
                      <Select value={inputs.loanTerm.toString()} onValueChange={(value) => handleInputChange('loanTerm', parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 years</SelectItem>
                          <SelectItem value="20">20 years</SelectItem>
                          <SelectItem value="30">30 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loanType">Loan Type</Label>
                      <Select value={inputs.loanType} onValueChange={(value) => handleInputChange('loanType', value as any)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conventional">Conventional</SelectItem>
                          <SelectItem value="fha">FHA</SelectItem>
                          <SelectItem value="va">VA</SelectItem>
                          <SelectItem value="usda">USDA</SelectItem>
                          <SelectItem value="jumbo">Jumbo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Property Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Property Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyValue">Property Value</Label>
                      <Input
                        id="propertyValue"
                        type="number"
                        value={inputs.propertyValue}
                        onChange={(e) => handleInputChange('propertyValue', parseFloat(e.target.value) || 0)}
                        placeholder="375000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propertyAddress">Property Address</Label>
                      <Input
                        id="propertyAddress"
                        value={inputs.propertyAddress}
                        onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                        placeholder="123 Main St, Anytown, USA"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Property Type</Label>
                      <Select value={inputs.propertyType} onValueChange={(value) => handleInputChange('propertyType', value as any)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single_family">Single Family</SelectItem>
                          <SelectItem value="multi_family">Multi-Family</SelectItem>
                          <SelectItem value="condo">Condominium</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propertySize">Property Size (sq ft)</Label>
                      <Input
                        id="propertySize"
                        type="number"
                        value={inputs.propertySize}
                        onChange={(e) => handleInputChange('propertySize', parseFloat(e.target.value) || 0)}
                        placeholder="2000"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Down Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Down Payment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="downPayment">Down Payment Amount</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        value={inputs.downPayment}
                        onChange={(e) => handleInputChange('downPayment', parseFloat(e.target.value) || 0)}
                        placeholder="75000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="downPaymentPercentage">Down Payment Percentage</Label>
                      <Input
                        id="downPaymentPercentage"
                        type="number"
                        step="0.1"
                        value={inputs.downPaymentPercentage.toFixed(1)}
                        onChange={(e) => handleInputChange('downPaymentPercentage', parseFloat(e.target.value) || 0)}
                        placeholder="20.0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="downPaymentSource">Down Payment Source</Label>
                      <Select value={inputs.downPaymentSource} onValueChange={(value) => handleInputChange('downPaymentSource', value as any)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="savings">Savings</SelectItem>
                          <SelectItem value="investment_sale">Investment Sale</SelectItem>
                          <SelectItem value="gift">Gift</SelectItem>
                          <SelectItem value="inheritance">Inheritance</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pmiRequired"
                        checked={inputs.pmiRequired}
                        onCheckedChange={(checked) => handleInputChange('pmiRequired', checked)}
                      />
                      <Label htmlFor="pmiRequired">PMI Required</Label>
                    </div>
                  </CardContent>
                </Card>

                {/* PMI Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">PMI Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pmiRate">PMI Rate (%)</Label>
                      <Input
                        id="pmiRate"
                        type="number"
                        step="0.01"
                        value={inputs.pmiRate}
                        onChange={(e) => handleInputChange('pmiRate', parseFloat(e.target.value) || 0)}
                        placeholder="0.5"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pmiType">PMI Type</Label>
                      <Select value={inputs.pmiType} onValueChange={(value) => handleInputChange('pmiType', value as any)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="single_premium">Single Premium</SelectItem>
                          <SelectItem value="split_premium">Split Premium</SelectItem>
                          <SelectItem value="lender_paid">Lender Paid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pmiCancellationMethod">Cancellation Method</Label>
                      <Select value={inputs.pmiCancellationMethod} onValueChange={(value) => handleInputChange('pmiCancellationMethod', value as any)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automatic">Automatic</SelectItem>
                          <SelectItem value="request">Request</SelectItem>
                          <SelectItem value="refinance">Refinance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {results && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Core Results */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">PMI Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>PMI Required:</span>
                        <Badge variant={results.pmiRequired ? "destructive" : "default"}>
                          {results.pmiRequired ? "Yes" : "No"}
                        </Badge>
                      </div>
                      
                      {results.pmiRequired && (
                        <>
                          <div className="flex justify-between">
                            <span>Monthly PMI Payment:</span>
                            <span className="font-semibold">{formatCurrency(results.pmiMonthlyPayment)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Annual PMI Cost:</span>
                            <span className="font-semibold">{formatCurrency(results.pmiAnnualCost)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total PMI Cost:</span>
                            <span className="font-semibold">{formatCurrency(results.totalPMICost)}</span>
                          </div>
                        </>
                      )}

                      <Separator />

                      <div className="flex justify-between">
                        <span>Loan-to-Value Ratio:</span>
                        <span className="font-semibold">{formatPercentage(results.loanToValueRatio)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Equity Position:</span>
                        <span className="font-semibold">{formatCurrency(results.equityPosition)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Equity Percentage:</span>
                        <span className="font-semibold">{formatPercentage(results.equityPercentage)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cancellation Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Cancellation Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Eligible for Cancellation:</span>
                        <Badge variant={results.cancellationEligibility ? "default" : "secondary"}>
                          {results.cancellationEligibility ? "Yes" : "No"}
                        </Badge>
                      </div>
                      
                      {results.cancellationEligibility && (
                        <>
                          <div className="flex justify-between">
                            <span>Months to Cancellation:</span>
                            <span className="font-semibold">{results.breakEvenMonths}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Automatic Cancellation:</span>
                            <span className="font-semibold">{results.automaticCancellationDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Request Cancellation:</span>
                            <span className="font-semibold">{results.requestCancellationDate}</span>
                          </div>
                        </>
                      )}

                      <Separator />

                      <div className="flex justify-between">
                        <span>Break-Even Point:</span>
                        <span className="font-semibold">{formatCurrency(results.breakEvenPoint)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net Savings:</span>
                        <span className="font-semibold">{formatCurrency(results.netSavings)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Score:</span>
                        <span className="font-semibold">{results.riskScore.toFixed(1)}/100</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {results && (
                <div className="space-y-6">
                  {/* Analysis Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Analysis Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{results.analysis.pmiRating}</div>
                          <div className="text-sm text-muted-foreground">PMI Status</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{results.analysis.costRating}</div>
                          <div className="text-sm text-muted-foreground">Cost Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{results.analysis.recommendation}</div>
                          <div className="text-sm text-muted-foreground">Recommendation</div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-2">Key Insights</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-green-600">Strengths</h5>
                            <ul className="text-sm space-y-1">
                              {results.analysis.keyStrengths.map((strength, index) => (
                                <li key={index}>• {strength}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-red-600">Weaknesses</h5>
                            <ul className="text-sm space-y-1">
                              {results.analysis.keyWeaknesses.map((weakness, index) => (
                                <li key={index}>• {weakness}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">PMI Recommendations</h4>
                        <ul className="space-y-2">
                          {results.analysis.pmiRecommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-2">Cancellation Recommendations</h4>
                        <ul className="space-y-2">
                          {results.analysis.cancellationRecommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-green-600 mt-1">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              {results && results.timelineAnalysis && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">PMI Timeline Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {results.timelineAnalysis.slice(0, 12).map((timeline, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Month {timeline.month}</span>
                              <span className="text-sm text-muted-foreground">{timeline.date}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>LTV: {formatPercentage(timeline.ltvRatio)}</span>
                              <span>PMI: {formatCurrency(timeline.pmiPayment)}</span>
                              <span>Total: {formatCurrency(timeline.cumulativePMI)}</span>
                            </div>
                            {timeline.eligibility && (
                              <Badge variant="default" className="mt-1">Eligible for Cancellation</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
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