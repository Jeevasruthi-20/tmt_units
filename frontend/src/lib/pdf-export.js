import { jsPDF } from "jspdf";
import { format } from "date-fns";

// Helper to draw a simple table manually since autotable is difficult to install in this environment
const drawManualTable = (doc, headers, rows, startY) => {
    const margin = 14;
    const colWidth = (doc.internal.pageSize.width - margin * 2) / headers.length;
    let currentY = startY;

    // Draw Header
    doc.setFont("helvetica", "bold");
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, currentY, doc.internal.pageSize.width - margin * 2, 10, "F");

    headers.forEach((header, i) => {
        doc.text(header, margin + i * colWidth + 2, currentY + 7);
    });

    currentY += 10;
    doc.setFont("helvetica", "normal");

    // Draw Rows
    rows.forEach((row) => {
        // Check for page break
        if (currentY > doc.internal.pageSize.height - 20) {
            doc.addPage();
            currentY = 20;
            // Redraw header on new page
            doc.setFont("helvetica", "bold");
            doc.setFillColor(240, 240, 240);
            doc.rect(margin, currentY, doc.internal.pageSize.width - margin * 2, 10, "F");
            headers.forEach((header, i) => {
                doc.text(header, margin + i * colWidth + 2, currentY + 7);
            });
            currentY += 10;
            doc.setFont("helvetica", "normal");
        }

        let rowHeight = 8;
        // Basic multi-line support for long text
        const linesArr = row.map(cell => doc.splitTextToSize(String(cell || ""), colWidth - 4));
        const maxHeightLines = Math.max(...linesArr.map(l => l.length));
        rowHeight = Math.max(8, maxHeightLines * 5);

        linesArr.forEach((lines, i) => {
            doc.text(lines, margin + i * colWidth + 2, currentY + 5);
        });

        doc.line(margin, currentY + rowHeight, doc.internal.pageSize.width - margin, currentY + rowHeight);
        currentY += rowHeight;
    });

    return currentY;
};

export const exportEnrollmentsPDF = (enrollments) => {
    const doc = new jsPDF("landscape");
    const dateStr = format(new Date(), "yyyy-MM-dd");

    doc.setFontSize(18);
    doc.text("Class Enrollments Report", 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${dateStr}`, 14, 22);

    const headers = ["Date", "Type", "Name", "Email", "Phone", "Class", "Details"];
    const rows = enrollments.map((enrollment) => [
        enrollment.createdAt ? format(new Date(enrollment.createdAt), "MMM d, yyyy") : "-",
        enrollment.type,
        enrollment.name,
        enrollment.email,
        enrollment.phone,
        enrollment.classType,
        enrollment.type === 'online'
            ? `${enrollment.preferredDate} @ ${enrollment.preferredTime}`
            : enrollment.message || "-"
    ]);

    drawManualTable(doc, headers, rows, 30);
    doc.save(`enrollments_${dateStr}.pdf`);
};

export const exportMeasurementsPDF = (measurements) => {
    const doc = new jsPDF("landscape");
    const dateStr = format(new Date(), "yyyy-MM-dd");

    doc.setFontSize(18);
    doc.text("Measurement Orders Report", 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${dateStr}`, 14, 22);

    const headers = ["Date", "Garment", "Customer", "Email", "Phone", "Measurements"];
    const rows = measurements.map((order) => {
        const mStr = Object.entries(order.measurements || {})
            .filter(([key]) => !key.endsWith('_inches') && key !== 'unit')
            .map(([key, val]) => `${key}: ${val}`)
            .join(", ");

        return [
            order.createdAt ? format(new Date(order.createdAt), "MMM d, yyyy") : "-",
            order.garmentType,
            order.customerName,
            order.email,
            order.phone,
            mStr
        ];
    });

    drawManualTable(doc, headers, rows, 30);
    doc.save(`measurements_${dateStr}.pdf`);
};

export const exportSingleEnrollmentPDF = (enrollment) => {
    const doc = new jsPDF("portrait");
    const dateStr = format(new Date(), "yyyy-MM-dd");

    doc.setFontSize(18);
    doc.text("Class Enrollment Details", 14, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${dateStr}`, 14, 28);
    
    doc.setLineWidth(0.5);
    doc.line(14, 32, 196, 32);

    let startY = 40;
    const lineHeight = 10;

    doc.setFont("helvetica", "bold");
    doc.text("Date:", 14, startY);
    doc.setFont("helvetica", "normal");
    doc.text(enrollment.createdAt ? format(new Date(enrollment.createdAt), "MMM d, yyyy h:mm a") : "-", 50, startY);
    startY += lineHeight;

    doc.setFont("helvetica", "bold");
    doc.text("Name:", 14, startY);
    doc.setFont("helvetica", "normal");
    doc.text(enrollment.name || "-", 50, startY);
    startY += lineHeight;
    
    doc.setFont("helvetica", "bold");
    doc.text("Email:", 14, startY);
    doc.setFont("helvetica", "normal");
    doc.text(enrollment.email || "-", 50, startY);
    startY += lineHeight;

    doc.setFont("helvetica", "bold");
    doc.text("Phone:", 14, startY);
    doc.setFont("helvetica", "normal");
    doc.text(enrollment.phone || "-", 50, startY);
    startY += lineHeight;

    doc.setFont("helvetica", "bold");
    doc.text("Type:", 14, startY);
    doc.setFont("helvetica", "normal");
    doc.text(enrollment.type || "-", 50, startY);
    startY += lineHeight;

    doc.setFont("helvetica", "bold");
    doc.text("Class Type:", 14, startY);
    doc.setFont("helvetica", "normal");
    doc.text(enrollment.classType || "-", 50, startY);
    startY += lineHeight;

    if (enrollment.type === 'online') {
        doc.setFont("helvetica", "bold");
        doc.text("Pref. Date:", 14, startY);
        doc.setFont("helvetica", "normal");
        doc.text(enrollment.preferredDate || "-", 50, startY);
        startY += lineHeight;

        doc.setFont("helvetica", "bold");
        doc.text("Pref. Time:", 14, startY);
        doc.setFont("helvetica", "normal");
        doc.text(enrollment.preferredTime || "-", 50, startY);
        startY += lineHeight;
    } else {
        doc.setFont("helvetica", "bold");
        doc.text("Message:", 14, startY);
        doc.setFont("helvetica", "normal");
        const msgLines = doc.splitTextToSize(enrollment.message || "-", 140);
        doc.text(msgLines, 50, startY);
        startY += (msgLines.length * 6) + 4;
    }

    doc.setFont("helvetica", "bold");
    doc.text("Status:", 14, startY);
    doc.setFont("helvetica", "normal");
    doc.text(enrollment.status || "-", 50, startY);

    doc.save(`enrollment_${enrollment.name?.replace(/\s+/g, '_') || 'export'}_${dateStr}.pdf`);
};

export const exportSingleMeasurementPDF = (order) => {
    const doc = new jsPDF("portrait");
    const dateStr = format(new Date(), "yyyy-MM-dd");

    doc.setFontSize(18);
    doc.text("Measurement Order Details", 14, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${dateStr}`, 14, 28);
    
    doc.setLineWidth(0.5);
    doc.line(14, 32, 196, 32);

    let startY = 40;
    const lineHeight = 10;

    doc.setFont("helvetica", "bold");
    doc.text("Order Date:", 14, startY);
    doc.setFont("helvetica", "normal");
    doc.text(order.createdAt ? format(new Date(order.createdAt), "MMM d, yyyy h:mm a") : "-", 60, startY);
    startY += lineHeight;

    doc.setFont("helvetica", "bold");
    doc.text("Customer:", 14, startY);
    doc.setFont("helvetica", "normal");
    doc.text(order.customerName || "-", 60, startY);
    startY += lineHeight;
    
    doc.setFont("helvetica", "bold");
    doc.text("Email:", 14, startY);
    doc.setFont("helvetica", "normal");
    doc.text(order.email || "-", 60, startY);
    startY += lineHeight;

    doc.setFont("helvetica", "bold");
    doc.text("Phone:", 14, startY);
    doc.setFont("helvetica", "normal");
    doc.text(order.phone || "-", 60, startY);
    startY += lineHeight;

    doc.setFont("helvetica", "bold");
    doc.text("Garment Type:", 14, startY);
    doc.setFont("helvetica", "normal");
    doc.text(order.garmentType || "-", 60, startY);
    startY += lineHeight;
    
    doc.setFont("helvetica", "bold");
    doc.text("Status:", 14, startY);
    doc.setFont("helvetica", "normal");
    doc.text(order.status || "-", 60, startY);
    startY += lineHeight + 5;

    doc.setLineWidth(0.2);
    doc.line(14, startY, 196, startY);
    startY += lineHeight;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Measurements", 14, startY);
    startY += lineHeight;

    doc.setFontSize(12);
    const unit = order.measurements?.unit === 'inches' ? 'in' : 'cm';
    
    Object.entries(order.measurements || {})
        .filter(([key]) => !key.endsWith('_inches') && key !== 'unit')
        .forEach(([key, val]) => {
            doc.setFont("helvetica", "bold");
            const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            doc.text(`${formattedKey}:`, 14, startY);
            doc.setFont("helvetica", "normal");
            doc.text(`${val} ${unit}`, 80, startY);
            startY += 8;

            if (startY > doc.internal.pageSize.height - 20) {
                doc.addPage();
                startY = 20;
            }
        });

    if (order.notes) {
        startY += 5;
        doc.setFont("helvetica", "bold");
        doc.text("Notes:", 14, startY);
        doc.setFont("helvetica", "normal");
        const noteLines = doc.splitTextToSize(order.notes, 150);
        doc.text(noteLines, 14, startY + 8);
    }

    doc.save(`measurement_${order.customerName?.replace(/\s+/g, '_') || 'export'}_${dateStr}.pdf`);
};
