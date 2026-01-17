import { NextRequest, NextResponse } from "next/server"

const CAL_API_KEY = process.env.CAL_API_KEY
const CAL_API_BASE = "https://api.cal.com/v2"

// GET - Fetch availability or event types
export async function GET(request: NextRequest) {
  if (!CAL_API_KEY) {
    return NextResponse.json(
      { error: "Cal.com API key not configured" },
      { status: 500 }
    )
  }

  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get("endpoint")

  if (!endpoint) {
    return NextResponse.json(
      { error: "Endpoint parameter required" },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(`${CAL_API_BASE}/${endpoint}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${CAL_API_KEY}`,
        "Content-Type": "application/json",
        "cal-api-version": "2024-08-13",
      },
    })

    if (!response.ok) {
      const error = await response.text()
      return NextResponse.json(
        { error: `Cal.com API error: ${error}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Cal.com API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch from Cal.com API" },
      { status: 500 }
    )
  }
}

// POST - Create a booking or other resources
export async function POST(request: NextRequest) {
  if (!CAL_API_KEY) {
    return NextResponse.json(
      { error: "Cal.com API key not configured" },
      { status: 500 }
    )
  }

  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get("endpoint")

  if (!endpoint) {
    return NextResponse.json(
      { error: "Endpoint parameter required" },
      { status: 400 }
    )
  }

  try {
    const body = await request.json()
    
    const response = await fetch(`${CAL_API_BASE}/${endpoint}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CAL_API_KEY}`,
        "Content-Type": "application/json",
        "cal-api-version": "2024-08-13",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.text()
      return NextResponse.json(
        { error: `Cal.com API error: ${error}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Cal.com API error:", error)
    return NextResponse.json(
      { error: "Failed to post to Cal.com API" },
      { status: 500 }
    )
  }
}
