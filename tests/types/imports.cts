import Rectangles = require("rectangles");

type Rectangle = Parameters<typeof Rectangles.area>[0];

const rectangle: Rectangle = { x1: 0, y1: 0, x2: 3, y2: 4 };
const area: number = Rectangles.area(rectangle);
const point = Rectangles.center(rectangle);

void area;
void point;
