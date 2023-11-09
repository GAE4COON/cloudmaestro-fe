import styled from 'styled-components';


function ManageHuman(){

    let summary = `본 보안 가이드라인은 유통기업의 정보보호를 강화하기 위한 목적으로 작성되었다. ISO/IEC 27001:2022을 기반으로 하며, 27002의 통제조건을 포함하고 있다. 추가로, 클라우드 서비스 환경에서의 보안과 개인정보 보호를 위해 27017과 27018 표준을 통합하였다.기업의 정보보호 조직 구성부터 자산 관리, 인적 및 물리적 보안, 통신 및 운영 관리에 이르기까지 다양한 보안 영역에 대한 지침을 제공한다. 클라우드 환경에서의 보안 특성을 고려하여, 클라우드 서비스 선택부터 보안 조치까지의 가이드를 포함하고 있다.특히, 클라우드 마이그레이션의 전 과정을 위한 단기, 중기, 장기 보안 전략을 포괄적으로 작성하여, 마이그레이션의 각 단계에서 보안 요구사항을 세밀하게 고려하도록 하였다.또한, 잠재적 위험에 대응하고 시스템을 복구하기 위한 프로세스도 강조하였다. 이 가이드라인을 통해 CWL 기업은 정보보호를 체계적으로 접근하고, 지속적인 보안 강화 활동을 추진할 수 있다.`;
    let summary2 = `본 조직 보안 섹션은 유통기업의 정보보호 정책 수립을 위한 핵심 요소들에 중점을 둔다. 조직 내에서의 보안 역할과 책임에 대한 명확한 정의, 권한 관리를 통한 접근 제어, 공급망 내에서의 정보보호 전략, 보안 사건에 대한 체계적인 증거 관리, 클라우드 환경에 적합한 보안 지침, 법률 및 표준에 대한 컴플라이언스 확보, 그리고 보안 사고 대응 방안이 포함된다. 이를 통해 조직은 정보보호에 관한 정책을 체계적으로 구성하고 실행할 수 있는 기반을 마련할 수 있다.`;
    

    // table 

    const guidelines = [
        {
            title: '데이터 이동 절차 (ISO 27001 - A.12.3, ISO 27002 - 13.2, ISO 27017 - 13.2)',
            content: `데이터 이동 계획 `,
            summary: 'AWS의 Compute Engine 인스턴스나 Persistent Disks 에서 데이터를 이동하기 전에 어떤 데이터를 어디로, 언제, 어떻게 이동할지에 대한 계획을 세워야 한다.'
        },
        {
            content: '조직 보안',
            summary: `Cloud IAM (Identity and Access
                Management)을 사용하여 이동할 데이터에
                대한 접근 권한을 설정한다. 예를 들어, 특정
                프로젝트의 개발자는 데이터 이동을 위해
                임시로 compute.instanceViewer 또는
                compute.diskViewer 역할을 부여받을 수 있다.
                `
        },
        {
            content: '이동 확인',
            summary: `데이터 이동이 완료된 후, Cloud
            Monitoring 과 Cloud Logging 을 사용하여
            데이터 이동 로그를 확인하고, 원하는 대로
            데이터가 이동되♘는지 검증한다.
             `
        },

        
    ]
  
    return (
        <div>
            <ResourceContainer>
                <Overview> MyCompany_cloud 아키텍처 보안 가이드라인 </Overview>
                <Title>1. 개요</Title>
                <Summary>{ summary }</Summary>

                <Title>2. 조직 보안</Title>
                <Summary>{ summary2 }</Summary>

                <SemmiTitle>A. 보안 역할과 책임</SemmiTitle>
                <SemmiSummary>{ summary }</SemmiSummary> {/* 여기를 수정했습니다 */}

                <TableContainer> 
                    <Table>
                        <thead>
                            <tr>
                                <TH>데이터 권한 이동 및 임시 허용</TH>
                            </tr>
                            <tr>
                                <Th>정책조항</Th>
                                <Th>세부이행항목</Th>
                                <Th>이행지침</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {guidelines.map((item, index) => (
                                <tr key={index}>
                                    <Td>{item.title}</Td>
                                    <Td>{item.content}</Td>
                                    <Td>{item.summary}</Td>
                                </tr>
                            ))}
                
                        </tbody>
                    </Table>
                </TableContainer>

            </ResourceContainer>
        </div>
    );
}

export default ManageHuman;






const ResourceContainer = styled.div`

  display: flex; /* Flexbox 모델 적용 */
  flex-direction: column; /* 자식 요소들을 세로로 정렬 */

  position: relative;
  width: 80%;
  margin : 20px auto;
  padding : 20px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  border-radius: 8px; /* 모서리 둥글게 처리 */
  background: #FFFFFF; /* 배경색 설정 */
  height: 100%;
  justify-content: center;

`;

const Overview = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  border-radius: 8px; /* 모서리 둥글게 처리 */
  background: #FFFFFF; /* 배경색 설정 */

  color: #525252;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  padding: 10px;
  
`;

const Title = styled.div`
position: relative; /* 가상 요소의 위치 기준점 설정 */
padding-top: 20px;
color: #525252;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
text-align: left;

&::after { /* 가상 요소를 이용하여 밑줄 대신 사용할 선 추가 */
  content: ''; 
  position:absolute; 
  left: 0; 
  bottom: -10px; 
  width: 100%;
  height: 2px; 
  background-color: #525252; 
  }
  
`;


const Summary = styled.div`
  padding-top: 40px;
  color: #525252;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: left;

  padding-left:10px;
  
`;

const SemmiTitle = styled.div`
position: relative; /* 가상 요소의 위치 기준점 설정 */
padding-top: 20px;
padding-left: 10px;
color: #525252;
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: normal;
text-align: left;

`;

const SemmiSummary = styled.div`    

    padding-top: 20px;
    padding-left: 20px;
    color: #525252;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: left;

`;


/// Table 

const TH = styled.th`
background-color: #f2f2f2; // 헤더의 배경색을 지정
color: #333;
padding: 8px;
text-align: left;
font-weight: bold;
border-bottom: 1px solid #ddd; // 테두리 스타일 추가
`;

const Th = styled.th`
    background-color: #f2f2f2; // 헤더의 배경색을 지정
    color: #333;
    padding: 8px;
    font-size:12px;
    text-align: center;
    font-weight: bold;
    border-bottom: 1px solid #ddd; // 테두리 스타일 추가
`;

const Td = styled.td`
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd; // 테두리 스타일 추가
`;

const Table = styled.table`
    width: 100%; // 테이블 너비를 100%로 설정
    border-collapse: collapse; // 셀 사이의 간격 없애기
    // 추가 스타일링이 필요하다면 여기에 추가
`;

const TableContainer = styled.div`
    overflow-x: auto; // 테이블이 너무 클 경우 스크롤바를 표시

`