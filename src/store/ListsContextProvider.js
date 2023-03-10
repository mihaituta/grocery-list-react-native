import React, { createContext, useReducer, useState } from 'react'
import { nanoid } from 'nanoid'
import {
  fbAuth,
  fbDB,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  deleteDoc,
  orderBy,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from './firebase'
import ListReducer from './ListReducer'
import * as RootNavigation from '../components/Auth/RootNavigation'
import { currentRoute } from '../components/Auth/RootNavigation'

const initState = {
  lists: [],
  loadingLists: true,
  currentList: {},
  savedFoods: [],
  setCurrentList: (payload) => {},
  addList: (list) => {},
  getLists: () => {},
  deleteList: (id) => {},
  addFoodItem: (foodItem) => {},
  addSavedFood: (foodItemName) => {},
  deleteFoodItem: (foodItem) => {},
  setUserListener: null,
  setListsListener: null,
  unsubscribeListsListener: () => {},
  unsubscribeUserListener: () => {},
}

export const ListsContext = createContext(initState)

export const ListsContextProvider = ({ children }) => {
  const [state, dispatchListsAction] = useReducer(ListReducer, initState)

  // const currentUrl = useLocation()
  // USER LISTENER
  const setUserListenerHandler = async () => {
    const userId = fbAuth.currentUser.uid

    const unsubscribeListener = onSnapshot(
      doc(fbDB, `users/${userId}/`),
      (snapshot) => {
        dispatchListsAction({
          type: 'SET_SAVEDFOODS',
          payload: snapshot.data().savedFoods,
        })
      }
    )

    dispatchListsAction({
      type: 'UNSUBSCRIBE_USER_LISTENER',
      payload: unsubscribeListener,
    })
  }

  // ADD SAVED FOOD
  const addSavedFoodHandler = async (savedFood) => {
    const userId = fbAuth.currentUser.uid
    try {
      await setDoc(
        doc(fbDB, 'users', userId),
        {
          savedFoods: arrayUnion(savedFood),
        },
        { merge: true }
      )
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // GET LISTS
  const getListsHandler = async () => {
    const userId = fbAuth.currentUser.uid

    clearDataHandler()

    const listsQueryOrdered = query(
      collection(fbDB, `users/${userId}/lists`),
      orderBy('date', 'desc')
    )

    const updatedLists = []
    try {
      dispatchListsAction({
        type: 'SET_LOADING_LISTS',
        payload: true,
      })

      const snapshot = await getDocs(listsQueryOrdered)

      dispatchListsAction({
        type: 'SET_LOADING_LISTS',
        payload: false,
      })

      snapshot.forEach((doc) => {
        let list = doc.data()
        const id = doc.id
        const temp = {
          id,
          date: list.date,
          urlId: list.urlId,
          foodItems: list.foodItems,
          canUpdateDate: list.canUpdateDate,
          totalPrice: list.totalPrice,
          togglePrices: list.togglePrices,
        }
        updatedLists.push(temp)
      })
      state.savedFoods = dispatchListsAction({
        type: 'GET_LISTS',
        payload: updatedLists,
      })

      // when the current screen is 'List', set the current list state by its urlId
      if (RootNavigation.currentRoute().name === 'List') {
        const urlId = RootNavigation.currentRoute().params.urlId

        dispatchListsAction({
          type: 'SET_CURRENT_LIST',
          payload: { urlId },
        })
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  // ADD LIST
  const addListHandler = async () => {
    const userId = fbAuth.currentUser.uid
    const listsQuery = collection(fbDB, `users/${userId}/lists`)

    try {
      await addDoc(listsQuery, {
        date: new Date().toISOString(),
        urlId: nanoid(10),
        foodItems: [],
        canUpdateDate: true,
        totalPrice: '',
        togglePrices: false,
      })
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // UPDATE LIST
  const updateListHandler = async (payload) => {
    const userId = fbAuth.currentUser.uid
    const listsQuery = doc(fbDB, `users/${userId}/lists`, payload.listId)

    let listData = {}

    if (payload.foodItems) {
      listData.foodItems = payload.foodItems
    }

    if (payload.updateTogglePrices) {
      payload.togglePrices = !payload.togglePrices
      listData.togglePrices = payload.togglePrices
    }

    if (payload.updateTotalPrice) {
      listData.totalPrice = payload.totalPrice
    }

    if (payload.canUpdateDate === false) {
      listData = {
        canUpdateDate: false,
        date: new Date().toISOString(),
      }
    }

    try {
      await updateDoc(listsQuery, listData)
    } catch (e) {
      console.log(e)
      return e
    }
  }

  // DELETE LIST
  const deleteListHandler = async (id) => {
    const userId = fbAuth.currentUser.uid
    const listsQuery = doc(fbDB, `users/${userId}/lists`, id)

    try {
      await deleteDoc(listsQuery)
    } catch (error) {
      console.log(error)
      return error
    }
  }

  // ADD FOOD ITEM
  const addFoodItemHandler = async (item) => {
    const userId = fbAuth.currentUser.uid
    const listsQuery = doc(fbDB, `users/${userId}/lists`, state.currentList.id)

    try {
      await updateDoc(
        listsQuery,
        {
          foodItems: arrayUnion({
            id: nanoid(20),
            name: item.name,
            checked: item.checked,
            price: '',
          }),
        },
        { merge: true }
      )
    } catch (e) {
      console.log(e)
    }
  }

  // DELETE FOOD ITEM
  const deleteFoodItemHandler = async (foodItem) => {
    const userId = fbAuth.currentUser.uid

    const listsQuery = doc(fbDB, `users/${userId}/lists`, state.currentList.id)
    try {
      await updateDoc(
        listsQuery,
        {
          foodItems: arrayRemove(foodItem),
        },
        { merge: true }
      )
    } catch (e) {
      console.log(e)
    }
  }

  // SET CURRENT LIST
  const setCurrentListHandler = (payload) => {
    dispatchListsAction({ type: 'SET_CURRENT_LIST', payload })
  }

  // SET LISTENER
  const setListsListenerHandler = () => {
    const userId = fbAuth.currentUser.uid
    const listsQuery = query(
      collection(fbDB, `users/${userId}/lists`),
      orderBy('date', 'desc')
    )
    let initState = true
    const unsubscribeListener = onSnapshot(listsQuery, (snapshot) => {
      if (initState) {
        initState = false
      } else {
        if (!snapshot.docChanges().empty) {
          snapshot.docChanges().forEach((change) => {
            let list = change.doc.data()
            const id = change.doc.id
            const listData = {
              id,
              canUpdateDate: list.canUpdateDate,
              date: new Date(list.date),
              urlId: list.urlId,
              foodItems: list.foodItems,
              totalPrice: list.totalPrice,
              togglePrices: list.togglePrices,
            }
            if (change.type === 'added') {
              console.log('added')
              dispatchListsAction({ type: 'ADD_LIST', payload: listData })
            } else if (change.type === 'modified') {
              console.log('modified')
              dispatchListsAction({
                type: 'SET_CURRENT_LIST',
                payload: { list: listData },
              })
              dispatchListsAction({ type: 'UPDATE_LIST', payload: listData })
            } else if (change.type === 'removed') {
              // can't go back on the page after it has been deleted and redirected to home
              // navigate('/', { replace: true })
              RootNavigation.navigate('Home')
              dispatchListsAction({ type: 'DELETE_LIST', payload: id })
            }
          })
        }
      }
    })
    dispatchListsAction({
      type: 'UNSUBSCRIBE_LIST_LISTENER',
      payload: unsubscribeListener,
    })
  }

  // CLEAR DATA
  const clearDataHandler = () => {
    dispatchListsAction({ type: 'CLEAR_DATA' })
  }

  const listsContext = {
    lists: state.lists,
    currentList: state.currentList,
    loadingLists: state.loadingLists,

    savedFoods: state.savedFoods,
    addSavedFood: addSavedFoodHandler,
    setUserListener: setUserListenerHandler,

    setCurrentList: setCurrentListHandler,
    togglePrices: state.togglePrices,

    getLists: getListsHandler,
    addList: addListHandler,
    updateList: updateListHandler,
    deleteList: deleteListHandler,
    setListsListener: setListsListenerHandler,

    addFoodItem: addFoodItemHandler,
    deleteFoodItem: deleteFoodItemHandler,

    unsubscribeListsListener: state.unsubscribeListsListener,
    unsubscribeUserListener: state.unsubscribeUserListener,
    clearData: clearDataHandler,
  }

  return (
    <ListsContext.Provider value={listsContext}>
      {children}
    </ListsContext.Provider>
  )
}
