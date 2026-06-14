import Link from 'next/link'

export default function ServiceCrumbs({ title }: { title: string }) {
  return (
    <nav className="acl-crumbs" aria-label="Breadcrumb">
      <div className="shell acl-crumbs__row">
        <Link href="/">Home</Link>
        <span className="acl-crumbs__sep">/</span>
        <Link href="/services">Services</Link>
        <span className="acl-crumbs__sep">/</span>
        <span className="acl-crumbs__current">{title}</span>
      </div>
    </nav>
  )
}
