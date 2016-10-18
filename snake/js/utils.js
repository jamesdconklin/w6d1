let utils = {
  arrayLookup(arr, pos){
    for (var i = 0; i < arr.length; i++) {
      let x = arr[i][1];
      let y = arr[i][0];
      if(pos[0] ===y && pos[1]===x ){
        return i;
      }
    }
    return -1;
  }
}


module.exports = utils;
