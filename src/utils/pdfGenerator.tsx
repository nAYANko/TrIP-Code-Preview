
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Tables } from '@/integrations/supabase/types';

type Trip = Tables<'trips'>;
type Activity = Tables<'activities'>;

interface TripData {
  trip: Trip;
  activities: Activity[];
}

export const generateTripPDF = async (tripData: TripData) => {
  const { trip, activities } = tripData;
  
  // Create PDF
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Add title
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(trip.name, 20, 30);
  
  // Add destination
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Destination: ${trip.destination}`, 20, 45);
  
  // Add dates
  const startDate = new Date(trip.start_date).toLocaleDateString();
  const endDate = new Date(trip.end_date).toLocaleDateString();
  pdf.text(`Dates: ${startDate} - ${endDate}`, 20, 60);
  
  // Group activities by day
  const activitiesByDay: { [key: number]: Activity[] } = {};
  activities.forEach(activity => {
    if (!activitiesByDay[activity.day_number]) {
      activitiesByDay[activity.day_number] = [];
    }
    activitiesByDay[activity.day_number].push(activity);
  });
  
  let yPosition = 80;
  
  // Add activities for each day
  Object.entries(activitiesByDay).forEach(([dayNumber, dayActivities]) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 50) {
      pdf.addPage();
      yPosition = 20;
    }
    
    // Day header
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Day ${dayNumber}`, 20, yPosition);
    yPosition += 20;
    
    // Activities for this day
    dayActivities.forEach(activity => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${activity.start_time} - ${activity.end_time}`, 25, yPosition);
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(activity.title, 25, yPosition + 10);
      pdf.text(`Location: ${activity.location}`, 25, yPosition + 20);
      
      // Add Google Maps link if coordinates are available
      if (activity.latitude && activity.longitude) {
        const mapsUrl = `https://www.google.com/maps?q=${activity.latitude},${activity.longitude}`;
        pdf.setTextColor(0, 0, 255);
        pdf.text('View on Google Maps', 25, yPosition + 30);
        pdf.link(25, yPosition + 25, 80, 10, { url: mapsUrl });
        pdf.setTextColor(0, 0, 0);
        yPosition += 40;
      } else {
        yPosition += 30;
      }
      
      if (activity.notes) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'italic');
        const lines = pdf.splitTextToSize(activity.notes, pageWidth - 50);
        pdf.text(lines, 25, yPosition);
        yPosition += lines.length * 5;
      }
      
      yPosition += 10;
    });
    
    yPosition += 10;
  });
  
  // Save the PDF
  pdf.save(`${trip.name}_itinerary.pdf`);
};
