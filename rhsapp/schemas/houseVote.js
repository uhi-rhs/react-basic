export default {
    name: 'houseVote',
    title: 'House Vote',
    type: 'document',
    fields: [
        {
            name: 'comment',
            title: 'Comment',
            type: 'string'
        },
        {
          name: 'author',
          title: 'Author',
          type: 'reference',
          to: {type: 'user'}
        },
      {
        name: 'precedent',
        title: 'Precedent',
        type: 'reference',
        to: {type: 'precedent'}
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
        name: 'published',
        title: 'Published',
        type: 'boolean'
      }, 
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: {type: 'category'}
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'comment',
          maxLength: 96,
        },
      },
    ],
  }
  