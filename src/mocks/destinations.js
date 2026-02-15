import destinationPhoto1 from './img/destination-photo-1.jpg';
import destinationPhoto2 from './img/destination-photo-2.jpg';
import destinationPhoto3 from './img/destination-photo-3.jpg';
import destinationPhoto4 from './img/destination-photo-4.jpg';
import destinationPhoto5 from './img/destination-photo-5.jpg';

const mockDestinations = {
  'destination-1-id': {
    name: 'Amsterdam',
    description: 'Amsterdam is the capital of the Netherlands, famous for its scenic canals, historic townhouses and cycling culture. The city offers a relaxed atmosphere shaped by art, water and trade history.',
    images: [
      {
        url: destinationPhoto1,
        description: 'Dam Square with the Royal Palace in the background',
      },
      {
        url: destinationPhoto2,
        description: 'Flower market with bright tulips in bloom',
      },
    ],
  },
  'destination-2-id': {
    name: 'New York',
    description: '',
    images: [
      {
        url: destinationPhoto1,
        description: 'Manhattan skyline at night with illuminated skyscrapers',
      },
    ],
  },
  'destination-3-id': {
    name: 'Buenos Aires',
    description: 'Buenos Aires is the capital of Argentina, often called the Paris of South America. The city is known for its European-style architecture, tango music and lively café life.',
    images: [],
  },
  'destination-4-id': {
    name: 'Prague',
    description: '',
    images: [],
  },
  'destination-5-id': {
    name: 'Rio de Janeiro',
    description: 'Rio de Janeiro is a coastal city in Brazil, framed by dramatic mountains and iconic beaches. Known for its vibrant culture and Carnival celebrations, it blends natural beauty with urban energy.',
    images: [
      {
        url: destinationPhoto1,
        description: 'Christ the Redeemer statue overlooking the city',
      },
      {
        url: destinationPhoto2,
        description: 'Copacabana beach with patterned promenade',
      },
    ],
  },
  'destination-6-id': {
    name: 'London',
    description: 'London is the capital of the United Kingdom, a city where royal heritage meets modern energy. From historic palaces to vibrant markets, it offers a rich blend of tradition and innovation.',
    images: [
      {
        url: destinationPhoto1,
        description: 'Big Ben and the Houses of Parliament at golden hour',
      },
      {
        url: destinationPhoto2,
        description: 'Tower Bridge opening over the River Thames',
      },
      {
        url: destinationPhoto3,
        description: 'Red double-decker bus passing through Piccadilly Circus',
      },
      {
        url: destinationPhoto4,
        description: 'Buckingham Palace with the Victoria Memorial in front',
      },
    ],
  },
  'destination-7-id': {
    name: 'Munich',
    description: '',
    images: [],
  },
  'destination-8-id': {
    name: 'Singapore',
    description: 'Singapore is a modern city-state in Southeast Asia known for its futuristic skyline, lush green spaces and multicultural heritage. It combines cutting-edge architecture with vibrant street food culture.',
    images: [
      {
        url: destinationPhoto1,
        description: 'Marina Bay Sands and skyline reflected in calm water',
      },
    ],
  },
  'destination-9-id': {
    name: 'Edinburgh',
    description: 'Edinburgh is the capital of Scotland, known for its dramatic castle, medieval Old Town and Georgian New Town. The city sits among rolling hills and carries a strong literary and festival tradition.',
    images: [
      {
        url: destinationPhoto1,
        description: 'Edinburgh Castle perched on a volcanic rock',
      },
      {
        url: destinationPhoto2,
        description: 'Arthur’s Seat overlooking the city skyline',
      },
      {
        url: destinationPhoto3,
        description: 'Victoria Street with colorful curved facades',
      },
    ],
  },
  'destination-10-id': {
    name: 'Paris',
    description: 'Paris is the capital of France, known for its elegant boulevards, world-class museums and café culture. Straddling the River Seine, the city blends historic landmarks with a distinctly romantic atmosphere.',
    images: [
      {
        url: destinationPhoto1,
        description: 'Eiffel Tower glowing at sunset with the Seine in the foreground',
      },
      {
        url: destinationPhoto2,
        description: 'Louvre Pyramid reflecting in shallow water at dusk',
      },
      {
        url: destinationPhoto3,
        description: 'Montmartre street with artists painting near Sacré-Cœur',
      },
      {
        url: destinationPhoto4,
        description: 'Notre-Dame Cathedral viewed from across the river',
      },
      {
        url: destinationPhoto5,
        description: 'Outdoor café terrace with small round tables and fresh croissants',
      },
    ],
  },
};

export { mockDestinations };
