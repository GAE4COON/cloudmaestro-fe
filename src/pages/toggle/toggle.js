function handleChangedSelection(key = '') {
  console.log("key", key);
  
  // Check if key is a string
  if (typeof key !== 'string') {
    console.error("The provided key is not a string:", key);
    return false;
  }

  if (key.includes('EC2')) {
      console.log("hi");
      return true;
  }
  return false;
}
export default handleChangedSelection;
