export interface CatalogItem {
    _id: string;
    clientId: string;
    organizationId: string;
    name: string;
    properties: {
        status: string;
        image: string[];
        dimensions: {
            L: string;
            W: string;
            H: string;
        };
        productSku: string;
        published: boolean;
        public: boolean;
        product: Product3D;
        item3D: Item3D;
        specs: Specs;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
    typeId: string;
}


export interface Product3D {
    instructions: Instructions;
    tutorials: Tutorials;
    localize: {
        componentsName: string[];
        name: string;
    };
    checkList: {
        question: any[];
        step: Step[];
    };
    item3D: Item3D
}

export interface Instructions {
    name: string;
    multiActions: {
        name: string;
        hotspots: Hotspot[];
        files: Files3D;
    };
}

export interface Tutorials {
    name: string;
    step: Step[];
    files: Files3D;
    question: any[];
}

export interface Item3D {
    name: string;
    basePrice: string;
    files: Files3D;
    category: any[];
    materials: any[];
    variants: Record<string, Variant[]>;
    hotspots: Hotspot[];
}

export interface Variant {
    name: string;
    value: string;
    img: string;
    color: string;
    price: string;
}

export interface Files3D {
    glb: string;
    hdr: string;
    poster: string;
    usdz?: string | null;
    exposure: string;
    orientation: string;
}

export interface Hotspot {
    position?: string;
    normal?: string;
    cameraOrbit?: string;
    fieldOfView?: string;
    animationName?: string;
    label: string;
    target: string;
    content?: string;
    notes?: Note[];
    variant?: string;
}

export interface Note {
    title: string;
    date: string;
    text: string;
    icon: string;
    color: string;
    avatar?: string | null;
    name?: string | null;
    position: {
        x: string;
        y: string;
    };
}

export interface Step {
    time: string | null;
    tts: string;
    camera: {
        cameraOrbit: string;
        fieldOfView: string;
        target: string;
    };
    tools: Tool[];
    tips: Tip[];
    start: string | number | null;
    animations?: any[];
    _id?: string | null;
}

export interface Tool {
    name: string;
    dataSurface: string;
    image: string;
    position: { x: string | number; y: string | number };
    actions?: any;
    nameMesh?: string;
}

export interface Tip {
    id: number;
    image: string;
    position: { positionX: number; positionY: number };
    surface: string;
}

export interface Specs {
    dimensions: SpecSection;
    capacity: SpecSection;
    power: SpecSection;
    fuelCapacity: SpecSection;
}

export interface SpecSection {
    data: { name: string; content: string }[];
    hotspot: {
        label: string;
        position: string;
        normal: string;
        right: string;
        top: string;
    };
}
export interface CatalogType {
    _id: string;
    name: string;

}