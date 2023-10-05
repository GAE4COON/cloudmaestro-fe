function handleChangedSelection(key) {
  console.log("key",key)
  if (key.includes('Arch_Amazon-EC2_48')) {
      console.log("hi");
      return true;
  }
  return false;
}
export default handleChangedSelection;