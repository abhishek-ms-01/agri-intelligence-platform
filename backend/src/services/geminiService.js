const { GoogleGenerativeAI } = require('@google/generative-ai');

// Check if API key exists
const apiKey = process.env.GEMINI_API_KEY;
console.log("Gemini Key Loaded:", !!apiKey);

let genAI = null;
let model = null;
let visionModel = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
  // gemini-2.0-flash is faster and less prone to vercel timeout
  model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  visionModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  console.log("Gemini Model Initialized: gemini-2.0-flash");
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
    if (!visionModel) throw new Error('Gemini API key not configured');
    const result = await visionModel.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    return parseJsonResponse(text);
  } catch (error) {
    console.error("Gemini API Error in analyzeCropImage, using fallback:", error.message);
    // Return a helpful fallback so the UI doesn't crash
    return {
      cropName: "Detected Crop",
      disease: "Analysis Pending",
      confidence: 0,
      symptoms: ["AI quota temporarily exceeded. Please try again in a minute."],
      causes: ["High API usage"],
      treatment: ["Please retry in 60 seconds for a full AI-powered diagnosis."],
      prevention: ["Ensure good air circulation", "Avoid overhead watering", "Remove infected leaves promptly"],
      severity: "Unknown",
      healthScore: 50,
      aiRecommendation: "AI analysis is temporarily unavailable due to quota limits. Please retry in 60 seconds for a detailed diagnosis.",
      scientificName: "N/A",
      pathogenType: "N/A",
      spreadMethod: "N/A",
      cropFamily: "N/A",
      recoveryTime: "N/A",
      timeline: [
        { label: "Retry AI Scan", time: "In 60s", done: false, desc: "AI quota resets every minute" }
      ],
      recoveryStages: [
        { label: "AI Analysis", pct: 0, color: "#f59e0b" }
      ]
    };
  }
};

const analyzeWeatherData = async (weatherData) => {
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
    if (!model) throw new Error('Gemini API key not configured');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return parseJsonResponse(text);
  } catch (error) {
    console.error("Gemini API Error in analyzeWeatherData, using rule-based fallback:", error.message);
    // Rule-based fallback — no AI needed
    const temp = weatherData.temperature || 25;
    const humidity = weatherData.humidity || 60;
    const rain = weatherData.rain || 0;
    let severity = 'Low';
    let headline = 'Good Farming Conditions';
    let summary = 'Current weather conditions are suitable for most farming activities.';
    let actions = ['Proceed with scheduled farming activities', 'Monitor soil moisture levels', 'Check crops for any early signs of stress'];
    if (humidity > 80 && temp > 28) {
      severity = 'High';
      headline = 'High Humidity & Heat Alert';
      summary = 'High humidity combined with warm temperatures creates ideal conditions for fungal diseases. Immediate preventive action recommended.';
      actions = ['Apply preventive fungicide immediately', 'Improve field drainage', 'Increase air circulation around crops', 'Monitor for early blight symptoms'];
    } else if (humidity > 70 || rain > 5) {
      severity = 'Medium';
      headline = 'Elevated Disease Risk';
      summary = 'Moderate humidity levels may promote fungal growth. Monitor crops closely.';
      actions = ['Inspect crops for early disease signs', 'Ensure good drainage', 'Consider preventive spray if conditions persist'];
    } else if (temp > 35) {
      severity = 'Medium';
      headline = 'Heat Stress Warning';
      summary = 'High temperatures may cause heat stress in crops. Increase irrigation frequency.';
      actions = ['Increase irrigation frequency', 'Water during early morning or evening', 'Provide shade for sensitive crops'];
    }
    return {
      severity,
      headline,
      summary,
      actions,
      cropImpact: severity === 'High' ? 'High risk of fungal disease outbreak. Yield may be affected if untreated.' : severity === 'Medium' ? 'Moderate stress expected. Monitor closely.' : 'Minimal impact expected under current conditions.',
      confidence: 75
    };
  }
};

const predictYield = async (data) => {
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
    if (!model) throw new Error('Gemini API key not configured');
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
    if (!model) throw new Error('Gemini API key not configured');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return { text };
  } catch (error) {
    console.error("Gemini API Error in chatWithAdvisor, using fallback:", error.message);
    if (error.status === 429) {
      return {
        text: `## ⏳ AI Advisor Temporarily Busy\n\nI'm receiving too many requests right now. Please wait **60 seconds** and try again.\n\nIn the meantime, here are some general farming tips:\n\n- 🌿 **Disease Prevention**: Ensure good air circulation and avoid overhead irrigation\n- 💧 **Irrigation**: Water in the early morning to reduce fungal risk\n- 🌱 **Soil Health**: Add organic compost to improve soil structure and fertility\n- 🐛 **Pest Control**: Inspect crops regularly and use integrated pest management\n- ☀️ **Weather**: Monitor forecasts and protect crops from extreme heat or frost\n\n*Please retry your question in a moment — I'll give you a detailed AI response!*`
      };
    }
    return {
      text: `## ⚠️ AI Service Unavailable\n\nSorry, I'm unable to connect to the AI service right now. Please try again shortly.\n\nFor urgent farming advice, contact your local Krishi Vigyan Kendra (KVK) or visit the PM Kisan helpline at **1800-180-1551**.`
    };
  }
};

const FALLBACK_SCHEMES = [
  {
    id: "pm-kisan",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    description: "Provides income support of ₹6,000 per year in three equal installments to all landholding farmer families across India.",
    category: "Subsidy",
    matchScore: 98,
    financialBenefit: "₹6,000/year",
    probability: "Very High (98%)",
    deadline: "Open year-round",
    aiReason: "All small and marginal farmers with cultivable land are eligible. Direct benefit transfer to bank accounts makes this the most accessible scheme.",
    eligibility: ["Must be a landholding farmer family", "Must have Aadhaar card", "Must have bank account linked to Aadhaar", "Not a government employee or income taxpayer"],
    documents: ["Aadhaar Card", "Land records / Khatian", "Bank passbook", "Mobile number"],
    tags: ["Income Support", "Direct Benefit", "All Farmers"]
  },
  {
    id: "pmfby",
    name: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
    description: "Crop insurance scheme providing financial support to farmers suffering crop loss or damage due to natural calamities, pests, and diseases.",
    category: "Insurance",
    matchScore: 95,
    financialBenefit: "Up to full sum insured",
    probability: "High (95%)",
    deadline: "Kharif: July 31 | Rabi: December 31",
    aiReason: "Tropical coastal regions face monsoon damage regularly. This scheme covers paddy, arecanut and coconut which are primary crops in Karnataka.",
    eligibility: ["All farmers growing notified crops", "Loanee farmers mandatorily covered", "Non-loanee farmers can apply voluntarily"],
    documents: ["Aadhaar Card", "Land records", "Bank account details", "Sowing certificate"],
    tags: ["Crop Insurance", "Natural Calamity", "Risk Cover"]
  },
  {
    id: "kcc",
    name: "Kisan Credit Card (KCC)",
    description: "Provides farmers with affordable credit for agricultural needs including crop cultivation, post-harvest expenses, and allied activities at just 4% interest per annum.",
    category: "Loans",
    matchScore: 92,
    financialBenefit: "Credit up to ₹3 lakh at 4% p.a.",
    probability: "High (92%)",
    deadline: "Apply at any time at nearest bank",
    aiReason: "KCC provides revolving credit for seeds, fertilizers and equipment. Ideal for Arecanut and Paddy farmers with seasonal cash flow needs.",
    eligibility: ["All farmers (owner cultivators, tenant farmers, sharecroppers)", "SHGs and JLGs engaged in farming"],
    documents: ["Aadhaar Card", "Land documents", "Passport-size photos", "Bank account details"],
    tags: ["Credit", "Low Interest", "Flexible Loan"]
  },
  {
    id: "pmksy",
    name: "PMKSY (Pradhan Mantri Krishi Sinchayee Yojana)",
    description: "Aims to enhance water use efficiency and expand cultivable area under assured irrigation through 'Har Khet Ko Pani' and 'More Crop Per Drop'.",
    category: "Equipment",
    matchScore: 88,
    financialBenefit: "55% subsidy on micro-irrigation systems",
    probability: "High (88%)",
    deadline: "Apply via State Agriculture Department",
    aiReason: "Installing drip or sprinkler systems in coconut and arecanut farms can reduce water usage by 40-50% and increase yield significantly.",
    eligibility: ["All categories of farmers", "Land must have a water source", "Preference to small and marginal farmers"],
    documents: ["Land records", "Water source proof", "Bank account details", "Aadhaar Card"],
    tags: ["Irrigation", "Drip", "Water Efficiency"]
  },
  {
    id: "pkvy",
    name: "PKVY (Paramparagat Krishi Vikas Yojana)",
    description: "Promotes organic farming by providing financial assistance to farmer groups to adopt certified organic farming practices and connect to market.",
    category: "Subsidy",
    matchScore: 82,
    financialBenefit: "₹50,000/hectare over 3 years",
    probability: "Good (82%)",
    deadline: "Apply via District Agriculture Office",
    aiReason: "Organic certification for Arecanut and Coconut commands a 20-30% premium in export markets. This scheme can offset conversion costs.",
    eligibility: ["Farmers willing to adopt organic farming", "Must form a cluster of 50 farmers minimum", "Land free from chemical use for conversion period"],
    documents: ["Land records", "Group formation documents", "Aadhaar Card", "Bank details"],
    tags: ["Organic", "Certification", "Cluster Farming"]
  },
  {
    id: "nmsa",
    name: "NMSA (National Mission for Sustainable Agriculture)",
    description: "Promotes sustainable agriculture through soil health management, water use efficiency, and climate change adaptation measures.",
    category: "Subsidy",
    matchScore: 79,
    financialBenefit: "Up to ₹25,000 assistance for soil health",
    probability: "Good (79%)",
    deadline: "Apply before March 31 each year",
    aiReason: "Soil health card program under NMSA helps identify exact nutrient deficiencies in your farm, preventing over-fertilization and reducing costs.",
    eligibility: ["All farm households", "Priority to drought-prone districts"],
    documents: ["Soil Health Card application", "Land records", "Aadhaar Card"],
    tags: ["Soil Health", "Sustainability", "Climate Adaptation"]
  },
  {
    id: "atma",
    name: "ATMA (Agricultural Technology Management Agency)",
    description: "Provides training, demonstrations, and technology dissemination to farmers through Farmer Interest Groups and Farmer Schools.",
    category: "Subsidy",
    matchScore: 75,
    financialBenefit: "Free training + ₹300/day attendance allowance",
    probability: "Moderate (75%)",
    deadline: "Seasonal training programs throughout the year",
    aiReason: "ATMA runs Krishi Vigyan Kendra programs specifically for coastal Karnataka crops like Arecanut disease management and paddy cultivation.",
    eligibility: ["All farmers", "Priority to small and marginal farmers"],
    documents: ["Aadhaar Card", "Farmer registration"],
    tags: ["Training", "Technology", "Skill Development"]
  },
  {
    id: "fpo-scheme",
    name: "Scheme for Formation of 10,000 FPOs",
    description: "Government supports formation of Farmer Producer Organizations to help farmers get better prices, reduce input costs, and access modern technology collectively.",
    category: "Loans",
    matchScore: 70,
    financialBenefit: "₹15 lakh equity grant per FPO",
    probability: "Moderate (70%)",
    deadline: "Ongoing till 2027-28",
    aiReason: "Joining an FPO allows small Arecanut and Coconut farmers in Dakshina Kannada to negotiate better prices with traders collectively and access export markets.",
    eligibility: ["Minimum 300 farmer members", "Must be registered as a company/cooperative"],
    documents: ["Registration documents", "Member list with land records", "Bank account"],
    tags: ["Collective Farming", "Market Access", "FPO"]
  }
];

const getSchemes = async () => {
    if (!model) {
      console.warn('Gemini model not initialized, returning fallback schemes.');
      return FALLBACK_SCHEMES;
    }
    
    const prompt = `
    Context:
    Farm Location: India (various states)
    
    Provide a list of 8 current agricultural government schemes in India suitable for Indian farmers.
    Return the response strictly as a JSON array with this format for each object:
    [
        {
            "id": "unique-kebab-case-id",
            "name": "Full Scheme Name",
            "description": "2-3 sentence description",
            "category": "Subsidy or Insurance or Loans or Equipment",
            "matchScore": 95,
            "financialBenefit": "e.g., up to Rs 6000/year",
            "probability": "Very High (95%)",
            "deadline": "Application deadline or Open year-round",
            "aiReason": "Specific reason why this scheme is recommended",
            "eligibility": ["Eligibility criteria 1", "Eligibility criteria 2"],
            "documents": ["Required document 1", "Required document 2"],
            "tags": ["Tag 1", "Tag 2"]
        }
    ]
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const parsed = parseJsonResponse(text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      console.warn('Gemini returned empty/invalid schemes array, using fallback data.');
      return FALLBACK_SCHEMES;
    } catch (error) {
      console.error("Gemini API Error in getSchemes, using fallback data:", error.message);
      return FALLBACK_SCHEMES;
    }
}

module.exports = {
  analyzeCropImage,
  analyzeWeatherData,
  predictYield,
  chatWithAdvisor,
  getSchemes
};

