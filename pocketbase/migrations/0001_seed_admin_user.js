migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'sandro.campos@icloud.com')
      return // already seeded
    } catch (_) {}

    const record = new Record(users)
    record.setEmail('sandro.campos@icloud.com')
    record.setPassword('Skip@Pass')
    record.setVerified(true)
    record.set('name', 'Sandro Campos')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'sandro.campos@icloud.com')
      app.delete(record)
    } catch (_) {}
  },
)
