import { useEffect, useRef } from "react";

// 在卸载的时候是否保留？true 为保留， false 为不保留，替换为之前的 title
export const useDocumentTitle = (
  title: string,
  keepOnUmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  console.log("渲染时的oldTitle：", oldTitle);
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      // 不保留
      if (!keepOnUmount) {
        console.log("卸载时的oldTitle：", oldTitle);
        document.title = oldTitle;
      }
    };
  }, [keepOnUmount, oldTitle]);
};
