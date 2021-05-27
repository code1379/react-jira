import { useEffect, useState } from "react";

interface Person {
  name: string;
  age: number;
}

const useArray = <T,>(persons: T[]) => {
  const [value, setValue] = useState(persons);
  const removeIndex = (index: number): void => {
    if (index === 0) {
      const newValue = [...value];
      newValue.shift();
      setValue(newValue);
    }
  };
  const clear = () => {
    setValue([]);
  };
  const add = (person: T): void => {
    setValue([...value, person]);
  };
  return {
    value,
    clear,
    removeIndex,
    add,
  };
};

const TsReactTest = () => {
  const persons: Person[] = [
    { name: "dell", age: 18 },
    { name: "why", age: 28 },
  ];

  const { value, clear, removeIndex, add } = useArray(persons);

  useEffect(() => {
    // 期待这里报错： Property 'notExist' does not exist on type {name: string, age: number}
    // console.log(value.notExist);
    // Property 'age' is missing
    // add({ name: "david" });
    // string is not assignable to number
    // removeIndex("123");
  }, []);

  return (
    <div>
      <button onClick={() => add({ name: "jhon", age: 10 })}>添加 john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button onClick={() => clear()}>clear</button>
      <ul>
        {value.map((person, index) => (
          <li>
            {index} - {person.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TsReactTest;
