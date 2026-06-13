import { BUSINESS } from '@/lib/constants'

type Props = {
  /** Status pill text shown next to the pulsing dot. Defaults to a seasonal booking line. */
  status?: string
}

export default function TopBar({
  status = 'Booking spring 2026 exteriors — limited slots',
}: Props) {
  return (
    <div className="bg-ink text-[#d8d2c2] text-[12.5px] tracking-[0.01em]">
      <div className="shell flex items-center justify-between py-[9px]">
        <span className="inline-flex items-center gap-2">
          <span className="acl-topbar-dot" aria-hidden="true" />
          <span>{status}</span>
        </span>
        <div className="hidden gap-2 sm:flex">
          <a href={`tel:${BUSINESS.phoneRaw}`} className="hover:text-white">
            {BUSINESS.phone}
          </a>
          <span className="opacity-40" aria-hidden="true">
            ·
          </span>
          <a href={`mailto:${BUSINESS.email}`} className="hover:text-white">
            {BUSINESS.email}
          </a>
        </div>
      </div>
    </div>
  )
}
