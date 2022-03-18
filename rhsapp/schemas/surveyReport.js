export default {
    name: 'surveyReport',
    title: 'Survey Report',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'project',
        title: 'Project',
        type: 'reference',
        to: {type: 'project'}
      },
      {
        name: 'energyEfficiency',
        title: 'Energy Efficiency for comfort and low heating / electricity bills',
        type: 'number',
        description: 'Enter number of votes for this priority'
      },
      {
        name: 'extend',
        title: 'Ability for houses to be extended in the future',
        type: 'number',
        description: 'Enter number of votes for this priority'
      },
      {
        name: 'workSpace',
        title: 'Space to be able to work from home',
        type: 'number',
        description: 'Enter number of votes for this priority'
      },
      {
        name: 'roomSize',
        title: 'Generous room sizes and ceiling heights',
        type: 'number',
        description: 'Enter number of votes for this priority'
      },
      {
        name: 'materials',
        title: 'Use of affordable, natural, Scottish building materials',
        type: 'number',
        description: 'Enter number of votes for this priority'
      },
      {
        name: 'gardenSpace',
        title: 'Private garden space',
        type: 'number',
        description: 'Enter number of votes for this priority'
      },
      {
        name: 'renewables',
        title: 'Incorporation of renewable energy generation',
        type: 'number',
        description: 'Enter number of votes for this priority'
      },
      {
        name: 'communityFunction',
        title: 'Use of part of the site for specific community function',
        type: 'number',
        description: 'Enter number of votes for this priority'
      },
      {
        name: 'trees',
        title: 'Selective planting of trees to provide shelter',
        type: 'number',
        description: 'Enter number of votes for this priority'
      },
      {
        name: 'accessibility',
        title: 'Full accessibility by all ages',
        type: 'number',
        description: 'Enter number of votes for this priority'
      },
      {
        name: 'other',
        title: 'Other',
        type: 'blockContent',
        description: 'Enter text from other answers, seperated by semicolon'
      },
      {
        name: 'exposure',
        title: 'Exposure of the site to prevailing winds',
        type: 'number',
        description: 'Enter number of votes for this concern'
      },
      {
        name: 'ecology',
        title: 'Impact of the new buildings on the ecology of the site',
        type: 'number',
        description: 'Enter number of votes for this concern'
      },
      {
        name: 'roadsImpact',
        title: 'Impact of construction traffic on existing roads',
        type: 'number',
        description: 'Enter number of votes for this concern'
      },
      {
        name: 'overshadowing',
        title: 'Overshading of buildings by trees',
        type: 'number',
        description: 'Enter number of votes for this concern'
      },
      {
        name: 'size',
        title: "Site isn't large enough for all these houses",
        type: 'number',
        description: 'Enter number of votes for this concern'
      },
      {
        name: 'workshops',
        title: "Where do the workshops get relocated to?",
        type: 'number',
        description: 'Enter number of votes for this concern'
      },
      {
        name: 'noNeed',
        title: "There is no housing need in this location",
        type: 'number',
        description: 'Enter number of votes for this concern'
      },
      {
        name: 'differentLocation',
        title: "Houses would be better in a different location",
        type: 'number',
        description: 'Enter number of votes for this concern'
      },
      {
        name: 'capacity',
        title: "Capacity of existing power / drainage / water supply to serve new buildings",
        type: 'number',
        description: 'Enter number of votes for this concern'
      },
      {
        name: 'timescale',
        title: "Timescale for building the houses",
        type: 'number',
        description: 'Enter number of votes for this concern'
      },
      {
        name: 'other2',
        title: 'Other',
        type: 'blockContent',
        description: 'Enter text from other answers, seperated by semicolon'

      },
      {
        name: 'publishedAt',
        title: 'Published at',
        type: 'datetime',
      },
    ],
  }
  