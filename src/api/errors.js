// from https://stackoverflow.com/a/27724419/7866603
export function SteamIdException(message = 'Something went wrong when Steam Id') {
  this.message = message;
  // Use V8's native method if available, otherwise fallback
  if ('captureStackTrace' in Error) Error.captureStackTrace(this, SteamIdException);
  else this.stack = new Error().stack;
}

SteamIdException.prototype = Object.create(Error.prototype);
SteamIdException.prototype.name = 'SteamIdException';
SteamIdException.prototype.constructor = SteamIdException;

export function FetchException(message = 'Something was wrong with fetch') {
  this.message = message;
  // Use V8's native method if available, otherwise fallback
  if ('captureStackTrace' in Error) Error.captureStackTrace(this, FetchException);
  else this.stack = new Error().stack;
}

FetchException.prototype = Object.create(Error.prototype);
FetchException.prototype.name = 'FetchException';
FetchException.prototype.constructor = FetchException;
