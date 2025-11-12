import { sendWhatsAppMessage, getWhatsAppConfig } from "@/lib/whatsapp"

export async function GET(request: Request) {
  try {
    const whatsappConfig = getWhatsAppConfig()
    
    const testMessage = await sendWhatsAppMessage(whatsappConfig, {
      to: "9207855060",
      message: "🎉 Test message from your Replit app!\n\nIf you receive this, your WhatsApp integration is working perfectly!"
    })
    
    return Response.json({ 
      success: true, 
      message: "WhatsApp message sent successfully!",
      details: testMessage
    })
  } catch (error: any) {
    console.error("WhatsApp test failed:", error)
    return Response.json({ 
      success: false, 
      error: error.message || "Failed to send WhatsApp message",
      details: error
    }, { status: 500 })
  }
}
