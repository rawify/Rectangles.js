import Rectangles, {
  Rectangles as NamedRectangles,
  area,
  type Point,
  type Rectangle,
  type XYWH,
} from "rectangles";

const rectangle: Rectangle = { x1: 0, y1: 0, x2: 3, y2: 4 };
const measuredArea: number = area(rectangle);
const point: Point = Rectangles.center(rectangle);
const xywh: XYWH = NamedRectangles.toXYWH(rectangle);

void measuredArea;
void point;
void xywh;
