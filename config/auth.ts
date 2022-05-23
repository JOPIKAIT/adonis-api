module.exports = {
    authenticator: 'session',
    session: {
      serializer: 'Lucid',
      scheme: 'session',
      model: 'App/Models/Usuario',
      uid: 'email',
      password: 'password'
    }
}