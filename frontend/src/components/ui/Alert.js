import { classNames } from '../../utils/classNames';

const VARIANTS = {
  info: 'border-sky-200 bg-sky-50 text-sky-800',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  error: 'border-rose-200 bg-rose-50 text-rose-800',
};

export function Alert({ className, title, children, variant = 'info' }) {
  return (
    <div
      className={classNames(
        'rounded-2xl border px-4 py-3',
        VARIANTS[variant],
        className
      )}
    >
      {title ? <p className="text-sm font-semibold">{title}</p> : null}
      <p className={classNames('text-sm leading-6', title && 'mt-1')}>{children}</p>
    </div>
  );
}
