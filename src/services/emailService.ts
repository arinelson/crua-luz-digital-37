
export const sendConfirmationEmail = async (
  type: 'contact' | 'newsletter',
  email: string,
  language: string,
  name?: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      'https://dnzzuuxqlpswvemrvbzb.supabase.co/functions/v1/send-confirmation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          email,
          name,
          language,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Email service error:', errorData);
      return false;
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return false;
  }
};
