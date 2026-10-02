import { jsPDF } from 'jspdf';
import { getDatabase } from '../db/store';

type RGB = [number, number, number];

// Palette shared with the website
const INK: RGB = [14, 11, 8];
const PAPER: RGB = [250, 247, 240];
const WALNUT: RGB = [33, 23, 17];
const BODY: RGB = [62, 48, 38];
const BRONZE: RGB = [166, 124, 82];
const GOLD: RGB = [193, 164, 119];
const PARCHMENT: RGB = [232, 220, 197];
const IVORY: RGB = [242, 233, 215];
const RULE: RGB = [216, 204, 182];

const PAGE_W = 210;
const PAGE_H = 297;
const SIDEBAR_W = 68;
const SIDE_X = 10;
const SIDE_W = SIDEBAR_W - SIDE_X * 2;
const MAIN_X = SIDEBAR_W + 12;
const MAIN_W = PAGE_W - MAIN_X - 14;
const TOP = 18;
const BOTTOM = PAGE_H - 20;

export async function generateResumePdfBuffer(): Promise<Buffer> {
  const db = getDatabase();
  const profile = db.profile;
  const education = db.education.filter(e => e.status === 'published').sort((a, b) => a.orderIndex - b.orderIndex);
  const experience = db.experience.filter(e => e.status === 'published').sort((a, b) => a.orderIndex - b.orderIndex);
  const skills = db.skills.filter(s => s.status === 'published').sort((a, b) => a.orderIndex - b.orderIndex);
  // Sample awards are for the website demo only and never go on the CV
  const achievements = db.achievements.filter(a => a.status === 'published' && !a.isDemo);

  const siteUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://jandyboiswebsite.vercel.app').replace(/^https?:\/\//, '');

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  doc.setProperties({
    title: `${profile.name} — Curriculum Vitae`,
    author: profile.name,
    subject: `${profile.title}, ${profile.institution}`,
  });

  const text = (color: RGB) => doc.setTextColor(color[0], color[1], color[2]);
  const stroke = (color: RGB) => doc.setDrawColor(color[0], color[1], color[2]);
  const fill = (color: RGB) => doc.setFillColor(color[0], color[1], color[2]);

  // Courier small caps label, letter-spaced like the site's mono labels
  const label = (value: string, x: number, yPos: number, color: RGB, align: 'left' | 'right' = 'left') => {
    doc.setFont('courier', 'bold');
    doc.setFontSize(7);
    text(color);
    const upper = value.toUpperCase();
    // jsPDF ignores charSpace when right-aligning, so measure and place it by hand
    const width = doc.getTextWidth(upper) + upper.length * 0.45;
    doc.text(upper, align === 'right' ? x - width : x, yPos, { charSpace: 0.45 });
    return width;
  };

  const paintPage = () => {
    fill(PAPER);
    doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
    fill(INK);
    doc.rect(0, 0, SIDEBAR_W, PAGE_H, 'F');
    // Brass edge between sidebar and page
    fill(BRONZE);
    doc.rect(SIDEBAR_W, 0, 0.6, PAGE_H, 'F');
  };

  // ---------------------------------------------------------------- sidebar
  paintPage();
  let sy = TOP;

  // Monogram with corner ticks
  const initial = (profile.displayName || profile.name).charAt(0).toUpperCase();
  stroke(GOLD);
  doc.setLineWidth(0.3);
  doc.rect(SIDE_X, sy, 13, 13);
  doc.setFont('times', 'italic');
  doc.setFontSize(20);
  text(GOLD);
  doc.text(initial, SIDE_X + 6.5, sy + 9.6, { align: 'center' });
  label('Curriculum', SIDE_X + 17, sy + 5, BRONZE);
  label('Vitae', SIDE_X + 17, sy + 9.5, BRONZE);
  sy += 26;

  // Name
  doc.setFont('times', 'normal');
  doc.setFontSize(25);
  text(IVORY);
  const nameLines: string[] = doc.splitTextToSize(profile.name, SIDE_W);
  nameLines.forEach((line, idx) => {
    if (idx === nameLines.length - 1 && nameLines.length > 1) {
      doc.setFont('times', 'italic');
      text(GOLD);
    }
    doc.text(line, SIDE_X, sy);
    sy += 9.5;
  });
  sy -= 2;

  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  text(PARCHMENT);
  doc.text(`"${profile.displayName}"`, SIDE_X, sy);
  sy += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  text(PARCHMENT);
  const titleLines: string[] = doc.splitTextToSize(profile.title, SIDE_W);
  doc.text(titleLines, SIDE_X, sy);
  sy += titleLines.length * 4.2 + 6;

  const sideSection = (title: string) => {
    stroke(BRONZE);
    doc.setLineWidth(0.2);
    doc.line(SIDE_X, sy, SIDE_X + SIDE_W, sy);
    sy += 5.5;
    label(title, SIDE_X, sy, GOLD);
    sy += 5.5;
  };

  const sideField = (name: string, value: string) => {
    if (!value) return;
    label(name, SIDE_X, sy, BRONZE);
    sy += 3.8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    text(PARCHMENT);
    const lines: string[] = doc.splitTextToSize(value, SIDE_W);
    doc.text(lines, SIDE_X, sy);
    sy += lines.length * 3.9 + 3;
  };

  sideSection('Contact');
  sideField('Institution', profile.institution);
  sideField('Location', profile.location);
  sideField('Email', profile.email);
  sideField('Telephone', profile.phone);
  sideField('Portfolio', siteUrl);
  sy += 2;

  if (education.length > 0) {
    sideSection('Qualifications');
    education.forEach(edu => {
      doc.setFont('times', 'bold');
      doc.setFontSize(10.5);
      text(IVORY);
      const lines: string[] = doc.splitTextToSize(edu.degree, SIDE_W);
      doc.text(lines, SIDE_X, sy);
      sy += lines.length * 4.4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      text(BRONZE);
      const fieldLines: string[] = doc.splitTextToSize(edu.field, SIDE_W);
      doc.text(fieldLines, SIDE_X, sy);
      sy += fieldLines.length * 3.7 + 3;
    });
    sy += 2;
  }

  if (skills.length > 0) {
    sideSection('Expertise');
    const categories = Array.from(new Set(skills.map(s => s.category)));
    categories.forEach(category => {
      label(category, SIDE_X, sy, BRONZE);
      sy += 4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      text(PARCHMENT);
      skills.filter(s => s.category === category).forEach(skill => {
        const lines: string[] = doc.splitTextToSize(skill.name, SIDE_W - 3);
        fill(GOLD);
        doc.rect(SIDE_X, sy - 1.6, 1, 1, 'F');
        doc.text(lines, SIDE_X + 3, sy);
        sy += lines.length * 3.9 + 1;
      });
      sy += 2.5;
    });
  }

  // ------------------------------------------------------------ main column
  let y = TOP + 3;
  let sectionNo = 0;

  const ensureSpace = (height: number) => {
    if (y + height <= BOTTOM) return;
    doc.addPage();
    paintPage();
    doc.setFont('times', 'italic');
    doc.setFontSize(11);
    text(GOLD);
    doc.text(profile.name, SIDE_X, TOP + 4);
    label('Curriculum Vitae', SIDE_X, TOP + 9, BRONZE);
    y = TOP + 3;
  };

  const section = (title: string) => {
    ensureSpace(22);
    sectionNo += 1;
    label(`${String(sectionNo).padStart(2, '0')} / ${title}`, MAIN_X, y, BRONZE);
    stroke(RULE);
    doc.setLineWidth(0.25);
    doc.line(MAIN_X, y + 2.2, MAIN_X + MAIN_W, y + 2.2);
    y += 9;
  };

  const paragraph = (value: string, opts: { font?: string; style?: string; size?: number; color?: RGB; indent?: number } = {}) => {
    const { font = 'helvetica', style = 'normal', size = 9.5, color = BODY, indent = 0 } = opts;
    const lineHeight = size * 0.47;
    doc.setFont(font, style);
    doc.setFontSize(size);
    const lines: string[] = doc.splitTextToSize(value, MAIN_W - indent);
    lines.forEach(line => {
      ensureSpace(lineHeight);
      // Font state is reset by ensureSpace when it starts a new page
      doc.setFont(font, style);
      doc.setFontSize(size);
      text(color);
      doc.text(line, MAIN_X + indent, y);
      y += lineHeight;
    });
  };

  const entryHeading = (title: string, meta: string) => {
    ensureSpace(16);
    const metaWidth = label(meta, MAIN_X + MAIN_W, y - 0.4, BRONZE, 'right') + 4;
    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    text(WALNUT);
    const lines: string[] = doc.splitTextToSize(title, MAIN_W - metaWidth);
    doc.text(lines, MAIN_X, y);
    y += lines.length * 5.4;
  };

  // Profile
  section('Profile');
  paragraph(profile.bio);
  y += 4;

  if (profile.philosophy) {
    ensureSpace(14);
    const startY = y - 3;
    paragraph(profile.philosophy, { font: 'times', style: 'italic', size: 10.5, color: WALNUT, indent: 5 });
    fill(BRONZE);
    doc.rect(MAIN_X, startY, 0.6, y - startY - 1.5, 'F');
    y += 6;
  }

  // Experience
  if (experience.length > 0) {
    section('Teaching Experience');
    experience.forEach(exp => {
      entryHeading(exp.role, exp.period);
      paragraph([exp.institution, exp.location].filter(Boolean).join('  ·  '), { style: 'bold', size: 9, color: BRONZE });
      y += 1.5;
      paragraph(exp.description);
      y += 1.5;
      (exp.responsibilities || []).forEach(resp => {
        ensureSpace(5);
        fill(BRONZE);
        doc.rect(MAIN_X + 0.5, y - 1.7, 1.1, 1.1, 'F');
        paragraph(resp, { size: 9, indent: 4.5 });
        y += 1;
      });
      y += 5;
    });
    y += 1;
  }

  // Education
  if (education.length > 0) {
    section('Education');
    education.forEach(edu => {
      entryHeading(`${edu.degree} — ${edu.field}`, edu.year);
      paragraph(edu.institution, { style: 'bold', size: 9, color: BRONZE });
      // Provisional entries only carry a placeholder note, which has no place on a CV
      if (!edu.isProvisional && edu.details) {
        y += 1.5;
        paragraph(edu.details, { size: 9 });
      }
      y += 5;
    });
    y += 1;
  }

  // Honours
  if (achievements.length > 0) {
    section('Honours & Recognition');
    achievements.forEach(ach => {
      entryHeading(ach.title, ach.year);
      paragraph(ach.issuer, { style: 'bold', size: 9, color: BRONZE });
      y += 1.5;
      paragraph(ach.description, { size: 9 });
      y += 5;
    });
  }

  // ----------------------------------------------------------------- footer
  const totalPages = doc.getNumberOfPages();
  const generated = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page);
    stroke(RULE);
    doc.setLineWidth(0.25);
    doc.line(MAIN_X, PAGE_H - 13, MAIN_X + MAIN_W, PAGE_H - 13);
    label(`Generated ${generated}`, MAIN_X, PAGE_H - 9, BRONZE);
    label(`Page ${page} / ${totalPages}`, MAIN_X + MAIN_W, PAGE_H - 9, BRONZE, 'right');
    label(siteUrl, SIDE_X, PAGE_H - 9, BRONZE);
  }

  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
