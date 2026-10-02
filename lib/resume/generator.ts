import { jsPDF } from 'jspdf';
import { getDatabase } from '../db/store';

export async function generateResumePdfBuffer(): Promise<Buffer> {
  const db = getDatabase();
  const profile = db.profile;
  const education = db.education.filter(e => e.status === 'published').sort((a, b) => a.orderIndex - b.orderIndex);
  const experience = db.experience.filter(e => e.status === 'published').sort((a, b) => a.orderIndex - b.orderIndex);
  const skills = db.skills.filter(s => s.status === 'published').sort((a, b) => a.orderIndex - b.orderIndex);
  const achievements = db.achievements.filter(a => a.status === 'published');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Background tint: warm antique parchment
  doc.setFillColor(248, 244, 235);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Double decorative border
  doc.setDrawColor(166, 124, 82); // Antique bronze
  doc.setLineWidth(0.8);
  doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - (margin - 4) * 2);

  doc.setDrawColor(193, 164, 119); // Muted gold
  doc.setLineWidth(0.3);
  doc.rect(margin - 2, margin - 2, contentWidth + 4, pageHeight - (margin - 2) * 2);

  let y = margin + 8;

  // Header Colophon
  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(166, 124, 82);
  doc.text('ACADEMIC CURRICULUM VITAE & SCHOLASTIC FOLIO — FACULTY OF LIFE SCIENCES', pageWidth / 2, y, { align: 'center' });

  y += 8;

  // Name
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(33, 23, 17); // Deep walnut brown
  doc.text(`${profile.name.toUpperCase()} (${profile.displayName.toUpperCase()})`, pageWidth / 2, y, { align: 'center' });

  y += 6;

  // Title & Institution
  doc.setFont('times', 'italic');
  doc.setFontSize(12);
  doc.setTextColor(115, 115, 78); // Muted olive
  doc.text(`${profile.title} • ${profile.institution}`, pageWidth / 2, y, { align: 'center' });

  y += 5;

  // Contact details
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(48, 33, 23);
  doc.text(`${profile.location}  |  Email: ${profile.email}  |  Tel: ${profile.phone}`, pageWidth / 2, y, { align: 'center' });

  y += 4;

  // Decorative Rule
  doc.setDrawColor(166, 124, 82);
  doc.setLineWidth(0.5);
  doc.line(margin + 10, y, pageWidth - margin - 10, y);

  y += 7;

  // Helper function for section headings
  function renderSectionHeader(title: string) {
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(166, 124, 82);
    doc.text(title.toUpperCase(), margin, y);
    doc.setDrawColor(193, 164, 119);
    doc.setLineWidth(0.2);
    doc.line(margin, y + 1.5, pageWidth - margin, y + 1.5);
    y += 6;
  }

  // Summary / Philosophy
  renderSectionHeader('I. Professional Summary & Educational Ethos');
  doc.setFont('times', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(33, 23, 17);
  const bioLines = doc.splitTextToSize(profile.bio, contentWidth);
  doc.text(bioLines, margin, y);
  y += bioLines.length * 4.5 + 4;

  // Academic Qualifications
  renderSectionHeader('II. Scholastic Qualifications & Degrees');
  education.forEach(edu => {
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(33, 23, 17);
    doc.text(`${edu.degree} — ${edu.field}`, margin, y);
    
    doc.setFont('times', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(115, 115, 78);
    doc.text(edu.year, pageWidth - margin, y, { align: 'right' });
    y += 4.5;

    doc.setFont('times', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(70, 50, 35);
    doc.text(`${edu.institution}${edu.isProvisional ? ' (Provisional verification pending)' : ''}`, margin, y);
    y += 4;

    const detailLines = doc.splitTextToSize(edu.details, contentWidth);
    doc.text(detailLines, margin, y);
    y += detailLines.length * 4 + 3;
  });

  // Teaching Chronicles
  y += 1;
  renderSectionHeader('III. Pedagogical Experience & Institutional Appointments');
  experience.forEach(exp => {
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(33, 23, 17);
    doc.text(`${exp.role} — ${exp.institution}`, margin, y);

    doc.setFont('times', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(115, 115, 78);
    doc.text(exp.period, pageWidth - margin, y, { align: 'right' });
    y += 4.5;

    doc.setFont('times', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(70, 50, 35);
    doc.text(exp.location, margin, y);
    y += 4;

    const descLines = doc.splitTextToSize(exp.description, contentWidth);
    doc.text(descLines, margin, y);
    y += descLines.length * 4;

    if (exp.responsibilities && exp.responsibilities.length > 0) {
      exp.responsibilities.slice(0, 3).forEach(resp => {
        doc.text(`• ${resp}`, margin + 3, y);
        y += 4;
      });
    }
    y += 2;
  });

  // Domains of Expertise
  y += 1;
  renderSectionHeader('IV. Domains of Scientific Mastery');
  const skillNames = skills.map(s => `• ${s.name} (${s.category})`);
  const col1 = skillNames.slice(0, 4);
  const col2 = skillNames.slice(4, 8);

  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(33, 23, 17);
  
  const skillStartY = y;
  col1.forEach((s, idx) => {
    doc.text(s, margin, skillStartY + idx * 4.2);
  });
  col2.forEach((s, idx) => {
    doc.text(s, margin + contentWidth / 2, skillStartY + idx * 4.2);
  });
  y += Math.max(col1.length, col2.length) * 4.2 + 5;

  // Honours & Achievements
  renderSectionHeader('V. Scholastic Milestones & Recognitions');
  achievements.forEach(ach => {
    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(33, 23, 17);
    doc.text(`• ${ach.title} — ${ach.issuer} (${ach.year})`, margin, y);
    y += 4;
    doc.setFont('times', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(90, 70, 50);
    const achLines = doc.splitTextToSize(ach.description, contentWidth - 5);
    doc.text(achLines, margin + 4, y);
    y += achLines.length * 3.8 + 2;
  });

  // Colophon Footer
  doc.setFont('times', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(166, 124, 82);
  doc.text(
    `Official Academic Dossier • Janardhan Aghav (Jandy) • SRJC, Thane • Generated ${new Date().toLocaleDateString('en-GB')}`,
    pageWidth / 2,
    pageHeight - margin + 1,
    { align: 'center' }
  );

  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
