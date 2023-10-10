import axios from 'axios';

export function ec2Price(priceElement) {
    let instance = "aws" + "-ec2" + "-" + priceElement[1] + "_" + priceElement[2];
    console.log("instance",instance);
    return new Promise((resolve, reject) => {
      axios({
        url: '/vantage/ec2',
        method: 'post',
        data: {
          "platform": priceElement[0],
          "instance": instance,
          "lifeCycle": priceElement[3]
        },
        baseURL: 'http://localhost:8080',
      })
      .then(function (response) {
        // 가정: response에 원하는 데이터가 있음
        console.log("response",response.data);
       
        resolve([response.data.amount, response.data.currency, response.data.unit]);
        
       
      })
      .catch(function (error) {
        console.error("Error occurred:", error);
        reject(error);
      });
    });
  }
  
  
  
  
  export function fetchPlatformData(platform, instanceType, setData, setLoading, setError){
    return new Promise((resolve, reject) => {setLoading(true);
      axios({
        url: '/ec2/apiname',
        method: 'post',
        data: {
          "platform": platform,
          "instanceType":instanceType
        },
        baseURL: 'http://localhost:8080',
      })
      .then(function (response) {
        setData(response.data);
        //console.log("response.data",response.data,"platform",platform)
        if(platform == "linux"){
          const newLinuxOptions = response.data.map(item => ({
            value: item,
            label: item
          }))
  
  
          resolve(newLinuxOptions);
  
        }
        if(platform == "windows"){
          const newWindowsOptions = response.data.map(item => ({
            value: item,
            label: item
          }))
  
          resolve(newWindowsOptions);
  
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Error occurred:", error);
        setError(error);
        setLoading(false);
        reject(error);
      });
    });
  }