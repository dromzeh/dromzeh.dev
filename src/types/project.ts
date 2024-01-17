export interface Project {
    name: string;
    description: string;
    languages: string[];
    projecturl?: string;
    oss: boolean;
    giturl?: string;
    active: boolean;
    iconurl?: string;
}
