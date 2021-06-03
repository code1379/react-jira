import React, { memo } from "react";

export default memo(function Epic() {
  console.log(window.location);
  return <div>任务组</div>;
});
