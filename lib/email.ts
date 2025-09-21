// Email configuration for form submissions
export const EMAIL_CONFIG = {
  TO: 'laundryzone.info@gmail.com',
  SUBJECT_PREFIX: 'LaundryZone Website - ',
  API_ENDPOINT: '/api/contact',
  FRANCHISE_API_ENDPOINT: '/api/franchise',
};

// Send email using API endpoint
export const sendEmailViaAPI = async (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  try {
    const response = await fetch(EMAIL_CONFIG.API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }

    return result;
  } catch (error) {
    console.error('API email sending error:', error);
    throw error;
  }
};

// Send franchise email using API endpoint
export const sendFranchiseEmailViaAPI = async (data: {
  name: string;
  email: string;
  phone: string;
  city: string;
  budget: string;
  message: string;
}) => {
  try {
    const response = await fetch(EMAIL_CONFIG.FRANCHISE_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send franchise email');
    }

    return result;
  } catch (error) {
    console.error('Franchise API email sending error:', error);
    throw error;
  }
};

// Email templates
export const createContactEmail = (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  const subject = `${EMAIL_CONFIG.SUBJECT_PREFIX}Contact Form Submission from ${data.name}`;
  const body = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Message: ${data.message}

---
This message was sent from the LaundryZone website contact form.
Generated on: ${new Date().toLocaleString()}
  `.trim();

  return { subject, body };
};

export const createFranchiseEmail = (data: {
  name: string;
  email: string;
  phone: string;
  city: string;
  budget: string;
  message: string;
}) => {
  const subject = `${EMAIL_CONFIG.SUBJECT_PREFIX}Franchise Inquiry from ${data.name}`;
  const body = `
New Franchise Inquiry

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
City: ${data.city}
Budget Range: ${data.budget}
Message: ${data.message}

---
This message was sent from the LaundryZone website franchise inquiry form.
Generated on: ${new Date().toLocaleString()}
  `.trim();

  return { subject, body };
};

// Function to send email using mailto link
export const sendEmailViaMailto = (to: string, subject: string, body: string) => {
  const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink, '_blank');
};
