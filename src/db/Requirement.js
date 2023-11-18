export const industrial = [
    // {
    //   value: '1',
    //   label: '선택안함',
    // },
    {
        value: '금융',
        label: '금융',
    },
    {
        value: '미디어',
        label: '미디어',
    },
    {
        value: '제조/유통',
        label: '제조/유통',
    },
    {
        value: '게임',
        label: '게임',
    },
];

export const globalRequest = [

    {
        title: '보안',
        value: 'security',
        key: '보안',
        children: [
            {
                title: '접근 권한 관리',
                value: '접근 권한 관리',
                key: '접근 권한 관리',
            },
            {
                title: '탐지 및 대응',
                value: '탐지 및 대응',
                key: '탐지 및 대응',
                children: [
                    {
                        title: '보안 로그 통합',
                        value: '보안 로그 통합',
                        key: '보안 로그 통합',
                    },
                    {
                        title: '랜섬웨어 탐지',
                        value: '랜섬웨어 탐지',
                        key: '랜섬웨어 탐지',
                    },
                    {
                        title: '보안 사고 조사',
                        value: '보안 사고 조사',
                        key: '보안 사고 조사',
                    },

                ],
            },
            {
                title: '네트워크 보호',
                value: '네트워크 보호',
                key: '네트워크 보호',
                children: [
                    {
                        title: '네트워크 방화벽',
                        value: '네트워크 방화벽',
                        key:'네트워크 방화벽',
                    },
                    {
                        title: '안티 디도스',
                        value: '안티 디도스',
                        key: '안티 디도스',
                    },
                ],
            },
            {
                title: '웹 애플리케이션 보호',
                value: '웹 애플리케이션 보호',
                key: '웹 애플리케이션 보호',
            },
            {
                title: '데이터 보호',
                value: '데이터 보호',
                key: '데이터 보호',
                children: [
                    {
                        title: '키관리',
                        value: '키관리',
                        key: '키관리',
                    },
                    {
                        title: '키생성 및 암호화',
                        value: '키생성 및 암호화',
                        key: '키생성 및 암호화',
                    },
                ],
            },
        ],
    },
    {
        title: '로깅',
        value: '로깅',
        key: '로깅',
        children: [
            {
                title: '로그 수집 및 저장',
                value: '로그 수집 및 저장',
                key: '로그 수집 및 저장',
                children: [
                    {
                        title: 'API 로그 수집',
                        value: 'API 로그 수집',
                        key: 'API 로그 수집',
                    },
                    {
                        title: '리소스 및 애플리케이션 모니터링',
                        value: '리소스 및 애플리케이션 모니터링',
                        key: '리소스 및 애플리케이션 모니터링',
                    },
                ],
            },
            {
                title: '분석 및 시각화',
                value: '분석 및 시각화',
                key: '분석 및 시각화',
                children: [
                    {
                        title: '로그 수집/분석/시각화 통합 (OpenSearch)',
                        value: '로그 수집/분석/시각화 통합 (OpenSearch)',
                        key: '로그 수집/분석/시각화 통합 (OpenSearch)'
                    },
                    {
                        title: '로그 분석 (SQL 쿼리)',
                        value: '로그 분석 (SQL 쿼리)',
                        key: '로그 분석 (SQL 쿼리)',
                    },
                    {
                        title: '로그 시각화',
                        value: '로그 시각화',
                        key: '로그 시각화',
                    },
                ],
            },
        ],
    },
    {
        title: '로깅',
        value: '로깅',
        key: '로깅',
        children: [
            {
                title: '로그 수집 및 저장',
                value: '로그 수집 및 저장',
                key: '로그 수집 및 저장',
                children: [
                    {
                        title: 'API 로그 수집',
                        value: 'API 로그 수집',
                        key: 'API 로그 수집',
                    },
                    {
                        title: '리소스 및 애플리케이션 모니터링',
                        value: '리소스 및 애플리케이션 모니터링',
                        key: '리소스 및 애플리케이션 모니터링',
                    },
                ],
            },
            {
                title: '분석 및 시각화',
                value: '분석 및 시각화',
                key: '분석 및 시각화',
                children: [
                    {
                        title: '로그 수집/분석/시각화 통합 (OpenSearch)',
                        value: '로그 수집/분석/시각화 통합 (OpenSearch)',
                        key: '로그 수집/분석/시각화 통합 (OpenSearch)'
                    },
                    {
                        title: '로그 분석 (SQL 쿼리)',
                        value: '로그 분석 (SQL 쿼리)',
                        key: '로그 분석 (SQL 쿼리)',
                    },
                    {
                        title: '로그 시각화',
                        value: '로그 시각화',
                        key: '로그 시각화',
                    },
                ],
            },
        ],
    }
    
];

export const zoneRequest = [

    {
        title: '보안',
        value: '망별_보안',
        key: '망별_보안',
        children: [
            {
                title: '접근 권한 관리',
                value: '망별_접근 권한 관리',
                key: '망별_접근 권한 관리',
            },
            {
                title: '탐지 및 대응',
                value: '망별_탐지 및 대응',
                key: '망별_탐지 및 대응',
                children: [
                    {
                        title: '보안 로그 통합',
                        value: '망별_보안 로그 통합',
                        key: '망별_보안 로그 통합',
                    },
                    {
                        title: '랜섬웨어 탐지',
                        value: '망별_랜섬웨어 탐지',
                        key: '망별_랜섬웨어 탐지',
                    },
                    {
                        title: '보안 사고 조사',
                        value: '망별_보안 사고 조사',
                        key: '망별_보안 사고 조사',
                    },

                ],
            },
            {
                title: '네트워크 보호',
                value: '망별_네트워크 보호',
                key: '망별_네트워크 보호',
                children: [
                    {
                        title: '네트워크 방화벽',
                        value: '망별_네트워크 방화벽',
                        key:'네트워크 방화벽',
                    },
                    {
                        title: '안티 디도스',
                        value: '망별_안티 디도스',
                        key: '망별_안티 디도스',
                    },
                ],
            },
            {
                title: '웹 애플리케이션 보호',
                value: '망별_웹 애플리케이션 보호',
                key: '망별_웹 애플리케이션 보호',
            },
            {
                title: '데이터 보호',
                value: '망별_데이터 보호',
                key: '망별_데이터 보호',
                children: [
                    {
                        title: '키관리',
                        value: '망별_키관리',
                        key: '망별_키관리',
                    },
                    {
                        title: '키생성 및 암호화',
                        value: '망별_키생성 및 암호화',
                        key: '망별_키생성 및 암호화',
                    },
                ],
            },
        ],
    },
    {
        title: '로깅',
        value: '망별_로깅',
        key: '망별_로깅',
        children: [
            {
                title: '로그 수집 및 저장',
                value: '망별_로그 수집 및 저장',
                key: '망별_로그 수집 및 저장',
                children: [
                    {
                        title: 'API 로그 수집',
                        value: '망별_API 로그 수집',
                        key: '망별_API 로그 수집',
                    },
                    {
                        title: '리소스 및 애플리케이션 모니터링',
                        value: '망별_리소스 및 애플리케이션 모니터링',
                        key: '망별_리소스 및 애플리케이션 모니터링',
                    },
                ],
            },
            {
                title: '분석 및 시각화',
                value: '망별_분석 및 시각화',
                key: '망별_분석 및 시각화',
                children: [
                    {
                        title: '로그 수집/분석/시각화 통합 (OpenSearch)',
                        value: '망별_로그 수집/분석/시각화 통합 (OpenSearch)',
                        key: '망별_로그 수집/분석/시각화 통합 (OpenSearch)'
                    },
                    {
                        title: '로그 분석 (SQL 쿼리)',
                        value: '망별_로그 분석 (SQL 쿼리)',
                        key: '망별_로그 분석 (SQL 쿼리)',
                    },
                    {
                        title: '로그 시각화',
                        value: '망별_로그 시각화',
                        key: '망별_로그 시각화',
                    },
                ],
            },
        ],
    },
];