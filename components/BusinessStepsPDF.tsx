'use client';

import { useTranslations } from 'next-intl';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface BusinessStepsPDFProps {
  locale: string;
}

export function BusinessStepsPDF({ locale }: BusinessStepsPDFProps) {
  const t = useTranslations();

  const generatePDF = async () => {
    const businessSteps = [
      {
        number: "01",
        title: t('business_steps.step_01.title'),
        items: [
          t('business_steps.step_01.items.0'),
          t('business_steps.step_01.items.1'),
          t('business_steps.step_01.items.2'),
          t('business_steps.step_01.items.3')
        ],
        note: t('business_steps.step_01.note')
      },
      {
        number: "02",
        title: t('business_steps.step_02.title'),
        items: [
          t('business_steps.step_02.items.0'),
          t('business_steps.step_02.items.1'),
          t('business_steps.step_02.items.2'),
          t('business_steps.step_02.items.3')
        ],
        note: t('business_steps.step_02.note')
      },
      {
        number: "03",
        title: t('business_steps.step_03.title'),
        items: [
          t('business_steps.step_03.items.0'),
          t('business_steps.step_03.items.1'),
          t('business_steps.step_03.items.2'),
          t('business_steps.step_03.items.3')
        ],
        note: t('business_steps.step_03.note')
      },
      {
        number: "04",
        title: t('business_steps.step_04.title'),
        items: [
          t('business_steps.step_04.items.0'),
          t('business_steps.step_04.items.1'),
          t('business_steps.step_04.items.2'),
          t('business_steps.step_04.items.3')
        ],
        note: t('business_steps.step_04.note')
      },
      {
        number: "05",
        title: t('business_steps.step_05.title'),
        items: [
          t('business_steps.step_05.items.0'),
          t('business_steps.step_05.items.1'),
          t('business_steps.step_05.items.2')
        ],
        note: t('business_steps.step_05.note')
      },
      {
        number: "06",
        title: t('business_steps.step_06.title'),
        items: [
          t('business_steps.step_06.items.0'),
          t('business_steps.step_06.items.1'),
          t('business_steps.step_06.items.2'),
          t('business_steps.step_06.items.3')
        ],
        note: t('business_steps.step_06.note')
      },
      {
        number: "07",
        title: t('business_steps.step_07.title'),
        items: [
          t('business_steps.step_07.items.0'),
          t('business_steps.step_07.items.1'),
          t('business_steps.step_07.items.2')
        ],
        note: t('business_steps.step_07.note')
      },
      {
        number: "08",
        title: t('business_steps.step_08.title'),
        items: [
          t('business_steps.step_08.items.0'),
          t('business_steps.step_08.items.1'),
          t('business_steps.step_08.items.2'),
          t('business_steps.step_08.items.3')
        ],
        note: t('business_steps.step_08.note')
      }
    ];

    // Create a temporary div to render the content
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '800px';
    tempDiv.style.padding = '40px';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    tempDiv.style.fontSize = '12px';
    tempDiv.style.lineHeight = '1.4';
    tempDiv.style.color = '#000';
    tempDiv.style.backgroundColor = '#fff';

    // Create the PDF content
    tempDiv.innerHTML = `
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #f97316; font-size: 28px; margin-bottom: 10px;">LaundryZone</h1>
        <h2 style="color: #374151; font-size: 20px; margin-bottom: 5px;">${t('franchise.title')}</h2>
        <p style="color: #6b7280; font-size: 14px;">${t('franchise.subtitle')}</p>
      </div>
      
      <h3 style="color: #f97316; font-size: 18px; margin-bottom: 20px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
        ${t('nav.franchise_items.business_start_steps')}
      </h3>
      
      ${businessSteps.map((step, index) => `
        <div style="margin-bottom: 30px; page-break-inside: avoid;">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <div style="background: #f97316; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px;">
              ${step.number}
            </div>
            <h4 style="color: #374151; font-size: 16px; margin: 0; flex: 1;">${step.title}</h4>
          </div>
          
          <div style="margin-left: 55px;">
            <ul style="margin: 0 0 15px 0; padding-left: 20px;">
              ${step.items.map(item => `<li style="margin-bottom: 8px;">${item}</li>`).join('')}
            </ul>
            
            <div style="background: #f3f4f6; padding: 15px; border-left: 4px solid #f97316; border-radius: 4px;">
              <p style="margin: 0; font-style: italic; color: #6b7280;"><strong>${locale === 'mn' ? 'Тайлбар:' : locale === 'kr' ? '설명:' : 'Note:'}</strong> ${step.note}</p>
            </div>
          </div>
        </div>
      `).join('')}
      
      <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
        <p>${t('franchise.contact_info') || 'Generated by LaundryZone Franchise System'}</p>
        <p>${new Date().toLocaleDateString(locale === 'mn' ? 'mn-MN' : locale === 'kr' ? 'ko-KR' : 'en-US')}</p>
      </div>
    `;

    document.body.appendChild(tempDiv);

    try {
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: 800,
        height: tempDiv.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      const fileName = `LaundryZone_Franchise_Business_Steps_${locale.toUpperCase()}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      document.body.removeChild(tempDiv);
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <Download size={20} className="group-hover:scale-110 transition-transform" />
      {locale === 'mn' ? 'Франчайзын мэдээлэл татах' : locale === 'kr' ? '프랜차이즈 정보 다운로드' : 'Download Franchise Information'}
    </button>
  );
}
