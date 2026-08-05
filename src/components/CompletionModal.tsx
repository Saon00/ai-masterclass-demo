import React, { useState } from 'react';
import { Award, RotateCcw, Printer, Sparkles, Download } from 'lucide-react';

interface CompletionModalProps {
  isOpen: boolean;
  onRestart: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onRestart
}) => {
  const [studentName, setStudentName] = useState<string>('Learner');
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownloadCertificate = () => {
    const certHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Certificate of Achievement - ${studentName || 'Learner'}</title>
  <style>
    @page { size: A4 landscape; margin: 0; }
    body {
      margin: 0;
      padding: 40px;
      background: #0f172a;
      color: #f8fafc;
      font-family: 'Georgia', serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .cert-card {
      width: 100%;
      max-w: 800px;
      border: 6px double #10b981;
      padding: 40px;
      border-radius: 20px;
      background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%);
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    .badge {
      font-family: sans-serif;
      font-size: 12px;
      letter-spacing: 3px;
      color: #818cf8;
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 15px;
    }
    h1 {
      font-size: 32px;
      margin: 10px 0;
      color: #ffffff;
    }
    .certified-text {
      font-size: 14px;
      color: #94a3b8;
      font-family: sans-serif;
      margin-top: 15px;
    }
    .student-name {
      font-size: 28px;
      color: #34d399;
      font-weight: bold;
      margin: 15px 0;
      text-decoration: underline;
    }
    .description {
      font-size: 14px;
      color: #cbd5e1;
      font-family: sans-serif;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #334155;
      display: flex;
      justify-content: space-between;
      font-family: sans-serif;
      font-size: 12px;
      color: #64748b;
    }
    @media print {
      body { background: white; color: black; }
      .cert-card { border-color: #059669; background: white; color: black; box-shadow: none; }
      .badge { color: #4f46e5; }
      h1 { color: #0f172a; }
      .student-name { color: #059669; }
      .description { color: #334155; }
    }
  </style>
</head>
<body>
  <div class="cert-card">
    <div class="badge">Official Certificate of Achievement</div>
    <h1>AI Fundamentals & Assessment Mastery</h1>
    <div class="certified-text">This is to certify that</div>
    <div class="student-name">${studentName || 'Learner'}</div>
    <p class="description">
      has successfully completed the AI Masterclass curriculum and demonstrated 100% mastery across Artificial Narrow vs General Intelligence, Machine Learning, Deep Neural Networks, Natural Language Processing, Computer Vision, and Ethical AI Governance.
    </p>
    <div class="footer">
      <span>Score: 10/10 Perfect Score (100%)</span>
      <span>Issued: ${new Date().toLocaleDateString()}</span>
    </div>
  </div>
  <script>
    window.onload = function() {
      // Auto-trigger print when opened as standalone file
      setTimeout(function() { window.print(); }, 500);
    };
  </script>
</body>
</html>`;

    const blob = new Blob([certHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificate_${(studentName || 'Learner').replace(/\s+/g, '_')}_AI_Masterclass.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintCertificate = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Certificate - ${studentName || 'Learner'}</title>
          <style>
            body { font-family: serif; padding: 40px; text-align: center; background: #0f172a; color: white; }
            .cert { border: 4px double #10b981; padding: 40px; border-radius: 12px; background: #020617; }
            h1 { color: #34d399; margin-bottom: 20px; }
            .name { font-size: 28px; font-weight: bold; color: #a7f3d0; margin: 20px 0; }
            p { font-family: sans-serif; color: #cbd5e1; max-width: 500px; margin: 0 auto; line-height: 1.5; }
            .footer { margin-top: 30px; border-top: 1px solid #334155; pt: 15px; font-family: sans-serif; font-size: 12px; display: flex; justify-content: space-between; }
          </style>
        </head>
        <body>
          <div class="cert">
            <h1>Certificate of Achievement</h1>
            <div>This certifies that</div>
            <div class="name">${studentName || 'Learner'}</div>
            <p>has passed the AI Masterclass Assessment with a 100% score in ANI/AGI, Machine Learning, Deep Learning, NLP, Vision, and AI Governance.</p>
            <div class="footer">
              <div>Score: 10 / 10</div>
              <div>Date: ${new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    } else {
      // Fallback if popup blocked
      handleDownloadCertificate();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-500/50 max-w-lg w-full rounded-2xl p-6 space-y-6 text-center shadow-2xl shadow-emerald-950/50 relative overflow-hidden">
        
        {/* Top Glow Accent */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-24 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        {!showCertificate ? (
          <>
            {/* Award Icon */}
            <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-500 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-xl shadow-emerald-950/80">
              <Award className="w-8 h-8" />
            </div>

            {/* Header */}
            <div>
              <h3 className="text-2xl font-bold text-emerald-200 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>Congratulations!</span>
              </h3>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                You have successfully answered all <strong className="text-emerald-400">10 questions correctly</strong> on the AI Assessment without errors!
              </p>
            </div>

            {/* Name Input for Certificate */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-left">
              <label className="text-xs font-semibold text-slate-300 block">
                Enter your name for the Masterclass Certificate:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => setShowCertificate(true)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs transition shadow-lg shadow-emerald-950/80 flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>View & Print Official Certificate</span>
              </button>

              <button
                onClick={onRestart}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl text-xs transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Masterclass Course</span>
              </button>
            </div>
          </>
        ) : (
          /* Certificate Preview View */
          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 border-2 border-emerald-500/80 rounded-2xl shadow-2xl text-center space-y-3 print:border-black print:bg-white print:text-black">
              <div className="text-indigo-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                Official Certificate of Achievement
              </div>
              <h2 className="text-xl font-black text-slate-100 font-serif">
                AI Fundamentals & Assessment Mastery
              </h2>
              <p className="text-[11px] text-slate-400">This is to certify that</p>
              <div className="text-lg font-bold text-emerald-300 underline underline-offset-4 font-serif">
                {studentName || 'Learner'}
              </div>
              <p className="text-[11px] text-slate-300 max-w-xs mx-auto leading-relaxed">
                has demonstrated complete mastery in ANI vs AGI, Machine Learning, Deep Neural Networks, NLP, Computer Vision, and Ethical AI Governance.
              </p>
              <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-800">
                <span>Score: 10/10 (100%)</span>
                <span>Date: {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowCertificate(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl"
              >
                Back
              </button>
              <button
                onClick={handleDownloadCertificate}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-md"
              >
                <Download className="w-3.5 h-3.5" /> Download Certificate
              </button>
              <button
                onClick={handlePrintCertificate}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-md"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save PDF
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
