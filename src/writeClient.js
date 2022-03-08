import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: "1cepjwt9",
    dataset: "production",
    apiVersion: "2022-02-02",
    token: process.env.REACT_APP_SANITY_API_TOKEN,
    useCdn: false
})