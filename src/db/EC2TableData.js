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
        text: 'Size',
        value: 'size',
    },
    {
        text: 'Billing',
        value: 'billing',
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

export const headers={};
headers["compute"] = compute;
headers["database"] = database;
headers["storage"] = storage;


export const items = [
    {
        instance: "EC2",
        platform: "Linux",
        type: "t2",
        size: "micro",
        billing: "on-demand",
        ea: "2",
        cost: "$534.00/mo",
    },
    {
        instance: "EC2",
        platform: "Linux",
        type: "t2",
        size: "micro",
        billing: "on-demand",
        ea: "2",
        cost: "$534.00/mo",
    },
    {
        instance: "EC2",
        platform: "Linux",
        type: "t2",
        size: "micro",
        billing: "on-demand",
        ea: "2",
        cost: "$534.00/mo",
    }
];
