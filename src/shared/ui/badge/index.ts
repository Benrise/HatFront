import { type VariantProps, cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'text-nowrap inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'text-sm border-transparent bg-accent text-primary-foreground shadow hover:bg-accent/80',
        secondary:
          'text-sm border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'text-sm border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground text-sm border',
        ghost: 'bg-none border-l-2 rounded-none border-accent text-foreground shadow',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
