export const colorSchemes = [
    {
      backgroundColor: '#F05941',
      titleColor: '#fff',
      subtitleColor: '#fff',
      chipColor: '#FFD700',
      creatorColor: '#000',
      peopleColor: '#000',
    },
    {
      backgroundColor: '#615EFC',
      titleColor: '#fff',
      subtitleColor: '#fff',
      chipColor: '#FFD700',
      creatorColor: '#000',
      peopleColor: '#000',
    },
    {
      backgroundColor: '#7ABA78',
      titleColor: '#fff',
      subtitleColor: '#fff',
      chipColor: '#FFD700',
      creatorColor: '#000',
      peopleColor: '#000',
    },
    {
      backgroundColor: '#810CA8',
      titleColor: '#fff',
      subtitleColor: '#fff',
      chipColor: '#FFD700',
      creatorColor: '#000',
      peopleColor: '#000',
    },
    {
        backgroundColor: '#06D001',
        titleColor: '#fff',
        subtitleColor: '#fff',
        chipColor: '#FFD700',
        creatorColor: '#000',
        peopleColor: '#000',
      },
      {
        backgroundColor: '#AF47D2',
        titleColor: '#fff',
        subtitleColor: '#fff',
        chipColor: '#FFD700',
        creatorColor: '#000',
        peopleColor: '#000',
      },     {
        backgroundColor: '#9195F6',
        titleColor: '#fff',
        subtitleColor: '#fff',
        chipColor: '#FFD700',
        creatorColor: '#000',
        peopleColor: '#000',
      },
      {
        backgroundColor: '#FF8400',
        titleColor: '#fff',
        subtitleColor: '#fff',
        chipColor: '#FFD700',
        creatorColor: '#000',
        peopleColor: '#000',
      },
  ];
  

  
    export const getRandomColorScheme = () => {
        return colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
    };

