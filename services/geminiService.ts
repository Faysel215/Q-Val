import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AssetParams, ValuationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const valuationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    pricePath: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          month: { type: Type.INTEGER },
          syntheticPrice: { type: Type.NUMBER },
          upperBound: { type: Type.NUMBER },
          lowerBound: { type: Type.NUMBER },
          proxyCorrelation: { type: Type.NUMBER, description: "Correlation coefficient with market proxy (0-1)" }
        },
        required: ["month", "syntheticPrice", "upperBound", "lowerBound", "proxyCorrelation"]
      }
    },
    finalValuation: { type: Type.NUMBER },
    volatility: { type: Type.NUMBER, description: "Annualized volatility percentage" },
    tangibilityRatio: { type: Type.NUMBER, description: "Tangibility ratio percentage (0-100)" },
    confidenceScore: { type: Type.NUMBER, description: "Model confidence score (0-100)" },
    marketCommentary: { type: Type.STRING },
    proxyUsed: { type: Type.STRING, description: "The liquid asset proxy used for correlation" }
  },
  required: ["pricePath", "finalValuation", "volatility", "tangibilityRatio", "confidenceScore", "marketCommentary", "proxyUsed"]
};

export const generateSyntheticValuation = async (
  params: AssetParams
): Promise<ValuationResult> => {
  const prompt = `
    Act as a Quantum Machine Learning (QML) engine specializing in pricing illiquid assets for Islamic Finance (Sukuk).
    
    Task: Generate a synthetic price path and valuation report for the following asset using a simulated Quantum Boltzmann Machine approach to infer correlations with liquid market proxies.

    Asset Details:
    - Name: ${params.name}
    - Type: ${params.type}
    - Region: ${params.region}
    - Initial Value: ${params.currency} ${params.initialValue.toLocaleString()}
    - Tenure: ${params.tenureYears} years
    - Context: ${params.description}

    Requirements:
    1. Select a suitable liquid market proxy (e.g., a REIT index, Infrastructure ETF, or Commodity index) relevant to the region and asset type.
    2. Simulate a price path for the next ${params.tenureYears * 12} months (monthly data points).
    3. The path should reflect realistic market volatility and economic cycles, not just a straight line.
    4. Calculate a "Tangibility Ratio" assuming this asset is part of a Sukuk portfolio. (Ideally > 51% for tradability, but simulate based on asset nature).
    5. Provide a confidence interval (upper/lower bounds) representing the quantum uncertainty of the valuation.
    6. Return ONLY JSON data matching the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: valuationSchema,
        systemInstruction: "You are Q-Val, an advanced financial modeling AI. You are precise, conservative in estimates, and technical in language.",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No data returned from Gemini");

    return JSON.parse(text) as ValuationResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate synthetic valuation. Please check your API key and try again.");
  }
};