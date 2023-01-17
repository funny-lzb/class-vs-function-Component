import React, { useState, useEffect } from 'react'
import RecipeList from './RecipeList'
import RecipeEdit from './RecipeEdit'
import '../css/app.css'
import uuidv4 from 'uuid/v4'

export const RecipeContext = React.createContext()

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes)
  const [selectedRecipeId, setselectedRecipeId] = useState()
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  const Recipe_LOCAL_STORAGE_PREFIX = 'cookingWithReact'
  const Recipe_LOCAL_STORAGE_KEY = `${Recipe_LOCAL_STORAGE_PREFIX}-recipes`

  const RecipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  useEffect(() => {
    // 因为我们是根据数组渲染UI的，所以一切的源头都是数组。数组要跟本地存储之间形成双向通道
    // 本地存储的意义：就是用本地存储来 “记住”/保存 数组的变化
    // 页面挂载时 ----> 数组更新成上一次的本地存储内容(本地存储--->数组)
    const recipesJSON = localStorage.getItem(Recipe_LOCAL_STORAGE_KEY)

    if (recipesJSON != null) setRecipes(JSON.parse(recipesJSON))
  }, [])

  useEffect(() => {
    // 每次数组改变时 ----> 更新本地存储(数组-->本地存储)
    localStorage.setItem(Recipe_LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  function handleRecipeAdd() {
    const newRecipe = [
      {
        id: uuidv4(),
        name: '',
        servings: 1,
        cookTime: '',
        instructions: '',
        ingredients: [{ id: uuidv4(), name: '', amount: '' }]
      }
    ]

    setselectedRecipeId(newRecipe.id)
    setRecipes(recipes.concat(newRecipe))
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setselectedRecipeId(undefined)
    }
    const filterRecipes = recipes.filter(recipe => recipe.id !== id)
    setRecipes(filterRecipes)
  }

  function handleRecipeSelect(id) {
    setselectedRecipeId(id)
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = recipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe

    setRecipes(newRecipes)
  }

  return (
    <RecipeContext.Provider value={RecipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipeId && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions:
      '1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken',
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: '1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork',
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '3 Pounds'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 Tbs'
      }
    ]
  }
]

export default App
