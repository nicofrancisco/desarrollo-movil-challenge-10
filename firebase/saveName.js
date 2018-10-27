import { db, auth } from './index'

export const users = db.collection('users')

export const setSaveUserName = name => {
  const userId = auth.currentUser.uid
  return users.doc(userId).set({
    name,
  })
}
