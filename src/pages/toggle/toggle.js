function handleChangedSelection(key = '') {
  //console.log("key", key);
  
  // Check if key is a string
  if (typeof key !== 'string') {
    console.error("The przs not a string:", key);
    return false;
  }

  if (key.includes('EC2')) {
      //console.log("hi");
      return true;
  }
  if (key.includes('RDS')) {
    //console.log("나인뎅/11111");
    return true;
  }
  if (key.includes('S3')) {
    //console.log("hi");
    return true;
  }
  if (key.includes('Simple Storage Service')) {
    //console.log("hi");
    return true;
  }
  return false;
}
export default handleChangedSelection;
