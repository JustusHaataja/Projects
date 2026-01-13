from analyzer.data_loader import DataLoader
from analyzer.historical_analysis import HistoricalAnalyzer

import pandas as pd

# Load portfolio
loader = DataLoader("data/portfolio.csv")
portfolio_df = loader.load_data()

# Load historical prices
historical_prices = pd.read_csv("data/historical_data.csv")

# Historical PnL & VaR
historical_analyzer = HistoricalAnalyzer(portfolio_df, historical_prices)
pnl_df = historical_analyzer.calculate_daily_pnl()
print("Daily PnL:")
print(pnl_df.head())

var_df = historical_analyzer.calculate_historical_var(confidence_level=0.95)
print("\nHistorical VaR (95% confidence):")
print(var_df)
