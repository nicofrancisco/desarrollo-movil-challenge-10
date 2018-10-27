import { db, auth } from './index'

export const tokens = db.collection('tokens')

export const setUserToken = token => {
  const userId = auth.currentUser.uid
  tokens.doc(userId).set({
    token,
  })
}
