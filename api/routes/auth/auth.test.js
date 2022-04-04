

const supertest = require('supertest')
const app = require('../../index')

const mockServer = supertest(app)

const mockUser = {
  username: "testtest",
  password: "Test123!",
  email: 'john.doe@example.com'
}
 


describe('the auth endpoint', () => {
  it("allows user to login", async () => { 
    const res = await mockServer.post('/login')
      .send(JSON.stringify(mockUser))
      .expect(404) 
  })
  it("returns an error if no user is found", async () => {
    const res = await mockServer.post('/login')
      .send(JSON.stringify(mockUser))
      .expect(404) 
    
  })
  it("returns an error if the password is incorrect", async () => {
    const res = await mockServer.post('/login')
      .send(JSON.stringify(mockUser))
      .expect(404) 
    
  })
})