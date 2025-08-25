// Email configuration for form submissions
export const EMAIL_CONFIG = {
  TO: 'laundryzone.mongolia@gmail.com',
  SUBJECT_PREFIX: 'LaundryZone Website - ',
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
