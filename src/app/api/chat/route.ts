/**
 * Chat API Route
 * Handles chat messages and AI responses
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId } = await request.json();

    // Basic validation
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Mock AI response for now
    const aiResponse = {
      id: Date.now().toString(),
      content: `شكراً لرسالتك: "${message}". هذا رد تجريبي من المساعد الذكي. سيتم تطوير وظائف الذكاء الاصطناعي في المستقبل.`,
      role: 'assistant',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: aiResponse,
      conversationId: conversationId || Date.now().toString(),
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Chat API is running',
    version: '1.0.0',
    endpoints: {
      POST: '/api/chat - Send a chat message',
    },
  });
}