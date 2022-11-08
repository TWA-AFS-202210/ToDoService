export const mockHttpClient = (): any =>
  jasmine.createSpyObj('HttpClient', ['post', 'put', 'get', 'delete'])
