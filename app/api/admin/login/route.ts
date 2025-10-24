export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    const ADMIN_USERNAME = "admin"
    const ADMIN_PASSWORD = "12345"

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64")
      return Response.json({ token, success: true })
    }

    return Response.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Error during login:", error)
    return Response.json({ error: "Login failed" }, { status: 500 })
  }
}
