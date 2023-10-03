


export const handleChangedSelection = (setShowSelectToggle,key) => {

 
    if (key === 'Arch_Amazon-EC2_48') {
        console.log("hi")
        setShowSelectToggle(true); 
      } else {
        setShowSelectToggle(false); // 그 외의 경우에는 토글 숨김
      }
}
  
  