export function isAdmin(req, res, next) {
  if (!req.cookies.loginToken || req.cookies.loginToken.length !== 20) {
    console.log('Token nerastas arba netinkamo ilgio');
    return next();
}

    return next();
}