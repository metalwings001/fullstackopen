const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  let numLikes 
  if(blogs.length !== undefined) {
    numLikes = blogs.reduce(function(sum, blog) {
      //console.log('sum blog.likes',sum,blog.likes)
      return sum + blog.likes
    },0)
  }
  else{
    return blogs.likes
  }
  return numLikes
}

const mostLikes = (blogs) => {
  let largest = blogs.reduce((greatest,blog) => {
    console.log('greatest, blog.likes',greatest,blog.likes)
    if(blog.likes > greatest.likes) {
      greatest = blog
    }
    return greatest
  },blogs[0])
  return largest
}


module.exports = {
  dummy,
  totalLikes,
  mostLikes,
}