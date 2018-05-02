import { Coordinate } from './coordinate';

export class Feature {
    state: String;
    county: String;
    coordinates: Coordinate[];
    constructor() {
        this.county = null;
        this.state = null;
        this.coordinates = [];
    }
};