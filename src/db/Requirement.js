export const backupOptions = ["중앙관리", "일반"];

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
        title: "접근 권한 관리",
        value: "접근 권한 관리",
        key: "접근 권한 관리",
      },
      {
        title: "탐지 및 대응",
        value: "탐지 및 대응",
        key: "탐지 및 대응",
        children: [
          {
            title: "보안 로그 통합",
            value: "보안 로그 통합",
            key: "보안 로그 통합",
          },
          {
            title: "랜섬웨어 탐지",
            value: "랜섬웨어 탐지",
            key: "랜섬웨어 탐지",
          },
          {
            title: "보안 사고 조사",
            value: "보안 사고 조사",
            key: "보안 사고 조사",
          },
        ],
      },
      {
        title: "네트워크 보호",
        value: "네트워크 보호",
        key: "네트워크 보호",
        children: [
          {
            title: "네트워크 방화벽",
            value: "네트워크 방화벽",
            key: "네트워크 방화벽",
          },
          {
            title: "안티 디도스",
            value: "안티 디도스",
            key: "안티 디도스",
          },
        ],
      },
      {
        title: "웹 애플리케이션 보호",
        value: "웹 애플리케이션 보호",
        key: "웹 애플리케이션 보호",
      },
      {
        title: "데이터 보호",
        value: "데이터 보호",
        key: "데이터 보호",
        children: [
          {
            title: "키관리",
            value: "키관리",
            key: "키관리",
          },
          {
            title: "키생성 및 암호화",
            value: "키생성 및 암호화",
            key: "키생성 및 암호화",
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
            title: "API 로그 수집",
            value: "API 로그 수집",
            key: "API 로그 수집",
          },
          {
            title: "리소스 및 애플리케이션 모니터링",
            value: "리소스 및 애플리케이션 모니터링",
            key: "리소스 및 애플리케이션 모니터링",
          },
        ],
      },
      {
        title: "분석 및 시각화",
        value: "분석 및 시각화",
        key: "분석 및 시각화",
        children: [
          {
            title: "로그 수집/분석/시각화 통합 (OpenSearch)",
            value: "로그 수집/분석/시각화 통합 (OpenSearch)",
            key: "로그 수집/분석/시각화 통합 (OpenSearch)",
          },
          {
            title: "로그 분석 (SQL 쿼리)",
            value: "로그 분석 (SQL 쿼리)",
            key: "로그 분석 (SQL 쿼리)",
          },
          {
            title: "로그 시각화",
            value: "로그 시각화",
            key: "로그 시각화",
          },
        ],
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

export const zoneRequest = [
  {
    title: "보안",
    value: "망별_보안",
    key: "망별_보안",
    children: [
      {
        title: "접근 권한 관리",
        value: "망별_접근 권한 관리",
        key: "망별_접근 권한 관리",
      },
      {
        title: "탐지 및 대응",
        value: "망별_탐지 및 대응",
        key: "망별_탐지 및 대응",
        children: [
          {
            title: "보안 로그 통합",
            value: "망별_보안 로그 통합",
            key: "망별_보안 로그 통합",
          },
          {
            title: "랜섬웨어 탐지",
            value: "망별_랜섬웨어 탐지",
            key: "망별_랜섬웨어 탐지",
          },
          {
            title: "보안 사고 조사",
            value: "망별_보안 사고 조사",
            key: "망별_보안 사고 조사",
          },
        ],
      },
      {
        title: "네트워크 보호",
        value: "망별_네트워크 보호",
        key: "망별_네트워크 보호",
        children: [
          {
            title: "네트워크 방화벽",
            value: "망별_네트워크 방화벽",
            key: "네트워크 방화벽",
          },
          {
            title: "안티 디도스",
            value: "망별_안티 디도스",
            key: "망별_안티 디도스",
          },
        ],
      },
      {
        title: "웹 애플리케이션 보호",
        value: "망별_웹 애플리케이션 보호",
        key: "망별_웹 애플리케이션 보호",
      },
      {
        title: "데이터 보호",
        value: "망별_데이터 보호",
        key: "망별_데이터 보호",
        children: [
          {
            title: "키관리",
            value: "망별_키관리",
            key: "망별_키관리",
          },
          {
            title: "키생성 및 암호화",
            value: "망별_키생성 및 암호화",
            key: "망별_키생성 및 암호화",
          },
        ],
      },
    ],
  },
  {
    title: "로깅",
    value: "망별_로깅",
    key: "망별_로깅",
    children: [
      {
        title: "로그 수집 및 저장",
        value: "망별_로그 수집 및 저장",
        key: "망별_로그 수집 및 저장",
        children: [
          {
            title: "API 로그 수집",
            value: "망별_API 로그 수집",
            key: "망별_API 로그 수집",
          },
          {
            title: "리소스 및 애플리케이션 모니터링",
            value: "망별_리소스 및 애플리케이션 모니터링",
            key: "망별_리소스 및 애플리케이션 모니터링",
          },
        ],
      },
      {
        title: "분석 및 시각화",
        value: "망별_분석 및 시각화",
        key: "망별_분석 및 시각화",
        children: [
          {
            title: "로그 수집/분석/시각화 통합 (OpenSearch)",
            value: "망별_로그 수집/분석/시각화 통합 (OpenSearch)",
            key: "망별_로그 수집/분석/시각화 통합 (OpenSearch)",
          },
          {
            title: "로그 분석 (SQL 쿼리)",
            value: "망별_로그 분석 (SQL 쿼리)",
            key: "망별_로그 분석 (SQL 쿼리)",
          },
          {
            title: "로그 시각화",
            value: "망별_로그 시각화",
            key: "망별_로그 시각화",
          },
        ],
      },
    ],
  },
];
