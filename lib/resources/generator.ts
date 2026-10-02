import { jsPDF } from 'jspdf';

export function generateResourcePdfBuffer(slug: string, title: string, category: string, classLevel: string, language: string): Buffer {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // Background tint: antique ivory
  doc.setFillColor(250, 246, 238);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative double border
  doc.setDrawColor(166, 124, 82);
  doc.setLineWidth(0.7);
  doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - (margin - 4) * 2);

  doc.setDrawColor(193, 164, 119);
  doc.setLineWidth(0.3);
  doc.rect(margin - 2, margin - 2, contentWidth + 4, pageHeight - (margin - 2) * 2);

  let y = margin + 10;

  // Header Colophon
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(166, 124, 82);
  doc.text('SRJC THANE — DEPARTMENT OF BIOLOGICAL SCIENCES & NATURAL HISTORY', pageWidth / 2, y, { align: 'center' });

  y += 7;

  // Title
  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(33, 23, 17);
  const titleLines = doc.splitTextToSize(title, contentWidth - 10);
  doc.text(titleLines, pageWidth / 2, y, { align: 'center' });
  y += titleLines.length * 7 + 2;

  // Metadata ribbon
  doc.setFont('times', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(115, 115, 78);
  doc.text(`Faculty: Prof. Janardhan Aghav (Jandy) | Category: ${category} | Level: ${classLevel} | Lang: ${language}`, pageWidth / 2, y, { align: 'center' });

  y += 6;
  doc.setDrawColor(166, 124, 82);
  doc.setLineWidth(0.4);
  doc.line(margin + 5, y, pageWidth - margin - 5, y);
  y += 8;

  // Content body
  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(166, 124, 82);
  doc.text('1. CORE THEORETICAL PRINCIPLES & SYLLABUS DIRECTIVES', margin, y);
  y += 6;

  doc.setFont('times', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(33, 23, 17);

  const introText = `This study folio has been curated by Prof. Janardhan Aghav for students preparing for the Maharashtra State Board HSC examination and the National Eligibility cum Entrance Test (NEET-UG). 

In biological sciences, conceptual diagrams and structural mechanisms are paramount. Students are advised to practice redrawing all associated anatomical and biochemical cycle diagrams twice weekly with correct scientific terminology and labeling.`;

  const introLines = doc.splitTextToSize(introText, contentWidth);
  doc.text(introLines, margin, y);
  y += introLines.length * 5 + 6;

  // Section 2
  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(166, 124, 82);
  doc.text('2. HIGH-YIELD CHECKPOINTS & FREQUENTLY TESTED QUESTIONS', margin, y);
  y += 6;

  doc.setFont('times', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(33, 23, 17);

  const points = [
    'Checkpoint I: Distinguish with precise anatomical differentiation between primary and secondary tissue systems or pathway phases.',
    'Checkpoint II: Trace the stoichiometric flow of ATP, NADPH2, or ionic gradients across membranous compartments (e.g., thylakoid membrane or mitochondrial cristae).',
    'Checkpoint III: Eliminate distractor choices in multiple-choice questions by scrutinizing limiting reagents, feedback inhibition, and evolutionary adaptations.',
    'Checkpoint IV: Maharashtra State Board evaluation mandates legible line diagrams with directional arrows indicating flow of circulation or nerve impulse transmission.'
  ];

  points.forEach(p => {
    const pLines = doc.splitTextToSize(p, contentWidth - 4);
    doc.text(pLines, margin + 2, y);
    y += pLines.length * 4.8 + 2;
  });

  y += 4;

  // Diagram placeholder box
  doc.setDrawColor(166, 124, 82);
  doc.setLineWidth(0.3);
  doc.setFillColor(243, 237, 226);
  doc.rect(margin + 5, y, contentWidth - 10, 45, 'FD');

  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(115, 115, 78);
  doc.text('— [SCHEMATIC ANNOTATION: Refer to classroom blackboard illustration and lab manual folio] —', pageWidth / 2, y + 20, { align: 'center' });
  doc.text('Labeling Checklist: Lumen | Outer Membrane | Transport Complexes | Substrate Binding Site', pageWidth / 2, y + 26, { align: 'center' });

  y += 52;

  // Section 3: Diagnostic Exercise
  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(166, 124, 82);
  doc.text('3. SELF-ASSESSMENT PRACTICE PROBLEM', margin, y);
  y += 6;

  doc.setFont('times', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(33, 23, 17);

  const practiceText = 'Question: Analyze how a disruption in cellular hydrogen ion concentration gradients alters chemiosmotic phosphorylation. State the regulatory enzyme involved and predict the consequential output changes under both aerobic and hypoxic conditions. [3 Marks]';
  const practiceLines = doc.splitTextToSize(practiceText, contentWidth);
  doc.text(practiceLines, margin, y);

  // Footer Colophon
  doc.setFont('times', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(166, 124, 82);
  doc.text(
    `Classroom Handout & Examination Archive • SRJC Thane • Janardhan Aghav • Folio ID: ${slug.toUpperCase()}`,
    pageWidth / 2,
    pageHeight - margin + 2,
    { align: 'center' }
  );

  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
