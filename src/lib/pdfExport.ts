import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CandidateAnalysis } from '@/data/mockData';

const levelLabels: Record<string, string> = {
  estagiario: 'Estagiário',
  assistente: 'Assistente',
  junior: 'Júnior',
  pleno: 'Pleno',
  senior: 'Sênior',
  especialista: 'Especialista',
  lider: 'Líder',
  coordenador: 'Coordenador',
  gerente: 'Gerente',
  diretor: 'Diretor',
  executivo: 'Executivo',
};

export async function exportAnalysisToPDF(analysis: CandidateAnalysis): Promise<void> {
  try {
    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    let yPosition = margin;

    // Helper to add new page if needed
    const checkNewPage = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    // Colors
    const primaryColor = '#6366f1';
    const textColor = '#1f2937';
    const mutedColor = '#6b7280';
    const successColor = '#10b981';

    // Header - Company Logo/Name
    pdf.setFillColor(99, 102, 241);
    pdf.rect(0, 0, pageWidth, 25, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SELETO AI', margin, 15);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Análise de Currículo com Inteligência Artificial', margin, 21);

    yPosition = 35;

    // Candidate Info
    pdf.setTextColor(textColor);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(analysis.candidate.name, margin, yPosition);
    yPosition += 8;

    if (analysis.target_role) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(mutedColor);
      pdf.text(analysis.target_role, margin, yPosition);
      yPosition += 8;
    }

    // Contact Info
    pdf.setFontSize(9);
    pdf.setTextColor(mutedColor);
    const contactInfo: string[] = [];
    if (analysis.candidate.email) contactInfo.push(`Email: ${analysis.candidate.email}`);
    if (analysis.candidate.phone) contactInfo.push(`Tel: ${analysis.candidate.phone}`);
    if (analysis.candidate.location) contactInfo.push(`Local: ${analysis.candidate.location}`);
    
    contactInfo.forEach((info) => {
      pdf.text(info, margin, yPosition);
      yPosition += 5;
    });

    yPosition += 5;

    // Score Box
    pdf.setDrawColor(99, 102, 241);
    pdf.setFillColor(240, 240, 255);
    pdf.roundedRect(margin, yPosition, 50, 25, 3, 3, 'FD');
    pdf.setFontSize(10);
    pdf.setTextColor(mutedColor);
    pdf.text('Score Geral', margin + 25, yPosition + 8, { align: 'center' });
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(primaryColor);
    pdf.text(`${analysis.fit_score}`, margin + 25, yPosition + 19, { align: 'center' });

    // Seniority Box
    pdf.setDrawColor(16, 185, 129);
    pdf.setFillColor(240, 253, 244);
    pdf.roundedRect(margin + 55, yPosition, 65, 25, 3, 3, 'FD');
    pdf.setFontSize(10);
    pdf.setTextColor(mutedColor);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Nível de Senioridade', margin + 87.5, yPosition + 8, { align: 'center' });
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(successColor);
    pdf.text(levelLabels[analysis.seniority_level] || analysis.seniority_level, margin + 87.5, yPosition + 15, { align: 'center' });
    pdf.setFontSize(9);
    pdf.setTextColor(mutedColor);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Score: ${analysis.seniority_score}%`, margin + 87.5, yPosition + 21, { align: 'center' });

    yPosition += 35;

    // Executive Summary
    checkNewPage(30);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(textColor);
    pdf.text('Resumo Executivo', margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(textColor);
    const summaryText = pdf.splitTextToSize(analysis.summary.executiveSummary, pageWidth - 2 * margin);
    pdf.text(summaryText, margin, yPosition);
    yPosition += summaryText.length * 5 + 5;

    // Strengths
    checkNewPage(30);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(successColor);
    pdf.text('✓ Pontos Fortes', margin, yPosition);
    yPosition += 7;

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(textColor);
    analysis.summary.strengths.forEach((strength) => {
      checkNewPage(10);
      const strengthText = pdf.splitTextToSize(`• ${strength}`, pageWidth - 2 * margin - 5);
      pdf.text(strengthText, margin + 5, yPosition);
      yPosition += strengthText.length * 5 + 2;
    });

    yPosition += 5;

    // Attention Points
    checkNewPage(30);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 100, 100);
    pdf.text('⚠ Pontos de Atenção', margin, yPosition);
    yPosition += 7;

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(textColor);
    analysis.summary.attentionPoints.forEach((point) => {
      checkNewPage(10);
      const pointText = pdf.splitTextToSize(`• ${point}`, pageWidth - 2 * margin - 5);
      pdf.text(pointText, margin + 5, yPosition);
      yPosition += pointText.length * 5 + 2;
    });

    yPosition += 10;

    // Soft Skills
    checkNewPage(40);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(textColor);
    pdf.text('Soft Skills', margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    const softSkillsEntries = Object.entries(analysis.soft_skills).sort((a, b) => b[1] - a[1]);
    softSkillsEntries.forEach(([skill, score]) => {
      checkNewPage(8);
      const skillName = skill.charAt(0).toUpperCase() + skill.slice(1).replace(/([A-Z])/g, ' $1');
      pdf.setTextColor(textColor);
      pdf.text(skillName, margin, yPosition);
      
      // Progress bar
      const barWidth = 60;
      const barHeight = 4;
      pdf.setDrawColor(200, 200, 200);
      pdf.setFillColor(240, 240, 240);
      pdf.roundedRect(margin + 60, yPosition - 3, barWidth, barHeight, 1, 1, 'FD');
      
      // Fill
      const fillWidth = (score / 100) * barWidth;
      pdf.setFillColor(99, 102, 241);
      pdf.roundedRect(margin + 60, yPosition - 3, fillWidth, barHeight, 1, 1, 'F');
      
      // Score
      pdf.setTextColor(mutedColor);
      pdf.text(`${score}`, margin + 125, yPosition);
      
      yPosition += 7;
    });

    yPosition += 5;

    // Hard Skills
    checkNewPage(40);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(textColor);
    pdf.text('Hard Skills', margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    const hardSkillsEntries = Object.entries(analysis.hard_skills).sort((a, b) => b[1] - a[1]);
    hardSkillsEntries.forEach(([skill, score]) => {
      checkNewPage(8);
      const skillName = skill.charAt(0).toUpperCase() + skill.slice(1).replace(/([A-Z])/g, ' $1');
      pdf.setTextColor(textColor);
      pdf.text(skillName, margin, yPosition);
      
      // Progress bar
      const barWidth = 60;
      const barHeight = 4;
      pdf.setDrawColor(200, 200, 200);
      pdf.setFillColor(240, 240, 240);
      pdf.roundedRect(margin + 60, yPosition - 3, barWidth, barHeight, 1, 1, 'FD');
      
      // Fill
      const fillWidth = (score / 100) * barWidth;
      pdf.setFillColor(245, 158, 11);
      pdf.roundedRect(margin + 60, yPosition - 3, fillWidth, barHeight, 1, 1, 'F');
      
      // Score
      pdf.setTextColor(mutedColor);
      pdf.text(`${score}`, margin + 125, yPosition);
      
      yPosition += 7;
    });

    yPosition += 10;

    // Experience
    if (analysis.experience && analysis.experience.length > 0) {
      checkNewPage(40);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(textColor);
      pdf.text('Experiência Profissional', margin, yPosition);
      yPosition += 8;

      analysis.experience.forEach((exp) => {
        checkNewPage(25);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(primaryColor);
        pdf.text(exp.role, margin, yPosition);
        yPosition += 6;

        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(textColor);
        pdf.text(`${exp.company} • ${exp.period}`, margin, yPosition);
        yPosition += 6;

        if (exp.highlights && exp.highlights.length > 0) {
          pdf.setFontSize(8);
          pdf.setTextColor(mutedColor);
          exp.highlights.forEach((highlight) => {
            checkNewPage(8);
            const highlightText = pdf.splitTextToSize(`• ${highlight}`, pageWidth - 2 * margin - 5);
            pdf.text(highlightText, margin + 5, yPosition);
            yPosition += highlightText.length * 4 + 2;
          });
        }
        yPosition += 5;
      });
    }

    // Education
    if (analysis.education && analysis.education.length > 0) {
      checkNewPage(40);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(textColor);
      pdf.text('Formação Acadêmica', margin, yPosition);
      yPosition += 8;

      analysis.education.forEach((edu) => {
        checkNewPage(15);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(primaryColor);
        pdf.text(`${edu.degree} em ${edu.field}`, margin, yPosition);
        yPosition += 6;

        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(textColor);
        pdf.text(`${edu.institution} • ${edu.year}`, margin, yPosition);
        yPosition += 8;
      });
    }

    // Languages
    if (analysis.languages && analysis.languages.length > 0) {
      checkNewPage(30);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(textColor);
      pdf.text('Idiomas', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      analysis.languages.forEach((lang) => {
        checkNewPage(7);
        pdf.setTextColor(textColor);
        pdf.text(`${lang.language}:`, margin, yPosition);
        pdf.setTextColor(mutedColor);
        pdf.text(lang.level.charAt(0).toUpperCase() + lang.level.slice(1), margin + 30, yPosition);
        yPosition += 6;
      });
    }

    // Footer on all pages
    const totalPages = (pdf as any).internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(mutedColor);
      pdf.text(
        `Gerado por Seleto AI em ${new Date().toLocaleDateString('pt-BR')}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
      pdf.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
    }

    // Save the PDF
    const fileName = `analise_${analysis.candidate.name.replace(/\s+/g, '_').toLowerCase()}_${new Date().getTime()}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error('Não foi possível gerar o PDF. Por favor, tente novamente.');
  }
}
