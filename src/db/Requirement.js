export const backupOptions = ["중앙관리", "일반"];
export const zoneSecurityReq = ["웹 방화벽으로 보호"];
export const zoneFrame = ["웹 서버 존재"];
export const zoneRdsReq = ["데이터베이스 분산"];

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
    value: "제조",
    label: "제조",
  },
  {
    value: "게임",
    label: "게임",
  },
  {
    value: "유통/물류",
    label: "유통/물류",
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
        title: "중앙집중적 접근권한관리 (IAM)",
        value: "iam",
      },

      {
        title: "보안검사자동화 및 보안경고중앙집중화 (Security Hub)",
        value: "securityhub",
      },
      {
        title: "지능형위협탐지 (Guard Duty)",
        value: "guardduty",
      },
      {
        title: "보안문제조사 (Detective)",
        value: "detective",
      },

      {
        title: "네트워크보호",
        value: "네트워크보호",
        children: [
          {
            title: "네트워크방화벽 (Network Firewall)",
            value: "networkfirewall",
          },
          {
            title: "DDoS보호 (Shield)",
            value: "shield",
          },
        ],
      },
      {
        title: "데이터보호",
        value: "데이터보호",
        children: [
          {
            title: "키관리 (Secrets Manager)",
            value: "secretsmanager",
          },
          {
            title: "키생성및암호화 (KMS)",
            value: "kms",
          },
        ],
      },
    ],
  },
  {
    title: "로깅",
    value: "로깅",
    children: [
      {
        title: "로그 수집 및 저장",
        value: "로그 수집 및 저장",
        children: [
          {
            title: "API 로그 수집, 저장 (CloudTrail)",
            value: "cloudtrail",
          },
          {
            title: "로그 모니터링 (CloudWatch)",
            value: "cloudwatch",
          },
        ],
      },

      {
        title: "로그 수집/분석/시각화 통합 (OpenSearch)",
        value: "opensearch",
      },
      {
        title: "로그 분석 (SQL 쿼리) (Athena)",
        value: "athena",
      },
      {
        title: "로그 시각화 (QuickSight)",
        value: "quicksight",
      },
    ],
  },
  {
    title: "부하 분산",
    value: "부하 분산",
    key: "부하 분산",
    children: [
      {
        title: "트래픽 분산",
        value: "트래픽 분산",
        key: "트래픽 분산",
        children: [
          {
            title: "DNS서비스 (Route53)",
            value: "DNS서비스 (Route53)",
            key: "DNS서비스 (Route53)",
          },
          {
            title: "정적,동적컨텐츠 분산 (CloudFront)",
            value: "정적,동적컨텐츠 분산 (CloudFront)",
            key: "정적,동적컨텐츠 분산 (CloudFront)",
          },
          {
            title: "RDS 읽기복제 및 캐싱",
            value: "RDS 읽기복제 및 캐싱",
            key: "RDS 읽기복제 및 캐싱",
          },
        ],
      },
    ],
  },
  {
    title: "리소스 이중화",
    value: "리소스 이중화",
    key: "리소스 이중화",
    children: [
      {
        title: "다중AZ배포구성 및 관리",
        value: "다중AZ배포구성 및 관리",
        key: "다중AZ배포구성 및 관리",
        children: [
          {
            title: "DNS서비스 이중화 (Route53)",
            value: "DNS서비스 이중화 (Route53)",
            key: "DNS서비스 이중화 (Route53)",
          },
          {
            title: "글로벌네트워크 구축 (멀티리전)",
            value: "글로벌네트워크 구축 (멀티리전)",
            key: "글로벌네트워크 구축 (멀티리전)",
          },
          {
            title: "데이터베이스 이중화 (RDS)",
            value: "데이터베이스 이중화 (RDS)",
            key: "데이터베이스 이중화 (RDS)",
          },
        ],
      },
    ],
  },
];
