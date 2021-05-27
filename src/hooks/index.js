import { useEffect, useState } from "react";

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

const debounce = (fn, delay = 2000) => {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
};
// const [params, setParams ] = useState({name:"", personId:""})
// ! 老师使用下面的方法，我理解的意思是延时修改。
// ? 但是如果你这里延时修改的话，那就意味着 input :value 的值是不是也是延时修改的 ?
// const debouncedParams = useDebounce(params, 2000)
export const useDebounce = (value, delay = 2000) => {
  const [debouncedValue, setDebouncedValue] = useState(null);
  useEffect(() => {
    // 每次在 value 变化之后，设置一个定时器
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      // 每次在上一个 useEffect 处理完以后在运行
      clearTimeout(timer);
    };
    // 当依赖发生改变时，就会先执行 return 进行清理，之后再次运行 useEffect
  }, [value, delay]);
  return debouncedValue;
};
