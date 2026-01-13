from analyzer.data_loader import DataLoader
from analyzer.risk_metrics import RiskCalculator

# Load data
loader = DataLoader("data/portfolio.csv")
portfolio_df = loader.load_data()

# Calculate risk
risk_calc = RiskCalculator(portfolio_df)
risk_calc.calculate_exposure()
risk_df = risk_calc.calculate_volatility_risk()
print("All trades with risk amounts:")
print(risk_df)

high_risk = risk_calc.flag_high_risk_positions(threshold=5000)
print("\nHigh-risk trades (risk > 5000):")
print(high_risk)
