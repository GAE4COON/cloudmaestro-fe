const compute = [
    {
        text: 'Instance',
        value: 'instance',
    },
    {
        text: 'Platform',
        value: 'platform',
    },
    {
        text: 'InstanceType',
        value: 'instancetype',
    },
    {
        text: 'InstanceSize',
        value: 'size',
    },
    {
        text: 'Cost',
        value: 'cost',
    },
]

const database = [
    {
        text: 'Instance',
        value: 'instance',
    },
    {
        text: 'Engine',
        value: 'engine',
    },

    {
        text: 'InstanceType',
        value: 'instancetype',
    },
    {
        text: 'Size',
        value: 'size',
    },
    {
        text: 'Cost',
        value: 'cost',
    },
];

const storage = [
    {
        text: 'Instance',
        value: 'instance',
    },
    {
        text: 'Storage',
        value: 'storage',
    },
    {
        text: 'Cost',
        value: 'cost',
    },
];

const waf = [
    {
        text: 'Instance',
        value: 'instance',
    },
    {
        text: 'Rule',
        value: 'rule',
    },
    {
        text: "Request",
        value: "request" 
    },
    {
        text: 'Cost',
        value: 'cost',
    },
]


export const headers={};
headers["compute"] = compute;
headers["database"] = database;
headers["storage"] = storage;
headers["waf"] = waf;
