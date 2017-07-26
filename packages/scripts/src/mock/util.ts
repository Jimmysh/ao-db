import * as URL from 'url';

export function getAuthUrl(name: string, argv: any) {
  let newUrl = URL.parse(argv.serve);
  if (argv.username && argv.password) {
    newUrl.auth = `${argv.username}:${argv.password}`;
  }
  newUrl.pathname = name;
  return URL.format(newUrl);
}
