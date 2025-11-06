import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message } = await request.json();
    
    const response = await fetch('https://dental.dsrt321.online/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from AI service');
    }

    const data = await response.json();
    
    // Log the response from the external API
    console.log('External API response:', data);
    
    // Format the response as per the required structure
    const formattedResponse = {
      message: data.message || 'I found the product you\'re looking for!',
      link: data.link || [],
      additional_message: data.additional_message || 'You can find more details in the links above.'
    };
    
    console.log('Formatted response:', formattedResponse);
    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process your message' },
      { status: 500 }
    );
  }
}
