import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { fbAuth, fbDB, setDoc, doc } from '../../store/firebase'
import { ListsContext } from '../../store/ListsContextProvider'

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userIsLoading, setUserIsLoading] = useState(true)

  const listsCtx = useContext(ListsContext)

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(fbAuth, email, password).then(
      (res) => {
        if (res) {
          const userId = fbAuth.currentUser.uid
          try {
            setDoc(doc(fbDB, 'users', userId), {
              email: email,
            })
          } catch (err) {
            console.error('Error creating account: ', err)
          }
        }
      }
    )
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(fbAuth, email, password)
  }

  const logout = async () => {
    listsCtx.unsubscribeListsListener()
    listsCtx.unsubscribeUserListener()
    listsCtx.clearData()
    return await signOut(fbAuth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fbAuth, (currentUser) => {
      setUser(currentUser)
      setUserIsLoading(false)

      if (currentUser) {
        try {
          listsCtx.setUserListener()
          listsCtx.setListsListener()
          listsCtx.getLists()
        } catch (e) {
          console.log(e)
        }
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider
      value={{ createUser, user, userIsLoading, logout, login }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}
