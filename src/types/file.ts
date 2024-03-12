import { TBox } from './box';

export type TFile = {
	base64: string;
	boxes: TBox[];
	_id: string;
	name: string;
};
