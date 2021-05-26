import React, { memo, useState } from "react";
import SearchPanel from './search-panel'
import List from "./list";

export default memo(function ProjectList() {
  return (
    <div>
      <h4>ProjectList</h4>
      <SearchPanel/>
      <List />
    </div>
  );
});
