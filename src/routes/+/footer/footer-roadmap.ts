export type BaseItem = {
	name: string;
	icon?: string;
	emoji?: string;
};
export type LinkItem = BaseItem & {
	type: 'link';
	href: string;
};

type ButtonItem = BaseItem & {
	type: 'button';
	onclick: () => void;
};

type ParentItem = BaseItem & {
	type: 'parent';
	children: RoadmapItem[];
};
type Divider = { type: 'divider' };

export type RoadmapItem = LinkItem | ButtonItem | ParentItem | Divider;
// type ItemType = 'parent' | 'link' | 'button'
// type Item =
