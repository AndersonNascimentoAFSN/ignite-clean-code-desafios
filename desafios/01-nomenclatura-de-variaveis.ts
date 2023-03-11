// Nomenclatura de variáveis

const categoriesNumberOfFollowers = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getUsernameCategoryBasedNumberFollowers(req, res) {
  const githubUsername = String(req.query.username)

  if (!githubUsername) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const user = await fetch(`https://api.github.com/users/${githubUsername}`);

  if (user.status === 404) {
    return res.status(400).json({
      message: `User with username "${githubUsername}" not found`
    })
  }

  const userJson = await user.json()

  const orderingCategoriesFromLargestToSmallest = categoriesNumberOfFollowers.sort((a, b) =>  b.followers - a.followers); 

  const categoryUser = orderingCategoriesFromLargestToSmallest.find(category => userJson.followers > category.followers)

  const usernameCategory = {
    githubUsername,
    category: categoryUser.title
  }

  return usernameCategory
}

getUsernameCategoryBasedNumberFollowers({ query: {
  username: 'josepholiveira'
}}, {})