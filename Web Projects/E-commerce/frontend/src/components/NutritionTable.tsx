import React, { useMemo } from 'react';
import '../styles/NutritionTable.css';

interface NutritionRow {
    label: string;
    per100: string;
    perPortion: string;
}

interface NutritionTableProps {
    nutritionData: string;
}

const NutritionTable: React.FC<NutritionTableProps> = ({ nutritionData }) => {
    
    const parsedData = useMemo(() => {
        if (!nutritionData) return [];

        // Strategy 1: Standard format (HeaderFI/HeaderSE,Value100/ValuePortion|...)
        if (nutritionData.includes('|')) {
            return nutritionData.split('|').map(row => {
                const [headerPart, valuePart] = row.split(',');
                if (!headerPart || !valuePart) return null;

                const label = headerPart.split('/')[0] || headerPart;
                const values = valuePart.split('/');
                
                return {
                    label,
                    per100: values[0] || '-',
                    perPortion: values[1] || '-'
                };
            }).filter((item): item is NutritionRow => item !== null);
        }

        // Strategy 2: Simple comma-separated list (e.g. "Energy: 100kcal, Fat: 5g")
        // This is a fallback if the data doesn't match the complex format
        if (nutritionData.includes(',')) {
            return nutritionData.split(',').map(row => {
                const parts = row.split(':');
                return {
                    label: parts[0]?.trim() || row,
                    per100: parts[1]?.trim() || '',
                    perPortion: '-'
                };
            });
        }

        return [];
    }, [nutritionData]);

    if (parsedData.length === 0) return null;

    return (
        <div className="nutrition-container">
            <h3 className="detail-header3">Ravintosisältö</h3>
            <table className="nutrition-table">
                <thead>
                    <tr>
                        <th>Ravintoarvo</th>
                        <th>Per 100ml</th>
                        <th>Per tölkki</th>
                    </tr>
                </thead>
                <tbody>
                    {parsedData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.label}</td>
                            <td>{row.per100}</td>
                            <td>{row.perPortion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NutritionTable;