const { GoogleGenerativeAI } = require('@google/generative-ai');

// Check if API key exists
const apiKey = process.env.GEMINI_API_KEY;
console.log("Gemini Key Loaded:", !!apiKey);

let genAI = null;
let model = null;
let visionModel = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
  // Reusable models - Using gemini-flash-latest as it is the fastest and fully supported model
  model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
  visionModel = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
  console.log("Gemini Model Initialized: gemini-flash-latest");
}

const parseJsonResponse = (text) => {
  try {
    // Attempt to extract JSON from anywhere in the text (e.g., if there's conversational wrapper text)
    const match = text.match(/```(?:json)?\n?([\s\S]*?)```/);
    let jsonStr = match ? match[1].trim() : text.trim();
    
    // Also try to find the first '{' or '[' and the last '}' or ']'
    if (!match) {
        const firstBrace = jsonStr.indexOf('{');
        const firstBracket = jsonStr.indexOf('[');
        const lastBrace = jsonStr.lastIndexOf('}');
        const lastBracket = jsonStr.lastIndexOf(']');
        
        let startIdx = -1;
        let endIdx = -1;
        
        if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
            startIdx = firstBrace;
            endIdx = lastBrace;
        } else if (firstBracket !== -1) {
            startIdx = firstBracket;
            endIdx = lastBracket;
        }
        
        if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
            jsonStr = jsonStr.substring(startIdx, endIdx + 1);
        }
    }
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Failed to parse Gemini JSON response. Original text:\n', text);
    console.error('Parser Error:', error.message);
    throw error;
  }
};

const analyzeCropImage = async (imageBuffer, mimeType) => {
  if (!visionModel) throw new Error('Gemini API key not configured');

  const prompt = `
    Context:
    Farm Location: Mangalore, Dakshina Kannada, Karnataka, India
    Climate: Tropical Coastal
    Typical Crops: Arecanut, Coconut, Paddy, Pepper, Banana, Cashew, Rubber
    Typical Weather: High Humidity, Heavy Monsoon, Warm Temperature

    Analyze this crop image and provide a JSON response with the following strictly formatted keys:
    {
      "cropName": "Name of the crop (e.g., Tomato)",
      "disease": "Name of the disease (or 'Healthy')",
      "confidence": 95,
      "symptoms": ["symptom 1", "symptom 2"],
      "causes": ["cause 1", "cause 2"],
      "treatment": ["treatment step 1", "treatment step 2"],
      "prevention": ["prevention step 1", "prevention step 2"],
      "severity": "Low, Medium, or High (or None)",
      "healthScore": 85,
      "aiRecommendation": "Overall brief AI recommendation",
      "scientificName": "Scientific name of pathogen",
      "pathogenType": "Type of pathogen",
      "spreadMethod": "How it spreads",
      "cropFamily": "Family of the crop",
      "recoveryTime": "Estimated recovery time",
      "timeline": [
        { "label": "Phase 1", "time": "Immediate", "done": true, "desc": "Action" },
        { "label": "Phase 2", "time": "Week 1", "done": false, "desc": "Action" }
      ],
      "recoveryStages": [
        { "label": "Disease Containment", "pct": 75, "color": "#10b981" },
        { "label": "Leaf Recovery", "pct": 45, "color": "#f97316" },
        { "label": "Yield Impact", "pct": 60, "color": "#3b82f6" },
        { "label": "Overall", "pct": 55, "color": "#a78bfa" }
      ]
    }
  `;

  const imagePart = {
    inlineData: {
      data: imageBuffer.toString("base64"),
      mimeType
    }
  };

  try {
    const result = await visionModel.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    return parseJsonResponse(text);
  } catch (error) {
    console.error("Gemini API Error in analyzeCropImage:", error);
    throw error;
  }
};

const analyzeWeatherData = async (weatherData) => {
  if (!model) throw new Error('Gemini API key not configured');

  const prompt = `
    Context:
    Farm Location: Mangalore, Dakshina Kannada, Karnataka, India
    Climate: Tropical Coastal
    Typical Weather: High Humidity, Heavy Monsoon, Warm Temperature

    Based on the following weather data, provide agricultural advice in a strict JSON format.
    Weather Data: ${JSON.stringify(weatherData)}
    
    Expected JSON format:
    {
      "severity": "Low, Medium, or High",
      "headline": "Brief impactful headline (e.g. High Heat Alert)",
      "summary": "Overall reasoning based on current conditions",
      "actions": ["Action 1", "Action 2", "Action 3"],
      "cropImpact": "Expected impact on crops",
      "confidence": 95
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return parseJsonResponse(text);
  } catch (error) {
    console.error("Gemini API Error in analyzeWeatherData:", error);
    throw error;
  }
};

const predictYield = async (data) => {
  if (!model) throw new Error('Gemini API key not configured');

  const prompt = `
    Context:
    Farm Location: Mangalore, Dakshina Kannada, Karnataka, India
    Climate: Tropical Coastal
    Typical Crops: Arecanut, Coconut, Paddy, Pepper, Banana, Cashew, Rubber
    Typical Weather: High Humidity, Heavy Monsoon, Warm Temperature

    Predict crop yield and financials based on the following input parameters:
    Input: ${JSON.stringify(data)}
    
    Provide the response strictly in this JSON format:
    {
      "expectedYield": 12.4,
      "revenue": 248000,
      "profit": 136500,
      "roi": 122,
      "successProb": 88,
      "riskLevel": "Low",
      "yieldPerAcre": "2.4",
      "harvestWindow": "Late October",
      "bestHarvestMonth": "October",
      "waterUsage": "Moderate",
      "carbonScore": 85,
      "aiBusinessRecommendation": "Overall business recommendation for the farmer",
      "expenses": [
        { "label": "Seeds", "amount": 12000, "color": "#3b82f6" },
        { "label": "Fertilizers", "amount": 22000, "color": "#10b981" },
        { "label": "Pesticides", "amount": 8500, "color": "#f97316" }
      ],
      "risks": [
        { "name": "Weather Risk", "level": "Low", "reason": "Good conditions" }
      ],
      "recommendations": [
        { "title": "Increase Nitrogen", "why": "Soil needs it", "benefit": "+₹18,000", "icon": "🌱", "color": "#10b981" }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const parsed = parseJsonResponse(text);
    
    // Schema validation and default fallback injection
    const sanitizedResponse = {
      expectedYield: Number(parsed.expectedYield) || 10.5,
      revenue: Number(parsed.revenue) || 150000,
      profit: Number(parsed.profit) || 80000,
      roi: Number(parsed.roi) || 110,
      successProb: Number(parsed.successProb) || 85,
      riskLevel: parsed.riskLevel || "Medium",
      yieldPerAcre: String(parsed.yieldPerAcre || "2.0"),
      harvestWindow: parsed.harvestWindow || "Expected in 3-4 months",
      bestHarvestMonth: parsed.bestHarvestMonth || "Based on season",
      waterUsage: parsed.waterUsage || "Moderate",
      carbonScore: Number(parsed.carbonScore) || 75,
      aiBusinessRecommendation: parsed.aiBusinessRecommendation || "Optimize inputs for better yield.",
      expenses: Array.isArray(parsed.expenses) && parsed.expenses.length > 0 ? parsed.expenses : [
        { label: "Seeds", amount: 10000, color: "#3b82f6" },
        { label: "Fertilizers", amount: 20000, color: "#10b981" },
        { label: "Labor & Misc", amount: 40000, color: "#f59e0b" }
      ],
      risks: Array.isArray(parsed.risks) && parsed.risks.length > 0 ? parsed.risks : [
        { name: "Market Fluctuation", level: "Medium", reason: "Standard agricultural price variance", pct: 20, color: "#f59e0b" }
      ],
      recommendations: Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0 ? parsed.recommendations : [
        { id: "1", title: "General Best Practices", urgency: "Medium", confidence: 90, timing: "Ongoing", why: "Improves overall crop resilience", benefit: "+₹10k", yieldGain: "+1 ton", color: "#10b981", icon: "🌱" }
      ]
    };
    
    return sanitizedResponse;
  } catch (error) {
    console.error("Gemini API Error in predictYield:", error);
    console.error("Malformed AI response logged for debugging.");
    throw error;
  }
};

const chatWithAdvisor = async (history, message, language = 'English', location = 'Mangalore, Karnataka') => {
  if (!model) throw new Error('Gemini API key not configured');

  // Convert history to Gemini format if needed, or just format as text
  const contextText = history.map(h => `${h.role}: ${h.text}`).join('\n');
  
  const prompt = `
    Context:
    Farm Location: ${location}
    Climate: Tropical/Subtropical depending on location
    Typical Crops: Regional specific crops
    Typical Weather: Regional specific weather
    
    Language: Respond entirely in ${language}.

    You are an expert AI Agricultural Advisor. Use the conversation history and context above, and answer the user's latest query directly in a conversational format.
    Do NOT use JSON. Just return the response text formatted with Markdown.
    
    Conversation History:
    ${contextText}
    
    User Query: ${message}
  `;

  try {
    console.log('Prompt sent to Gemini:\n', prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('Raw Gemini response:\n', text);
    
    return {
      text: text
    };
  } catch (error) {
      console.error("Gemini API Error in chatWithAdvisor:\n", error);
      
      let statusCode = 500;
      let userMessage = "An unexpected error occurred while contacting the AI service.";
      let retryAfter = null;

      if (error.status === 429) {
        statusCode = 429;
        userMessage = "AI service is temporarily busy. Please try again in a few moments.";
        
        // Extract retryDelay if available in errorDetails
        if (error.errorDetails) {
          const retryInfo = error.errorDetails.find(d => d['@type'] === 'type.googleapis.com/google.rpc.RetryInfo');
          if (retryInfo && retryInfo.retryDelay) {
            // e.g. '42s' -> 42
            retryAfter = parseInt(retryInfo.retryDelay.replace('s', '')) || null;
          }
        }
        if (!retryAfter) retryAfter = 60; // fallback to 60s if not specified
      } else if (error.status === 401 || error.status === 403) {
        statusCode = error.status;
        userMessage = "AI service authentication failed. Please check API keys.";
      } else if (error.status === 404) {
        statusCode = 404;
        userMessage = "AI service model not found.";
      }

      const customError = new Error(error.message);
      customError.statusCode = statusCode;
      customError.userMessage = userMessage;
      customError.retryAfter = retryAfter;
      throw customError;
    }
};

const getSchemes = async () => {
    if (!model) throw new Error('Gemini API key not configured');
    
    const prompt = `
    Context:
    Farm Location: Mangalore, Dakshina Kannada, Karnataka, India
    Climate: Tropical Coastal
    
    Provide a list of 5 current agricultural government schemes in India suitable for farmers in Karnataka. Prioritize schemes applicable to Karnataka farmers, Coastal region farmers, and tropical crops like Arecanut and Paddy.
    Return the response strictly in this JSON format:
    [
        {
            "id": "unique-id",
            "name": "Scheme Name",
            "description": "Brief description",
            "category": "Subsidy or Insurance or Loans or Equipment",
            "matchScore": 95,
            "financialBenefit": "e.g., ₹6,000/year",
            "probability": "Very High (95%)",
            "deadline": "Open year-round",
            "aiReason": "AI reason for recommendation",
            "eligibility": ["Criteria 1", "Criteria 2"],
            "documents": ["Doc 1", "Doc 2"],
            "tags": ["Tag 1", "Tag 2"]
        }
    ]
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return parseJsonResponse(text);
    } catch (error) {
      console.error("Gemini API Error in getSchemes:", error);
      throw error;
    }
}

module.exports = {
  analyzeCropImage,
  analyzeWeatherData,
  predictYield,
  chatWithAdvisor,
  getSchemes
};
