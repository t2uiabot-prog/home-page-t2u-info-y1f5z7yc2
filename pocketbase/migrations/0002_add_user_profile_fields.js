migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    let changed = false
    if (!users.fields.getByName('company')) {
      users.fields.add(new TextField({ name: 'company' }))
      changed = true
    }
    if (!users.fields.getByName('job_role')) {
      users.fields.add(new TextField({ name: 'job_role' }))
      changed = true
    }

    if (changed) app.save(users)
  },
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    let changed = false
    if (users.fields.getByName('company')) {
      users.fields.removeByName('company')
      changed = true
    }
    if (users.fields.getByName('job_role')) {
      users.fields.removeByName('job_role')
      changed = true
    }

    if (changed) app.save(users)
  },
)
