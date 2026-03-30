const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chat = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Message is required' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Build premium context for SBN Healthcare
        const systemPrompt = `You are the SBN Enterprise Assistant, an elite AI dedicated to revenue cycle management and healthcare financial optimization. 
        SBN Healthcare Services: Medical Billing, Medical Coding, Eligibility Verification, AR Follow-up, Credentialing, and Credit Balance Resolution.
        Experience: 11+ years of industry leadership.
        
        CRITICAL COMMUNICATION GUIDELINES:
        1. Tone: Highly professional, sophisticated, and concise. Speak like an expert enterprise consultant.
        2. Formatting: DO NOT use markdown formatting (no asterisks **, no hashtags #). Use plain text with clear paragraph spacing.
        3. Objective: Always steer conversations towards how SBN can maximize practice revenue, eliminate billing errors, and streamline operations. 
        4. Brevity: Keep responses short and impactful.`;

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: systemPrompt }] },
                { role: "model", parts: [{ text: "Understood. I am online and ready to assist as the SBN Enterprise Assistant. System protocols initialized for high-value RCM consultation." }] },
                ...(history || [])
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({
            success: true,
            data: text
        });
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({
            success: false,
            message: 'AI intelligence core is currently calibrating. Please try again shortly.'
        });
    }
};
