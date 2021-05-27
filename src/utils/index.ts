export const isFalsy = (value: unknown): boolean => {
  return value === 0 ? false : !value;
};

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: any): Object => {
  // object.name = "123" // 直接修改了对象
  // 我们不应该污染传入的对象
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // value 相当于包含了 false, "", null, undefined, 0
    // 这里 value 为 0 也会被删除掉
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

// export const debounce = (fn, delay = 300) => {
//   let timer = null;
//   // 我想让这个函数 3 s 后执行
//   return function () {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       fn.apply(this, arguments);
//       timer = null;
//     }, delay);
//   };
// };

// // 节流
// export function throttle(fn, delay = 300) {
//   let timer = null;

//   return function () {
//     if (timer) {
//       return;
//     }
//     timer = setTimeout(() => {
//       fn.call(this, ...arguments);
//       timer = null;
//     });
//   };
// }
