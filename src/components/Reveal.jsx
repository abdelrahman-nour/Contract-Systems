import { useInView } from '../hooks/useMotion'

/** أي section جواه عناصر .anim-up بتظهر واحدة ورا التانية لما توصله بالسكرول */
export default function Reveal({ as: Tag = 'section', className = '', children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag ref={ref} className={`${className} ${inView ? 'is-in' : ''}`} {...rest}>
      {children}
    </Tag>
  )
}
