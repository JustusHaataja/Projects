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

        const formatValue = (val: string) => {
            return val
                .replace(/(\d)(?=[a-zA-Z])/g, "$1 ")    // Digit followed by letter
                .replace(/([a-zA-Z])(?=\d)/g, "$1 ");   // Letter followed by digit
        }

        // Strategy 1: Standard format (HeaderFI/HeaderSE,Value100/ValuePortion|...)
        if (nutritionData.includes('|')) {
            return nutritionData.split('|').map(row => {
                const [headerPart, valuePart] = row.split(',');
                if (!headerPart || !valuePart) return null;

                const label = headerPart.split('/')[0] || headerPart;
                const values = valuePart.split('/');
                
                return {
                    label,
                    per100: formatValue(values[0] || '-'),
                    perPortion: formatValue(values[1] || '-')
                };
            }).filter((item): item is NutritionRow => item !== null);
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