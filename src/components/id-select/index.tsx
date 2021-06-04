// 传递的时候，可以传递 Raw | null | undefined
// 当我向外传递的时候，我会把 value 都转换为 number 类型
import React, { memo } from "react";
import { Select } from "antd";
import { Raw } from "types";

const { Option } = Select;

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<
    SelectProps,
    "options" | "value" | "onChange" | "defaultOptionName"
  > {
  // string 或者 number 是比较常用的组合，我们把他俩抽象出来
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  // 默认值，空值存在
  defaultOptionName?: string;

  options?: { name: string; id: number }[];
}

/**
 * value 可以传递多种类型的值
 * onChange 只会回调 number | undefined 类型
 * 当 isNaN(Number(value)) 为 true 的时候，代表选择默认类型
 *   - Number("12") =>12
 *   - Number(undefined) => NaN
 * 当 选择默认类型的时候，onChange 会回调 undefined
 */

export default memo(function IdSelect(props: IdSelectProps) {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      {...restProps}
      value={options?.length ? toNumber(value) : 0}
      // 0 || undefined 返回 undefined
      onChange={(value) => onChange(toNumber(value) || undefined)}
    >
      {defaultOptionName ? (
        // ! 这里填 0的意义何在？ onChange 的时候还 toNumber 干啥？
        // ! toNumber 可以明白，转换为数字。
        // ! 那竟然你里面是 字符串类型的 数字，哪还有必要 isNaN 吗？
        // ! 你只要记得传递 defaultOptionName 不就好了
        <Option value={0}>{defaultOptionName}</Option>
      ) : null}
      {options?.map((option) => (
        <Select key={option.id} value={option.id}>
          {option.name}
        </Select>
      ))}
    </Select>
  );
});

// isNan( Number(undefined)) true => 0
// isNan( Number("12") ) false => Number(value)
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
