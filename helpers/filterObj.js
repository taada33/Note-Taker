module.exports = (arr, id) => {
  for(const element in arr){
    if(arr[element].id === id){
      arr.splice(element, 1)
    }
  }
  return arr;
}