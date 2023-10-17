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
        value: 'instanceType',
    },
    {
        text: 'InstanceSize',
        value: 'instanceSize',
    },
    {
        text: 'Billing',
        value: 'billingOption',
    },
    {
        text: 'Price',
        value: 'price',
    },
]

const database = [
    {
        text: 'Instance',
        value: 'instance',
    },
    {
        text: 'Engine',
        value: 'dbEngine',
    },

    {
        text: 'InstanceType',
        value: 'instanceType',
    },
    {
        text: 'Size',
        value: 'instanceSize',
    },
    {
        text: 'Price',
        value: 'price',
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
        text: 'Price',
        value: 'price',
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
        price: "$534.00/mo",
    },
    {
        instance: "EC2",
        platform: "Linux",
        type: "t2",
        size: "micro",
        billing: "on-demand",
        ea: "2",
        price: "$534.00/mo",
    },
    {
        instance: "EC2",
        platform: "Linux",
        type: "t2",
        size: "micro",
        billing: "on-demand",
        ea: "2",
        price: "$534.00/mo",
    }
];
