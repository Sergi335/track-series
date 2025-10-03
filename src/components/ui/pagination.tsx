import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'

import { type ButtonProps, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type PaginationProps = React.ComponentProps<'nav'> & {
  className?: string;
};

const Pagination = ({ className, ...props }: PaginationProps) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)

type PaginationContentProps = React.ComponentProps<'ul'> & {
  className?: string;
};

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

type PaginationItemProps = React.ComponentProps<'li'> & {
  className?: string;
};

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  PaginationItemProps
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
React.ComponentProps<'a'>

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <PaginationItem>
    <a
      aria-current={(isActive ?? false) ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant: (isActive ?? false) ? 'outline' : 'ghost',
          size
        }),
        className
      )}
      {...props}
    />
  </PaginationItem>
)
PaginationLink.displayName = 'PaginationLink'

type PaginationPreviousProps = {
  className?: string;
} & React.ComponentProps<typeof PaginationLink>;

const PaginationPrevious = ({
  className,
  ...props
}: PaginationPreviousProps) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

type PaginationNextProps = React.ComponentProps<typeof PaginationLink> & {
  className?: string;
};

const PaginationNext = ({
  className,
  ...props
}: PaginationNextProps) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
type PaginationEllipsisProps = React.ComponentProps<'span'> & {
  className?: string;
};
const PaginationEllipsis = ({
  className,
  ...props
}: PaginationEllipsisProps) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
}

