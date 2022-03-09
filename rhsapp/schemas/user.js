export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'username',
        title: 'Username',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'connection',
        title: 'Connection',
        type: 'string',
      },
      {
        name: 'auth_id',
        title: 'Auth ID',
        type: 'string',
        description: 'will be populated by front end code'
      },
      {
        name: 'project',
        title: 'Project',
        type: 'reference',
        to: {type: 'project'}
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


    ],

  }
  