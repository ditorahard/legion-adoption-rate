
const componentKinds = [
'Button',
'Checkbox',
'Anchor',
'Avatar',
'Badge',
'Textfield',
'Tooltip',
'Switch',
'Image',
'Accordion',
'Modal',
'Textarea',
'TabBar',
'Divider',
'Spinner',
'SidebarNavLink',
'Table',
'DataTable',
'Datepicker',
'Card',
'Navbar',
'Select',
'Carousel',
'Dropdown',
'Alert',
'Megamenu',
'Stepper',
'Chip',
'LoginPage',
] as const;
type ComponentKind = typeof componentKinds[number];

export type { ComponentKind }
export { componentKinds }
