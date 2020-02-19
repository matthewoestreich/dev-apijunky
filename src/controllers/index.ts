/**
 *
 * Why the need for controllers and services?
 *
 * The reason for this is because Controllers should separate, and be the defining
 * line, between where the web/Express context (ie: req, res, next) stops, and is
 * transformed/passed to the 'internal' services (ie: user service, etc..).
 *
 * We do not want any Express context to get passed beyond this point.
 *
 */
