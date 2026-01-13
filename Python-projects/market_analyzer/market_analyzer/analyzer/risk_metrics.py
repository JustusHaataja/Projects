import pandas as pd
import numpy as np


"""
This module provides risk metrics calculations based on trade data.
"""
class RiskCalculator:
    def __init__(self, portfolio: pd.DataFrame):
        self.portfolio = portfolio.copy()
        self.risk_df = None

    
    def calculate_exposure(self):
        """
        Calculate exposure per trade: exposure = notional * price * trade_sign
        Returns:
            pd.DataFrame: DataFrame with exposure per trade.
        """

        df = self.portfolio.copy()
        df["trade_sign"] = df["transaction"].apply(
            lambda x: 1 if x == "BUY" else -1 )
        df["exposure"] = df["notional"] * df["price"] * df["trade_sign"]
        self.portfolio = df

        return df
    

    def calculate_volatility_risk(self, volatility_dict=None):
        """
        Estimate risk using simple volatillity-based exposure.
        volatility_dict: optional dict mapping asset -> volatility (e.g. 0.02 = 2%)
        """
        
        df = self.portfolio.copy()

        # Assign default volatility if not provided
        if volatility_dict is None:
            # Default vol 8% for equities, 5% for bonds, 1% for FX
            volatility_dict = {
                "Equity": 0.08,
                "Bond": 0.05,
                "FX": 0.01
            }

        df["volatility"] = df["asset_type"].map(
            lambda x: volatility_dict.get(x, 0.01)
        )
        df["risk_amount"] = df["exposure"].abs() * df["volatility"]

        self.risk_df = df
        
        return df[[ "trade_id", "asset", "asset_type", "currency", 
                    "exposure", "volatility", "risk_amount" ]]


    def flag_high_risk_positions(self, threshold=5000):
        """
        Flag trades where risk_amount exceeds a threshold
        """

        if self.risk_df is None:
            self.calculate_volatility_risk

        self.risk_df["high_risk"] = self.risk_df["risk_amount"] > threshold

        return self.risk_df