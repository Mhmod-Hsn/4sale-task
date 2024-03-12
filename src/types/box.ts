import { TClass } from './class';
import { TPoint } from './point';

export type TBox = {
	id?: string;
	points: TPoint;
	text: string;
	class: TClass | string;
};
