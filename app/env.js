// NOTE stores all of the relevant details about our authentication platform 

export const dev = window.location.origin.includes('localhost')

// NOTE left hand sign of our ternary operator will be the URL that our default axios instance uses as it's baseURL. Safe to set this to 'https://bcw-sandbox.herokuapp.com/' this week
export const baseURL = dev ? 'https://bcw-sandbox.herokuapp.com/' : ''


// REVIEW black magic do not touch
export const useSockets = false



// NOTE points to auth0 to allow users to be authenticated in our application
export const domain = 'codeworksclassroom.auth0.com'
export const audience = 'https://codeworksclassroom.com'
export const clientId = 'pOXw2OGv1LsYi7LEBmDF04RLkXQvldml'
