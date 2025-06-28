
import html2canvas from 'html2canvas';

interface TripData {
  trip: any;
  activities: any[];
}

export const generateTripPNG = async ({ trip, activities }: TripData): Promise<string> => {
  // Create a temporary div to render the itinerary
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '800px';
  tempDiv.style.backgroundColor = '#ffffff';
  tempDiv.style.padding = '40px';
  tempDiv.style.fontFamily = 'Arial, sans-serif';
  
  // Calculate trip duration
  const startDate = new Date(trip.start_date);
  const endDate = new Date(trip.end_date);
  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Group activities by day
  const activitiesByDay: { [key: number]: any[] } = {};
  activities.forEach(activity => {
    if (!activitiesByDay[activity.day_number]) {
      activitiesByDay[activity.day_number] = [];
    }
    activitiesByDay[activity.day_number].push(activity);
  });

  tempDiv.innerHTML = `
    <div style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: white; padding: 30px; border-radius: 16px; margin-bottom: 30px;">
      <h1 style="font-size: 36px; font-weight: bold; margin: 0 0 10px 0;">${trip.name}</h1>
      <p style="font-size: 20px; margin: 0 0 15px 0; opacity: 0.9;">📍 ${trip.destination}</p>
      <p style="font-size: 16px; margin: 0; opacity: 0.8;">
        📅 ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()} • ${duration} days
      </p>
    </div>
    
    <div style="margin-bottom: 30px;">
      <h2 style="color: #0ea5e9; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #e0f2fe; padding-bottom: 10px;">
        📋 Itinerary Overview
      </h2>
      ${Array.from({ length: duration }, (_, i) => {
        const dayNumber = i + 1;
        const dayActivities = activitiesByDay[dayNumber] || [];
        const dayDate = new Date(startDate);
        dayDate.setDate(dayDate.getDate() + i);
        
        return `
          <div style="margin-bottom: 25px; background: #f8fafc; border-radius: 12px; padding: 20px; border-left: 4px solid #0ea5e9;">
            <h3 style="color: #0369a1; font-size: 20px; margin: 0 0 15px 0;">
              Day ${dayNumber} - ${dayDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </h3>
            ${dayActivities.length === 0 ? 
              '<p style="color: #64748b; font-style: italic; margin: 0;">No activities planned</p>' :
              dayActivities
                .sort((a, b) => a.start_time.localeCompare(b.start_time))
                .map(activity => `
                  <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                      <span style="background: #0ea5e9; color: white; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: bold; margin-right: 12px;">
                        ${activity.start_time} - ${activity.end_time}
                      </span>
                      <h4 style="color: #1e293b; font-size: 16px; font-weight: bold; margin: 0;">${activity.title}</h4>
                    </div>
                    <p style="color: #475569; font-size: 14px; margin: 0 0 8px 0;">📍 ${activity.location}</p>
                    ${activity.notes ? `<p style="color: #64748b; font-size: 13px; margin: 0; font-style: italic;">${activity.notes}</p>` : ''}
                  </div>
                `).join('')
            }
          </div>
        `;
      }).join('')}
    </div>
    
    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0;">Created by TriP</p>
    </div>
  `;
  
  document.body.appendChild(tempDiv);
  
  try {
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: true,
      height: tempDiv.scrollHeight,
      width: 800
    });
    
    document.body.removeChild(tempDiv);
    return canvas.toDataURL('image/png');
  } catch (error) {
    document.body.removeChild(tempDiv);
    throw error;
  }
};

export const downloadPNG = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
