import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
import os


class ReportGenerator:
    def __init__(self, output_dir='reports'):
        self.output_dir = output_dir
        os.makedirs(self.output_dir, exist_ok=True)


    def generate_excel_report(self, df: pd.DataFrame, filename: str = "daily_report.xlsx"):
        """
        Generate an Excel report of the portfolio with exposures and risk
        """

        file_path = os.path.join(self.output_dir, filename)
        df.to_excel(file_path, index=False)
        
        print(f"Excel report generated: {file_path}")

    
    def generate_pdf_report(self, df: pd.DataFrame, filename='daily_report.pdf'):
        """
        Generate a PDF report with summary charts and high-risk trades
        """
        # Ensure 'high_risk' exists
        if 'high_risk' not in df.columns:
            df = df.copy()
            df['high_risk'] = False

        file_path = os.path.join(self.output_dir, filename)
        with PdfPages(file_path) as pdf:
            # Page 1: Summary table
            fig, ax = plt.subplots(figsize=(16, 8))
            ax.axis('off')
            ax.set_title('Portfolio Risk Summary', fontsize=14, fontweight='bold')
            table = ax.table(cellText=df.values,
                            colLabels=df.columns,
                            loc='center')
            table.auto_set_font_size(False)
            table.set_fontsize(10)
            table.scale(1, 1.5)
            pdf.savefig(fig)
            plt.close()

            # Page 2: High-risk trades bar chart
            high_risk = df[df['high_risk'] == True]
            if not high_risk.empty:
                fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(16, 8),
                                               gridspec_kw={'height_ratios': [3, 2]})

                # Table
                ax1.axis('off')
                ax1.set_title('High-Risk Trades', fontsize=14, fontweight='bold')
                hr_table = ax1.table(cellText=high_risk.values,
                                    colLabels=high_risk.columns,
                                    loc='center')
                hr_table.auto_set_font_size(False)
                hr_table.set_fontsize(10)
                hr_table.scale(1, 1.5)

                # Bar chart
                ax2.bar(high_risk['asset'], high_risk['risk_amount'], color='red')
                ax2.set_ylabel('Risk Amount')
                ax2.set_title('High-Risk Trades (Bar Chart)')
                ax2.set_xticklabels(high_risk['asset'], rotation=45, ha='right')

                plt.tight_layout()
                pdf.savefig(fig)
                plt.close()

        print(f"PDF report saved to {file_path}")

