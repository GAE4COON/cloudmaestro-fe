export const backupOptions = ["중앙관리", "일반"];
export const zoneSecurityReq = ["웹 방화벽으로 보호"]
export const zoneFrame = ["웹 서버 존재"]
export const zoneRdsReq = ["데이터베이스 분산"]

export const industrial = [
  {
    value: "금융",
    label: "금융",
  },
  {
    value: "미디어",
    label: "미디어",
  },
  {
    value: "제조/유통",
    label: "제조/유통",
  },
  {
    value: "게임",
    label: "게임",
  },
];

export const industrial_BP_game = [
  {
    value: "비동기",
    label: "비동기",
  },
  {
    value: "서버리스",
    label: "서버리스",
  },
];

export const industrial_BP_fin = [
  {
    value: "규제보고",
    label: "규제보고",
  },
  {
    value: "그리드컴퓨팅",
    label: "그리드컴퓨팅",
  },
];

export const industrial_BP_media = [
  {
    value: "비디오라이브스트리밍",
    label: "비디오라이브스트리밍",
  },
  {
    value: "비디오콘텐츠제공",
    label: "비디오콘텐츠제공",
  },
];

export const industrial_BP_same = [
  {
    value: "광고마케팅분석",
    label: "광고마케팅분석",
  },
  {
    value: "EFS",
    label: "EFS",
  },
  {
    value: "Kinesis",
    label: "Kinesis",
  },
];

export const globalRequest = [
  {
    title: "보안",
    value: "보안",
    key: "보안",
    children: [
      {
        title: "중앙 집중적 접근 권한 관리 (IAM)",
        value: "iam",
        key: "중앙 집중적 접근 권한 관리 (IAM)",
      },

      {
        title: "보안 검사 자동화 및 보안 경고 중앙 집중화 (Security Hub)",
        value: "securityhub",
        key: "보안 검사 자동화 및 보안 경고 중앙 집중화 (Security Hub)",
      },
      {
        title: "지능형 위협 탐지 (Guard Duty)",
        value: "guardduty",
        key: "지능형 위협 탐지 (Guard Duty)",
      },
      {
        title: "보안 문제 조사 (Detective)",
        value: "detective",
        key: "보안 사고 조사 (Detective)",
      },

      {
        title: "네트워크 보호",
        value: "네트워크 보호",
        key: "네트워크 보호",
        children: [
          {
            title: "네트워크 방화벽 (Network Firewall)",
            value: "networkfirewall",
            key: "네트워크 방화벽 (Network Firewall)",
          },
          {
            title: "DDoS 보호 (Shield)",
            value: "shield",
            key: "DDoS 보호 (Shield)",
          },
        ],
      },
      {
        title: "웹 애플리케이션 보호 (WAF)",
        value: "waf",
        key: "웹 애플리케이션 보호 (WAF)",
      },
      {
        title: "데이터 보호",
        value: "데이터 보호",
        key: "데이터 보호",
        children: [
          {
            title: "키관리 (Secrets Manager)",
            value: "secretmanager",
            key: "키관리 (Secrets Manager)",
          },
          {
            title: "키생성 및 암호화 (KMS)",
            value: "kms",
            key: "키생성 및 암호화 (KMS)",
          },
        ],
      },
    ],
  },
  {
    title: "로깅",
    value: "로깅",
    key: "로깅",
    children: [
      {
        title: "로그 수집 및 저장",
        value: "로그 수집 및 저장",
        key: "로그 수집 및 저장",
        children: [
          {
            title: "API 로그 수집, 저장 (CloudTrail)",
            value: "cloudtrail",
            key: "API 로그 수집 저장 (CloudTrail)",
          },
          {
            title: "로그 모니터링 (CloudWatch)",
            value: "cloudwatch",
            key: "로그 모니터링 (CloudWatch)",
          },
        ],
      },

      {
        title: "로그 수집/분석/시각화 통합 (OpenSearch)",
        value: "opensearch",
        key: "로그 수집/분석/시각화 통합 (OpenSearch)",
      },
      {
        title: "로그 분석 (SQL 쿼리) (Athena)",
        value: "athena",
        key: "로그 분석 (SQL 쿼리) (Athena)",
      },
      {
        title: "로그 시각화 (QuickSight)",
        value: "quicksight",
        key: "로그 시각화 (QuickSight)",
      },

    ],
  },
  {
    title: "부하 분산",
    value: "부하 분산",
    key: "부하 분산",
    children: [
      {
        title: "웹 트래픽 분산",
        value: "웹 트래픽 분산",
        key: "웹 트래픽 분산",
        children: [
          {
            title: "DNS 서비스",
            value: "DNS 서비스",
            key: "DNS 서비스",
          },
        ],
      },
    ],
  },
  {
    title: "이중화",
    value: "이중화",
    key: "이중화",
    children: [
      {
        title: "다중 AW 배포 구성 및 관리",
        value: "다중 AW 배포 구성 및 관리",
        key: "다중 AW 배포 구성 및 관리",
        children: [
          {
            title: "DNS 서버 이중화",
            value: "DNS 서버 이중화",
            key: "DNS 서버 이중화",
          },
          {
            title: "서버 이중화",
            value: "서버 이중화",
            key: "서버 이중화",
          },
          {
            title: "데이터베이스 분산",
            value: "데이터베이스 분산",
            key: "데이터베이스 분산",
          },
        ],
      },
    ],
  },
];
