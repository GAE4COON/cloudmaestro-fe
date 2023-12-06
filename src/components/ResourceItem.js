import styled from "styled-components";
import data from '../db/SecurityResource.json'; // JSON 파일 경로

function ResourceItem({ bp, resource, groupArray }) {
  const resourceArray = Object.keys(data).filter(key => data[key].includes(`${bp}`));

  return (
    <div>
      <ResourceContain>
        <ResourceTitleContainer>
          <ListTitle>{resource.title}</ListTitle>
          {resourceArray.filter(resource => !resource.startsWith("Group_")).map((resource, index, filteredArray) => (
            <ResourceArray key={index}>
              {resource}{index < filteredArray.length - 1 ? ', ' : ''}
            </ResourceArray>
          ))}

          {
            resourceArray.some(resource => resource.startsWith("Group_")) &&
            groupArray
              .filter(group => {
                const groupPrefix = resourceArray.find(r => r.startsWith("Group_"))?.substring(6).toLowerCase();
                return group.toLowerCase().startsWith(groupPrefix);
              })
              .map((group, index, filteredArray) => (
                <ResourceArray key={index}>
                  {group}{index < filteredArray.length - 1 ? ', ' : ''}
                </ResourceArray>
              ))
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


