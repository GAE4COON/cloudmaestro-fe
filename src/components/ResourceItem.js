import styled from "styled-components";
import data from '../db/SecurityResource.json'; // JSON 파일 경로

function ResourceItem({ bp, resource, groupArray }) {
  const resourceArray = Object.keys(data).filter(key => data[key].includes(`${bp}`));
  let isResourceArrayOutput = false;

  return (
    <div>
      <ResourceContain>
        <ResourceTitleContainer>
          <TitleContainer>
            <ListTitle>{resource.title}</ListTitle>
            <ResourceArray>{bp}</ResourceArray>
          </TitleContainer>

      
          {resourceArray.filter(resource => !resource.startsWith("Group_")).map((resource, index, filteredArray) => {
            isResourceArrayOutput = true;  // 요소가 출력되었음을 표시
            return (
              <ResourceArray key={index}>
                {resource}{index < filteredArray.length - 1 ? ', ' : ''}
              </ResourceArray>
            );
          })}
          {
            resourceArray.some(resource => resource.startsWith("Group_")) && (
              groupArray
                .filter(group => {
                  // 기존 필터 로직 유지
                  const groupPrefixes = resourceArray
                    .filter(r => r.startsWith("Group_"))
                    .map(r => r.substring(6).toLowerCase())
                    .filter((value, index, self) => self.indexOf(value) === index);

                  return groupPrefixes.some(prefix => group.toLowerCase().startsWith(prefix));
                })
                .map((group, index, filteredArray) => (
                  <ResourceArray key={index}>
                    {index === 0 && isResourceArrayOutput ? ', ' : ''}{group}{index < filteredArray.length - 1 ? ', ' : ''}
                  </ResourceArray>
                ))
            )
          }

        </ResourceTitleContainer>


        {resource.guide &&
          <>
            {/* <ListName>Guide</ListName> */}
            {resource.guide.map((check, index) => (
              <ListContent>{check}</ListContent>
            ))}
          </>
        }
        {resource.advantage &&
          <>
            <ListName>Advantage</ListName>
            <ListContent>{resource.advantage}</ListContent>
          </>
        }
      </ResourceContain>
    </div>
  );
}

export default ResourceItem;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: left;
`

const ResourceTitleContainer = styled.div`
margin-bottom: 20px;
`
const ListTitle = styled.div`
  font-family: "Noto Sans KR", sans-serif !important;
  font-size: 20px;
  font-weight: 700;
  /* margin-left: 15px; */
  margin-bottom: 5px;
`;

const ListName = styled.div`
  font-weight:600;
  font-family: "Noto Sans KR"; 
  font-size:"18px";
  margin-top:"20px"; 
  margin-bottom:"10px";
  padding-bottom:"10px";
  margin-top: 20px;
`
const ListContent = styled.div` 
  font-family: "Noto Sans KR", sans-serif !important;
  `
const ResourceArray = styled.a`
  font-family: "Noto Sans KR", sans-serif !important;
  font-size: 14px;
  color: #666;
  /* margin-left: 15px; */
`;


const ResourceContain = styled.div`
  /* position: relative; */
  /* width: 100%; */
  /* height: auto; */
  border-top: 1px solid #666;
  margin:20px;
  
  padding: 10px;
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: left;
  font-family: "Noto Sans KR", sans-serif !important;

`;


