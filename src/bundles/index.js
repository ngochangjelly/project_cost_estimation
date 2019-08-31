import { composeBundles } from "redux-bundler";
import cell from "./cell";
// ... import other bundles

export default composeBundles(
  // ... add bundles here
  cell
);
