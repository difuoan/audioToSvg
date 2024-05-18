export default {
    methods: {
        moveArrayElementUp(index, array) {
          let elementToMove = array.splice(index, 1)[0];
          array.splice(index - 1, 0, elementToMove);
        },
        removeArrayElement(index, array) {
          array.splice(index, 1);
        },
        moveArrayElementDown(index, array) {
          let elementToMove = array.splice(index, 1)[0];
          array.splice(index + 1, 0, elementToMove);
        },
        copyArrayElement(index, array) {
          let elementToPush = this.deepCopy(array[index]);
          array.push(elementToPush);
        }
    }
}