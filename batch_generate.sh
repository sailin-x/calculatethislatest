#!/bin/bash

# Batch generate multiple calculators

# Finance calculators
./generate_calculator.sh finance inheritance-tax-estimator "Inheritance Tax Estimator" "Estimate inheritance tax liability based on estate value and applicable exemptions"
./generate_calculator.sh finance irrevocable-life-insurance-trust-ilit-value-calculator "Irrevocable Life Insurance Trust (ILIT) Value Calculator" "Calculate the value and benefits of an Irrevocable Life Insurance Trust"
./generate_calculator.sh finance life-settlement-value-calculator "Life Settlement Value Calculator" "Calculate the value of selling a life insurance policy in the secondary market"
./generate_calculator.sh finance mega-backdoor-roth-calculator "Mega Backdoor Roth Calculator" "Calculate benefits of Mega Backdoor Roth IRA contributions"
./generate_calculator.sh finance net-unrealized-appreciation-nua-tax-calculator "Net Unrealized Appreciation (NUA) Tax Calculator" "Calculate tax benefits of Net Unrealized Appreciation strategy"
./generate_calculator.sh finance pension-lump-sum-vs-annuity-calculator "Pension Lump Sum vs. Annuity Calculator" "Compare lump sum pension payment vs. annuity payments"
./generate_calculator.sh finance pension-plan-funding-calculator "Pension Plan Funding Calculator" "Calculate required contributions for pension plan funding"
./generate_calculator.sh finance planned-giving-calculator "Planned Giving Calculator" "Calculate tax benefits and impact of planned giving strategies"
./generate_calculator.sh finance required-beginning-date-rbd-for-rmds-calculator "Required Beginning Date (RBD) for RMDs Calculator" "Calculate Required Beginning Date for Required Minimum Distributions"
./generate_calculator.sh finance retirement-abroad-calculator "Retirement Abroad Calculator" "Calculate costs and tax implications of retiring abroad"

echo "Batch generation completed. Remember to register all calculators in src/calculators/index.ts"