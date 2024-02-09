export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number
    color?: string
  }

const SearchIcon = ({ size = 20, ...restProps }: IconProps) => (
  <svg viewBox='0 0 20 20' width={size} height={size} fill='none' {...restProps}>
    <path
      d='M13.97 15.031a8.482 8.482 0 0 1-5.461 1.985C3.812 17.016 0 13.204 0 8.508S3.812 0 8.509 0c4.695 0 8.508 3.812 8.508 8.508a8.476 8.476 0 0 1-1.985 5.461l4.749 4.75a.748.748 0 0 1 .219.531c0 .587-.537.75-.75.75a.748.748 0 0 1-.531-.22l-4.749-4.749ZM8.509 1.501a7.01 7.01 0 0 0-7.007 7.007 7.01 7.01 0 0 0 7.007 7.007 7.011 7.011 0 0 0 7.007-7.007 7.011 7.011 0 0 0-7.007-7.007Z'
      fill='#6D6D6D'
    />
  </svg>
)

export default SearchIcon