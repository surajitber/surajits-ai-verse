import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Surajit Bera's AI portfolio assistant - a friendly, knowledgeable helper that answers questions about Surajit's projects, skills, and experience.

## About Surajit Bera:
- AI & Computer Vision Developer passionate about building intelligent systems
- Expertise: Computer Vision, Pose Estimation, Image Processing, Machine Learning, Deep Learning
- Technologies: Python, OpenCV, TensorFlow, PyTorch, OpenPose, Google Colab, NumPy, Scikit-learn

## Key Projects:
1. **OpenPose Behavior Detection System**: Real-time human pose estimation using Body-25 keypoint tracking. Detects actions like fighting, running, and suspicious activities. Built with OpenPose, Python, and OpenCV.

2. **Image Processing Toolkit**: Collection of image processing algorithms including median filters, histogram equalization, edge detection (Sobel, Canny), and center pixel calculations.

3. **Machine Learning Models**: Various ML models for classification and regression with training visualizations. Uses TensorFlow, PyTorch, and Scikit-learn.

4. **Emotion Detection AI**: Real-time facial emotion detection using CNNs, webcam integration, and 7 emotion categories.

## Skills:
- Python (Expert)
- OpenCV (Expert)
- TensorFlow/PyTorch (Advanced)
- Machine Learning (Advanced)
- Image Processing (Expert)
- Google Colab (Expert)

## Response Guidelines:
- Be friendly, helpful, and concise
- Use simple language to explain technical concepts
- If asked about something not related to Surajit's work, politely redirect
- Suggest relevant projects when appropriate
- Keep responses brief but informative`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Received chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(JSON.stringify({ error: "AI service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from AI gateway");
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
