/**
 * WhatsApp Cloud API integration
 * Documentation: https://developers.facebook.com/docs/whatsapp/cloud-api/
 */

interface WhatsAppTextMessage {
  to: string
  message: string
}

interface WhatsAppConfig {
  accessToken: string
  phoneNumberId: string
  businessPhoneNumber: string
}

/**
 * Send a text message via WhatsApp Cloud API
 * @param config WhatsApp API configuration
 * @param messageData Message details (recipient phone number and message text)
 * @returns Response from WhatsApp API
 */
export async function sendWhatsAppMessage(
  config: WhatsAppConfig,
  messageData: WhatsAppTextMessage
) {
  const { accessToken, phoneNumberId } = config
  const { to, message } = messageData

  // Format phone number (remove spaces, dashes, and add country code if needed)
  const formattedPhone = formatPhoneNumber(to)

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: formattedPhone,
          type: "text",
          text: {
            preview_url: false,
            body: message,
          },
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error("WhatsApp API error:", data)
      throw new Error(`WhatsApp API error: ${JSON.stringify(data)}`)
    }

    return data
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error)
    throw error
  }
}

/**
 * Format phone number for WhatsApp API
 * WhatsApp requires format: country code + number (no spaces, dashes, or special chars)
 * Example: +919207855060 or 919207855060
 */
function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters except +
  let formatted = phone.replace(/[^\d+]/g, "")
  
  // If it doesn't start with +, add it
  if (!formatted.startsWith("+")) {
    // If it starts with country code (like 91 for India), add +
    // Otherwise assume it's an Indian number and add +91
    if (formatted.length > 10) {
      formatted = "+" + formatted
    } else {
      formatted = "+91" + formatted
    }
  }
  
  return formatted
}

/**
 * Get WhatsApp configuration from environment variables
 */
export function getWhatsAppConfig(): WhatsAppConfig {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const businessPhoneNumber = process.env.WHATSAPP_BUSINESS_NUMBER || "9207855060"

  if (!accessToken || !phoneNumberId) {
    throw new Error(
      "Missing WhatsApp credentials. Please set WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID environment variables."
    )
  }

  return {
    accessToken,
    phoneNumberId,
    businessPhoneNumber,
  }
}
