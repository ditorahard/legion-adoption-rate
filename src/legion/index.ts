
const componentKinds = [
'Accordion',
'Alert',
'Anchor',
'Avatar',
'Badge',
'BottomSheet',
'Box',
'Body',
'Button',
'Card',
'Carousel',
'Checkbox',
'Chip',
'Caption',
'Divider',
'DataTable',
'Dropdown',
'Datepicker',
'DynamicIcon',
'Flex',
'Grid',
'Heading',
'Image',
'LoginPage',
'Megamenu',
'Modal',
'Navbar',
'Onboarding',
'Radio',
'Select',
// TODO update sidebar
'SidebarNavLink',
'Spinner',
'Switch',
'TabBar',
'Table',
'Textarea',
'Textfield',
'Tooltip',
] as const;
type ComponentKind = typeof componentKinds[number];

export type { ComponentKind }
export { componentKinds }
