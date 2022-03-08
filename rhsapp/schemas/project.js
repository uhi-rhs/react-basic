export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'location',
        title: 'Location',
        type: 'reference',
        to: {type: 'location'},
        description: 'make sure to create the location first!'
      },  
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      }, 
      {
        name: 'numberOfHouses',
        title: 'Number of Houses',
        type: 'number'
      }, 
      {
        name: 'numberOfAmeneties',
        title: 'Number of Ameneties',
        type: 'number'
      },
      {
        name: 'lat',
        title: 'Latitude',
        type: 'number',
        description: 'You can get lat/lng values using this app: https://ndvdsn.github.io/mapbox-get-lat-lng/',
        validation: Rule => Rule.precision(16)

      },
      {
        name: 'lng',
        title: 'Longitude',
        type: 'number',
        validation: Rule => Rule.precision(17)
      },
      {
        name: 'phase1',
        title: 'Phase 1',
        type: 'boolean',
        description: 'ensure this is set to either left (grey/off) or right (green/on)'
      }, 
      {
        name: 'phase2',
        title: 'Phase 2',
        type: 'boolean',
        description: 'ensure this is set to either left (grey/off) or right (green/on)'
      },    
      {
        name: 'description',
        title: 'Description',
        type: 'blockContent',
        description: 'Basic information about the project seen on landing page'
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
      },
      {
        name: 'publishedAt',
        title: 'Published at',
        type: 'datetime',
      },
      {
        name: 'client',
        title: 'Client',
        type: 'string',
        description: 'the name of the organisation or group requesting this work'
      },
      {
        name: 'intro',
        title: 'Intro',
        type: 'blockContent',
        description: 'Outline the rationale for the project',
      },
      {
        name: 'secondImage',
        title: 'Second Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      }, 
      {
        name: 'text1',
        title: 'Text 1',
        type: 'blockContent',
        description: 'Project information broken into 3 parts; part 1',

      }, 
      {
        name: 'plan1',
        title: 'Plan 1',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'text2',
        title: 'Text 2',
        type: 'blockContent',
        description: 'Project information broken into 3 parts; part 2',
      }, 
      {
        name: 'text3',
        title: 'Text 3',
        type: 'blockContent',
        description: 'Project information broken into 3 parts; part 3',
      }, 
      {
        name: 'videoUrl',
        title: 'Vimeo video URL',
        type: 'url',  
        description: 'the code you need to insert here looks like: https://player.vimeo.com/video/511064747?h=c2f3ef96a1',  
      },

    ],
  }
  