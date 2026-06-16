import Link from 'next/link'

export default function AreaCrumbs({ title }: { title: string }) {
  return (
    <nav className="acl-crumbs" aria-label="Breadcrumb">
      <div className="shell acl-crumbs__row">
        <Link href="/">Home</Link>
        <span className="acl-crumbs__sep">/</span>
        <Link href="/areas">Areas</Link>
        <span className="acl-crumbs__sep">/</span>
        <span className="acl-crumbs__current">{title}</span>
      </div>
    </nav>
  )
}
