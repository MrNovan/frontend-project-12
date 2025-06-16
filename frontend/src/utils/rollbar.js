export default {
  accessToken: import.meta.env.REACT_APP_ROLLBAR_TOKEN,
  environment: import.meta.env.REACT_APP_ENVIRONMENT,
  captureUncaught: true,
  captureUnhandledRejections: true,
}
