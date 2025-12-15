export interface NutritionRow {
    label: string;
    per100: string;
    perPortion: string;
}

/**
 * Parses description string into bullet points.
 */
export const parseDescription = (rawDescription: string): string[] => {
    if (!rawDescription) return [];

    return rawDescription.split(/,(?!\s)/).map(s => s.trim()).filter(s => s.length > 0);
};


/**
 * Parses nutrition string format: HeaderFI/HeaderSWE,ValueSmall/ValueBig|...
 */
export const parseNutrition = (rawNutrition: string): NutritionRow[] => {
    if (!rawNutrition) return [];

    // Split by | to get rows
    const rows = rawNutrition.split("|");

    return rows.map(row => {
        const [headerPart, valuePart] = row.split(",");

        if (!headerPart || !valuePart) return null;

        const label = headerPart.split("/")[0] || headerPart;

        const values = valuePart.split("/");
        const per100 = values[0] || "-";
        const perPortion = values[1] || "-";

        return {
            label,
            per100,
            perPortion
        };
    }).filter((item): item is NutritionRow => item !== null);
}