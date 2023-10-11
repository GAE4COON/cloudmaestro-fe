function handleChangedSelection(key) {
  console.log("key",key)
  if (key.includes('EC2')) {
      console.log("hi");
      return true;
  }
  return false;
}
export default handleChangedSelection;