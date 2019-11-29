/* global Vue */
const images = [
  [{ size: 2 }, { size: 1 }, { size: 3 }],
  [{ size: 1 }, { size: 2 }, { size: 1 }],
  [{ size: 3 }, { size: 3 }],
  [{ size: 1 }, { size: 2 }, { size: 1 }],
  [{ size: 2 }, { size: 3 }, { size: 1 }],
  [{ size: 3 }, { size: 1 }],
  [{ size: 2 }, { size: 3 }],
  [{ size: 1 }],
  [{ size: 2 }, { size: 3 }]
]

let index = 0

for (column of images) {
  for (image of column) {
    index ++
    image.index = index
    console.log(index)
  }
}


const app = new Vue({
  el: '#app',
  data: {
    images
  }
})
