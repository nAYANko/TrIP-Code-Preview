
export interface PrebuiltActivity {
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  notes: string;
  latitude?: number;
  longitude?: number;
}

export interface PrebuiltDestination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  itinerary: {
    [day: number]: PrebuiltActivity[];
  };
}

export const popularDestinations: PrebuiltDestination[] = [
  {
    id: 'paris-france',
    name: 'Paris',
    country: 'France',
    description: 'The City of Light awaits with romantic streets, world-class museums, and exquisite cuisine.',
    image: '/placeholder.svg',
    itinerary: {
      1: [
        {
          title: 'Arrive & Check-in',
          location: 'Hotel in Central Paris',
          startTime: '14:00',
          endTime: '16:00',
          notes: 'Check into your accommodation and freshen up'
        },
        {
          title: 'Evening Seine River Cruise',
          location: 'Seine River, Paris',
          startTime: '19:00',
          endTime: '21:00',
          notes: 'Romantic evening cruise to see Paris landmarks illuminated',
          latitude: 48.8566,
          longitude: 2.3522
        }
      ],
      2: [
        {
          title: 'Louvre Museum',
          location: 'Louvre Museum, Paris',
          startTime: '09:00',
          endTime: '13:00',
          notes: 'Visit the world\'s largest art museum, see the Mona Lisa',
          latitude: 48.8606,
          longitude: 2.3376
        },
        {
          title: 'Lunch at Café de Flore',
          location: 'Café de Flore, Saint-Germain',
          startTime: '13:30',
          endTime: '15:00',
          notes: 'Historic café experience in Saint-Germain'
        },
        {
          title: 'Notre-Dame Cathedral Area',
          location: 'Notre-Dame de Paris',
          startTime: '15:30',
          endTime: '17:30',
          notes: 'Explore the cathedral area and Île de la Cité',
          latitude: 48.8530,
          longitude: 2.3499
        }
      ],
      3: [
        {
          title: 'Eiffel Tower Visit',
          location: 'Eiffel Tower, Paris',
          startTime: '09:00',
          endTime: '12:00',
          notes: 'Climb or take elevator to the top of Paris\'s iconic landmark',
          latitude: 48.8584,
          longitude: 2.2945
        },
        {
          title: 'Champs-Élysées Shopping',
          location: 'Champs-Élysées, Paris',
          startTime: '14:00',
          endTime: '17:00',
          notes: 'Shop along the famous avenue and visit Arc de Triomphe',
          latitude: 48.8698,
          longitude: 2.3076
        }
      ],
      4: [
        {
          title: 'Montmartre & Sacré-Cœur',
          location: 'Montmartre, Paris',
          startTime: '10:00',
          endTime: '14:00',
          notes: 'Explore the artistic district and visit the basilica',
          latitude: 48.8867,
          longitude: 2.3431
        },
        {
          title: 'Moulin Rouge Show',
          location: 'Moulin Rouge, Paris',
          startTime: '21:00',
          endTime: '23:00',
          notes: 'Evening cabaret show (booking required)',
          latitude: 48.8842,
          longitude: 2.3322
        }
      ],
      5: [
        {
          title: 'Palace of Versailles',
          location: 'Palace of Versailles',
          startTime: '09:00',
          endTime: '17:00',
          notes: 'Day trip to the magnificent palace and gardens',
          latitude: 48.8049,
          longitude: 2.1204
        }
      ],
      6: [
        {
          title: 'Marais District Walking Tour',
          location: 'Le Marais, Paris',
          startTime: '10:00',
          endTime: '13:00',
          notes: 'Explore the historic Jewish quarter and trendy boutiques'
        },
        {
          title: 'Latin Quarter & Panthéon',
          location: 'Latin Quarter, Paris',
          startTime: '14:30',
          endTime: '17:30',
          notes: 'Discover the intellectual heart of Paris',
          latitude: 48.8462,
          longitude: 2.3464
        }
      ],
      7: [
        {
          title: 'Last-minute Shopping',
          location: 'Galeries Lafayette, Paris',
          startTime: '10:00',
          endTime: '12:00',
          notes: 'Final souvenir shopping at the famous department store'
        },
        {
          title: 'Farewell Lunch',
          location: 'Restaurant in Saint-Germain',
          startTime: '12:30',
          endTime: '14:30',
          notes: 'Final French meal before departure'
        }
      ]
    }
  },
  {
    id: 'tokyo-japan',
    name: 'Tokyo',
    country: 'Japan',
    description: 'A fascinating blend of ancient traditions and cutting-edge modernity.',
    image: '/placeholder.svg',
    itinerary: {
      1: [
        {
          title: 'Arrive & Check-in',
          location: 'Hotel in Shibuya or Shinjuku',
          startTime: '15:00',
          endTime: '17:00',
          notes: 'Check into accommodation and get oriented'
        },
        {
          title: 'Shibuya Crossing Experience',
          location: 'Shibuya Crossing, Tokyo',
          startTime: '18:00',
          endTime: '20:00',
          notes: 'Experience the world\'s busiest pedestrian crossing',
          latitude: 35.6598,
          longitude: 139.7006
        }
      ],
      2: [
        {
          title: 'Senso-ji Temple',
          location: 'Senso-ji Temple, Asakusa',
          startTime: '09:00',
          endTime: '11:30',
          notes: 'Visit Tokyo\'s oldest temple and explore traditional Asakusa',
          latitude: 35.7148,
          longitude: 139.7967
        },
        {
          title: 'Tokyo Skytree',
          location: 'Tokyo Skytree',
          startTime: '13:00',
          endTime: '15:30',
          notes: 'Panoramic views from Japan\'s tallest structure',
          latitude: 35.7101,
          longitude: 139.8107
        },
        {
          title: 'Traditional Dinner in Asakusa',
          location: 'Traditional Restaurant, Asakusa',
          startTime: '18:00',
          endTime: '20:00',
          notes: 'Authentic Japanese cuisine experience'
        }
      ],
      3: [
        {
          title: 'Tsukiji Outer Market',
          location: 'Tsukiji Outer Market',
          startTime: '07:00',
          endTime: '10:00',
          notes: 'Fresh sushi breakfast and market exploration',
          latitude: 35.6654,
          longitude: 139.7707
        },
        {
          title: 'Imperial Palace Gardens',
          location: 'Imperial Palace East Gardens',
          startTime: '11:00',
          endTime: '13:00',
          notes: 'Peaceful gardens in the heart of Tokyo',
          latitude: 35.6852,
          longitude: 139.7528
        },
        {
          title: 'Ginza Shopping District',
          location: 'Ginza, Tokyo',
          startTime: '14:00',
          endTime: '17:00',
          notes: 'Upscale shopping and department stores',
          latitude: 35.6762,
          longitude: 139.7653
        }
      ],
      4: [
        {
          title: 'Meiji Shrine',
          location: 'Meiji Shrine, Shibuya',
          startTime: '09:00',
          endTime: '11:00',
          notes: 'Serene Shinto shrine dedicated to Emperor Meiji',
          latitude: 35.6763,
          longitude: 139.6993
        },
        {
          title: 'Harajuku & Takeshita Street',
          location: 'Harajuku, Tokyo',
          startTime: '11:30',
          endTime: '14:00',
          notes: 'Youth culture, fashion, and quirky shops',
          latitude: 35.6702,
          longitude: 139.7026
        },
        {
          title: 'Roppongi Nightlife',
          location: 'Roppongi, Tokyo',
          startTime: '19:00',
          endTime: '23:00',
          notes: 'International nightlife district',
          latitude: 35.6627,
          longitude: 139.7279
        }
      ],
      5: [
        {
          title: 'Day Trip to Nikko',
          location: 'Nikko, Japan',
          startTime: '08:00',
          endTime: '19:00',
          notes: 'UNESCO World Heritage shrines and natural beauty',
          latitude: 36.7587,
          longitude: 139.6097
        }
      ],
      6: [
        {
          title: 'Ueno Park & Museums',
          location: 'Ueno Park, Tokyo',
          startTime: '10:00',
          endTime: '14:00',
          notes: 'Tokyo National Museum and park stroll',
          latitude: 35.7153,
          longitude: 139.7742
        },
        {
          title: 'Akihabara Electronics District',
          location: 'Akihabara, Tokyo',
          startTime: '15:00',
          endTime: '18:00',
          notes: 'Electronics, anime, and manga culture',
          latitude: 35.7022,
          longitude: 139.7743
        }
      ],
      7: [
        {
          title: 'Tokyo Station Shopping',
          location: 'Tokyo Station',
          startTime: '10:00',
          endTime: '12:00',
          notes: 'Last-minute shopping for omiyage (souvenirs)',
          latitude: 35.6812,
          longitude: 139.7671
        },
        {
          title: 'Final Ramen Experience',
          location: 'Ramen Shop near Tokyo Station',
          startTime: '12:30',
          endTime: '14:00',
          notes: 'One last authentic ramen before departure'
        }
      ]
    }
  },
  {
    id: 'new-york-usa',
    name: 'New York City',
    country: 'USA',
    description: 'The city that never sleeps, offering world-class attractions and endless energy.',
    image: '/placeholder.svg',
    itinerary: {
      1: [
        {
          title: 'Arrive & Check-in',
          location: 'Hotel in Manhattan',
          startTime: '15:00',
          endTime: '17:00',
          notes: 'Check into accommodation and get settled'
        },
        {
          title: 'Times Square Evening',
          location: 'Times Square, NYC',
          startTime: '18:00',
          endTime: '21:00',
          notes: 'Experience the bright lights and energy of Times Square',
          latitude: 40.7580,
          longitude: -73.9855
        }
      ],
      2: [
        {
          title: 'Statue of Liberty & Ellis Island',
          location: 'Liberty Island, NYC',
          startTime: '09:00',
          endTime: '14:00',
          notes: 'Ferry to iconic statue and immigration museum',
          latitude: 40.6892,
          longitude: -74.0445
        },
        {
          title: 'Wall Street & 9/11 Memorial',
          location: 'Financial District, NYC',
          startTime: '15:00',
          endTime: '17:30',
          notes: 'Historic financial district and moving memorial',
          latitude: 40.7115,
          longitude: -74.0134
        }
      ],
      3: [
        {
          title: 'Central Park',
          location: 'Central Park, NYC',
          startTime: '09:00',
          endTime: '12:00',
          notes: 'Morning stroll through NYC\'s green oasis',
          latitude: 40.7829,
          longitude: -73.9654
        },
        {
          title: 'Metropolitan Museum of Art',
          location: 'The Met, NYC',
          startTime: '13:00',
          endTime: '16:00',
          notes: 'World-renowned art collections',
          latitude: 40.7794,
          longitude: -73.9632
        },
        {
          title: 'Broadway Show',
          location: 'Theater District, NYC',
          startTime: '20:00',
          endTime: '23:00',
          notes: 'Classic Broadway musical experience',
          latitude: 40.7590,
          longitude: -73.9845
        }
      ],
      4: [
        {
          title: 'Empire State Building',
          location: 'Empire State Building, NYC',
          startTime: '09:00',
          endTime: '11:00',
          notes: 'Iconic skyscraper with panoramic city views',
          latitude: 40.7484,
          longitude: -73.9857
        },
        {
          title: 'High Line Park',
          location: 'High Line, NYC',
          startTime: '12:00',
          endTime: '14:00',
          notes: 'Elevated park built on former railway',
          latitude: 40.7480,
          longitude: -74.0048
        },
        {
          title: 'Chelsea Market',
          location: 'Chelsea Market, NYC',
          startTime: '14:30',
          endTime: '16:30',
          notes: 'Indoor food hall and shopping',
          latitude: 40.7420,
          longitude: -74.0063
        }
      ],
      5: [
        {
          title: 'Brooklyn Bridge Walk',
          location: 'Brooklyn Bridge, NYC',
          startTime: '09:00',
          endTime: '11:00',
          notes: 'Iconic bridge walk with skyline views',
          latitude: 40.7061,
          longitude: -73.9969
        },
        {
          title: 'DUMBO & Brooklyn Heights',
          location: 'DUMBO, Brooklyn',
          startTime: '11:30',
          endTime: '15:00',
          notes: 'Trendy waterfront area with amazing views',
          latitude: 40.7033,
          longitude: -73.9888
        },
        {
          title: 'Little Italy & Chinatown',
          location: 'Little Italy, NYC',
          startTime: '16:00',
          endTime: '19:00',
          notes: 'Cultural neighborhoods and authentic cuisine',
          latitude: 40.7193,
          longitude: -73.9969
        }
      ],
      6: [
        {
          title: 'Top of the Rock',
          location: 'Rockefeller Center, NYC',
          startTime: '10:00',
          endTime: '12:00',
          notes: 'Best views of the Empire State Building',
          latitude: 40.7587,
          longitude: -73.9787
        },
        {
          title: 'Museum of Modern Art (MoMA)',
          location: 'MoMA, NYC',
          startTime: '13:00',
          endTime: '16:00',
          notes: 'World\'s most influential modern art collection',
          latitude: 40.7614,
          longitude: -73.9776
        },
        {
          title: 'Fifth Avenue Shopping',
          location: 'Fifth Avenue, NYC',
          startTime: '16:30',
          endTime: '19:00',
          notes: 'Luxury shopping and flagship stores',
          latitude: 40.7549,
          longitude: -73.9840
        }
      ],
      7: [
        {
          title: 'One World Observatory',
          location: 'One World Trade Center, NYC',
          startTime: '10:00',
          endTime: '12:00',
          notes: 'Panoramic views from the tallest building in NYC',
          latitude: 40.7127,
          longitude: -74.0134
        },
        {
          title: 'Final Shopping & Farewell',
          location: 'SoHo, NYC',
          startTime: '13:00',
          endTime: '16:00',
          notes: 'Last-minute shopping in trendy SoHo district',
          latitude: 40.7230,
          longitude: -74.0030
        }
      ]
    }
  }
];
