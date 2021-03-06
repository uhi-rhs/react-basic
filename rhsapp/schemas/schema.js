// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import category from './category'
import project from './project'
import houseVote from './houseVote'
import location from './location'
import precedent from './precedent'
import simpleComment from './simpleComment'
import siteComment from './siteComment'
import survey from './survey'
import user from './user'
import surveyReport from './surveyReport'
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    houseVote,
    location,
    simpleComment,
    siteComment,
    survey,
    user,
    precedent,
    category,
    project,
    surveyReport,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
  ]),
})
