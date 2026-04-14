const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.chat = async (req, res) => {
    try {
        const { message, history } = req.body;

        const apiKey = (process.env.GEMINI_API_KEY || '').trim();
        if (!apiKey) {
            console.error('FATAL: GEMINI_API_KEY is empty.');
            return res.status(500).json({ success: false, message: 'Intelligence core configuration error.' });
        }

        console.log(`SBN AI: Initializing core with key length ${apiKey.length}...`);
        const genAI = new GoogleGenerativeAI(apiKey);

        if (!message) {
            return res.status(400).json({ success: false, message: 'No input message.' });
        }

        const systemPrompt = `You are the SBN Enterprise Assistant, an elite AI dedicated to medical billing and revenue cycle management. 
        SBN Healthcare Services: Medical Billing, Medical Coding, Eligibility Verification, AR Follow-up, Credentialing.
        Experience: 11+ years.
        
        CRITICAL COMMUNICATION GUIDELINES:
        1. Tone: Professional and expert.
        2. Formatting: No markdown (no asterisks, no hashes). Clear spacing.
        3. Objective: Maximize revenue and minimize billing errors. 
        4. Brevity: High.`;

        // --- SMART STABILITY LAYER ---
        // Attempt Primary: Gemini 2.5 Flash (Modern/High-Performance)
        // Attempt Secondary: Gemini 1.5 Flash (Stable/High-Availability)
        
        const tryChat = async (modelName) => {
            const model = genAI.getGenerativeModel({ 
                model: modelName,
                systemInstruction: systemPrompt 
            });

            const chat = model.startChat({
                history: history || []
            });

            const result = await chat.sendMessage(message);
            return result.response.text();
        };

        try {
            const text = await tryChat("gemini-2.5-flash");
            return res.status(200).json({ success: true, data: text });
        } catch (primaryError) {
            console.warn(`Primary AI core (2.5) busy or unavailable: ${primaryError.message}. Switching to Stable fallback...`);
            
            try {
                // FALLBACK: Use 1.5 Flash which has much higher quota and stability
                const text = await tryChat("gemini-1.5-flash");
                return res.status(200).json({ success: true, data: text });
            } catch (fallbackError) {
                console.error('CRITICAL: All AI cores are currently unresponsive.', fallbackError);
                throw fallbackError;
            }
        }
    } catch (error) {
        console.error('AI STACK TRACE:', error);
        res.status(500).json({
            success: false,
            message: `AI Intelligence Core is overloaded. Please try again in 30 seconds.`
        });
    }
};

exports.generateSeoSuggestions = async (req, res) => {
    try {
        const { title, content } = req.body;
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Act as an SEO expert. Analyze this blog post and provide:
        1. An optimized Meta Title (max 60 chars)
        2. A compelling Meta Description (max 160 chars)
        3. 5 relevant Focus Keywords
        4. A suggested URL slug.
        
        Title: ${title}
        Content: ${content.substring(0, 2000)}
        
        Return ONLY a JSON object with fields: metaTitle, metaDescription, keywords (array), slug.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean markdown if AI returns it
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const suggestions = JSON.parse(cleanJson);

        res.status(200).json({ success: true, data: suggestions });
    } catch (error) {
        res.status(500).json({ success: false, message: 'AI failed to generate suggestions' });
    }
};
