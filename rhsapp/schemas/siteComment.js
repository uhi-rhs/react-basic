export default {
    name: 'siteComment',
    title: 'Site Comment',
    type: 'document',
    fields: [
        {
            name: 'comment',
            title: 'Comment',
            type: 'string',
          },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: {type: 'user'}
      },
      {
        name: 'submittedAt',
        title: 'Submitted at',
        type: 'datetime',
      },
      {
        name: 'project',
        title: 'Project',
        type: 'reference',
        to: {type: 'project'}
      },
      {
        name: 'lat',
        title: 'Latitude',
        type: 'number'
      },
      {
        name: 'lng',
        title: 'Longitude',
        type: 'number'
      },
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: {type: 'category'}
      },
    ],
  }
  